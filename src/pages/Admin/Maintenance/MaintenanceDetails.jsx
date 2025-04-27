import { useState, createContext } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Plus, Search } from "lucide-react";
import { MainteranceTable } from "../../../components/Maintenance/MaintenanceTable.jsx";
import { AddMainterancePopup } from "../../../components/Maintenance/AddMaintenancePopup.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationContext = createContext();

const MaintenanceDetails = () => {
  const [isAddMaintananceOpen, setIsAddMaintananceOpen] = useState(false);
  const [notification, setNotification] = useState([]);


  //fetch data from database
  const [maintanence, setMaintanence] = useState([
    {
      id: 1,
      name: " Karen",
      description: "power unit malfunction, Floor 3, IT Department",
      priorityLevel: "5",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=Alice+Smith",
    },
    {
      id: 2,
      name: "John",
      description: "Projector not working, Floor 7, Conference Room",
      priorityLevel: "4",
      status: "In Progress",
      profilePicture: "https://ui-avatars.com/api/?name=John",
    },
    {
      id: 3,
      name: "Sophia",
      description: "Elevator not working, Floor 9, Near Reception",
      priorityLevel: "5",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=Sophia",
    },
    {
      id: 4,
      name: "David",
      description: "Water leakage from AC, Floor 4, Finance Department",
      priorityLevel: "3",
      status: "Resolved",
      profilePicture: "https://ui-avatars.com/api/?name=David",
    },
    {
      id: 5,
      name: "Emma",
      description: "Printer not working, Floor 6, Admin Office",
      priorityLevel: "2",
      status: "In Progress",
      profilePicture: "https://ui-avatars.com/api/?name=Emma",
    },
    {
      id: 6,
      name: "Michael",
      description: "Glass door handle broken, Floor 8, Legal Department",
      priorityLevel: "4",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=Michael",
    },
    {
      id: 7,
      name: "Olivia",
      description: "Lights flickering, Floor 2, Cafeteria",
      priorityLevel: "3",
      status: "Resolved",
      profilePicture: "https://ui-avatars.com/api/?name=Olivia",
    },
    {
      id: 8,
      name: "Daniel",
      description: "Network issues in conference room, Floor 10, IT Support",
      priorityLevel: "5",
      status: "In Progress",
      profilePicture: "https://ui-avatars.com/api/?name=Daniel",
    },
    {
      id: 9,
      name: "Liam",
      description: "Air conditioning failure, Floor 5, Operations",
      priorityLevel: "4",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=Liam",
    },
    {
      id: 10,
      name: "Ava",
      description: "Broken chair in meeting room, Floor 6, HR Department",
      priorityLevel: "2",
      status: "Resolved",
      profilePicture: "https://ui-avatars.com/api/?name=Ava",
    },
    {
      id: 11,
      name: "Noah",
      description: "Coffee machine not working, Floor 1, Break Room",
      priorityLevel: "1",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=Noah",
    },
    {
      id: 12,
      name: "Isabella",
      description: "Leaking sink in restroom, Floor 3, Main Washroom",
      priorityLevel: "3",
      status: "In Progress",
      profilePicture: "https://ui-avatars.com/api/?name=Isabella",
    },
    {
      id: 13,
      name: "Mason",
      description: "Emergency exit door stuck, Floor 7, South Wing",
      priorityLevel: "5",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=Mason",
    },
    {
      id: 14,
      name: "Ethan",
      description: "Fire alarm malfunctioning, Floor 2, Security Room",
      priorityLevel: "5",
      status: "Resolved",
      profilePicture: "https://ui-avatars.com/api/?name=Ethan",
    },
    {
      id: 15,
      name: "Charlotte",
      description: "Computers not starting, Floor 4, IT Department",
      priorityLevel: "3",
      status: "In Progress",
      profilePicture: "https://ui-avatars.com/api/?name=Charlotte",
    },
    {
      id: 16,
      name: "James",
      description: "Phone lines down, Floor 5, Sales Office",
      priorityLevel: "4",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=James",
    },
    {
      id: 17,
      name: "Lucas",
      description: "Door lock not functioning, Floor 8, Storage Room",
      priorityLevel: "3",
      status: "Resolved",
      profilePicture: "https://ui-avatars.com/api/?name=Lucas",
    },
    {
      id: 18,
      name: "Harper",
      description: "Overhead projector not displaying, Floor 9, Training Room",
      priorityLevel: "4",
      status: "In Progress",
      profilePicture: "https://ui-avatars.com/api/?name=Harper",
    },
    {
      id: 19,
      name: "Benjamin",
      description: "Heating system failure, Floor 12, Office Area",
      priorityLevel: "5",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=Benjamin",
    },
    {
      id: 20,
      name: "Amelia",
      description: "WiFi connectivity issues, Floor 11, Main Hall",
      priorityLevel: "3",
      status: "Resolved",
      profilePicture: "https://ui-avatars.com/api/?name=Amelia",
    },
    {
      id: 21,
      name: "Henry",
      description: "Parking gate malfunction, Basement 1, Entry Point",
      priorityLevel: "4",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=Henry",
    },
    {
      id: 22,
      name: "Elijah",
      description: "Water dispenser empty, Floor 2, Pantry",
      priorityLevel: "1",
      status: "Resolved",
      profilePicture: "https://ui-avatars.com/api/?name=Elijah",
    },
    {
      id: 23,
      name: "Abigail",
      description: "Security camera not recording, Floor 3, Main Entrance",
      priorityLevel: "5",
      status: "In Progress",
      profilePicture: "https://ui-avatars.com/api/?name=Abigail",
    },
    {
      id: 24,
      name: "Matthew",
      description: "Conference call system error, Floor 6, Meeting Room",
      priorityLevel: "4",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=Matthew",
    },
    {
      id: 25,
      name: "Scarlett",
      description: "Vending machine jammed, Floor 5, Break Area",
      priorityLevel: "2",
      status: "Resolved",
      profilePicture: "https://ui-avatars.com/api/?name=Scarlett",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");

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
      prev.map((maintanence) =>
        maintanence.id === editedMaintanence.id
          ? editedMaintanence
          : maintanence
      )
    );
  };

  const handleDeleteMaintanance = (maintanenceId) => {
    const idsArray = Array.isArray(maintanenceId)
      ? maintanenceId
      : [maintanenceId];

    setMaintanence((prev) =>
      prev.filter((maintanence) => !idsArray.includes(maintanence.id))
    );
    toast.success("Delete successfully!");
  };

  const handleSendMaintanance = (maintanenceId) => {
    if (maintanence.find((maintanen) => maintanen.id === maintanenceId)) {
      const maintan = maintanence.find(
        (maintanence) => maintanence.id === maintanenceId
      );

      const updatedNotifications = [...notification, maintan];
      setNotification(updatedNotifications);
      console.log("Updated notifications:", updatedNotifications);
    }

  };

  const filteredMaintanance = maintanence.filter((maintanence) => {
    const searchMatch = maintanence.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const typeMatch =
      filterType === "All" || maintanence.priorityLevel === filterType;

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
          {/* Left-aligned: Search Bar and Filter Dropdown */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Search Bar */}
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

            {/* Filter Dropdown */}
            <FormControl
              variant="outlined"
              size="small"
              className="w-40"
              style={{ marginLeft: "10px" }}
            >
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

          {/* Right-aligned: Add New User Button */}
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

        <MainteranceTable
          maintanence={filteredMaintanance}
          onEditMaintanance={handleEditMaintanance}
          onDeleteMaintanance={handleDeleteMaintanance}
          onSendMaintanance={handleSendMaintanance}
        />

        <AddMainterancePopup
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
