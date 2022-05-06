import coursesAtom from '../../atoms/courses'
import SelectList from '../select-list/select-list'
import selectedCourseAtom from '../../atoms/selected-course';
import { useAtomValue } from 'jotai';
import { CourseInfo } from '../../atoms/courses';
import { useUpdateAtom } from 'jotai/utils';

const CourseFilter = ({course, onSelect}) => {
  const list = useAtomValue<CourseInfo[]>(coursesAtom);
  const selectItem = useUpdateAtom(selectedCourseAtom);
  return (
    <SelectList
      listName="Course"
      options={list}
      selected={course}
      setSelected={(item: CourseInfo) => {
        selectItem(item);
        onSelect(item);
      }}
    />
  );
}

export default CourseFilter