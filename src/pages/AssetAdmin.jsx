import React, { useState } from "react";
import AssetTable from "../components/Asset/AssetTable";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { UserPlus, Search } from "lucide-react";
import EditAssetPopup from "../components/Asset/AssetEdit"; 
import DeleteAssetPopup from "../components/Asset/AssetDelete"; 
import './css/AssetAdmin.css';

const initialAssets = [
  { id: 1, name: "Laptop", category: "Electronics & IT", quantity: 10, condition: "Good", location: "Office" },
  { id: 2, name: "Projector", category: "Electronics & IT", quantity: 2, condition: "Excellent", location: "Conference Room" },
  { id: 3, name: "Marker Pens", category: "Stationery", quantity: 3, condition: "Average", location: "IT Room" },
  { id: 4, name: "White Board", category: "Furniture", quantity: 1, condition: "Good", location: "Meeting Room" },
  { id: 5, name: "Phone", category: "Electronics & IT", quantity: 5, condition: "New", location: "Reception" }
];

function AssetAdmin() {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Get unique categories for filtering
  const uniqueCategories = ["All", ...new Set(initialAssets.map(asset => asset.category))];

  // Filter assets based on category or search
  const filteredAssets = initialAssets.filter(asset => 
    (filterCategory === "All" || asset.category === filterCategory) &&
    asset.name.toLowerCase().includes(searchText.toLowerCase())
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
    // Update the asset in the list
    const updatedAssets = filteredAssets.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset);
    // Reset selected asset and close the edit dialog
    setSelectedAsset(null);
    setEditOpen(false);
  };

  const handleDeleteAsset = (id) => {
    // Delete the asset from the list
    const updatedAssets = filteredAssets.filter(asset => asset.id !== id);
    // Reset selected asset and close the delete dialog
    setSelectedAsset(null);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Asset Management</h1>
      </div>

      <div className="search-filter-section">
        {/* Search & Filter Section */}
        <div className="search-filter-container">
          {/* Search Bar */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{ startAdornment: <Search size={20} /> }}
            className="search-bar"
          />

          {/* Filter by Category Dropdown */}
          <FormControl variant="outlined" size="small" className="category-dropdown">
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              label="Filter by Category"
            >
              {uniqueCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Add New Asset Button */}
        <Button variant="contained" color="primary" startIcon={<UserPlus size={20} />} className="add-asset-btn">
          Add New Asset
        </Button>
      </div>

      <div className="table-container">
        <AssetTable 
          assets={filteredAssets} 
          handleEditOpen={handleEditOpen} 
          handleDeleteOpen={handleDeleteOpen} 
        />
      </div>

      {/* Edit and Delete Popups */}
      {selectedAsset && (
        <>
          <EditAssetPopup 
            open={editOpen} 
            asset={selectedAsset} 
            onClose={() => setEditOpen(false)} 
            onUpdate={handleUpdateAsset} 
          />
          <DeleteAssetPopup 
            open={deleteOpen} 
            asset={selectedAsset} 
            onClose={() => setDeleteOpen(false)} 
            onDelete={handleDeleteAsset} 
          />
        </>
      )}
    </>
  );
}

export default AssetAdmin;
