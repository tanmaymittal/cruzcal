import { useAtomValue } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import ClientOnly from '../client-only/ClientOnly';

import { CalendarType, fetchCalendar, setupGoogleAuth } from './utilities';

import { termAndCourseSelectionsAtom } from '../../atoms/course-selector';
import { userAuthenticatedAtom } from 'apps/cruzcal/atoms/user';

const SubmitButton = ({type}: {type: CalendarType}) => {
  const {term, courses} = useAtomValue(termAndCourseSelectionsAtom);
  const userAuthenticated = useAtomValue(userAuthenticatedAtom);

  return (
    <button
      className='flex gap-3 align-middle p-1 rounded-lg outline outline-1'
      onClick={() => {
        // Must setup auth window outside of async fn for Safari
        if (type === 'google' && !userAuthenticated) {
          setupGoogleAuth();
        }
        fetchCalendar(type, term, courses)
      }}
      type="submit"
    >
      <div>{type}</div>
      <div>
        <FontAwesomeIcon icon={faCalendarAlt} />
      </div>
    </button>
  )
}

export const Submit = ({type}: {type: CalendarType}) => {
  return (
    <ClientOnly>
      <SubmitButton type={type} />
    </ClientOnly>
  )
}

export default Submit;