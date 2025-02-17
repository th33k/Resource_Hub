import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./css/MealCalendar.css";
import Popup from "../components/Calendar/popup";
import DeletePopup from "../components/Calendar/DeletePopup";
import axios from "axios";

function MealCalendar() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:9093/mealevents");
      const formattedEvents = response.data.map(event => ({
        id: event.id,
        title: `${event.meal_time} - ${event.meal_type}`,
        start: event.meal_request_date,
        end: event.meal_request_date
      }));
      setEventData(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const dayClickAction = (info) => {
    setSelectedDate(info.dateStr);
    setPopupOpen(true);
  };

  const handleAddEvent = async (mealTime, mealType) => {
    try {
      const response = await axios.post("http://localhost:9093/mealevents/add", {
        meal_time: mealTime,
        meal_type: mealType,
        user_id: 1,
        submitted_date: today,
        meal_request_date: selectedDate
      });

      const newEvent = {
        id: response.data.id,
        title: `${mealTime} - ${mealType}`,
        start: selectedDate,
        end: selectedDate
      };
      setEventData([...eventData, newEvent]);
      setPopupOpen(false);
      window.location.reload(); // Refresh the page after adding
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:9093/mealevents/${eventId}`);
      const updatedEvents = eventData.filter(event => event.id !== eventId);
      setEventData(updatedEvents);
      setDeletePopupOpen(false);
      window.location.reload(); // Refresh the page after deleting
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setDeletePopupOpen(true);
  };

  const isMealSelected = (mealTime) => {
    return eventData.some(event => 
      event.start === selectedDate && event.title.includes(mealTime)
    );
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
        eventClick={handleEventClick}
      />

      <Popup
        open={popupOpen}
        handleClose={() => setPopupOpen(false)}
        selectedDate={selectedDate}
        onAddEvent={handleAddEvent}
        isMealSelected={isMealSelected}
      />

      <DeletePopup
        open={deletePopupOpen}
        handleClose={() => setDeletePopupOpen(false)}
        onDelete={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}
        eventTitle={selectedEvent ? selectedEvent.title : ''}
      />
    </div>
  );
}

export default MealCalendar;
