import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { courseSelectionAtomsAtom, defaultCourseSelection } from '../../atoms/course-selector';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import CourseSelection from './CourseSelection';
import warningsAtom from 'apps/cruzcal/atoms/warnings';

const CourseSelectionList = () => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);

  const addCourse = () => dispatch({ type: "insert", value: {...defaultCourseSelection} });

  // Print out current state of selected classes
  const warnings = useAtomValue(warningsAtom);
  // useEffect(() => {
  //   console.log(JSON.stringify(courseList, null, 2));
  // }, [courseListAtoms]);

  return (
    <div className="basis-2/5">
      {courseListAtoms.map((courseAtom, i) => {
        const nextCourseAtom = courseListAtoms[i+1];
        // return <CourseSelection key={`${courseAtom}`} courseAtom={courseAtom} courseListAtoms={courseListAtoms} nextCourseAtom={nextCourseAtom} />;
        return <CourseSelection
          key={`${courseAtom}`}
          courseAtom={courseAtom}
          courseListAtoms={courseListAtoms}
          nextCourseAtom={nextCourseAtom}
          warnings={warnings}
          />;
      })}
      <div className="flex justify-center">
        <button className="text-4xl text-white" onClick={addCourse}>
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
      </div>
    </div>
  )
}

export default CourseSelectionList
