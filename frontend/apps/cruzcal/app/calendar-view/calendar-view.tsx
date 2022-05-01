import styles from './calendar-view.module.css';
import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment'


/* eslint-disable-next-line */
export interface CalendarViewProps {}

export function CalendarView(props: CalendarViewProps) {
  return (
    <FullCalendar
      plugins={[momentPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      headerToolbar={false}
      weekends={false}
      contentHeight="auto"
      allDaySlot={false}
      dayHeaderFormat = "dddd, MMMM D, YYYY"
      // Times are in 24 hour format
      slotMinTime="08:00"
      slotMaxTime="22:00"
      events={[
        {
          id: "cse120",
          daysOfWeek: ['1', '3', '5'],
          title: 'CSE 120',
          startTime: '13:30',
          endTime: '15:15',
        },
        {
          id: "cse130",
          daysOfWeek: ['2', '4'],
          title: 'CSE 130',
          startTime: '12:00',
          endTime: '13:45',
        }
      ]}
    />
  );
}

export default CalendarView;
