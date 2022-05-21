import { atom } from 'jotai'
import { atomWithQuery } from 'jotai/query'

import { selectedTermAtom } from './selected-term'
import { selectedSubjectAtom } from './selected-subject'
import { TermInfo } from './terms'
import { SubjectInfo } from './subjects'
import { server } from '../config'

export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface CourseInfo {
  name:	string,
  professor: string[],
  coursenum: string,
  section: string,
  courseID: number,
  lectures: {
    location:	string
    recurrence: {
      days: Weekday[],
      time: {
        start: string,
        end: string
      }
    }
  }[]
}

export const coursesUrlAtom = atom((get): string | null => {
  const termInfo = get(selectedTermAtom) as TermInfo;
  const subjectInfo = get(selectedSubjectAtom) as SubjectInfo;
  if (termInfo === null || subjectInfo === null)
    return null;
  else
    return `${server}/api/courses?term=${termInfo.code}&subject=${subjectInfo.name}`;
});

export const coursesQueryAtom = atomWithQuery((get) => ({
  queryKey: ['courses', get(coursesUrlAtom)],
  queryFn: async ({ queryKey: [, url] }): Promise<CourseInfo[]> => {
    if (url === null)
      return [];
    try {
      const res = await fetch(url as string);
      if (res.status != 200) throw res;
      const courses = (await res.json())
        .sort((a: CourseInfo, b: CourseInfo) => {
          const aCnum = parseInt(a.coursenum.replace(/\D/g, ''));
          const bCnum = parseInt(b.coursenum.replace(/\D/g, ''));
          return aCnum - bCnum;
        });
      return courses;
    } catch (error) {
      console.log(await error.json());
      return [];
    }
  },
}))

export const coursesAtom = atom<CourseInfo[]>((get) => get(coursesQueryAtom));

export default coursesAtom;
