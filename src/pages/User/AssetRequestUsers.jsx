import React, { useState } from "react";
import MonitorTable from "../../components/Asset/AssetMonitoring/MonitorTable";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Search } from "lucide-react";
import RequestButton from "../../components/Asset/Asset Requesting User/RequestButton";
import "../css/AssetAdmin.css";

const initialAssets = [
  { avatar: "https://i.pravatar.cc/50", name: "John Doe", id: "008", assetname: "Laptop", handoverdate: "1.1.2222", datesremaining: "07", category: "Electronics & IT" },
  { avatar: "https://i.pravatar.cc/50", name: "John Doe", id: "009", assetname: "Monitor", handoverdate: "1.1.2222", datesremaining: "07", category: "Electronics & IT" },
  { avatar: "https://i.pravatar.cc/50",  name: "John Doe", id: "010", assetname: "Keyboard", handoverdate: "1.1.2222", datesremaining: "07", category: "Electronics & IT" },
  { avatar: "https://i.pravatar.cc/50", name: "John Doe", id: "011", assetname: "Laptop", handoverdate: "1.1.2222", datesremaining: "07", category: "Furniture" },
  { avatar: "https://i.pravatar.cc/50", name: "John Doe", id: "012", assetname: "Pen", handoverdate: "1.1.2222", datesremaining: "07", category: "Furniture" },
  { avatar: "https://i.pravatar.cc/50",  name: "John Doe", id: "013", assetname: "Keyboard", handoverdate: "1.1.2222", datesremaining: "07", category: "Electronics & IT" },

];

const AssetRequestingUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [assets, setAssets] = useState(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  const uniqueCategories = ["All", ...new Set(initialAssets.map(asset => asset.category))];

  const filteredAssets = assets.filter(asset =>
    (filterCategory === "All" || asset.category === filterCategory) &&
    (asset.name.toLowerCase().includes(searchText.toLowerCase()) || asset.assetname.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleEditOpen = (asset) => {
    setSelectedAsset(asset);
    setEditOpen(true);
  };

  const handleDeleteOpen = (asset) => {
    setSelectedAsset(asset);
    setDeleteOpen(true);
  };

  const handleUpdateAsset = (updatedAsset) => {
    setAssets(assets.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset));
    setEditOpen(false);
  };

  const handleDeleteAsset = () => {
    setAssets(assets.filter(asset => asset.id !== selectedAsset.id));
    setDeleteOpen(false);
  };

  const handleRequestOpen = () => {
    setRequestOpen(true);
  };

  const handleRequestClose = () => {
    setRequestOpen(false);
  };

  const handleRequestSubmit = (newRequest) => {
    // Handle the new request submission logic here
    setRequestOpen(false);
  };

  return (
    <div>
      <h2>Asset Monitoring</h2>

      <div className="search-filter-section">
        <TextField
          label="Search by Name or Asset"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{ startAdornment: <Search size={20} /> }}
          className="search-bar"
        />

        <FormControl variant="outlined" size="small" className="category-dropdown">
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            label="Filter by Category"
          >
            {uniqueCategories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#1976D2", fontWeight: "bold" }}
          onClick={handleRequestOpen}
        >
          Request Asset
        </Button>
      </div>

      <MonitorTable 
        assets={filteredAssets}
        handleEditOpen={handleEditOpen}
        handleDeleteOpen={handleDeleteOpen}
      />

      <RequestButton open={requestOpen} onClose={handleRequestClose} onRequest={handleRequestSubmit} />
    </div>
  );
};

export default AssetRequestingUsers;
