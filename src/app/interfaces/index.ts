import { Moment } from "moment";

export interface CalendarEventResponse {
  id: number;
  title: string;
  details?: string;
  attendees: string[];
  start: Date;
  end: Date;
}

export interface CalendarEventEdit {
  id?: number;
  title: string;
  details?: string;
  attendees: string;
  start: Moment | null;
  end: Moment | null;
}
