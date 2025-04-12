import React, { useState, useEffect } from "react";
import AssetTable from "../../components/Asset/AssetTable";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";
import { UserPlus, Search } from "lucide-react";
import AssetEdit from "../../components/Asset/AssetEdit";
import AssetDelete from "../../components/Asset/AssetDelete";
import AssetAdd from "../../components/Asset/AssetAdd";
import "../css/AssetAdmin.css";

function AssetAdmin() {
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
  const [assets, setAssets] = useState([]);

  const fetchAssets = () => {
    fetch("http://localhost:9090/asset/details")
      .then((response) => response.json())
      .then((data) => setAssets(data))
      .catch((error) => console.error("Error fetching assets:", error));
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const uniqueCategories = ["All", ...new Set(assets.map((asset) => asset.category))];

  const filteredAssets = assets.filter(
    (asset) =>
      (filterCategory === "All" || asset.category === filterCategory) &&
      asset.name.toLowerCase().includes(searchText.toLowerCase()) // fixed here
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
    const updatedAssets = assets.map((asset) =>
      asset.id === updatedAsset.id ? updatedAsset : asset
    );
    setAssets(updatedAssets);
    setSelectedAsset(null);
    setEditOpen(false);
  };

  const handleDeleteAsset = (id) => {
    const updatedAssets = assets.filter((asset) => asset.id !== id);
    setAssets(updatedAssets);
    setSelectedAsset(null);
    setDeleteOpen(false);
  };

  const handleAddAsset = () => {
    fetch("http://localhost:9090/asset/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAsset),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Added asset:", data);
        // Option 1: Push new asset to list (if it has id and all info)
        // setAssets([...assets, data]);

        // Option 2: Safely re-fetch all assets
        fetchAssets();

        setAddAssetOpen(false);
        setNewAsset({
          name: "",
          category: "Electronics & IT",
          quantity: 0,
          condition: "Good",
          location: "",
        });
      })
      .catch((error) => console.error("Error adding asset:", error));
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
          <AssetEdit
            open={editOpen}
            asset={selectedAsset}
            onClose={() => setEditOpen(false)}
            onUpdate={handleUpdateAsset}
          />
          <AssetDelete
            open={deleteOpen}
            asset={selectedAsset}
            onClose={() => setDeleteOpen(false)}
            onDelete={handleDeleteAsset}
          />
        </>
      )}

      <AssetAdd
        open={addAssetOpen}
        onClose={() => setAddAssetOpen(false)}
        onAdd={handleAddAsset}
        newAsset={newAsset}
        setNewAsset={setNewAsset}
      />
    </>
  );
}

export default AssetAdmin;
