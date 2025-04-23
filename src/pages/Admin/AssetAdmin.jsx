import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetTable from "../../components/Asset/AssetTable";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { UserPlus, Search } from "lucide-react";
import EditAssetPopup from "../../components/Asset/AssetEdit";
import DeleteAssetPopup from "../../components/Asset/AssetDelete";
import "../css/AssetAdmin.css";

function AssetAdmin() {

  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addAssetOpen, setAddAssetOpen] = useState(false);
  const [assets, setAssets] = useState([]);

  // Fetch asset data from API on load
  useEffect(() => {
    axios
      .get("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/v1.0/details")
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

  const handleDeleteAsset = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/asset/details/${id}`);
      setAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
      setDeleteOpen(false);
      setSelectedAsset(null);
      alert("Asset deleted successfully");
    } catch (error) {
      console.error("Error deleting asset:", error);
      alert("Failed to delete asset");
    }
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
            onDelete={handleDeleteAsset}
          />
        </>
      )}

      {/* ✅ Add Asset Dialog Component */}
      <AssetAdd
        open={addAssetOpen}
        onClose={() => setAddAssetOpen(false)}
        onAdd={fetchAssets} // Refresh asset list after addition
      />
    </>
  );
}

export default AssetAdmin;
