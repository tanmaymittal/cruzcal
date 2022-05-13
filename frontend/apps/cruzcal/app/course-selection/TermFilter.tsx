import selectedTermAtom from '../../atoms/selected-term'
import termsAtom, { TermInfo } from '../../atoms/terms'
import SelectList from '../select-list/select-list'
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai'
        
const TermFilter = () => {
  const list = useAtomValue<TermInfo[]>(termsAtom);
  const [selectedTerm, updateTerm] = useAtom(selectedTermAtom as PrimitiveAtom<TermInfo>);

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
