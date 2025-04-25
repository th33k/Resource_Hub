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

const AssetMonitoringAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedCategory = location.state?.category || "All";

  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState(passedCategory);
  const [assets, setAssets] = useState([]);

  const uniqueCategories = ["All", ...new Set(assets.map(asset => asset.category))];

  useEffect(() => {
    const fetchAssets = async () => {
      const userId = localStorage.getItem("Userid");
      const response = await fetch(`http://localhost:9090/assetrequest/details/${userId}`);
      const data = await response.json();
      setAssets(data);
    };
    fetchAssets();
  }, []);

  useEffect(() => {
    setFilterCategory(passedCategory);
  }, [passedCategory]);

  const handleCategoryChange = (newCategory) => {
    setFilterCategory(newCategory);
    if (newCategory === "All") {
      navigate("/admin-AssetMonitoring", { state: { category: "All" } });
    } else {
      navigate("/admin-AssetMonitoring", { state: { category: newCategory } });
    }
  };

  const filteredAssets = assets.filter(asset =>
    (filterCategory === "All" || asset.category === filterCategory) &&
    (asset.username.toLowerCase().includes(searchText.toLowerCase()) ||
     asset.asset_name.toLowerCase().includes(searchText.toLowerCase()))
  );

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
      />
    </div>
  );
};

export default AssetMonitoringAdmin;
