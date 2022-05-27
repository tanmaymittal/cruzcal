import { PrimitiveAtom, useAtom } from 'jotai';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Suspense, useEffect } from 'react';

import { DefaultComboboxSelect } from '../combobox-select/combobox-select';
import CourseSelection from './CourseSelection';
import {TermFilter} from './CSFilters';  
import WarningDialog from '../warning-dialog/warning-dialog';
import Submit from '../submit/Submit';
import ClientOnly from '../client-only/ClientOnly';

import { courseSelectionAtomsAtom, courseSelectionsAtom, defaultCourseSelection, fetchSchedule } from '../../atoms/course-selector';
import selectedTermAtom from '../../atoms/selected-term';
import { TermInfo } from 'apps/cruzcal/atoms/terms';
import OnlineClassesDialog from '../online-classes-dialog/online-classes-dialog';
import { useUpdateAtom } from 'jotai/utils';

const CourseSelectionListAsync = () => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);
  const [selectedTerm, setSelectedTerm] = useAtom(selectedTermAtom as PrimitiveAtom<TermInfo>);
  const [courseSelections, setCourseSelections] = useAtom(courseSelectionsAtom);

  const addCourse = () => dispatch({ type: "insert", value: {...defaultCourseSelection, term: selectedTerm} });
  const removeCourse = (courseAtom) => dispatch({ type: "remove", atom: courseAtom });

  useEffect(() => {
    console.log(JSON.stringify(courseSelections, null, 1));
  }, [courseSelections])

  // useEffect(() => {
  //   const query = new URLSearchParams(location.search);
  //   if (query.get('termCode') !== null && query.getAll('courseIDs').length > 0) {
  //     console.log(location.search);
  //     fetchSchedule(location.search)
  //       .then((schedule) => {
  //         console.log(schedule);
  //         setSelectedTerm(schedule.term);
  //         setCourseSelections(schedule.courses)
  //       })
  //       .catch(console.error);
  //   }
  // }, [location.search]);

  return (
    <div>
      <div className="mb-5">
        <OnlineClassesDialog />
      </div>
      <div className="mb-5">
        <WarningDialog />
      </div>
      <div className="mb-5">
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
      <div className='flex flex-col gap-y-5 align-middle'>
        <div className="flex justify-center">
          <button className="text-4xl text-white" onClick={addCourse}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        </div>
        <div className='flex justify-center gap-x-3' style={{color: 'white'}}>
          <Submit type='json'/>
          <Submit type='ics'/>
          <Submit type='google'/>
        </div>
      </div>
    </div>
  )
}

export const CourseSelectionList = () => {
  return (
    <ClientOnly>
      <CourseSelectionListAsync />
    </ClientOnly>
  );
}

export default CourseSelectionList
