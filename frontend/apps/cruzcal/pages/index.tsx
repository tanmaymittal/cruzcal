/* eslint-disable @next/next/no-img-element */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons'
import {atomWithStorage} from 'jotai/utils'
import { Dispatch, useState, useEffect, Suspense } from 'react';
import { useAtom } from 'jotai';
import { atomWithQuery } from 'jotai/query';
import ClientOnly from '../app/client-only/ClientOnly';

export interface User {
  displayName: string,
  email: string
};

const userAtom = atomWithStorage('user', null as User);
// const fetchUserAtom = atomWithQuery()

async function authenticate() {
  location.href = '/api/auth/google';
}

async function fetchUser(setUser: Dispatch<User>) {
  try {
    const res = await fetch('http://localhost:4200/api/user');
    if (res.status !== 200) throw res;
    const user = await res.json();
    setUser(user);
  } catch (error) {
    setUser(null);
  }
}

async function logout(setUser: Dispatch<User>) {
  try {
    const res = await fetch('http://localhost:4200/api/logout', {
      method: 'post'
    });
    if (res.status !== 200) throw res;
    const {path} = await res.json();
    console.log(path);
    setUser(null);
  } catch (error) {
    console.log(error);
  }
}

const Title = ({className, children}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

const User = ({className}) => {
  const [user, setUser]: [User, Dispatch<User>] = useAtom(userAtom);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  if (user === null)
    return (
      <button className='flex gap-3 align-middle' onClick={authenticate}>
        <div className={className}>Log in</div>
        <div>
          <FontAwesomeIcon icon={faSignIn} />
        </div>
      </button>
    );

  const {displayName} = user;

  return (
    <div className='flex gap-5 align-middle'>
      <div className={className}>
        Hi, {displayName}
      </div>
      <div>|</div>
      <button className='flex gap-3 align-middle' onClick={() => logout(setUser)}>
        <div className={className}>Log out</div>
        <div>
          <FontAwesomeIcon icon={faSignOut} />
        </div>
      </button>
    </div>
  )
}

export function Index() {
  /*
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <div className="w-screen p-2">
      <div className="p-2">
        {/* TODO: Header Components */}
        <div className="mb-10 text-white">
          <Title className="flex flex-row justify-between">
            <h1 className="basis-6/10 text-6xl mb-2">CruzCal</h1>
            <ClientOnly className="basis-4/10 text-3xl">
              <User className=""/>
            </ClientOnly>
          </Title>
          <div className="flex justify-center items-center">
            <p className="text-xl mb-2">All your classes. One calendar file.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-x-14">
          <div className="basis-3/5 border-solid border-2 border-white text-white">
            <h2 className="text-3xl mb-5">April 2022</h2>
          </div>
          <div className="basis-2/5">
            <div className="flex justify-center">
            </div>
          </div>
        </div>
        <div className="">
          Footer
        </div>
      </div>

    </div>
  );
}

export default Index;
