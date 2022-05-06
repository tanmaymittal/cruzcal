import selectedTermAtom from '../../atoms/selected-term'
import termsAtom from '../../atoms/terms'
import React, { Suspense } from 'react'
import SelectList, { DefaultSelectList } from '../select-list/select-list'

const TermFilter = ({term, onSelect}) => {
  return (
    <Suspense fallback={<DefaultSelectList/>}>
      <SelectList
        selected={term}
        setSelected={onSelect}
        listName="Term"
        listAtom={termsAtom}
        selectedAtom={selectedTermAtom}
      />
    </Suspense>
  )
}

export default TermFilter