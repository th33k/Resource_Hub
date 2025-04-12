import React, { useState, useEffect } from "react";
import MonitorTable from "../../components/Asset/AssetMonitoring/MonitorTable";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Search } from "lucide-react";
import EditAssetPopup from "../../components/Asset/AssetEdit";
import DeleteAssetPopup from "../../components/Asset/AssetDelete";

const initialAssets = [
  { avatar: "https://i.pravatar.cc/50", name: "John Doe", id: "008", assetname: "Laptop", handoverdate: "1.1.2222", datesremaining: "07", category: "Electronics & IT" },
  { avatar: "https://randomuser.me/api/portraits/men/1.jpg", name: "Jane Smith", id: "009", assetname: "Monitor", handoverdate: "1.1.2222", datesremaining: "07", category: "Electronics & IT" },
  { avatar: "https://randomuser.me/api/portraits/men/1.jpg", name: "John Doe", id: "010", assetname: "Keyboard", handoverdate: "1.1.2222", datesremaining: "07", category: "Electronics & IT" },
  { avatar: "https://i.pravatar.cc/50", name: "John Doe", id: "011", assetname: "Pencil", handoverdate: "1.1.2222", datesremaining: "07", category: "Stationary" },
  { avatar: "https://i.pravatar.cc/50", name: "Jane Doe", id: "012", assetname: "Drill", handoverdate: "1.1.2222", datesremaining: "07", category: "Machines" },
  { avatar: "https://i.pravatar.cc/50", name: "Mike Smith", id: "013", assetname: "Chair", handoverdate: "1.1.2222", datesremaining: "07", category: "Furniture" },
  { avatar: "https://i.pravatar.cc/50", name: "Sarah Johnson", id: "014", assetname: "Screwdriver", handoverdate: "1.1.2222", datesremaining: "07", category: "Maintenance Tools" },
  { avatar: "https://i.pravatar.cc/50", name: "David Brown", id: "015", assetname: "Whiteboard", handoverdate: "1.1.2222", datesremaining: "07", category: "Extra Items" },
];

const AssetMonitoringAdmin = () => {
  const { category } = useParams(); // From URL
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [assets, setAssets] = useState(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const uniqueCategories = ["All", ...new Set(initialAssets.map(asset => asset.category))];

  // Apply URL param as category filter
  useEffect(() => {
    if (category) {
      const decodedCategory = decodeURIComponent(category);
      setFilterCategory(decodedCategory);
    } else {
      setFilterCategory("All");
    }
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setFilterCategory(newCategory);
    if (newCategory === "All") {
      navigate("/admin-AssetMonitoring");
    } else {
      navigate(`/admin-AssetMonitoring/${encodeURIComponent(newCategory)}`);
    }
  };

  const filteredAssets = assets.filter(asset =>
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

  const handleUpdateAsset = (updatedAsset) => {
    setAssets(prev =>
      prev.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset)
    );
    setEditOpen(false);
  };

  const handleDeleteAsset = () => {
    setAssets(prev => prev.filter(asset => asset.id !== selectedAsset.id));
    setDeleteOpen(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        Asset Monitoring {filterCategory !== "All" && `: ${filterCategory}`}
      </h2>

      <div className="search-filter-section" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <TextField
          label="Search by Name or Asset"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{ startAdornment: <Search size={20} /> }}
          style={{ flex: 1 }}
        />

        <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            label="Filter by Category"
          >
            {uniqueCategories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
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
    </div>
  );
};

export default AssetMonitoringAdmin;
