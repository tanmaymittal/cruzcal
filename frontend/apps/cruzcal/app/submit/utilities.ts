import { CourseSelector } from "../../atoms/course-selector";
import { TermInfo } from "../../atoms/terms";
import { AtomWithQueryAction } from "jotai/query";
import { Dispatch } from "react";
import { server } from '../../config';

export type CalendarType = 'ics' | 'google' | 'json';

export interface CourseIdentifier {
  courseID: string
};

const submitICS = (url) => window.open(url);
const submitJSON = async (url) => window.open(url);

export let authWindow: Window = null;
export const setAuthWindow = (win: Window) => authWindow = win;
export const setupGoogleAuth = () => {
  authWindow = window.open(`${server}/api/auth/google/calendar`, 'cruzcal-gcal');
}

const fetchGoogleCalendar = async (url: string, checkAuth: Dispatch<AtomWithQueryAction>) => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) throw res;
    checkAuth({ type: 'refetch' });

    const schedule = (await res.text()).replace(/"/g, '');
    window.open(schedule, 'cruzcal-gcal');
  } catch (error) {
    // console.error(error);
    // Close window if error happens loading google calendar
    if (authWindow !== null)
      authWindow.close();
  }
}

// https://stackoverflow.com/questions/28392393/passport-js-after-authentication-in-popup-window-close-it-and-redirect-the-pa
const submitGoogle = async (
  url: string,
  authenticated: boolean,
  checkAuth: Dispatch<AtomWithQueryAction>
) => {
  if (authenticated) fetchGoogleCalendar(url, checkAuth);
  else {
    if (authWindow === null) {
      console.error('Auth window has not been created yet');
    } else {
      const pollTimer = window.setInterval(function() { 
        try {
          const redirectPath = `/api/loading`;
          const windowPath = authWindow.location.pathname;
          if (windowPath === undefined || windowPath === redirectPath) {
            window.clearInterval(pollTimer);
            fetchGoogleCalendar(url, checkAuth);
          }
        } catch(e) {}
      }, 100);
    }
  }
}

const toScheduleBodyAPI = (term: TermInfo, courses: CourseSelector[]) => {
  return {
    termCode: term.code,
    courseIDs: courses.map(({course}) => `${course.courseID}`)
  };
}

const makeCalendarRequest = async (
  calendarType: CalendarType,
  schedule: {term: TermInfo, courses: CourseSelector[]},
) => {
  const {term, courses} = schedule;
  const scheduleBody = toScheduleBodyAPI(term, courses);

  const res = await fetch(`${server}/api/schedule/${calendarType}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(scheduleBody, null, 1)
  });

  if (res.status !== 201) {
    const error = await res.json();
    throw error;
  } else {
    const {uri} = await res.json();
    return uri;
  }
};

export const fetchCalendar = async (
  calendarType: CalendarType,
  schedule: {term: TermInfo, courses: CourseSelector[]},
  authenticated: boolean,
  checkAuthenticated: Dispatch<AtomWithQueryAction>,
) => {
  if (schedule.term === null)
    return; // console.error('No term provided');
  if (schedule.courses.length === 0)
    return; // console.error('No courses selected');
  if (schedule.courses.filter(({course}) => course === null).length > 0)
    return; // console.error('Incomplete course selection');
  
  // Must setup auth window outside of async fn for Safari
  if (calendarType === 'google' && !authenticated) {
    setupGoogleAuth();
  }

  makeCalendarRequest(calendarType, schedule)
    .then((scheduleURI: string) => {
      switch (calendarType) {
        case 'json':
          submitJSON(scheduleURI);
        break;
        case 'ics':
          submitICS(scheduleURI);
        break;
        case 'google':
          submitGoogle(scheduleURI, authenticated, checkAuthenticated);
        break;
      }
    })
    // .catch(console.error);
};