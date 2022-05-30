import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query'
import { server } from '../config';

export interface TermInfo {
  // {"code":"2224","date":{"end":"08/26/22","start":"07/25/22"},"name":"2022 Summer Quarter"}
  code: number;
  name: string;
  date: {
    end: string;
    start: string;
  }
}

export const termsQueryAtom = atomWithQuery(
  (get) => ({
    queryKey: ["terms"],
    queryFn: async (): Promise<TermInfo[]> => {
      try {
        const res = await fetch(`${server}/api/terms`);
        const terms = await res.json();
        return terms;
      } catch (error) {
        // console.log(error);
        return [];
      }
    }
  }));

export const termsAtom = atom((get) => get(termsQueryAtom));

export default termsAtom;
