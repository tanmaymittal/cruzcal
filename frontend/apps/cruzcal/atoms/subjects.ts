import { atom } from "jotai";
import { atomWithQuery } from "jotai/query";
import selectedCourseAtom from "./selected-course";
import { selectedTermAtom } from './selected-term';
import { TermInfo } from "./terms";

export interface SubjectInfo {
  // {"code":"2224","date":{"end":"08/26/22","start":"07/25/22"},"name":"2022 Summer Quarter"}
  name: string;
}

const subjectsUrlAtom = atom((get): string => {
  const termInfo: TermInfo = get(selectedTermAtom) as TermInfo;
  if (termInfo === null)
    return null;
  else
    return `http://localhost:4200/api/subjects?term=${termInfo.code}`;
});

export const subjectsQueryAtom = atomWithQuery((get) => ({
  queryKey: ["subjects", get(subjectsUrlAtom)],
  queryFn: async ({ queryKey: [, url] }): Promise<SubjectInfo[]> => {
    if (url === null)
      return [];
    try {
      const res = await fetch(url as string);
      const subjects = await res.json();
      if (res.status != 200) throw res;
      return subjects
        .sort((a: string, b: string) => a.localeCompare(b))
        .map((name: string) => ({name}));
    } catch (error) {
      console.log(error);
      return [];
    }
  },
}));

export const subjectsAtom = atom((get) => get(subjectsQueryAtom));

export default subjectsAtom;
