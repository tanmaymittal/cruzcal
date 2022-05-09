import selectedTermAtom from '../../atoms/selected-term'
import termsAtom, { TermInfo } from '../../atoms/terms'
import SelectList from '../select-list/select-list'
import { useAtomValue } from 'jotai'
import { useUpdateAtom, } from 'jotai/utils'
import { useEffect } from 'react'

const TermFilter = ({RWCourseSelection}) => {
  const [courseSelection, setCourseSelection] = RWCourseSelection;

  const list = useAtomValue<TermInfo[]>(termsAtom);
  const updateTerm = useUpdateAtom(selectedTermAtom);

  return (
    <SelectList
      listName="Term"
      options={list}
      selected={courseSelection.term}
      setSelected={(term: TermInfo) => {
        updateTerm(term);
        setCourseSelection({term, subject: null, course: null});
      }}
    />
  );
}

export default TermFilter