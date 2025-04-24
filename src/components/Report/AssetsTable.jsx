import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import html2pdf from "html2pdf.js";

// Component to display meal events table
const AssetsTable = () => {
  const [Assets, setassets] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/asset-e99/v1.0/details")
      .then((response) => response.json())
      .then((data) => setassets(data))
      .catch((error) => console.error("Error fetching meal events:", error));
  }, []);

  // Function to download the table as PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById("asset-table"); // Get the content to convert to PDF
    const options = {
      filename: "assets.pdf", // Set the filename of the PDF
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
      <TableContainer component={Paper} id="asset-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Condition Type</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Assets.map((Assets, index) => (
              <TableRow key={index}>
                <TableCell>{Assets.asset_name}</TableCell>
                <TableCell>{Assets.category}</TableCell>
                <TableCell>{Assets.quantity}</TableCell>
                <TableCell>{Assets.condition_type}</TableCell>
                <TableCell>{Assets.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AssetsTable;