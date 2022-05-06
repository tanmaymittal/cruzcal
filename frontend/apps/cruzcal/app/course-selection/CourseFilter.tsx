import coursesAtom from '../../atoms/courses'
import SelectList, { DefaultSelectList } from '../select-list/select-list'
import { Suspense } from 'react';
import selectedCourseAtom from '../../atoms/selected-course';

const CourseFilter = ({course, onSelect}) => {
  return (
    <Suspense fallback={<DefaultSelectList/>}>
      <SelectList
        selected={course}
        setSelected={onSelect}
        listName="Course"
        listAtom={coursesAtom}
        selectedAtom={selectedCourseAtom}
      />
    </Suspense>
  )
}

export default CourseFilter