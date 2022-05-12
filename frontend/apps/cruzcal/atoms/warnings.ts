import { atom } from 'jotai';

import { courseSelectionsAtom, CourseSelector } from './course-selector';

const timeStringToNum = (time: string) => {
  let temp: string = time[0] + time[1] + time[3] + time[4];
  let num: number = +temp;
  return num;
}

export const warningsAtom = atom(
  (get) => {
    const courseSelectionAtom = get(courseSelectionsAtom);
    const totalCourseSelections = courseSelectionAtom.length;
    const listOfErrors: Set<CourseSelector> = new Set;

    // if 1 class or less, no warnings
    if (totalCourseSelections < 2)
      return Array.from(listOfErrors);


    for (let i = 0; i < totalCourseSelections; i++) {
      for (let j = i+1; j < totalCourseSelections; j++) {
        let prev = courseSelectionAtom[i]; // a previous entry
        let curr = courseSelectionAtom[j]; // most current/recent entry

        // avoid null entries
        if (curr.course != null && prev.course != null) {
            // if not same term
            if (curr.term.code != prev.term.code)
              return Array.from(listOfErrors);


            // determineIfError(curr, prev, listOfErrors);
            // for each of curr's lectures
            for (let curLecture of curr.course.lectures) {
              // for each of prev's lectures
              for (let prevLecture of prev.course.lectures) {
                // for each cur lecture's day+time entry
                for (let j = 0; j < curLecture.times.length; j++) {
                  // for each prev lecture's day+time entry
                  for (let k = 0; k < prevLecture.times.length; k++) {
                    // if the two days of week are the same
                    if (curLecture.times[j].day == prevLecture.times[k].day) {
                      // if (!(prev.end <= cur.start || cur.end <= prev.start)), then there is a conflict
                      if (!(timeStringToNum(prevLecture.times[k].end) <= timeStringToNum(curLecture.times[j].start) ||
                            timeStringToNum(curLecture.times[j].end) <= timeStringToNum(prevLecture.times[k].start))) {

                        // then there IS a confliect, add to list of errors
                        listOfErrors.add(curr);
                        listOfErrors.add(prev);
                        break;
                      }
                    }
                  }
                }
              }
            }
        }
      }
    }
    return Array.from(listOfErrors);
  }
);

export default warningsAtom;
