import subjectsAtom, { SubjectInfo } from '../../atoms/subjects'
import SelectList from '../select-list/select-list'
import selectedSubjectAtom from '../../atoms/selected-subject'
import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const SubjectFilter = ({subject, onSelect}) => {
  const list = useAtomValue<SubjectInfo[]>(subjectsAtom);
  const selectItem = useUpdateAtom(selectedSubjectAtom);
  return (
    <SelectList
      listName="Course"
      options={list}
      selected={subject}
      setSelected={(item: SubjectInfo) => {
        selectItem(item);
        onSelect(item);
      }}
    />
  );
}

export default SubjectFilter