import { Suspense, useEffect } from 'react'
import { useUpdateAtom } from 'jotai/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { atom, PrimitiveAtom, Provider, useAtom, useAtomValue } from 'jotai'
import classnames from 'classnames';

import CourseFilter from './CourseFilter'
import SubjectFilter from './SubjectFilter'
import TermFilter from './TermFilter'

import { courseSelectionAtomsAtom, CourseSelector } from '../../atoms/course-selector'
import { DefaultSelectList } from '../select-list/select-list'
import selectedCourseAtom from '../../atoms/selected-course'
import selectedSubjectAtom from '../../atoms/selected-subject'
import selectedTermAtom from '../../atoms/selected-term'

const nullAtom = atom(null);

const warningWrapper = (warnings, selection) =>{
  const baseClasses = ["flex", "flex-wrap", "md:flex-nowrap", "justify-center", "gap-x-3", "mb-5"];
  // check if your current course name exists in any of the warnings
  for (let i = 0; i < warnings.length; i++) {
    if (selection.course == null || selection.subject == null || selection.term == null) {
      break;
    }

    if (selection.course.name == warnings[i].course.name) {
      return classnames(...baseClasses, "border-2", "border-rose-500");
    }
  }

  return classnames(...baseClasses);
}

export const CourseSelection = ({ term, courseAtom, nextCourseAtom, warnings }) => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);
  const RWCourseSelection = useAtom(courseAtom as PrimitiveAtom<CourseSelector>);
  const [courseSelection] = RWCourseSelection;
  const nextCourse = useAtomValue(nextCourseAtom || nullAtom);
  
  const isOnlyCourse = courseListAtoms.length <= 1;
  const remove = () => dispatch({ type: "remove", atom: courseAtom });

  return (
    <Provider>
      <AsyncCourseSelection
        className={warningWrapper(warnings, courseSelection)}
        term={term}
        RWCourseSelection={RWCourseSelection}
        remove={remove}
        nextCourse={nextCourse}
       />;
    </Provider>
  );
};

export const AsyncCourseSelection = ({ className, term, RWCourseSelection, remove, nextCourse }) => {
  const setSelectedTerm = useUpdateAtom(selectedTermAtom);

  const [, setCourseSelection] = RWCourseSelection;

  useEffect(() => {
    setSelectedTerm(term);
    setCourseSelection((prev) => ({term, subject: null, course: null}));
  }, [term]);

  return (
    <div className={className}>
      <div className="basis-2/5">
        <Suspense fallback={<DefaultSelectList/>}>
          <SubjectFilter RWCourseSelection={RWCourseSelection}/>
        </Suspense>
      </div>
      <div className="basis-3/5">
        <Suspense fallback={<DefaultSelectList/>}>
          <CourseFilter RWCourseSelection={RWCourseSelection}/>
        </Suspense>
      </div>
      <TrashButton
        nextCourse={nextCourse}
        disabled={isOnlyCourse}
        removeCourseSelection={remove}
      />
    </div>
  )
}

const TrashButton = ({removeCourseSelection, disabled, nextCourse}) => {
  const setSelectedTerm = useUpdateAtom(selectedTermAtom);
  const setSelectedCourse = useUpdateAtom(selectedCourseAtom);
  const setSelectedSubject = useUpdateAtom(selectedSubjectAtom);

  return (
    <button className='text-white' disabled={disabled} onClick={() => {
      setSelectedTerm(nextCourse?.term || null);
      setSelectedCourse(nextCourse?.course || null);
      setSelectedSubject(nextCourse?.subject || null);
      removeCourseSelection();
    }}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  )
}

export default CourseSelection;
