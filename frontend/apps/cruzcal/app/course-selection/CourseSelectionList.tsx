import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { courseSelectionAtomsAtom, defaultCourseSelection } from '../../atoms/course-selector';
import { useAtom } from 'jotai';
import CourseSelection from './CourseSelection';
import SubmitICS from '../submit-ics/SubmitICS';
import SubmitGoogle from '../submit-google/SubmitGoogle';

const CourseSelectionList = () => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);
  
  const addCourse = () => dispatch({ type: "insert", value: {...defaultCourseSelection} });

  // Print out current state of selected classes
  // const courseList = useAtomValue(courseSelectionsAtom);
  // useEffect(() => {
  //   console.log(JSON.stringify(courseList, null, 2));
  // }, [courseListAtoms]);

  return (
    <div className="basis-2/5">
      {courseListAtoms.map((courseAtom, i) => {
        const nextCourseAtom = courseListAtoms[i+1];
        return <CourseSelection key={`${courseAtom}`} courseAtom={courseAtom} courseListAtoms={courseListAtoms} nextCourseAtom={nextCourseAtom} />;
      })}
      <div className='flex flex-col gap-y-5 align-middle mb-5'>
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