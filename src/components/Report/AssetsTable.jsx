import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import html2pdf from "html2pdf.js";
import { BASE_URLS } from '../../services/api/config';
import { toast } from "react-toastify";

// Component to display meal events table
const AssetsTable = () => {
  const [Assets, setassets] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch(`${BASE_URLS.asset}/details`)
      .then((response) => response.json())
      .then((data) => setassets(data))
      .catch((error) => console.error("Error fetching meal events:", error));
  }, []);

  // Function to download the table as PDF
  const handleDownloadPDF = () => {
    try {
      const element = document.getElementById("asset-table"); // Get the content to convert to PDF
      const options = {
        filename: "assets.pdf", // Set the filename of the PDF
        image: { type: "jpeg", quality: 0.98 }, // Set image quality
        html2canvas: { scale: 2 }, // Set the scale for the canvas
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // Set PDF size and orientation
      };
      html2pdf().from(element).set(options).save(); // Convert and download the PDF
      toast.success("Assets report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading assets report:", error);
      toast.error("Failed to download assets report.");
    }
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