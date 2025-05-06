import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../css/MealCalendar.css";
import Popup from "../../components/Calendar/popup";
import DeletePopup from "../../components/Calendar/DeletePopup";
import axios from "axios";
import UserLayout from "../../layouts/User/UserLayout";
import { BASE_URLS } from '../../services/api/config';
import { toast } from "react-toastify";

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
      const response = await axios.get(`${BASE_URLS.calendar}/mealevents/${localStorage.getItem("Userid")}`);
      const formattedEvents = response.data.map(event => ({
        id: event.id,
        title: `${event.meal_time_name} - ${event.meal_type_name}`,
        start: event.meal_request_date,
        end: event.meal_request_date,
        meal_id: event.meal_time_id 
      }));
      setEventData(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const dayClickAction = (info) => {
    if (!isPastDate(info.date)) {
      setSelectedDate(info.dateStr);
      setPopupOpen(true);
    }
  };

  const handleAddEvent = async (mealTimeId, mealTypeId) => {
    try {
      const response = await axios.post(`${BASE_URLS.calendar}/mealevents/add`, {
        meal_time: mealTimeId, 
        meal_type: mealTypeId, 
        user_id: parseInt(localStorage.getItem("Userid")),
        submitted_date: today,
        meal_request_date: selectedDate,
      });
  
      if (response.status !== 200) {
        throw new Error(`Failed to add event: ${response.status}`);
      }
  
      const newEvent = {
        id: response.data.id,
        title: `${mealTimeId} - ${mealTypeId}`, 
        start: selectedDate,
        end: selectedDate,
      };
      setEventData((prevEvents) => [...prevEvents, newEvent]);
      setPopupOpen(false);
      toast.success("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error(`Error: ${error.message}`);
    }
  
    await fetchEvents(); // Refresh the page after adding
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${BASE_URLS.calendar}/mealevents/${eventId}`);
      const updatedEvents = eventData.filter(event => event.id !== eventId);
      setEventData(updatedEvents);
      setDeletePopupOpen(false);
      await fetchEvents(); // Refresh the page after deleting
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEventClick = (info) => {
    if (!isPastDate(info.event.start)) {
      setSelectedEvent(info.event);
      setDeletePopupOpen(true);
    }
  };

  const isMealSelected = (mealId) => {
    return eventData.some(event =>
      event.start === selectedDate && event.meal_id === mealId
    );
  };

  return (
    <UserLayout>
      <div className="min-h-screen space-y-6 p-6">
        <h1 className="text-2xl font-semibold">Meal Calendar</h1>
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
            events={eventData}
            eventClick={handleEventClick}
            dayCellClassNames={(arg) => {
              if (isPastDate(arg.date)) {
                return 'fc-day-disabled';
              }
              return '';
            }}
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
      </div>
    </UserLayout>
  );
}

export default MealCalendar;
