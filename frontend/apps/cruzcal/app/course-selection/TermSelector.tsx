import selectedTermAtom from '../../atoms/selected-term'
import termsAtom, { TermInfo } from '../../atoms/terms'
import SelectList from '../select-list/select-list'
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { courseSelectionsAtom } from 'apps/cruzcal/atoms/course-selector'
        
const TermSelector = () => {
  const terms = useAtomValue<TermInfo[]>(termsAtom);
  const [selectedTerm, updateTerm] = useAtom(selectedTermAtom as PrimitiveAtom<TermInfo>);
  const setCourseSelections = useUpdateAtom(courseSelectionsAtom);

  return (
    <SelectList
      listName="Term"
      options={terms}
      selected={selectedTerm}
      setSelected={(term: TermInfo) => {
        setCourseSelections([{term, subject: null, course: null}]);
        updateTerm(term);
      }}
    />
  );
}

export default TermSelector
