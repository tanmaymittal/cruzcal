import selectedTermAtom from '../../atoems/selected-term'
import termsAtom, { TermInfo } from '../../atoms/terms'
import SelectList from '../select-list/select-list'
import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
        
const TermFilter = ({selectedTerm}: {selectedTerm: TermInfo}) => {
  const list = useAtomValue<TermInfo[]>(termsAtom);
  const updateTerm = useUpdateAtom(selectedTermAtom);

  const term = {...selectedTerm};
  term.toString = () => term.name;

  return (
    <SelectList
      listName="Term"
      options={list}
      selected={selectedTerm}
      setSelected={(term: TermInfo) => {
        updateTerm(term);
        // setTermSelection(term);
      }}
    />
  );
}

export default TermFilter
