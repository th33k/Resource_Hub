import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./css/MealCalander.css";
import Popup from "../components/Calander/popup";
import DeletePopup from "../components/Calander/DeletePopup"; // Assuming you create a new DeletePopup component

function MealCalendar() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false); // State for delete confirmation popup
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event for deletion
  const [eventData, setEventData] = useState([]);  
  const today = new Date().toISOString().split("T")[0];

  const dayClickAction = (info) => {
    setSelectedDate(info.dateStr);
    setPopupOpen(true); 
  };

  const handleAddEvent = (mealTime, mealType) => {
    const newEvent = {
      title: `${mealTime} - ${mealType}`,
      start: selectedDate,
      end: selectedDate,
      id: `${selectedDate}-${mealTime}-${mealType}`, // Generate a unique id
    };
    setEventData([...eventData, newEvent]);  
    setPopupOpen(false); 
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = eventData.filter(event => event.id !== eventId);
    setEventData(updatedEvents);
    setDeletePopupOpen(false); // Close the delete popup
  };

  const isMealSelected = (mealType) => {
    return eventData.some(event => event.start === selectedDate && event.title.includes(mealType));
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event); // Set the selected event
    setDeletePopupOpen(true); // Open the delete confirmation popup
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        height={"80vh"}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "today",
        }}
        dateClick={dayClickAction}
        validRange={{ start: today }}
        events={eventData}
        eventClick={handleEventClick} // Event click handler to trigger deletion popup
      />

      {/* Add Meal Popup */}
      <Popup
        open={popupOpen}
        handleClose={() => setPopupOpen(false)}
        selectedDate={selectedDate}
        onAddEvent={handleAddEvent} 
        isMealSelected={isMealSelected}  
      />

      {/* Delete Confirmation Popup */}
      <DeletePopup
        open={deletePopupOpen}
        handleClose={() => setDeletePopupOpen(false)}
        onDelete={() => handleDeleteEvent(selectedEvent.id)} // Delete the selected event
        eventTitle={selectedEvent ? selectedEvent.title : ''}
      />
    </div>
  );
}

export default MealCalendar;
