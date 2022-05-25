import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { PrimitiveAtom, Provider, useAtom, useAtomValue } from 'jotai'
import classnames from 'classnames';

import { CSFilters } from './CSFilters'

import { CourseSelector, multipleCourseSelectionsAtom } from '../../atoms/course-selector'
import warningsAtom from '../../atoms/warnings';

export interface CourseSelectionInterface {
  courseAtom: PrimitiveAtom<CourseSelector>;
  remove: () => any;
}

const warningWrapper = (warnings, selection) =>{
  const baseClasses = ['mb-5', 'w-full', 'flex', 'gap-x-3'];
  // check if your current course name exists in any of the warnings
  for (let i = 0; i < warnings.length; i++) {
    if (selection?.course?.name == warnings[i].course.name) {
      return classnames(...baseClasses, "border-2", "border-rose-500");
    }
  }

  return classnames(...baseClasses);
}

export const CourseSelection = ({ courseAtom, remove }: CourseSelectionInterface) => {
  const [courseSelection, setCourseSelection] = useAtom(courseAtom);
  const multipleCourseSelections = useAtomValue(multipleCourseSelectionsAtom);
  const warnings = useAtomValue(warningsAtom);

  return (
    <div className={warningWrapper(warnings, courseSelection)}>
      <Provider>
        <CSFilters
          courseSelection={courseSelection}
          setCourseSelection={setCourseSelection}
        />
      </Provider>
      {multipleCourseSelections && (
        <button aria-label='delete-course' className='text-white' onClick={remove}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      )}
    </div>
  )
};

export default CourseSelection;
