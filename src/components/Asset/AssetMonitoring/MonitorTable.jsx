import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";

const MonitorTable = ({
  assets,
  handleEditOpen,
  handleDeleteOpen,
  showHandoverColumns = true,
  customColumns = [],
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Asset ID</TableCell>
            <TableCell>Asset</TableCell>
            {showHandoverColumns && <TableCell>Handover Date</TableCell>}
            {showHandoverColumns && <TableCell>Days Remaining</TableCell>}
            <TableCell>Category</TableCell>
            {customColumns.map((col, index) => (
              <TableCell key={`head-${index}`}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={asset.avatar || "https://i.pravatar.cc/50"}
                    alt={asset.name}
                  />
                  {asset.name}
                </div>
              </TableCell>
              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.assetname}</TableCell>
              {showHandoverColumns && <TableCell>{asset.handoverdate}</TableCell>}
              {showHandoverColumns && <TableCell>{asset.datesremaining}</TableCell>}
              <TableCell>{asset.category}</TableCell>
              {customColumns.map((col, index) => (
                <TableCell key={`row-${index}`}>{col.render(asset)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonitorTable;
