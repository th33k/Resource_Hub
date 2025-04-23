import React, { useState } from "react";
import MonitorTable from "../../components/Asset/AssetMonitoring/MonitorTable";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Search } from "lucide-react";
import RequestButton from "../../components/Asset/Asset Requesting User/RequestButton";

const initialAssets = [
  {
    avatar: "https://i.pravatar.cc/50",
    name: "John Doe",
    id: "008",
    assetname: "Laptop",
    category: "Electronics & IT",
    abc: "Alpha",
    dcf: "Delta",
  },
  {
    avatar: "https://i.pravatar.cc/50",
    name: "John Doe",
    id: "009",
    assetname: "Monitor",
    category: "Electronics & IT",
    abc: "Beta",
    dcf: "Gamma",
  },
  {
    avatar: "https://i.pravatar.cc/50",
    name: "John Doe",
    id: "010",
    assetname: "Keyboard",
    category: "Electronics & IT",
    abc: "Epsilon",
    dcf: "Omega",
  },
];

const AssetRequestingUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [assets, setAssets] = useState(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  const uniqueCategories = [
    "All",
    ...new Set(initialAssets.map((asset) => asset.category)),
  ];

  const filteredAssets = assets.filter(
    (asset) =>
      (filterCategory === "All" || asset.category === filterCategory) &&
      (asset.name.toLowerCase().includes(searchText.toLowerCase()) ||
        asset.assetname.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleEditOpen = (asset) => {
    setSelectedAsset(asset);
    setEditOpen(true);
  };

  const handleDeleteOpen = (asset) => {
    setSelectedAsset(asset);
    setDeleteOpen(true);
  };

  const handleRequestOpen = () => {
    setRequestOpen(true);
  };

  const handleRequestClose = () => {
    setRequestOpen(false);
  };

  const handleRequestSubmit = (newRequest) => {
    setRequestOpen(false);
  };

  const customColumns = [
    {
      label: "Abc",
      render: (asset) => <span>{asset.abc}</span>,
    },
    {
      label: "Dcf",
      render: (asset) => <span>{asset.dcf}</span>,
    },
  ];

  return (
    <div>
      <h2>Asset Requesting</h2>

      {/* Search, Filter & Request Button Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "space-between",  // Added to spread out the buttons
        }}
      >
        {/* Search Bar */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Search by Name or Asset"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{ startAdornment: <Search size={20} /> }}
            style={{ marginRight: "10px" }}
          />

          {/* Filter Dropdown */}
          <FormControl variant="outlined" size="small">
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              label="Filter by Category"
              sx={{ minWidth: "180px" }}
            >
              {uniqueCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Request Asset Button (on the right side) */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#1976D2",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            alignSelf: "flex-start",  // Ensures it's aligned at the top
          }}
          onClick={handleRequestOpen}
        >
          Request Asset
        </Button>
      </div>

      {/* Monitor Table */}
      <MonitorTable
        assets={filteredAssets}
        handleEditOpen={handleEditOpen}
        handleDeleteOpen={handleDeleteOpen}
        showHandoverColumns={false}
        customColumns={customColumns}
      />

      {/* Request Button Modal */}
      <RequestButton
        open={requestOpen}
        onClose={handleRequestClose}
        onRequest={handleRequestSubmit}
      />
    </div>
  );
};

export default AssetRequestingUsers;
