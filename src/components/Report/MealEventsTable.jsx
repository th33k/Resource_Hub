import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import html2pdf from "html2pdf.js";

const MealEventsTable = () => {
  const [mealEvents, setMealEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [mealTimes, setMealTimes] = useState([]);
  const [mealTypes, setMealTypes] = useState([]); // Store meal types from API
  const [selectedMealTime, setSelectedMealTime] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Fetch meal events
  useEffect(() => {
    fetch("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/calander-7e9/v1.0/mealevents")
      .then((response) => response.json())
      .then((data) => {
        setMealEvents(data);
        setFilteredEvents(data);
      })
      .catch((error) => console.error("Error fetching meal events:", error));
  }, []);

  // Fetch meal times from API
  useEffect(() => {
    fetch("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/mealtime-481/v1.0/details")
      .then((response) => response.json())
      .then((data) => {
        const mealNames = data.map((meal) => ({
          id: meal.id,
          name: meal.mealName,
        }));
        setMealTimes(mealNames);
      })
      .catch((error) => console.error("Error fetching meal times:", error));
  }, []);

  // Fetch meal types from API
  useEffect(() => {
    fetch("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/mealtype-899/v1.0/details")
      .then((response) => response.json())
      .then((data) => {
        const mealTypeList = data.map((type) => ({
          id: type.id,
          name: type.mealName,
        }));
        setMealTypes(mealTypeList);
      })
      .catch((error) => console.error("Error fetching meal types:", error));
  }, []);

  // Filter events based on selected values
  useEffect(() => {
    let filtered = mealEvents;

    if (selectedMealTime) {
      filtered = filtered.filter((event) => event.meal_time === selectedMealTime);
    }
    if (selectedMealType) {
      filtered = filtered.filter((event) => event.meal_type === selectedMealType);
    }
    if (selectedMonth) {
      filtered = filtered.filter((event) => {
        const eventMonth = new Date(event.meal_request_date).getMonth() + 1;
        return eventMonth === parseInt(selectedMonth, 10);
      });
    }

    setFilteredEvents(filtered);
  }, [selectedMealTime, selectedMealType, selectedMonth, mealEvents]);

  const handleDownloadPDF = () => {
    const element = document.getElementById("meal-events-table");
    const options = {
      filename: "meal_events.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "15px", marginBottom: 20 }}>
        {/* Meal Time Filter */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Meal Time</InputLabel>
          <Select
            value={selectedMealTime}
            onChange={(e) => setSelectedMealTime(e.target.value)}
            label="Meal Time"
          >
            <MenuItem value="">All</MenuItem>
            {mealTimes.map((time) => (
              <MenuItem key={time.id} value={time.id}> {/* Use id instead of id */}
                {time.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Meal Type Filter */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Meal Type</InputLabel>
          <Select
            value={selectedMealType}
            onChange={(e) => setSelectedMealType(e.target.value)}
            label="Meal Type"
          >
            <MenuItem value="">All</MenuItem>
            {mealTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}> {/* Use id instead of id */}
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Month Filter */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Month"
          >
            <MenuItem value="">All</MenuItem>
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Download PDF Button */}
        <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
        <Button variant="contained" color="primary" >
          Schedule PDF
        </Button>
      </div>

      {/* Table */}
      <TableContainer component={Paper} id="meal-events-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Meal Time</TableCell>
              <TableCell>Meal Type</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Submitted Date</TableCell>
              <TableCell>Meal Request Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents.map((mealEvent, index) => (
              <TableRow key={index}>
                <TableCell>{mealEvent.meal_time_name}</TableCell>
                <TableCell>{mealEvent.meal_type_name}</TableCell>
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
