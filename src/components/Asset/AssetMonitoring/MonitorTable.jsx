import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from "@mui/material";

const MonitorTable = ({ assets, handleEditOpen, handleDeleteOpen }) => {
  console.log("Assets Data:", assets); // Debugging step

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Asset ID</TableCell>
            <TableCell>Asset</TableCell>
            <TableCell>Handover Date</TableCell>
            <TableCell>Days Remaining</TableCell>
            <TableCell>Category</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>
                      <div className="flex items-center gap-3">
                      <Avatar src={asset.avatar || "https://i.pravatar.cc/50"} alt={asset.name} />
                      {asset.name}
                      </div>
                    </TableCell>
              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.assetname}</TableCell>
              <TableCell>{asset.handoverdate}</TableCell>
              <TableCell>{asset.datesremaining}</TableCell>
              <TableCell>{asset.category}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonitorTable;
