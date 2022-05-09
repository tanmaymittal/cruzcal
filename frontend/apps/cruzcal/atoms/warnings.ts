import { atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { courseSelectionsAtom, CourseSelector } from './course-selector';

function timeStringToNum(time: string) {
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
    const courseSelectionAtom = get(courseSelectionsAtom);
    const totalCourseSelections = courseSelectionAtom.length;
    const listOfErrors: Set<CourseSelector> = new Set;

    // if 1 class or less, no warnings
    if (totalCourseSelections < 2) {
      console.log("Printing warnings:"); // TODO: del me
      console.log(listOfErrors); // TODO: del me
      return Array.from(listOfErrors);
    }

    let conflict = false;
    let count = 0;

    const cur = courseSelectionAtom[totalCourseSelections-1]; // most current/recent entry

    for (let i = 0; i < totalCourseSelections-1; i++) {
      // console.log("FOR loop: got here 4."); // TODO: del me

      const prev = courseSelectionAtom[i]; // a previous entry

      if (cur.course != null) {
        // console.log("FOR loop: got here 5."); // TODO: del me

        for (let curLecture of cur.course.lectures) {
          // console.log("FOR loop: got here 6."); // TODO: del me

          if (prev.course != null) {
            // console.log("FOR loop: got here 7."); // TODO: del me

            for (let prevLecture of prev.course.lectures) {
              // console.log("FOR loop: got here 8."); // TODO: del me
              // console.log(prevLecture); // TODO: del me
              // console.log(prevLecture.times[0]); // TODO: del me
              // console.log(prevLecture.times[1]); // TODO: del me
              // console.log(prevLecture.times[2]); // TODO: del me
              // console.log(prevLecture.times[3]); // TODO: del me

              // console.log(curLecture); // TODO: del me
              // console.log(curLecture.times[0]); // TODO: del me
              // console.log(curLecture.times[1]); // TODO: del me
              // console.log(curLecture.times[2]); // TODO: del me
              // console.log(curLecture.times[3]); // TODO: del me

              // for each cur lecture's day+time entry
              for (let j = 0; j < curLecture.times.length; j++) {
                // for each prev lecture's day+time entry
                for (let k = 0; k < prevLecture.times.length; k++) {
                  //console.log("Cur Lec Day: "+curLecture.times[j].day +" and Pre Lec Day: "+ prevLecture.times[k].day + ".")

                  if (curLecture.times[j].day == prevLecture.times[k].day) { // if the two days of week are the same
                    // console.log("FOR loop: got here 9."); // TODO: del me

                    // check the time boundaries
                    // if prev.end <= cur.start || cur.end <= prev.start
                    // then no conflicts, continue

                    // alternatively:
                    // if (!(prev.end <= cur.start || cur.end <= prev.start))
                    if (!(prevLecture.times[k].end <= curLecture.times[j].start || curLecture.times[j].end <= prevLecture.times[k].start)) {
                      // then there IS a confliect, add to list of errors
                      listOfErrors.add(cur);
                      console.log("Scheduling CONFLICT between: " + cur.course.name + " and " + prev.course.name + "."); // TODO: del me
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

    console.log("Got here END."); // TODO: del me

    console.log("Printing warnings:");
    console.log(listOfErrors);
    return Array.from(listOfErrors);
  }
);

export default warningsAtom;
