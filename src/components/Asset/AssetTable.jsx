import React, { useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton 
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// Sample Asset Data
const initialAssets = [
  { id: 1, name: "Laptop", quantity: 10, condition: "Good", location: "Office" },
  { id: 2, name: "Projector", quantity: 2, condition: "Excellent", location: "Conference Room" },
  { id: 3, name: "Printer", quantity: 3, condition: "Average", location: "IT Room" }
];

function AssetTable() {
  const [assets, setAssets] = useState(initialAssets);

  // Handle Delete
  const handleDelete = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  // Handle Edit (Placeholder for now)
  const handleEdit = (id) => {
    alert(`Edit asset with ID: ${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell><strong>Asset Name</strong></TableCell>
            <TableCell><strong>Quantity</strong></TableCell>
            <TableCell><strong>Condition</strong></TableCell>
            <TableCell><strong>Location</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.quantity}</TableCell>
              <TableCell>{asset.condition}</TableCell>
              <TableCell>{asset.location}</TableCell>
              <TableCell>
                {/* Edit Button */}
                <Button sx={{mr:'10px',marginRight:'10px'}} color="primary" variant="outlined" onClick={() => handleEdit(asset.id)}>
                  Edit <Edit />
                </Button>
                {/* Delete Button */}
                <Button color="error" sx={{marginLeft:'10px'}} variant="outlined" onClick={() => handleDelete(asset.id)}>
                 Delete <Delete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AssetTable;
