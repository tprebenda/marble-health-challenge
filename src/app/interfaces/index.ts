export interface CalendarEvent {
  id: number;
  title: string
  details?: string
  attendees: string[]
  start: Date
  end: Date
}