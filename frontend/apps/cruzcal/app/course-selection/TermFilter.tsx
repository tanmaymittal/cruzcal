import selectedTermAtom from '../../atoms/selected-term'
import termsAtom, { TermInfo } from '../../atoms/terms'
import SelectList from '../select-list/select-list'
import { useAtomValue } from 'jotai'
import { useUpdateAtom, } from 'jotai/utils'

const TermFilter = ({term, onSelect}) => {
  const list = useAtomValue<TermInfo[]>(termsAtom);
  const selectItem = useUpdateAtom(selectedTermAtom);
  return (
    <SelectList
      listName="Course"
      options={list}
      selected={term}
      setSelected={(item: TermInfo) => {
        selectItem(item);
        onSelect(item);
      }}
    />
  );
}

export default TermFilter