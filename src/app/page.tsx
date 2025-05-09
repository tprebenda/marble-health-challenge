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
import { CalendarEventRecord } from "./interfaces";

// Setup the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const [events, setEvents] = useState<CalendarEventRecord[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEventRecord | null>(null);

  const fetchEvents = async () => {
    const response = await fetch("/api/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: CalendarEventRecord[] = await response.json();
    setEvents(data);
  };

  // Fetch events from db on startup
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDialogClose = () => {
    setSelectedEvent(null);
    setDialogIsOpen(false);
  };

  const handleSelectEvent = (event: CalendarEventRecord) => {
    setSelectedEvent(event);
    setDialogIsOpen(true);
  };

  const handleAddClick = () => {
    setSelectedEvent(null);
    setDialogIsOpen(true);
  };

  // FOLLOWUP: add onSelectSlot()

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box height="80vh">
        <Calendar<CalendarEventRecord>
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
