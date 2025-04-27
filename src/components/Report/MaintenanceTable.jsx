import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import html2pdf from "html2pdf.js";

// Component to display meal events table
const MaintenanceTable = () => {
  const [Maintenance, setmaintenance] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/maintenance-f9f/v1.0/details")
      .then((response) => response.json())
      .then((data) => setmaintenance(data))
      .catch((error) => console.error("Error fetching maintenance:", error));
  }, []);

  // Function to download the table as PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById("maintenance-table"); // Get the content to convert to PDF
    const options = {
      filename: "maintenance.pdf", // Set the filename of the PDF
      image: { type: "jpeg", quality: 0.98 }, // Set image quality
      html2canvas: { scale: 2 }, // Set the scale for the canvas
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // Set PDF size and orientation
    };
    html2pdf().from(element).set(options).save(); // Convert and download the PDF
  };

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
              <TableCell>Maintenance ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Priority Level</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Request Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Maintenance.map((maintenance, index) => (
              <TableRow key={index}>
                <TableCell>{maintenance.id}</TableCell>
                <TableCell>{maintenance.user_id}</TableCell>
                <TableCell>{maintenance.description}</TableCell>
                <TableCell>{maintenance.priority_level}</TableCell>
                <TableCell>{maintenance.status}</TableCell>
                <TableCell>{maintenance.request_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MaintenanceTable;