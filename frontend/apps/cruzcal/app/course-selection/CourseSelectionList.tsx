import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Suspense } from 'react';

import { DefaultSelectList } from '../select-list/select-list';
import CourseSelection from './CourseSelection';
import TermFilter from './TermFilter';  
import WarningDialog from '../warning-dialog/warning-dialog';
import SubmitICS from '../submit-ics/SubmitICS';
import SubmitGoogle from '../submit-google/SubmitGoogle';

import { courseSelectionAtomsAtom, defaultCourseSelection } from '../../atoms/course-selector';
import warningsAtom from '../../atoms/warnings';

const CourseSelectionList = () => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);

  const addCourse = () => dispatch({ type: "insert", value: {...defaultCourseSelection} });

  // Print out current state of selected classes
  const warnings = useAtomValue(warningsAtom);
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
          <TermFilter />
        </Suspense>
      </div>
      {courseListAtoms.map((courseAtom, i) => {
        const nextCourseAtom = courseListAtoms[i+1];
        return <CourseSelection
          key={`${courseAtom}`}
          courseAtom={courseAtom}
          nextCourseAtom={nextCourseAtom}
          warnings={warnings}
          />
      })}
      <div className='flex flex-col gap-y-5 align-middle'>
        <div className="flex justify-center">
          <button className="text-4xl text-white" onClick={addCourse}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        </div>
        <div className='flex justify-center gap-x-3' style={{color: 'white'}}>
          <SubmitGoogle />
          <SubmitICS />
        </div>
      </div>
    </div>
  )
}

export default CourseSelectionList
