import { userAtom, UserSession } from '../../atoms/user';
import { useAtom, PrimitiveAtom, useAtomValue } from 'jotai';
import { Suspense, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ClientOnly from '../client-only/ClientOnly';
import { courseSelectionsAtom } from 'apps/cruzcal/atoms/course-selector';

const fetchCalendar = async (calendarType, term, courseList) => {
  if (term === null)
    return console.error('No term provided');
  if (courseList.length === 0)
    return console.error('No courses selected');
  if (courseList.filter(({course}) => course === null).length > 0)
    return console.error('Incomplete course selection');

  const cs = {
    termCode: term.code,
    courseIDs: courseList.map(({course}) => `${course.courseID}`)
  }

  console.log(cs);

  const res = await fetch(`/api/schedule/${calendarType}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cs, null, 1)
  });

  if (res.status !== 201) {
    const error = await res.json();
    console.log(error);
  } else {
    const {uri: scheduleURI} = await res.json();
    console.log('Schedule URI:', scheduleURI);
    location.href = scheduleURI;
  }
};

const SubmitICSAsync = () => {
  const courseList = useAtomValue(courseSelectionsAtom);

  return (
    <button
      className='flex gap-3 align-middle p-1 rounded-lg outline outline-1'
      onClick={() => fetchCalendar('ics', courseList[0].term, courseList)}
      type="submit"
    >
      <div>ICS</div>
      <div>
        <FontAwesomeIcon icon={faCalendarAlt} />
      </div>
    </button>
  )
}

export const SubmitICS = () => {
  return (
    <ClientOnly>
      <SubmitICSAsync />
    </ClientOnly>
  )
}

export default SubmitICS;