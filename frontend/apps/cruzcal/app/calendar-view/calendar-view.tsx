import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment'

import { useAtomValue } from 'jotai';
import { courseSelectionsAtom, CourseSelector } from '../../atoms/course-selector';
import selectedTermAtom from "../../atoms/selected-term";
import moment from 'moment'

/* eslint-disable-next-line */
export interface CalendarViewProps { }

const weekdayNum = (name) => ([
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]).indexOf(name);

const getCourseEvents = (courseList: CourseSelector[]) => {
  const courseEvents = [];

  for (const courseSelection of courseList) {
    const {term, course, subject} = courseSelection;
    if ([term, subject, course].some(v => v === null)) {
      continue;
    }

    for (const {recurrence} of course.lectures) {
      if (recurrence === null) continue;

      const lectureDays = recurrence.days.map(weekdayNum);
      const lectureTime = recurrence.time;

      courseEvents.push({
        id: `${term.code}:${course.courseID}`, // unique id by term:courseid
        daysOfWeek: lectureDays,
        title: `${subject.name} ${course.coursenum}`,
        startTime: lectureTime.start,
        endTime: lectureTime.end,
      });
    }
  }
  return courseEvents;
}

export function CalendarView(props: CalendarViewProps) {
  const courseList: CourseSelector[] = useAtomValue(courseSelectionsAtom);
  const header = { start: '', center: 'title', end: '' }
  const selectedTerm = useAtomValue(selectedTermAtom)

  useEffect(() => {
    let startDate = "Start Date"
    let endDate = "End Date"
    // Get "Month" display on both mobile and desktop calendars
    const titles = document.getElementsByClassName('fc-toolbar-title')
    
    // Check if a term was saved in local storage
    if (selectedTerm != null) {
      // Temporarily store the term's start date
      let tempStartDate = moment(selectedTerm.date.start, 'YYYY-MM-DD')
    
      let startMonth = tempStartDate.month()

      // Check if Summer term was selected and change the month back to June
      console.log(selectedTerm.name)
      if (startMonth == 6 && selectedTerm.name.includes("Summer")) {
        tempStartDate.month(startMonth - 1)
      }

      startDate = tempStartDate.format('MMM YYYY')
      endDate = moment(selectedTerm.date.end, 'YYYY-MM-DD').format('MMM YYYY')
    }
    
    for (let i = 0; i < titles.length; i++) {
      titles[i].innerHTML = startDate + ' - ' + endDate
    }
  }, [selectedTerm])

  return (
    <FullCalendar
      events={getCourseEvents(courseList)}
      plugins={[momentPlugin, timeGridPlugin]}
      allDaySlot={false}
      contentHeight="auto"
      dayHeaderFormat = "ddd"
      headerToolbar={header}
      initialView="timeGridWeek"
      titleFormat="MMMM YYYY"
      weekends={true}
      // Times are in 24 hour format
      slotMinTime="08:00"
      slotMaxTime="22:00"
    />
  );
}

export default CalendarView;