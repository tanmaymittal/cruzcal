import styles from './calendar-view.module.css';
import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';


/* eslint-disable-next-line */
export interface CalendarViewProps {}

export function CalendarView(props: CalendarViewProps) {
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      headerToolbar={false}
      weekends={false}
      allDaySlot={false}
      // Times are in 24 hour format
      slotMinTime="08:00"
      slotMaxTime="22:00"
      events={[
        {
          id: 1,
          title: 'CSE 120',
          date: '2022-04-25',
          // Date and Time are separated by T
          // Without a 'Z' for UTC time, JS will use the Browser's Time Zone
          start: '2022-04-25T13:30:00',
          end: '2022-04-25T15:15:00'
        },
      ]}
    />
  );
}

export default CalendarView;
