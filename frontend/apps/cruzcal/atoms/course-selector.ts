import { atom } from "jotai";
import { atomWithStorage, splitAtom } from "jotai/utils";
import { CourseInfo } from "./courses";
import selectedTermAtom from "./selected-term";
import shareLinkAtom, { fetchSchedule } from "./share-link";
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
  (get, set, courseSelections: CourseSelector[]) => {
    set(courseSelectionsStorageAtom, courseSelections);
  },
);

export const courseSelectionAtomsAtom = splitAtom(courseSelectionsAtom);

export const multipleCourseSelectionsAtom = atom((get) => get(courseSelectionAtomsAtom).length > 1);

export const scheduleSelectionAtom = atom(
  (get) => {
    const term = get(selectedTermAtom);
    const courseSelections = get(courseSelectionsAtom);
    return {term, courses: courseSelections};
  }, (get, set, newSchedule: {term: TermInfo, courses: CourseSelector[]}) => {
    set(selectedTermAtom, newSchedule.term);
    set(courseSelectionsAtom, newSchedule.courses);
  });


