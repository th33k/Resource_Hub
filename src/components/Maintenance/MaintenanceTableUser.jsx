import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";

export const MainteranceTable = ({
  maintanence

}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("name");



  const sortsedMaintanance = [...maintanence].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <>
      <Paper className="relative">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#BDE0FC", color: "#333" }}>
                <TableCell onClick={() => handleSort("name")}>User</TableCell>

                <TableCell onClick={() => handleSort("userType")}>
                  Description
                  {sortColumn === "userType" && (
                    <span>
                      {sortDirection === "asc" ? (
                        <ArrowUpward />
                      ) : (
                        <ArrowDownward />
                      )}
                    </span>
                  )}
                </TableCell>

                <TableCell onClick={() => handleSort("additionalDetails")}>
                  Priority Level
                  {sortColumn === "additionalDetails" && (
                    <span>
                      {sortDirection === "asc" ? (
                        <ArrowUpward />
                      ) : (
                        <ArrowDownward />
                      )}
                    </span>
                  )}
                </TableCell>
                <TableCell align="center">Status</TableCell>

        
              </TableRow>
            </TableHead>

            <TableBody>
              {maintanence
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={user.profilePicture}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        {user.name}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className={`px-2 py-1 text-sm `}>
                        {user.description}
                      </span>
                    </TableCell>

                    <TableCell>{user.priorityLevel}</TableCell>

                    <TableCell>
                      <div className="flex justify-center gap-2">
                        {user.status}
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
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Paper>

     
    </>
  );
};
