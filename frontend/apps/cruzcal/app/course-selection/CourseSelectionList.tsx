import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Suspense } from 'react';
import { useAtom, useAtomValue } from 'jotai';

import CourseSelection from './CourseSelection';
import TermFilter from './TermFilter';  
import { DefaultSelectList } from '../select-list/select-list';
import SubmitICS from '../submit-ics/SubmitICS';
import SubmitGoogle from '../submit-google/SubmitGoogle';

import { courseSelectionAtomsAtom, defaultCourseSelection } from '../../atoms/course-selector';
import termsAtom from 'apps/cruzcal/atoms/terms';
import selectedTermAtom from 'apps/cruzcal/atoms/selected-term';
import warningsAtom from 'apps/cruzcal/atoms/warnings';

const CourseSelectionList = () => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);

  const selectedTerm = useAtomValue(selectedTermAtom);
  const addCourse = () => dispatch({ type: "insert", value: {...defaultCourseSelection} });

  // Print out current state of selected classes
  const warnings = useAtomValue(warningsAtom);
  // useEffect(() => {
  //   console.log(JSON.stringify(courseList, null, 2));
  // }, [courseList]);

  return (
    <div className="basis-2/5">
      <div className="mb-5">
        <Suspense fallback={<DefaultSelectList/>}>
          <TermFilter selectedTerm={selectedTerm}/>
        </Suspense>
      </div>
      {courseListAtoms.map((courseAtom, i) => {
        const nextCourseAtom = courseListAtoms[i+1];
        return <CourseSelection
          key={`${courseAtom}`}
          term={selectedTerm}
          courseAtom={courseAtom}
          nextCourseAtom={nextCourseAtom}
          warnings={warnings}
          />;
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
