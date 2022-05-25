import { PrimitiveAtom, useAtom } from 'jotai';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Suspense } from 'react';

import { DefaultComboboxSelect } from '../combobox-select/combobox-select';
import CourseSelection from './CourseSelection';
import {TermFilter} from './CSFilters';  
import WarningDialog from '../warning-dialog/warning-dialog';
import Submit from '../submit/Submit';
import ClientOnly from '../client-only/ClientOnly';

import { courseSelectionAtomsAtom, defaultCourseSelection } from '../../atoms/course-selector';
import selectedTermAtom from '../../atoms/selected-term';
import { TermInfo } from 'apps/cruzcal/atoms/terms';
import OnlineClassesDialog from '../online-classes-dialog/online-classes-dialog';

const CourseSelectionListAsync = () => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);
  const [selectedTerm, setSelectedTerm] = useAtom(selectedTermAtom as PrimitiveAtom<TermInfo>);

  const addCourse = () => dispatch({ type: "insert", value: {...defaultCourseSelection, term: selectedTerm} });
  const removeCourse = (courseAtom) => dispatch({ type: "remove", atom: courseAtom });

  // const courseList = useAtomValue(courseSelectionsAtom);
  // useEffect(() => {
  //   console.log(JSON.stringify(courseList, null, 2));
  // }, [courseList]);

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
          <button aria-label="add-course" className="text-4xl text-white" onClick={addCourse}>
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
