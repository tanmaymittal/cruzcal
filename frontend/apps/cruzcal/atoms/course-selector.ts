import { atom, PrimitiveAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { CourseInfo } from "./courses";
import { SubjectInfo } from "./subjects";
import { TermInfo } from "./terms";

export interface CourseSelector {
  term: TermInfo,
  subject: SubjectInfo,
  course: CourseInfo
}

export const defaultCourseSelection: CourseSelector = {
  course: null,
  term: null,
  subject: null,
};

export const courseSelectionAtom: PrimitiveAtom<CourseSelector> = atom(defaultCourseSelection);
export const courseSelectionsAtom: PrimitiveAtom<CourseSelector[]> = atom([{...defaultCourseSelection}]);
export const courseSelectionAtomsAtom = splitAtom(courseSelectionsAtom);

