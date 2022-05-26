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

export const courseSelectionsStorageAtom = atomWithStorage('course-selector', [{...defaultCourseSelection}]);
export const courseSelectionsAtom = atom(
  (get) => get(courseSelectionsStorageAtom),
  (get, set, courseSelections: CourseSelector[]) => {
    set(courseSelectionsStorageAtom, courseSelections);
  },
);
courseSelectionsAtom.onMount = ((setAtom) => {
  console.log(location.search);
})
export const courseSelectionAtomsAtom = splitAtom(courseSelectionsAtom);

export const multipleCourseSelectionsAtom = atom((get) => get(courseSelectionAtomsAtom).length > 1);

export const generateScheduleURI = (term: TermInfo, courses: CourseInfo[]) => {
  const completedCourses = courses.filter((course) => course?.courseID != null);

  if (term == null) {
    throw new Error(`Course selection incomplete`);
  } else if (completedCourses.length === 0) {
    throw new Error('No courses selected');
  }

  const termCodeStr = `termCode=${encodeURIComponent(term.code)}`;
  const courseIDsStr = completedCourses
    .map((course) => `courseIDs=${encodeURIComponent(course.courseID)}`)
    .join('&');
  return `${location.pathname}?${termCodeStr}&${courseIDsStr}`;
};

export const scheduleSelectionsAtom = atom(
  (get) => {
    const term = get(selectedTermAtom);
    const courseSelections = get(courseSelectionsAtom);
    try {
      const courses = courseSelections.map(({course}) => course);
      const scheduleURI = generateScheduleURI(term, courses);
      history.pushState(null, '', scheduleURI);
    } catch (error) {
      console.log(error.message);
    }
    return {term, courses: courseSelections};
  }, (get, set, newTermAndCS: {term: TermInfo, courses: CourseSelector[]}) => {
    // const {term, courses} = newTermAndCS;
    // history.pushState(newTermAndCS, "Schedule Selection", generateScheduleQuery('', term, courses.map(({course}) => course)));
    // set(scheduleHashAtom, newTermAndCS);
  });

