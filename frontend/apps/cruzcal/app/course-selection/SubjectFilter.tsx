import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';

import SelectList from '../select-list/select-list';

import subjectsAtom, { SubjectInfo } from '../../atoms/subjects';
import selectedSubjectAtom from '../../atoms/selected-subject';


const SubjectFilter = ({RWCourseSelection}) => {
  const [courseSelection, setCourseSelection] = RWCourseSelection;
  const list = useAtomValue<SubjectInfo[]>(subjectsAtom);
  const selectSubject = useUpdateAtom(selectedSubjectAtom);

  const selectedSubject = {...courseSelection.subject};
  selectedSubject.toString = () => selectedSubject.name;

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
