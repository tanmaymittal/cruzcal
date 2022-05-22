import { atom } from "jotai";
import { atomWithHash, atomWithStorage, splitAtom } from "jotai/utils";
import { CourseInfo } from "./courses";
import selectedTermAtom from "./selected-term";
import { SubjectInfo } from "./subjects";
import { TermInfo } from "./terms";

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
  (get, set, courseSelections) => {
    // console.log(courseSelections);
    set(courseSelectionsStorageAtom, courseSelections);
    // set(scheduleSelectionsAtom, {...get(scheduleSelectionsAtom), courses: courseSelections});
  },
);
export const courseSelectionAtomsAtom = splitAtom(courseSelectionsAtom);

export const multipleCourseSelectionsAtom = atom((get) => get(courseSelectionAtomsAtom).length > 1);

// export const scheduleHashAtom = atomWithHash('schedule', initialScheduleSelections, {
//   replaceState: true,
// });

// export const generateScheduleQuery = (type: string, term: TermInfo, courses: CourseInfo[]) => {
//   const termCodeStr = term === null ? '' : `termCode=${encodeURIComponent(term.code)}`;
//   const courseIDsStr = courses
//     .map((course) => course === null ? '' : `courseIDs=${encodeURIComponent(course.courseID)}`)
//     .join('&');
//   console.log(courseIDsStr);
//   return `?${termCodeStr}${courseIDsStr}`;
// };

export const scheduleSelectionsAtom = atom(
  (get) => ({
    term: get(selectedTermAtom),
    courses: get(courseSelectionsAtom)
  }), (get, set, newTermAndCS: {term: TermInfo, courses: CourseSelector[]}) => {
    // const {term, courses} = newTermAndCS;
    // history.pushState(newTermAndCS, "Schedule Selection", generateScheduleQuery('', term, courses.map(({course}) => course)));
    // set(scheduleHashAtom, newTermAndCS);
  });

