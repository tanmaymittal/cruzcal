import {atom} from 'jotai'
import {CourseInfo} from './courses';

export const selectedCourseAtom = atom(null as CourseInfo);

export default selectedCourseAtom;
