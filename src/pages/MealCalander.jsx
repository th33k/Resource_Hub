import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../css/MealCalander.css";
import Popup from "../components/Calander/popup";

function MealCalendar() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
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
    };
    setEventData([...eventData, newEvent]);  
    setPopupOpen(false); 
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
      />

      <Popup
        open={popupOpen}
        handleClose={() => setPopupOpen(false)}
        selectedDate={selectedDate}
        onAddEvent={handleAddEvent} 
      />
    </div>
  );
}

export default MealCalendar;
