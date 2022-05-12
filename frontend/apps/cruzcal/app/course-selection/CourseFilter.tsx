import coursesAtom from '../../atoms/courses'
import SelectList from '../select-list/select-list'
import selectedCourseAtom from '../../atoms/selected-course';
import { useAtomValue } from 'jotai';
import { CourseInfo } from '../../atoms/courses';
import { useUpdateAtom } from 'jotai/utils';

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
      selected={courseSelection.course}
      setSelected={(course: CourseInfo) => {
        selectCourse(course);
        setCourseSelection((prev) => ({...prev, course}));
      }}
    />
  );
}

export default CourseFilter