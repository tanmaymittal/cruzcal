import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { server } from "../config";

export interface VersionAction {
  type: 'check';
}

const checkVersion = async (version: number, setVersion: (v: number) => any) => {
  try {
    const res = await fetch(`${server}/api/version/latest`);
    if (res.status !== 200) throw res;
    
    const latestVersion = Number(await res.text());

    // If out of date, reset local storage, set version and reload
    if (latestVersion !== version) {
      window.localStorage.clear();
      setVersion(latestVersion);
      window.location.reload();
    }
    console.log(`CruzCal: v${latestVersion}`);
  } catch (error) {
    console.error(error);
  }
}

const versionStorageAtom = atomWithStorage('version', null);
export const versionAtom = atom(
  (get) => get(versionStorageAtom),
  (get, set, action: VersionAction) => {
    if (action.type === 'check') {
      checkVersion(get(versionStorageAtom), (v) => set(versionStorageAtom, v));
    }
  }
);
