import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Suspense } from 'react';

import { DefaultSelectList } from '../select-list/select-list';
import CourseSelection from './CourseSelection';
import TermSelector from './TermSelector';  
import WarningDialog from '../warning-dialog/warning-dialog';
import Submit from '../submit/Submit';
import ClientOnly from '../client-only/ClientOnly';

import { courseSelectionAtomsAtom, courseSelectionsAtom, defaultCourseSelection } from '../../atoms/course-selector';
import selectedTermAtom from '../../atoms/selected-term';

const CourseSelectionListAsync = () => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);
  const selectedTerm = useAtomValue(selectedTermAtom);

  const addCourse = () => dispatch({ type: "insert", value: {...defaultCourseSelection, term: selectedTerm} });
  const removeCourse = (courseAtom) => dispatch({ type: "remove", atom: courseAtom });

  // const courseList = useAtomValue(courseSelectionsAtom);
  // useEffect(() => {
  //   console.log(JSON.stringify(courseList, null, 2));
  // }, [courseList]);

  return (
    <div className="basis-2/5">
      <div className="mb-5">
        <WarningDialog />
      </div>
      <div className="mb-5">
        <Suspense fallback={<DefaultSelectList/>}>
          <TermSelector />
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
