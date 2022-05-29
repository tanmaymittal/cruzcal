import { atom } from "jotai";
import { server } from "../config";
import { CourseSelector, defaultCourseSelection, defaultScheduleSelection, scheduleSelectionAtom } from "./course-selector";
import { CourseInfo } from "./courses";
import { TermInfo } from "./terms";

export interface CourseSchedule {
  term: TermInfo;
  courses: CourseSelector[];
};

const toScheduleSelection = (term: TermInfo, courses: CourseInfo[]) => {
  if (courses.length === 0) {
    // If no courses, set default course selection
    return {term, courses: [{...defaultCourseSelection, term}]}
  } else {
    // Otherwise, map CourseInfo to CourseSelector
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

export const fetchSchedule = async (scheduleQuery) => {
  const searchParams = new URLSearchParams(scheduleQuery);

  // If no query parameters, return default
  if (!searchParams.has('termCode')) {
    return defaultScheduleSelection;
  }

  const path = `${server}/api/schedule/cruzcal`;
  const res = await fetch(path, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      termCode: parseInt(searchParams.get('termCode')),
      courseIDs: searchParams.getAll('courseIDs')
    })
  });

  if (res.status !== 201) throw res;
  else {
    const {term, courses} = await res.json();
    return toScheduleSelection(term, courses);
  }
}

export const generateScheduleQuery = ({term, courses}: CourseSchedule) => {
  const completedCourseIDs = courses
    .map(({course}) => course?.courseID)
    .filter((id) => id != null);

  // If no term, can't setup course selector
  if (term == null) return ``;

  const termCode = `termCode=${encodeURIComponent(term.code)}`;

  // If no courses, can only setup term
  if (completedCourseIDs.length === 0) {
    return `?${termCode}`; // no schedule query
  } 

  const courseIDs = completedCourseIDs
    .map((courseID) => `courseIDs=${encodeURIComponent(courseID)}`)
    .join('&');
  
  // Term and courses query
  return `?${termCode}&${courseIDs}`;
};

export const generateScheduleURI = (schedule: CourseSchedule) => 
  `${server}/${generateScheduleQuery(schedule)}`;

export const shareLinkAtom = atom((get) => generateScheduleURI(get(scheduleSelectionAtom)));

export default shareLinkAtom;
