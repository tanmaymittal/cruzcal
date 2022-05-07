import subjectsAtom, { SubjectInfo } from '../../atoms/subjects'
import SelectList from '../select-list/select-list'
import selectedSubjectAtom from '../../atoms/selected-subject'
import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const SubjectFilter = ({RWCourseSelection}) => {
  const [courseSelection, setCourseSelection] = RWCourseSelection;
  const list = useAtomValue<SubjectInfo[]>(subjectsAtom);
  const selectSubject = useUpdateAtom(selectedSubjectAtom);
  return (
    <SelectList
      listName="Subject"
      options={list}
      selected={courseSelection.subject}
      setSelected={(subject: SubjectInfo) => {
        selectSubject(subject);
        setCourseSelection((prev) => ({...prev, subject, course: null}));
      }}
    />
  );
}

export default SubjectFilter