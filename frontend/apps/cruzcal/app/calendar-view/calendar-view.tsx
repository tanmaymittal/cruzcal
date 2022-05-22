import styles from './calendar-view.module.css';
import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment'

import { useAtom } from 'jotai';
import { courseSelectionsAtom, CourseSelector } from '../../atoms/course-selector';
import { core } from 'apps/cruzcal/.storybook/main';

/* eslint-disable-next-line */
export interface CalendarViewProps { }

const weekdayNum = (name) => ({
  'Monday': '1',
  'Tuesday': '2',
  'Wednesday': '3',
  'Thursday': '4',
  'Friday': '5',
})[name] || console.error(`Weekday does not exist: ${name}`);

export function CalendarView(props: CalendarViewProps) {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionsAtom);
  const header = { start: '', center: 'title', end: '' }

  const courseListValid = courseListAtoms.filter(
    ({ course, subject, term }) => (
      course && subject && term && course.lectures[0].times.length > 0
    )
  );

  return (
    <FullCalendar
      events={courseListValid.map((courseAtom, i) => {
        const courseInfo = courseAtom.course
        const lectureTimes = courseInfo.lectures[0].times;

        const courseLectureDays = lectureTimes.map(({ day }) => weekdayNum(day));

        return {
          id: `${i}`,
          daysOfWeek: courseLectureDays as string[],
          title: courseInfo.name as string,
          startTime: lectureTimes[0].start as string,
          endTime: lectureTimes[0].end as string,
        }
      })}
      plugins={[momentPlugin, timeGridPlugin]}
      allDaySlot={false}
      contentHeight="auto"
      dayHeaderFormat = "ddd"
      headerToolbar={header}
      initialView="timeGridWeek"
      titleFormat="MMMM YYYY"
      weekends={false}
      // Times are in 24 hour format
      slotMinTime="08:00"
      slotMaxTime="22:00"
    />
  );
}

export default CalendarView;