import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Plus, Search } from "lucide-react";
import { MainteranceTable } from "../../components/Maintenance/MaintenanceTable.jsx";
import { AddMainterancePopup } from "../../components/Maintenance/AddMaintenancePopup.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MaintenanceDetails = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Fetch users from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/maintenance-f9f/v1.0/details");
        const data = await response.json();

        const mappedUsers = data.map((item, index) => ({
          id: item.id || index,
          name: item.name,
          description: item.description,
          priorityLevel: String(item.priorityLevel),
          status: item.status,
          profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}`
        }));

        setUsers(mappedUsers);
      } catch (error) {
        console.error("Failed to fetch maintenance data:", error);
        toast.error("Failed to load maintenance data");
      }
    };

    fetchData();
  }, []);

  const handleAddMainteince = (newUser) => {
    setUsers((prev) => [...prev, { ...newUser, id: Date.now().toString() }]);
    toast.success("Adding Successful");
    setIsAddUserOpen(false);
  };

  const handleEditUser = (editedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
  };

  const handleDeleteUsers = (userIds) => {
    const idsArray = Array.isArray(userIds) ? userIds : [userIds];
    setUsers((prev) => prev.filter((user) => !idsArray.includes(user.id)));
    toast.success("Delete successfully!");
  };

  const filteredUsers = users.filter((user) => {
    const searchMatch = user.name.toLowerCase().includes(searchText.toLowerCase());
    const typeMatch = filterType === "All" || user.priorityLevel === filterType;
    return searchMatch && typeMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Maintenance</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: <Search size={20} />,
            }}
          />

          <FormControl variant="outlined" size="small" className="w-40 ml-2">
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#1976D2", fontWeight: "bold" }}
          startIcon={<Plus size={20} />}
          onClick={() => setIsAddUserOpen(true)}
        >
          ADD NEW MAINTENANCE
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}></div>

      <MainteranceTable
        users={filteredUsers}
        onEditUser={handleEditUser}
        onDeleteUsers={handleDeleteUsers}
      />

      <AddMainterancePopup
        open={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onAdd={handleAddMainteince}
      />
      <ToastContainer />
    </div>
  );
};

export default MaintenanceDetails;
