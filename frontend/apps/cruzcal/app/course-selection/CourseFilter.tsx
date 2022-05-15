import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';

import SelectList from '../select-list/select-list'

import coursesAtom from '../../atoms/courses'
import selectedCourseAtom from '../../atoms/selected-course';
import { CourseInfo } from '../../atoms/courses';


const CourseFilter = ({RWCourseSelection}) => {
  const [courseSelection, setCourseSelection] = RWCourseSelection;
  const list = useAtomValue<CourseInfo[]>(coursesAtom);
  const selectCourse = useUpdateAtom(selectedCourseAtom);

  const selectedCourse = {...courseSelection.course};
  selectedCourse.toString = () => (
    `${selectedCourse.coursenum}: ${selectedCourse.name}`
  );

  return (
    <SelectList
      listName="Course"
      options={list}
      disabled={courseSelection.subject ? false : true}
      selected={courseSelection.course}
      setSelected={(course: CourseInfo) => {
        selectCourse(course);
        setCourseSelection((prev) => ({...prev, course}));
      }}
    />
  );
}

export default CourseFilter
