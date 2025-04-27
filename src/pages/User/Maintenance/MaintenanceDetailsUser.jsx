import { useState, createContext, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { Plus, Search } from "lucide-react";
import { MainteranceTable } from "../../../components/Maintenance/MaintenanceTableUser.jsx";
import { AddMaintenancePopup } from "../../../components/Maintenance/AddMaintenancePopup.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const NotificationContext = createContext();

const MaintenanceDetails = () => {
  const [maintanence, setMaintanence] = useState([]);
  const [isAddMaintananceOpen, setIsAddMaintananceOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get(
          "https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/maintenance-f9f/v1.0/details"
        );
        setMaintanence(response.data);
      } catch (error) {
        console.error("Failed to fetch maintenance data:", error);
        toast.error("Failed to load maintenance data!");
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceData();
  }, []);

  const handleAddMainteince = (newUser) => {
    setMaintanence((prev) => [
      ...prev,
      { ...newUser, id: Date.now().toString() },
    ]);
    toast.success("Adding Successful");
    setIsAddMaintananceOpen(false);
  };

  const handleEditMaintanance = (editedMaintanence) => {
    setMaintanence((prev) =>
      prev.map((item) =>
        item.id === editedMaintanence.id ? editedMaintanence : item
      )
    );
  };

  const handleDeleteMaintanance = (maintanenceId) => {
    const idsArray = Array.isArray(maintanenceId)
      ? maintanenceId
      : [maintanenceId];

    setMaintanence((prev) =>
      prev.filter((item) => !idsArray.includes(item.id))
    );
    toast.success("Delete successfully!");
  };

  const handleSendMaintanance = (maintanenceId) => {
    const item = maintanence.find((m) => m.id === maintanenceId);
    if (item) {
      const updatedNotifications = [...notification, item];
      setNotification(updatedNotifications);
      console.log("Updated notifications:", updatedNotifications);
    }
  };

  const filteredMaintanance = maintanence.filter((item) => {
    const searchMatch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const typeMatch = filterType === "All" || item.priorityLevel === filterType;

    return searchMatch && typeMatch;
  });

  return (
    <NotificationContext.Provider value={notification}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Maintenance</h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Search Bar and Filter */}
          <div style={{ display: "flex", alignItems: "center" }}>
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

            <FormControl
              variant="outlined"
              size="small"
              className="w-40"
              style={{ marginLeft: "10px" }}
            >
              <InputLabel>Filter by Priority</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Filter by Priority"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Add New Maintenance Button */}
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#1976D2", fontWeight: "bold" }}
            startIcon={<Plus size={20} />}
            onClick={() => setIsAddMaintananceOpen(true)}
          >
            ADD NEW MAINTENANCE
          </Button>
        </div>

        <div style={{ marginTop: "20px" }}></div>

        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <MainteranceTable
            maintanence={filteredMaintanance}
            onEditMaintanance={handleEditMaintanance}
            onDeleteMaintanance={handleDeleteMaintanance}
            onSendMaintanance={handleSendMaintanance}
          />
        )}

        <AddMaintenancePopup
          open={isAddMaintananceOpen}
          onClose={() => setIsAddMaintananceOpen(false)}
          onAdd={handleAddMainteince}
        />
        <ToastContainer />
      </div>
    </NotificationContext.Provider>
  );
};

export default MaintenanceDetails;
export { NotificationContext };
