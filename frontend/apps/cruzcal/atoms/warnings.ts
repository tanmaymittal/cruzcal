import { atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { courseSelectionsAtom, CourseSelector } from './course-selector';

function timeStringToNum(time: string) {
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
    if (totalCourseSelections < 2) {
      // console.log("Printing warnings:"); // TODO: del me
      // console.log(listOfErrors); // TODO: del me
      return Array.from(listOfErrors);
    }

    let conflict = false; // used to prevent duplicate conflicts

    for (let i = 0; i < totalCourseSelections; i++) {
      for (let j = i+1; j < totalCourseSelections; j++) {
        let prev = courseSelectionAtom[i]; // a previous entry
        let curr = courseSelectionAtom[j]; // most current/recent entry

        // avoid null entries
        if (curr.course != null && prev.course != null) {
          // to prevent comparing two same instances of the same entry
          if (curr != prev) {
            // if not same term
            if (curr.term.code != prev.term.code) {
              console.log("WARNING: Not the same term. Please try another selection."); // TODO: del me
              listOfErrors.add(curr); // TODO: check if correct
              console.log(listOfErrors); // TODO: del me
              return Array.from(listOfErrors);
            }

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
                        console.log("Scheduling CONFLICT between: " + curr.course.name + " and " + prev.course.name + "."); // prints which two classes conflict // TODO: del me
                        conflict = true; // prevents duplicate conflict
                        break;
                      }
                    }
                  }

                  // prevents duplicate conflict
                  if (conflict) {
                    conflict = false;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log("Printing warnings:"); // TODO: del me
    console.log(listOfErrors); // TODO: del me
    return Array.from(listOfErrors);
  }
);

export default warningsAtom;