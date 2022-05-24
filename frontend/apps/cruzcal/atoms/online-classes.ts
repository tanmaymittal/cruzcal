import { atom } from 'jotai';

import { courseSelectionsAtom, CourseSelector } from './course-selector';

const timeStringToNum = (time: string) => {
  let temp: string = time[0] + time[1] + time[3] + time[4];
  let num: number = +temp;
  return num;
}

export const onlineClassesAtom = atom(
  (get) => {
    const courseSelections = get(courseSelectionsAtom);
    const totalCourseSelections = courseSelections.length;
    const listOfErrors: Set<CourseSelector> = new Set;

    for (let i = 0; i < totalCourseSelections; i++) {
      let curr = courseSelections[i]; // most current entry
      // avoid null entries
      if (curr.course != null) {
        // loop through each lecture
        for (let curLecture of curr.course.lectures) {
          if (curLecture.recurrence == null) {
            // add to list of errors
            listOfErrors.add(curr);
            break;
          }
        }
      }
    }
    return Array.from(listOfErrors);
  }
);

export default onlineClassesAtom;
