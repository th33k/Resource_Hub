import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetTable from "../../components/Asset/AssetTable";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { UserPlus, Search } from "lucide-react";
import EditAssetPopup from "../../components/Asset/AssetEdit";
import DeleteAssetPopup from "../../components/Asset/AssetDelete";
import "../css/AssetAdmin.css";

function AssetAdmin() {
  const [assets, setAssets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addAssetOpen, setAddAssetOpen] = useState(false);

  const [newAsset, setNewAsset] = useState({
    name: "",
    category: "Electronics & IT",
    quantity: 0,
    condition: "Good",
    location: "",
  });

  // Fetch asset data from API on load
  useEffect(() => {
    axios
      .get("http://localhost:9090/asset/details")
      .then((res) => {
        const formattedAssets = res.data.map((asset) => ({
          id: asset.id,
          name: asset.asset_name,
          category: asset.category,
          quantity: asset.quantity,
          condition: asset.condition_type,
          location: asset.location,
        }));
        setAssets(formattedAssets);
      })
      .catch((err) => console.error("Error fetching assets:", err));
  }, []);

  const uniqueCategories = ["All", ...new Set(assets.map((a) => a.category))];

  const filteredAssets = assets.filter((asset) =>
    (filterCategory === "All" || asset.category === filterCategory) &&
    asset.name?.toLowerCase().includes(searchText.toLowerCase())
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
    setAssets((prev) =>
      prev.map((a) => (a.id === updatedAsset.id ? updatedAsset : a))
    );
    setEditOpen(false);
  };

  const handleDeleteAsset = (id) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
    setDeleteOpen(false);
  };

  const handleAddAsset = () => {
    const assetWithId = {
      ...newAsset,
      id: Date.now(), // Local only – replace with real API POST if needed
    };
    setAssets([...assets, assetWithId]);
    setAddAssetOpen(false);
    setNewAsset({
      name: "",
      category: "Electronics & IT",
      quantity: 0,
      condition: "Good",
      location: "",
    });
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

        <Button
          variant="contained"
          color="primary"
          startIcon={<UserPlus size={20} />}
          className="add-asset-btn"
          onClick={() => setAddAssetOpen(true)}
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
            onDelete={() => handleDeleteAsset(selectedAsset.id)}
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
            onChange={(e) =>
              setNewAsset({ ...newAsset, quantity: parseInt(e.target.value) })
            }
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
