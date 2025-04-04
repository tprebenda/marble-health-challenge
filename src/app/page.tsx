"use client";

import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import styles from "./page.module.css";

// Setup the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

const TEST_EVENTS = [
  {
    id: 0,
    title: "Board meeting",
    start: new Date(2025, 3, 29, 9, 0, 0),
    end: new Date(2025, 3, 29, 13, 0, 0),
  },
  {
    id: 1,
    title: "MS training",
    allDay: true,
    start: new Date(2025, 3, 29, 13, 0, 0),
    end: new Date(2025, 3, 29, 16, 30, 0),
  },
  {
    id: 2,
    title: "Team lead meeting",
    start: new Date(2025, 3, 29, 8, 30, 0),
    end: new Date(2025, 3, 29, 12, 30, 0),
  },
  {
    id: 11,
    title: "Birthday Party",
    start: new Date(2025, 3, 30, 7, 0, 0),
    end: new Date(2025, 3, 30, 10, 30, 0),
  },
];

export default function MyCalendar() {
  const events = useState([]);
  return (
    <div className={styles.container}>
      <Calendar
        localizer={localizer}
        events={TEST_EVENTS}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
      />
    </div>
  );
}
