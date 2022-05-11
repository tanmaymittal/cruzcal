import {atom} from 'jotai'
import selectedCourseAtom from './selected-course';
import {SubjectInfo} from './subjects';

const subjectAtom = atom(null as SubjectInfo);
export const selectedSubjectAtom = atom(
  (get) => get(subjectAtom),
  (get, set, subject) => {
    set(subjectAtom, subject);
    set(selectedCourseAtom, null);
  }
);

export default selectedSubjectAtom;

