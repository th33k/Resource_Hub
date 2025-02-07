import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../css/MealCalander.css";

function MealCalendar() {
  return (
    <div>
      <div></div>
      <div className="calendar-frame">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
        />
      </div>
    </div>
  );
}

export default MealCalendar;
