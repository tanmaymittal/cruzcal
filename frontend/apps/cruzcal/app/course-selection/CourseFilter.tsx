import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';

/* Components */
import coursesAtom from '../../atoms/courses';
import SelectList from '../select-list/select-list'
import selectedCourseAtom from '../../atoms/selected-course';
import { CourseInfo } from '../../atoms/courses';


const CourseFilter = ({RWCourseSelection}) => {
  const [courseSelection, setCourseSelection] = RWCourseSelection;
  const list = useAtomValue<CourseInfo[]>(coursesAtom);
  const selectCourse = useUpdateAtom(selectedCourseAtom);
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
