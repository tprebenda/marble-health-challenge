import { CalendarEvent } from "../interfaces";

export const TEST_EVENTS: CalendarEvent[] = [
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