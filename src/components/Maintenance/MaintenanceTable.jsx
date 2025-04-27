import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
  TablePagination,
} from "@mui/material";
import { Pencil, Trash2,SendHorizontal } from "lucide-react";
import { EditMaintenance } from "./EditMaintenancePopup.jsx";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog.jsx";

export const MaintenanceTable = ({ maintenance, onEditMaintenance, onDeleteMaintenance }) => {
  const [editMaintenance, setEditMaintenance] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#BDE0FC" }}>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority Level</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {maintenance
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.priorityLevel}</TableCell>
                    <TableCell align="center">{item.status}</TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center gap-2">
                        <Tooltip title="Edit Maintenance">
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<Pencil size={20} />}
                            onClick={() => setEditMaintenance(item)}
                          >
                            Edit
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete Maintenance">
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Trash2 size={20} />}
                            onClick={() => {
                              setSelectedId(item.id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </Button>
                        </Tooltip>
                        <Tooltip title="Send Maintenance">
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<SendHorizontal size={20} />}
                            // onClick={() => setEditMaintenance(item)}
                          >
                            Send
                          </Button>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={maintenance.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      {editMaintenance && (
        <EditMaintenance
          maintenance={editMaintenance}
          open={!!editMaintenance}
          onClose={() => setEditMaintenance(null)}
          onSave={(editedMaintenance) => {
            onEditMaintenance(editedMaintenance);
            setEditMaintenance(null);
          }}
        />
      )}

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          onDeleteMaintenance(selectedId);
          setIsDeleteDialogOpen(false);
        }}
      />
    </>
  );
};