import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { UserPlus, Search } from "lucide-react";
import AdminLayout from '../../../layouts/Admin/AdminLayout';
import { UserTable } from "../../../components/Users/UserTable.jsx";
import { AddUserDialog } from "../../../components/Users/AddUserDialog.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/user-294/v1.0";

export const Users = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(true);

  const apiRequest = async (url, method, body = null) => {
    const token = localStorage.getItem('authToken');
    
    const options = {
      method,
      headers: { 
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText || response.statusText}`);
      }
      
      if (method !== 'DELETE' && response.headers.get('content-length') !== '0') {
        return await response.json();
      }
      
      return true;
    } catch (error) {
      console.error(`API Request Error (${method} ${url}):`, error);
      throw error;
    }
  };

  const tryEndpoints = async (endpoints, method, body = null) => {
    for (let i = 0; i < endpoints.length; i++) {
      try {
        return await apiRequest(endpoints[i], method, body);
      } catch (error) {
        if (i === endpoints.length - 1) throw error;
      }
    }
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/details', 'GET');
      setUsers(data.map(user => ({
        id: user.id.toString(),
        email: user.email,
        userType: user.usertype,
        additionalDetails: user.additional_details,
        profilePicture: user.profile_picture_url || 
                        `https://ui-avatars.com/api/?name=${user.username}`,
        username: user.username,
        phoneNumber: user.phone_number,
        createdAt: user.created_at,
      })));
    } catch (error) {
      toast.error(`Failed to load users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const formatUserData = (user) => ({
    username: user.username || user.email.split("@")[0],
    profile_picture_url: user.profilePicture || 
                        `https://ui-avatars.com/api/?name=${user.email.split("@")[0]}`,
    usertype: user.userType,
    email: user.email,
    phone_number: user.phoneNumber || "",
    additional_details: user.additionalDetails || "",
    ...(user.id && { id: user.id }),
    ...(user.created_at ? { created_at: user.created_at } : 
       !user.id && { created_at: new Date().toISOString() }),
  });

  const handleAddUser = async (newUser) => {
    try {
      await apiRequest('/user/add', 'POST', formatUserData(newUser));
      await fetchUsers();
      setIsAddUserOpen(false);
      toast.success("User added successfully");
    } catch (error) {
      toast.error(`Failed to add user: ${error.message}`);
    }
  };

  const handleEditUser = async (editedUser) => {
    try {
      await tryEndpoints([
        `/user/update/${editedUser.id}`,
        `/user/${editedUser.id}`
      ], 'PUT', formatUserData(editedUser));
      
      setUsers(prev => 
        prev.map(user => user.id === editedUser.id ? editedUser : user)
      );
      
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(`Failed to update user: ${error.message}`);
      fetchUsers();
    }
  };

  const handleDeleteUsers = async (userIds) => {
    try {
      const deletePromises = userIds.map(userId => 
        tryEndpoints([`/user/${userId}`, `/user/details/${userId}`], 'DELETE')
      );
      
      await Promise.allSettled(deletePromises);
      await fetchUsers();
      
      const successCount = userIds.length - users.filter(u => userIds.includes(u.id)).length;
      
      if (successCount === userIds.length) {
        toast.success(`${successCount} user${successCount !== 1 ? 's' : ''} deleted successfully`);
      } else {
        toast.warning(`Deleted ${successCount} out of ${userIds.length} selected users`);
      }
    } catch (error) {
      toast.error(`Failed to delete users: ${error.message}`);
      fetchUsers();
    }
  };

  const filteredUsers = useMemo(() =>
    users.filter(({ email, additionalDetails, userType }) => {
      const searchMatch = [email, additionalDetails].some(field =>
        field?.toLowerCase().includes(searchText.toLowerCase())
      );
      return searchMatch && (filterType === "All" || userType === filterType);
    }),
    [users, searchText, filterType]
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">User management</h1>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{ startAdornment: <Search size={20} /> }}
            />
            <FormControl variant="outlined" size="small" className="w-40 ml-2">
              <InputLabel>Filter by Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Filter by Type"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="font-bold"
            startIcon={<UserPlus size={20} />}
            onClick={() => setIsAddUserOpen(true)}
          >
            Add New User
          </Button>
        </div>

        {loading ? (
          <div>Loading users...</div>
        ) : (
          <UserTable
            users={filteredUsers}
            onEditUser={handleEditUser}
            onDeleteUsers={handleDeleteUsers}
          />
        )}

        <AddUserDialog
          open={isAddUserOpen}
          onClose={() => setIsAddUserOpen(false)}
          onAdd={handleAddUser}
        />
        
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </AdminLayout>
  );
};
