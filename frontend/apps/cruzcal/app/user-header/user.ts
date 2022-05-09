import {atomWithStorage} from 'jotai/utils';
import {atomWithQuery} from 'jotai/query';
import {atom} from 'jotai';

export interface UserSession {
  displayName: string,
  email: string
};

export const storageUserAtom = atomWithStorage('user', null as UserSession);
export const fetchUserAtom = atomWithQuery((get) => ({
  queryKey: ['users', get(storageUserAtom)],
  queryFn: async ({ queryKey: [, sUser] }) => {
    const storageUser = sUser as UserSession;
    if (storageUser !== null) return storageUser;
    
    const res = await fetch('http://localhost:4200/api/user');
    const user = res.status === 200 ? await res.json() : null;
    console.log(user);
    return user;
  },
}));
export const userAtom = atom(
  (get) => get(fetchUserAtom),
  (get, set, newUser) => set(storageUserAtom, newUser)
);
