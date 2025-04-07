"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MeetingDialog from "./components/MeetingDialog";
import { TEST_EVENTS } from "./mockData";
import { CalendarEvent } from "./interfaces";

// Setup the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const handleDialogClose = () => {
    setDialogIsOpen(false);
  };

  const handleClick = () => {
    setDialogIsOpen(true);
  };

  // TODO: ADD SOMETHING LIKE THIS - (open dialog!!!)
  // const handleSelectSlot = ({ start, end }) => {
  //   const title = window.prompt("New Event Name:");
  //   if (title) {
  //     setEvents([...events, { start, end, title }]);
  //   }
  // };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box height="80vh">
        <Calendar<CalendarEvent>
          localizer={localizer}
          events={events.length !== 0 ? events : TEST_EVENTS}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          // TODO:
          // onSelectEvent={}
          // onSelectSlot={}
        />
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={5}
      >
        <Button variant="contained" onClick={handleClick}>
          Add a new event!
        </Button>
        <MeetingDialog open={dialogIsOpen} handleClose={handleDialogClose} />
      </Box>
    </LocalizationProvider>
  );
}
