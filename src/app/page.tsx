"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EventDialog from "./components/EventDialog";
import { CalendarEventResponse } from "./interfaces";

// Setup the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const [events, setEvents] = useState<CalendarEventResponse[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEventResponse | null>(null);

  const fetchEvents = async () => {
    const response = await fetch("/api/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: CalendarEventResponse[] = await response.json();
    console.log(data);
    setEvents(data);
  };

  // Fetch events from db on startup
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDialogClose = () => {
    setDialogIsOpen(false);
  };

  const handleSelectEvent = (event: CalendarEventResponse) => {
    setSelectedEvent(event);
    setDialogIsOpen(true);
  };

  const handleAddClick = () => {
    setSelectedEvent(null);
    setDialogIsOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box height="80vh">
        <Calendar<CalendarEventResponse>
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          onSelectEvent={handleSelectEvent}
        />
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={5}
      >
        <Button variant="contained" onClick={handleAddClick} color="success">
          Add a new event!
        </Button>
        <EventDialog
          open={dialogIsOpen}
          handleClose={handleDialogClose}
          onSuccess={fetchEvents}
          initialEvent={selectedEvent}
        />
      </Box>
    </LocalizationProvider>
  );
}
