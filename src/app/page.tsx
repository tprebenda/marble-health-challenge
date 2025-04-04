"use client";

import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MeetingDialog from "../components/MeetingDialog";

// Setup the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

const TEST_EVENTS = [
  {
    id: 0,
    title: "Board meeting",
    attendees: ["Troy Prebenda", "Lumen Board"],
    start: new Date(2025, 3, 29, 9, 0, 0),
    end: new Date(2025, 3, 29, 13, 0, 0),
  },
  {
    id: 1,
    title: "MS training",
    // allDay: true,
    attendees: ["Troy Prebenda"],
    start: new Date(2025, 3, 29, 13, 0, 0),
    end: new Date(2025, 3, 29, 16, 30, 0),
  },
  {
    id: 2,
    title: "Team lead meeting",
    attendees: ["Troy Prebenda", "Fireteam Leader"],
    start: new Date(2025, 3, 29, 8, 30, 0),
    end: new Date(2025, 3, 29, 12, 30, 0),
  },
  {
    id: 11,
    title: "Birthday Party",
    attendees: ["Troy Prebenda"], // just me, sad :(
    start: new Date(2025, 3, 30, 7, 0, 0),
    end: new Date(2025, 3, 30, 10, 30, 0),
  },
];

export default function MyCalendar() {
  const events = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const handleDialogClose = () => {
    setDialogIsOpen(false);
  };

  const handleClick = () => {
    setDialogIsOpen(true);
  };

  return (
    <>
      <Box height="80vh">
        <Calendar
          localizer={localizer}
          events={TEST_EVENTS}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
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
    </>
  );
}
