import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter } from "react-router-dom";
import { Suspense, useEffect } from 'react';

import { DefaultComboboxSelect } from '../combobox-select/combobox-select';
import CourseSelection from './CourseSelection';
import {TermFilter} from './CSFilters';  
import WarningDialog from '../warning-dialog/warning-dialog';
import Submit from '../submit/Submit';
import ClientOnly from '../client-only/ClientOnly';

import { courseSelectionAtomsAtom, defaultCourseSelection, scheduleSelectionAtom } from '../../atoms/course-selector';
import selectedTermAtom from '../../atoms/selected-term';
import { TermInfo } from 'apps/cruzcal/atoms/terms';
import OnlineClassesDialog from '../online-classes-dialog/online-classes-dialog';
import { CopyLink } from '../copy-link/CopyLink';
import ImportLink from '../copy-link/ImportLink';

import {
  useSearchParams,
} from "react-router-dom";
import { useUpdateAtom } from 'jotai/utils';
import { CourseSchedule, fetchSchedule } from 'apps/cruzcal/atoms/share-link';

const CourseSelectionListAsync = () => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);
  const [selectedTerm, setSelectedTerm] = useAtom(selectedTermAtom as PrimitiveAtom<TermInfo>);
  const setScheduleSelection = useUpdateAtom(scheduleSelectionAtom);
  const [searchParams] = useSearchParams();
  const scheduleSelection = useAtomValue(scheduleSelectionAtom);

  const addCourse = () => dispatch({ type: "insert", value: {...defaultCourseSelection, term: selectedTerm} });
  const removeCourse = (courseAtom) => dispatch({ type: "remove", atom: courseAtom });

  useEffect(() => {
    if (searchParams.has('termCode') && searchParams.has('courseIDs')) {
      fetchSchedule(`?${searchParams}`)
        .then((schedule: CourseSchedule) => {
          setScheduleSelection(schedule); 
        })
        .catch(console.error);
    }
    console.log(`?${searchParams}`);
  }, [searchParams]);

  return (
    <div>
      <div className="mb-5">
        <OnlineClassesDialog />
      </div>
      <div className="mb-5">
        <WarningDialog />
      </div>
      <div className='mb-5'>
        <h1 className="text-white mb-5">
          Import Schedule
        </h1>
        <ImportLink />
      </div>
      <div className='mb-5'>
        <h1 className="text-white">
          Select Schedule
        </h1>
        <div className="my-5">
          <Suspense fallback={<DefaultComboboxSelect/>}>
            <TermFilter selected={selectedTerm} setSelected={setSelectedTerm}/>
          </Suspense>
        </div>
        {courseListAtoms.map((courseAtom, i) => {
          return (
            <CourseSelection
              key={`${courseAtom}`}
              courseAtom={courseAtom}
              remove={() => removeCourse(courseAtom)}
            />
          );
        })}
        <div className="flex justify-center mb-5">
          <button className="text-4xl text-white" onClick={addCourse}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-y-5 align-middle'>
        <h1 className="text-white ">
          Export Calendar
        </h1>
        <div className='flex justify-center gap-x-3' style={{color: 'white'}}>
          <Submit type='json'/>
          <Submit type='ics'/>
          <Submit type='google'/>
        </div>
        <CopyLink />
      </div>
    </div>
  )
}

export const CourseSelectionList = () => {
  return (
    <ClientOnly>
      <BrowserRouter>
        <CourseSelectionListAsync />
      </BrowserRouter>
    </ClientOnly>
  );
}

export default CourseSelectionList
