import { atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { courseSelectionsAtom, CourseSelector } from './course-selector';

function stringToTime(time: string) {
  // "times":
  //   {
  //     "day": "Monday",
  //     "start": "20:35",
  //     "end": "23:15"
  //   }
  let temp: string;
  temp = time[0] + time[1] + time[3] + time[4];
  // let num = number +time[0];
  let num: number = +temp;
  console.log(num);
  return num;
}

export const warningsAtom = atom(
  (get) => {
    console.log("go here warnings:"); // TODO: del me
    const courseSelectionAtom = get(courseSelectionsAtom);
    const totalCourseSelections = courseSelectionAtom.length;

    const listOfErrors: Set<CourseSelector> = new Set;

    // if 1 class or less, no warnings
    if (totalCourseSelections < 2) {
      console.log("Printing warnings:"); // TODO: del me
      console.log(listOfErrors); // TODO: del me
      return Array.from(listOfErrors);
    }

    const cur = courseSelectionAtom[totalCourseSelections-1]; // most current/recent entry

    for (let i = 0; i < totalCourseSelections-1; i++) {
      const prev = courseSelectionAtom[i]; // a previous entry

      for (let curLecture of cur.course.lectures) {
        for (let prevLecture of prev.course.lectures) {
        // for (let ltime of lecture.times) {
          if (curLecture.times[0] == prevLecture.times[0]) { // `0` represents Weekday
            // check the time boundaries
            // if prev.end <= cur.start || cur.end <= prev.start
            // then no conflicts, continue

            // alternatively:
            // if (!(prev.end <= cur.start || cur.end <= prev.start)) {}
            // then there IS a confliect, add to list of errors
            // listOfErrors.add(cur);
            // console.log("Printing warnings:"); // TODO: del me
            // console.log(listOfErrors); // TODO: del me
            // return Array.from(listOfErrors);
          }

          console.log("got here 1"); // TODO: del me

          // // Check each _other_ course
          // for (let j = 0; j < totalCourseSelections; j++) {
          //   if (i == j) { continue; }

          //   // L1: check if on the same day
          //     // 1st fcheck: do they have the same start & end times


          //   const other = useAtomValue(courseSelectionAtom[j]);
          //   // this must chech each lecture and time against the cur
          //   // and add cur to the list of errors if it conflicts
          //   listOfErrors.add(cur);
          // }

          // ltime
        }
      }
    }

    console.log("Printing warnings:");
    console.log(listOfErrors);
    return Array.from(listOfErrors);
  }
);

export default warningsAtom;
