import React, { useState, useEffect } from "react";
import MonitorTable from "../../../components/Asset/Asset Requesting User/UserAssetRequestedtable";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Search } from "lucide-react";
import RequestButton from "../../../components/Asset/Asset Requesting User/RequestButton";

const AssetMonitoringAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedCategory = location.state?.category || "All";

  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState(passedCategory);
  const [assets, setAssets] = useState([]);
  const [requestOpen, setRequestOpen] = useState(false);

  const uniqueCategories = ["All", ...new Set(assets.map(asset => asset.category))];

  // Fetch assets
  const fetchAssets = async () => {
    const userId = localStorage.getItem("Userid");
    const response = await fetch(`http://localhost:9090/assetrequest/details/${userId}`);
    const data = await response.json();
    setAssets(data);
  };

  useEffect(() => {
    fetchAssets(); // Initial fetch when the component mounts
  }, []);

  useEffect(() => {
    setFilterCategory(passedCategory); // Update filter category based on URL state
  }, [passedCategory]);

  const handleCategoryChange = (newCategory) => {
    setFilterCategory(newCategory);
    navigate("/admin-AssetMonitoring", { state: { category: newCategory } });
  };

  const filteredAssets = assets.filter(asset =>
    (filterCategory === "All" || asset.category === filterCategory) &&
    (asset.username.toLowerCase().includes(searchText.toLowerCase()) ||
     asset.asset_name.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleRequestOpen = () => setRequestOpen(true);
  const handleRequestClose = () => setRequestOpen(false);

  const handleRequestSubmit = () => {
    // Re-fetch the asset data after the request is made
    fetchAssets(); // Ensure the list is updated
    setRequestOpen(false); // Close the request dialog
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        Asset Monitoring {filterCategory !== "All" && `: ${filterCategory}`}
      </h2>

      <div className="search-filter-section" style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
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

        <Button
          variant="contained"
          color="primary"
          onClick={handleRequestOpen}
          style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
        >
          Request Asset
        </Button>
      </div>

      <MonitorTable assets={filteredAssets} />

      <RequestButton
        open={requestOpen}
        onClose={handleRequestClose}
        onRequest={handleRequestSubmit} // Pass the refetch function to RequestButton
      />
    </div>
  );
};

export default AssetMonitoringAdmin;
