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
                    src={asset.profile_picture_url || "https://i.pravatar.cc/50"}
                    alt={asset.username}
                  />
                  {asset.username} {/* Updated from asset.name */}
                </div>
              </TableCell>
              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.asset_name}</TableCell> {/* Updated field name */}
              {showHandoverColumns && <TableCell>{asset.handover_date}</TableCell>} {/* Updated field name */}
              {showHandoverColumns && <TableCell>{asset.remaining_days}</TableCell>} {/* Updated field name */}
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
