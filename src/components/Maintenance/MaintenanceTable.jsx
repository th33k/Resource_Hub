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
import { Pencil, Trash2, Send } from "lucide-react";
import { EditMaintenance } from "./EditMaintenancePopup";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const MainteranceTable = ({ maintanence, onEditMaintanance, onDeleteMaintanance }) => {
  const [selected, setSelected] = useState([]);
  const [editMaintenance, setEditMaintenance] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDelete = async () => {
    try {
      if (!selected.length) {
        toast.error("No maintenance selected for deletion.");
        return;
      }

      await Promise.all(
        selected.map((id) =>
          axios.delete(`http://localhost:9090/maintenance/details/${id}`)
        )
      );

      toast.success("Maintenance deleted successfully!");
      onDeleteMaintanance(selected);
    } catch (error) {
      console.error("Failed to delete maintenance:", error);
      toast.error("Failed to delete maintenance!");
    } finally {
      setSelected([]);
      setIsDeleteDialogOpen(false);
    }
  };

  const sendMaintanence = (maintenance) => {
    toast.success("Sent Successfully!");
  };

  return (
    <>
      <Paper className="relative">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#BDE0FC", color: "#333" }}>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority Level</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {maintanence
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((maintenance) => (
                  <TableRow key={maintenance.id} hover>
                    <TableCell>{maintenance.name}</TableCell>
                    <TableCell>{maintenance.description}</TableCell>
                    <TableCell>{maintenance.priorityLevel}</TableCell>
                    <TableCell align="center">{maintenance.status}</TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center gap-2">
                        <Tooltip title="Edit Maintenance">
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<Pencil size={20} />}
                            onClick={() => setEditMaintenance(maintenance)}
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
                              setSelected([maintenance.id]);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </Button>
                        </Tooltip>

                        <Tooltip title="Send">
                          <Button
                            variant="outlined"
                            color="success"
                            startIcon={<Send size={20} />}
                            onClick={() => sendMaintanence(maintenance)}
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
          count={maintanence.length}
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
            onEditMaintanance(editedMaintenance);
            setEditMaintenance(null);
          }}
        />
      )}

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        userCount={selected.length}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
      <ToastContainer />
    </>
  );
};