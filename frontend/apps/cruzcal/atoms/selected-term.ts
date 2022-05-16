import {atom} from 'jotai'
import {TermInfo} from './terms';
import selectedCourseAtom from './selected-course';
import selectedSubjectAtom from './selected-subject';
import { atomWithStorage } from 'jotai/utils';

const termAtom = atomWithStorage('selected-term', null as TermInfo);
export const selectedTermAtom = atom(
  (get) => get(termAtom),
  (get, set, term) => {
    set(termAtom, term);
    set(selectedSubjectAtom, null);
    set(selectedCourseAtom, null);
  }
);

export default selectedTermAtom;
