import { atom } from "jotai";
import { atomWithStorage, splitAtom } from "jotai/utils";
import { CourseInfo } from "./courses";
import selectedTermAtom from "./selected-term";
import { CourseSchedule, generateScheduleURI } from "./share-link";
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

export const defaultScheduleSelection = {
  term: null,
  courses: [{...defaultCourseSelection}]
}

export const courseSelectionsStorageAtom = atomWithStorage('course-selector', [{...defaultCourseSelection}]);
export const courseSelectionsAtom = atom(
  (get) => get(courseSelectionsStorageAtom),
  (get, set, courseSelections: CourseSelector[]) => {
    set(courseSelectionsStorageAtom, courseSelections);

    try {
      const term = get(selectedTermAtom);
      const uri = generateScheduleURI({term, courses: courseSelections});
      // Don't push url history if unchanged
      if (uri !== location?.href) {
        const {search} = new URL(uri);
        history.pushState({search}, '', uri);
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const courseSelectionAtomsAtom = splitAtom(courseSelectionsAtom);

export const multipleCourseSelectionsAtom = atom((get) => get(courseSelectionAtomsAtom).length > 1);

export const scheduleSelectionAtom = atom(
  (get) => ({
    term: get(selectedTermAtom),
    courses: get(courseSelectionsAtom)
  }),
  (get, set, newSchedule: CourseSchedule) => {
    set(selectedTermAtom, newSchedule.term);
    set(courseSelectionsAtom, newSchedule.courses);
  });


