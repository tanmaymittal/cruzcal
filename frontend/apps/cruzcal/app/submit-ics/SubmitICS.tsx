import { userAtom, UserSession } from '../../atoms/user';
import { useAtom, PrimitiveAtom, useAtomValue } from 'jotai';
import { Suspense, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ClientOnly from '../client-only/ClientOnly';
import { courseSelectionsAtom } from 'apps/cruzcal/atoms/course-selector';

const fetchCalendar = async (calendarType, courseList) => {
  if (courseList.length === 0) return;

  const cs = {
    termCode: courseList[0]?.term?.code || null,
    courseIDs: courseList
      .filter(({course}) => course !== null)
      .map(({course}) => `${course.courseID}`)
  }

  console.log(courseList);


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
    console.log(scheduleURI);
    location.href = scheduleURI;
  }
};

const SubmitICSAsync = () => {
  const courseList = useAtomValue(courseSelectionsAtom);

  return (
    // <form action='post' method='/api/calendar/ics'>
      <button
        className='flex gap-3 align-middle p-1 rounded-lg outline outline-1'
        onClick={() => fetchCalendar('ics', courseList)}
        type="submit"
      >
        <div>ICS</div>
        <div>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </div>
      </button>
    // </form>
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