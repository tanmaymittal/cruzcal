import { userAtom, UserSession } from '../../atoms/user';
import { useAtom, PrimitiveAtom, useAtomValue } from 'jotai';
import { Suspense, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ClientOnly from '../client-only/ClientOnly';
import { server } from '../../config';

const fetchCalendar = async (courseList) => {
  const res = await fetch(`${server}/api/schedule`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(courseList, null, 1)
  });
  const schedule = await res.json();
  console.log(schedule);
};

const SubmitGoogleAsync = () => {
  const user = useAtomValue(userAtom as PrimitiveAtom<UserSession>);
  const courseList = {
    termCode: 2222,
    courses: [
      {
        courseID: '50444'
      }
    ]
  };

  const isDisabled = user === null;
  
  return (
    <button
      className='flex gap-3 align-middle px-3 py-1 rounded-lg outline outline-1'
      onClick={() => fetchCalendar(courseList)}
      disabled={isDisabled}
      type="submit"
    >
      <div>Google</div>
      <div>
        <FontAwesomeIcon icon={faCalendarAlt} />
      </div>
    </button>
  )
}

export const SubmitGoogle = () => {
  return (
    <ClientOnly>
      <SubmitGoogleAsync />
    </ClientOnly>
  )
}

export default SubmitGoogle;