import { atom } from 'jotai'
import { atomWithQuery } from 'jotai/query'
import { TermInfo, termsAtom } from '../terms/terms';

export const selectedTermAtom = atom(
  (get) => get(termsAtom)[0] || {
    name:"none selected",
    code: -1,
    date: {
      end: new Date(),
      start:new Date(),
    }
  } as TermInfo
);

export default selectedTermAtom;
