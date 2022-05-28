import { atom } from "jotai";
import { server } from "../config";
import { CourseSelector, scheduleSelectionAtom } from "./course-selector";
import { CourseInfo } from "./courses";
import { TermInfo } from "./terms";

export interface CourseSchedule {
  term: TermInfo;
  courses: CourseSelector[];
};

export const fetchSchedule = async (scheduleQuery) => {
  const path = `${server}/api/calendar/json${scheduleQuery}`;
  const res = await fetch(path);

  if (res.status !== 200) throw res;
  else {
    const {term, courses} = await res.json();
    return {
      term,
      courses: courses.map((course: CourseInfo) => ({
        term,
        subject: {name: course.subject},
        course
      }))
    }
  }
} 

export const generateScheduleURI = ({term, courses}: CourseSchedule) => {
  const completedCourseIDs = courses
    .map(({course}) => course?.courseID)
    .filter((id) => id != null);

  if (term == null) {
    throw new Error(`Course selection incomplete`);
  } else if (completedCourseIDs.length === 0) {
    return `${server}/`; // no schedule query
  }

  const termCodeStr = `termCode=${encodeURIComponent(term.code)}`;
  const courseIDsStr = completedCourseIDs
    .map((courseID) => `courseIDs=${encodeURIComponent(courseID)}`)
    .join('&');
  return `${server}/?${termCodeStr}&${courseIDsStr}`;
};


export const shareLinkAtom = atom(
  (get) => {
    const {term, courses} = get(scheduleSelectionAtom);
    try {
      const scheduleURI = generateScheduleURI({term, courses});
      return scheduleURI;
    } catch (error) {
      console.log(error.message);
    }
    return server;
  }
)


export default shareLinkAtom;
