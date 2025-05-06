import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import html2pdf from "html2pdf.js";
import { BASE_URLS } from '../../services/api/config';
import { toast } from "react-toastify";

// Component to display meal events table
const MaintenanceTable = () => {
  const [Maintenance, setmaintenance] = useState([""]);

  // Fetch data from the API
  useEffect(() => {
    fetch(`${BASE_URLS.maintenance}/details`)
      .then((response) => response.json())
      .then((data) => setmaintenance(data))
      .catch((error) => console.error("Error fetching maintenance:", error));
  }, []);

  // Function to download the table as PDF
  const handleDownloadPDF = () => {
    try {
      const element = document.getElementById("maintenance-table"); // Get the content to convert to PDF
      const options = {
        margin: 1,
        filename: "MaintenanceReport.pdf", // Set the filename of the PDF
        image: { type: "jpeg", quality: 0.98 }, // Set image quality
        html2canvas: { scale: 2 }, // Set the scale for the canvas
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }, // Set PDF size and orientation
      };
      html2pdf().from(element).set(options).save(); // Convert and download the PDF
      toast.success("Maintenance report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading maintenance report:", error);
      toast.error("Failed to download maintenance report.");
    }
  };

  if (!Array.isArray(Maintenance) || Maintenance.length === 0) {
    return (
      <TableContainer component={Paper} id="maintenance-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Maintenance ID</TableCell>
              <TableCell align="center">User ID</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Priority Level</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Request Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                No data available.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <div>
     
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadPDF}
        style={{ marginBottom: 20, float: "right" }}
      >
        Download PDF
      </Button>

      {/* Table Container */}
      <TableContainer component={Paper} id="maintenance-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Maintenance ID</TableCell>
              <TableCell align="center">User ID</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Priority Level</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Request Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Maintenance.map((maintenance, index) => (
              <TableRow key={index}>
                <TableCell align="center">{maintenance.maintenance_id}</TableCell>
                <TableCell align="center">{maintenance.user_id}</TableCell>
                <TableCell align="center">{maintenance.description}</TableCell>
                <TableCell align="center">{maintenance.priorityLevel}</TableCell>
                <TableCell align="center">{maintenance.status}</TableCell>
                <TableCell align="center">{maintenance.submitted_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MaintenanceTable;