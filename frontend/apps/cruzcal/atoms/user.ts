import { atomWithStorage, atomWithReset } from 'jotai/utils';
import {atomWithQuery} from 'jotai/query';
import {atom} from 'jotai';
import { server } from '../config';

export interface UserSession {
  displayName: string,
  email: string
};

export const storageUserAtom = atomWithStorage('user', null as UserSession);
export const fetchUserAtom = atomWithQuery((get) => ({
  queryKey: ['user', get(storageUserAtom)],
  queryFn: async ({ queryKey: [, sUser] }) => {
    const storageUser = sUser as UserSession;
    if (storageUser !== null) return storageUser;
    const res = await fetch(`${server}/api/user`);
    const user = res.status === 200 ? await res.json() : null;
    // console.log(user);
    return user;
  },
}));
export const userAuthenticatedAtom = atomWithQuery((get) => ({
  queryKey: ['userAuthenticated'],
  queryFn: async ({}) => {
    const res = await fetch(`${server}/api/auth/check`);
    return res.status === 200;
  },
}));

export const userAtom = atom(
  (get) => get(fetchUserAtom),
  (get, set, newUser) => set(storageUserAtom, newUser)
);
