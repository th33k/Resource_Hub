import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import html2pdf from "html2pdf.js";

// Component to display meal events table
const MealEventsTable = () => {
  const [mealEvents, setMealEvents] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch("http://localhost:9090/calander/mealevents")
      .then((response) => response.json())
      .then((data) => setMealEvents(data))
      .catch((error) => console.error("Error fetching meal events:", error));
  }, []);

  // Function to download the table as PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById("meal-events-table"); // Get the content to convert to PDF
    const options = {
      filename: "meal_events.pdf", // Set the filename of the PDF
      image: { type: "jpeg", quality: 0.98 }, // Set image quality
      html2canvas: { scale: 2 }, // Set the scale for the canvas
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // Set PDF size and orientation
    };
    html2pdf().from(element).set(options).save(); // Convert and download the PDF
  };

  return (
    <div>
      {/* Download PDF Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadPDF}
        style={{ marginBottom: 20, float: "right" }}
      >
        Download PDF
      </Button>

      {/* Table Container */}
      <TableContainer component={Paper} id="meal-events-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Meal Time</TableCell>
              <TableCell>Meal Type</TableCell>
              <TableCell>User name</TableCell>
              <TableCell>Submitted Date</TableCell>
              <TableCell>Meal Request Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mealEvents.map((mealEvent, index) => (
              <TableRow key={index}>
                <TableCell>{mealEvent.meal_time}</TableCell>
                <TableCell>{mealEvent.meal_type}</TableCell>
                <TableCell>{mealEvent.username}</TableCell>
                <TableCell>{mealEvent.submitted_date}</TableCell>
                <TableCell>{mealEvent.meal_request_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MealEventsTable;
