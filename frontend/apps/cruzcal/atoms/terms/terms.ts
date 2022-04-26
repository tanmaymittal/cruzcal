import { atom } from 'jotai'
import { atomWithQuery } from 'jotai/query'

export interface TermInfo {
  // {"code":"2224","date":{"end":"08/26/22","start":"07/25/22"},"name":"2022 Summer Quarter"}
  name: string;
  code: number;
  date: {
    end: Date;
    start: Date;
  }
}

export const termsAtom = atomWithQuery(() => ({
  queryKey: "terms",
  queryFn: async (): Promise<TermInfo[]> => {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await fetch("https://andromeda.miragespace.net/slugsurvival/data/fetch/terms.json");
    return res.json();
  }
}));

export default termsAtom;
