import subjectsAtom from '../../atoms/subjects'
import SelectList, { DefaultSelectList } from '../select-list/select-list'
import { Suspense } from 'react'
import selectedSubjectAtom from '../../atoms/selected-subject'

const SubjectFilter = ({subject, onSelect}) => {
  return (
    <Suspense fallback={<DefaultSelectList/>}>
      <SelectList
        selected={subject}
        setSelected={onSelect}
        listName="Subject"
        listAtom={subjectsAtom}
        selectedAtom={selectedSubjectAtom}
      />
    </Suspense>
  )
}

export default SubjectFilter