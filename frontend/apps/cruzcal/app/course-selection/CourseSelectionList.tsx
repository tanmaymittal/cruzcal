import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { courseSelectionsAtom, courseSelectionAtomsAtom, defaultCourseSelection } from '../../atoms/course-selector';
import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect } from 'react'
import CourseSelection from './CourseSelection';

const CourseSelectionList = () => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);
  
  // Row modification operations
  const addCourse = () => dispatch({ type: "insert", value: {...defaultCourseSelection} });

  // Print out current state of selected classes
  const courseList = useAtomValue(courseSelectionsAtom);
  useEffect(() => {
    console.log(JSON.stringify(courseList, null, 2));
  }, [courseList]);

  return (
    <div className="basis-2/5">
      {courseListAtoms.map((courseAtom) => (
        <CourseSelection key={`${courseAtom}`} courseAtom={courseAtom} />
      ))}
      <div className="flex justify-center">
        {/* TODO: Add button component to add another row of dropdowns */}
        <button className="text-4xl text-white" onClick={addCourse}>
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
      </div>
    </div>
  )
}

export default CourseSelectionList