import { atom } from "jotai";
import { atomWithStorage, splitAtom } from "jotai/utils";
import { CourseInfo } from "./courses";
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

export const courseSelectionsAtom = atomWithStorage('course-selector', [{...defaultCourseSelection}]);
export const courseSelectionAtomsAtom = splitAtom(courseSelectionsAtom);

export const multipleCourseSelectionsAtom = atom((get) => get(courseSelectionAtomsAtom).length > 1);


