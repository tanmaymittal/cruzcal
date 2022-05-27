import { atom } from "jotai";
import { atomWithHash, atomWithStorage, splitAtom } from "jotai/utils";
import { server } from "../config";
import { CourseInfo } from "./courses";
import selectedTermAtom from "./selected-term";
import { SubjectInfo } from "./subjects";
import termsAtom, { TermInfo } from "./terms";

export interface CourseSelector {
  term: TermInfo,
  subject: SubjectInfo,
  course: CourseInfo
}

export const defaultCourseSelection: CourseSelector = {
  term: null,
  course: null,
  subject: null,
};

const initialScheduleSelections = {
  term: null,
  courses: [{...defaultCourseSelection}]
}

export const fetchSchedule = async (scheduleQuery) => {
  const path = `${server}/api/calendar/json${scheduleQuery}`;
  const res = await fetch(path);

  if (res.status !== 200) throw res;
  else return await res.json();
} 

export const courseSelectionsStorageAtom = atomWithStorage('course-selector', [{...defaultCourseSelection}]);
export const courseSelectionsAtom = atom(
  (get) => get(courseSelectionsStorageAtom),
  (get, set, courseSelections: CourseSelector[]) => {
    set(courseSelectionsStorageAtom, courseSelections);
  },
);

export const courseSelectionAtomsAtom = splitAtom(courseSelectionsAtom);

export const multipleCourseSelectionsAtom = atom((get) => get(courseSelectionAtomsAtom).length > 1);

export const generateScheduleQuery = (term: TermInfo, courses: CourseInfo[]) => {
  const completedCourses = courses.filter((course) => course?.courseID != null);

  if (term == null) {
    throw new Error(`Course selection incomplete`);
  } else if (completedCourses.length === 0) {
    return ''; // no schedule query
  }

  const termCodeStr = `termCode=${encodeURIComponent(term.code)}`;
  const courseIDsStr = completedCourses
    .map((course) => `courseIDs=${encodeURIComponent(course.courseID)}`)
    .join('&');
  return `?${termCodeStr}&${courseIDsStr}`;
};

export const scheduleSelectionAtom = atom(
  (get) => {
    const term = get(selectedTermAtom);
    const courseSelections = get(courseSelectionsAtom);
    try {
      const courses = courseSelections.map(({course}) => course);
      const scheduleURI = generateScheduleQuery(term, courses);
      history.pushState(null, '', `${location.pathname}${scheduleURI}`);
    } catch (error) {
      console.log(error.message);
    }
    return {term, courses: courseSelections};
  }, (get, set, newSchedule: {term: TermInfo, courses: CourseSelector[]}) => {
    // console.log(newSchedule.term);
    // console.log(newSchedule.courses.length);
    // set(selectedTermAtom, newSchedule.term);
    // set(courseSelectionsAtom, newSchedule.courses);
  });

  // scheduleSelectionAtom.onMount = (setScheduleSelection) => {
  //   const query = new URLSearchParams(location.search);
  //   if (query.get('termCode') !== null && query.getAll('courseIDs').length > 0) {
  //     fetchSchedule(location.search)
  //       .then((schedule) => {
  //         // console.log(schedule);
  //         setScheduleSelection(schedule); 
  //       })
  //       .catch(console.error);
  //   }
  // }


