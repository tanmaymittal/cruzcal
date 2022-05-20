import { CourseSelector } from "apps/cruzcal/atoms/course-selector";
import { TermInfo } from "apps/cruzcal/atoms/terms";
import { server } from '../../config';

export type CalendarType = 'ics' | 'google' | 'json';

export interface CourseIdentifier {
  courseID: string
};

const submitICS = (url) => location.href = url;
const submitJSON = async (url) => {
  const res = await fetch(url);
  switch (res.status) {
    case 200: {
      const calendar = await res.json();
      console.log(calendar);
      break;
    }
    default: {
      const error = await res.json();
      console.error(error);
      break;
    }
  }
}

export let authWindow: Window = null;
export const setAuthWindow = (win: Window) => authWindow = win;
export const setupGoogleAuth = () => {
  authWindow = window.open(`${server}/api/auth/google`, 'cruzcal-google-auth', 'width=800, height=600');
}

const doAuthGoogle = async (cb: () => void) => {
  const res = await fetch(`${server}/api/auth/check`);
  let isAuthenticated = res.status === 200;

  if (isAuthenticated) cb();
  else {
    if (authWindow === null) {
      console.error('Auth window has not been created yet');
    } else {
      const pollTimer = window.setInterval(function() { 
        try {
          const redirectPath = `/`;
          console.log(authWindow.location.pathname);
          if (authWindow.location.pathname === redirectPath) {
            window.clearInterval(pollTimer);
            authWindow.close();
            cb();
          }
        } catch(e) {}
      }, 100);
    }
  }
};

// https://stackoverflow.com/questions/28392393/passport-js-after-authentication-in-popup-window-close-it-and-redirect-the-pa
const submitGoogle = (url: string) => {
  doAuthGoogle(() => {
    fetch(url)
    .then((res) => {console.log('Status', res.status); return res;})
    .then((res) => res.json())
    .then((schedule) => console.log(schedule));
  })
}

export const fetchCalendar = async (calendarType: CalendarType, term: TermInfo, courseList: CourseSelector[]) => {
  if (term === null)
    return console.error('No term provided');
  if (courseList.length === 0)
    return console.error('No courses selected');
  if (courseList.filter(({course}) => course === null).length > 0)
    return console.error('Incomplete course selection');

  const cs = {
    termCode: term.code,
    courseIDs: courseList.map(({course}) => `${course.courseID}`)
  }

  const res = await fetch(`${server}/api/schedule/${calendarType}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cs, null, 1)
  });

  if (res.status !== 201) {
    const error = await res.json();
    console.log(error);
  } else {
    const {uri: scheduleURI} = await res.json();
    console.log('Schedule URI:', scheduleURI);
    switch (calendarType) {
      case 'json':
        submitJSON(scheduleURI);
      break;
      case 'ics':
        submitICS(scheduleURI);
      break;
      case 'google':
        submitGoogle(scheduleURI);
      break;
    }
  }
};