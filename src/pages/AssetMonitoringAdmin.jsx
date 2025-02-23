import React, { useState } from "react";
import MonitorTable from "../components/Asset/AssetMonitoring/MonitorTable";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Search } from "lucide-react";
import EditAssetPopup from "../components/Asset/AssetEdit";
import DeleteAssetPopup from "../components/Asset/AssetDelete";
import "./css/AssetAdmin.css";

const initialAssets = [
  { avatar: "https://i.pravatar.cc/50", name: "John Doe", id: "008", assetname: "Laptop", handoverdate: "1.1.2222", datesremaining: "07", category: "Electronics & IT" },
  { avatar: "https://randomuser.me/api/portraits/men/1.jpg", name: "Jane Smith", id: "009", assetname: "Monitor", handoverdate: "1.1.2222", datesremaining: "07", category: "Electronics & IT" },
  { avatar: "https://randomuser.me/api/portraits/men/1.jpg", name: "John Doe", id: "010", assetname: "Keyboard", handoverdate: "1.1.2222", datesremaining: "07", category: "Electronics & IT" },
];

const AssetMonitoringAdmin = () => {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [assets, setAssets] = useState(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
      </div>

      <MonitorTable 
        assets={filteredAssets}
        handleEditOpen={handleEditOpen}
        handleDeleteOpen={handleDeleteOpen}
      />

      {selectedAsset && (
        <>
          <EditAssetPopup open={editOpen} asset={selectedAsset} onClose={() => setEditOpen(false)} onUpdate={handleUpdateAsset} />
          <DeleteAssetPopup open={deleteOpen} asset={selectedAsset} onClose={() => setDeleteOpen(false)} onDelete={handleDeleteAsset} />
        </>
      )}
    </div>
  );
};

export default AssetMonitoringAdmin;
