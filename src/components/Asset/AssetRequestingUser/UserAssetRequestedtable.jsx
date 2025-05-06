import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  useTheme,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

const getStatusColor = (status, theme) => {
  switch (status.toLowerCase()) {
    case "active":
      return {
        bg: theme.palette.mode === "dark" ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.success.light, 0.2),
        color: theme.palette.success.main,
      };
    case "inactive":
      return {
        bg: theme.palette.mode === "dark" ? alpha(theme.palette.warning.main, 0.2) : alpha(theme.palette.warning.light, 0.2),
        color: theme.palette.warning.main,
      };
    case "pending":
      return {
        bg: theme.palette.mode === "dark" ? alpha(theme.palette.info.main, 0.2) : alpha(theme.palette.info.light, 0.2),
        color: theme.palette.info.main,
      };
    case "accepted":
      return {
        bg: theme.palette.mode === "dark" ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.success.light, 0.2),
        color: theme.palette.success.main,
      };
    case "rejected":
      return {
        bg: theme.palette.mode === "dark" ? alpha(theme.palette.error.main, 0.2) : alpha(theme.palette.error.light, 0.2),
        color: theme.palette.error.main,
      };
    default:
      return {
        bg: theme.palette.mode === "dark" ? alpha(theme.palette.grey[600], 0.2) : alpha(theme.palette.grey[400], 0.2),
        color: theme.palette.text.secondary,
      };
  }
};

const MonitorTable = ({
  assets,
  showHandoverColumns = true,
  customColumns = [],
}) => {
  const theme = useTheme();

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
            <TableCell>Status</TableCell>
            <TableCell>Category</TableCell>
            {customColumns.map((col, index) => (
              <TableCell key={`head-${index}`}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => {
            const statusStyle = getStatusColor(asset.status, theme);

            return (
              <TableRow key={asset.requestedasset_id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={asset.profile_picture_url || "https://i.pravatar.cc/50"}
                      alt={asset.username}
                    />
                    {asset.username}
                  </div>
                </TableCell>
                <TableCell>{asset.asset_id}</TableCell>
                <TableCell>{asset.asset_name}</TableCell>
                {showHandoverColumns && <TableCell>{asset.handover_date}</TableCell>}
                {showHandoverColumns && <TableCell>{asset.remaining_days}</TableCell>}
                <TableCell>
                  <Chip
                    label={asset.status}
                    size="small"
                    sx={{
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: "24px",
                    }}
                  />
                </TableCell>
                <TableCell>{asset.category}</TableCell>
                {customColumns.map((col, index) => (
                  <TableCell key={`row-${index}`}>{col.render(asset)}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonitorTable;
