import { atom } from 'jotai';

import { courseSelectionsAtom, CourseSelector } from './course-selector';

const timeStringToNum = (time: string) => {
  const [hr, min] = time.split(':').map((num) => parseInt(num));
  return hr * 60 + min;
}

export const warningsAtom = atom(
  (get) => {
    const courseSelections = get(courseSelectionsAtom);
    const totalCourseSelections = courseSelections.length;
    const listOfErrors: Set<CourseSelector> = new Set;

    // if 1 class or less, no warnings
    if (totalCourseSelections < 2)
      return Array.from(listOfErrors);


    for (let i = 0; i < totalCourseSelections; i++) {
      for (let j = i+1; j < totalCourseSelections; j++) {
        let prev = courseSelections[i]; // a previous entry
        let curr = courseSelections[j]; // most current/recent entry

        // avoid null entries
        if (curr.course != null && prev.course != null) {
          // if not same term
          if (curr.term.code != prev.term.code)
            listOfErrors.add(curr);

          // for each of curr's lectures
          for (let curLecture of curr.course.lectures) {
            const curLecNumMeetings = curLecture?.recurrence?.days?.length || 0;
            // for each of prev's lectures
            for (let prevLecture of prev.course.lectures) {
              const prevLecNumMeetings = prevLecture?.recurrence?.days?.length || 0;
              // for each cur lecture's day+time entry
              for (let j = 0; j < curLecNumMeetings; j++) {
                // for each prev lecture's day+time entry
                for (let k = 0; k < prevLecNumMeetings; k++) {
                  const curDay = curLecture.recurrence.days[j];
                  const prevDay = prevLecture.recurrence.days[k];
                  const curTime = curLecture.recurrence.time;
                  const prevTime = prevLecture.recurrence.time;
                  // if the two days of week are the same
                  if (curDay == prevDay) {
                    // if (!(prev.end <= cur.start || cur.end <= prev.start)), then there is a conflict
                    if (!(timeStringToNum(curTime.end) <= timeStringToNum(prevTime.start) ||
                          timeStringToNum(prevTime.end) <= timeStringToNum(curTime.start))) {

                      // then there IS a conflict, add to list of errors
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
