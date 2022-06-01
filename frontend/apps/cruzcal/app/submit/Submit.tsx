import { useAtom, useAtomValue } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import ClientOnly from '../client-only/ClientOnly';

import { CalendarType, fetchCalendar } from './utilities';

import { scheduleSelectionAtom } from '../../atoms/course-selector';
import { userAuthenticatedAtom } from '../../atoms/user';

const SubmitButton = ({type}: {type: CalendarType}) => {
  const schedule = useAtomValue(scheduleSelectionAtom);
  const [authenticated, checkAuthenticated] = useAtom(userAuthenticatedAtom);

  return (
    <button
      className={`flex gap-3 align-middle px-3 py-1 rounded-lg outline outline-1 bg-white text-black ${type === 'google' ? 'capitalize' : 'uppercase'}`}
      onClick={() => fetchCalendar(type, schedule, authenticated, checkAuthenticated)}
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