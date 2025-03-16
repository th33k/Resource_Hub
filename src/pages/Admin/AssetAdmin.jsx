import React, { useState, useEffect } from "react";
import AssetTable from "../../components/Asset/AssetTable";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { UserPlus, Search } from "lucide-react";
import EditAssetPopup from "../../components/Asset/AssetEdit"; 
import DeleteAssetPopup from "../../components/Asset/AssetDelete"; 
import '../css/AssetAdmin.css';

function AssetAdmin() {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addAssetOpen, setAddAssetOpen] = useState(false); // State for Add Asset Popup
  const [newAsset, setNewAsset] = useState({
    name: "",
    category: "Electronics & IT",
    quantity: 0,
    condition: "Good",
    location: "",
  });
  const [assets, setAssets] = useState([]); // State to store assets from the API

  // Fetch asset data from the API
  useEffect(() => {
    fetch('http://localhost:9090/asset/details')
      .then(response => response.json())
      .then(data => setAssets(data))
      .catch(error => console.error('Error fetching assets:', error));
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get unique categories for filtering
  const uniqueCategories = ["All", ...new Set(assets.map(asset => asset.category))];

  // Filter assets based on category or search
  const filteredAssets = assets.filter(asset => 
    (filterCategory === "All" || asset.category === filterCategory) &&
    asset.asset_name.toLowerCase().includes(searchText.toLowerCase())
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
    const updatedAssets = assets.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset);
    setAssets(updatedAssets);
    setSelectedAsset(null);
    setEditOpen(false);
  };

  const handleDeleteAsset = (id) => {
    const updatedAssets = assets.filter(asset => asset.id !== id);
    setAssets(updatedAssets);
    setSelectedAsset(null);
    setDeleteOpen(false);
  };

  // Handle adding a new asset
  const handleAddAsset = () => {
    fetch('http://localhost:9090/asset/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAsset),
    })
    .then(response => response.json())
    .then(data => {
      setAssets([...assets, data]);
      setAddAssetOpen(false);
      setNewAsset({
        name: "",
        category: "Electronics & IT",
        quantity: 0,
        condition: "Good",
        location: "",
      });
    })
    .catch(error => console.error('Error adding asset:', error));
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Assets</h1>
      </div>
      <div className="search-filter-section">
        <div className="search-filter-container">
          <TextField
            label="Search"
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
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Add New Asset Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<UserPlus size={20} />}
          className="add-asset-btn"
          onClick={() => setAddAssetOpen(true)} // Open the Add Asset modal
        >
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

      {/* Add New Asset Dialog */}
      <Dialog open={addAssetOpen} onClose={() => setAddAssetOpen(false)}>
        <DialogTitle>Add New Asset</DialogTitle>
        <DialogContent>
          <TextField
            label="Asset Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAsset.name}
            onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
          />
          <FormControl fullWidth variant="outlined" size="small" margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={newAsset.category}
              onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
              label="Category"
            >
              {uniqueCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={newAsset.quantity}
            onChange={(e) => setNewAsset({ ...newAsset, quantity: e.target.value })}
          />
          <TextField
            label="Condition"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAsset.condition}
            onChange={(e) => setNewAsset({ ...newAsset, condition: e.target.value })}
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAsset.location}
            onChange={(e) => setNewAsset({ ...newAsset, location: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddAssetOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddAsset} color="primary">
            Add Asset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AssetAdmin;
