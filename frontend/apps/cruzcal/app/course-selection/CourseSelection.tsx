import CourseFilter from './CourseFilter'
import SubjectFilter from './SubjectFilter'
import TermFilter from './TermFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { atom, PrimitiveAtom, Provider, useAtom, useAtomValue } from 'jotai'
import { courseSelectionAtomsAtom, CourseSelector } from '../../atoms/course-selector'
import { Suspense, useEffect } from 'react'
import { useUpdateAtom } from 'jotai/utils'
import { DefaultSelectList } from '../select-list/select-list'
import selectedCourseAtom from '../../atoms/selected-course'
import selectedSubjectAtom from '../../atoms/selected-subject'
import selectedTermAtom from '../../atoms/selected-term'

const nullAtom = atom(null);

export const CourseSelection = ({ term, courseAtom, nextCourseAtom }) => {
  const [courseListAtoms, dispatch] = useAtom(courseSelectionAtomsAtom);
  const remove = () => {
    if (courseListAtoms.length > 1) {
      dispatch({ type: "remove", atom: courseAtom });
    }
  }
  const RWCourseSelection = useAtom(courseAtom as PrimitiveAtom<CourseSelector>);
  const nextCourse = useAtomValue(nextCourseAtom || nullAtom);

  return (
    <Provider>
      <AsyncCourseSelection term={term} RWCourseSelection={RWCourseSelection} remove={remove} nextCourse={nextCourse} />;
    </Provider>
  );
};

export const AsyncCourseSelection = ({ term, RWCourseSelection, remove, nextCourse }) => {
  const setSelectedTerm = useUpdateAtom(selectedTermAtom);

  useEffect(() => {
    setSelectedTerm(term);
  }, [term]);

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-center gap-x-4">
      <div className="basis-3/4">
        <Suspense fallback={<DefaultSelectList/>}>
          <SubjectFilter RWCourseSelection={RWCourseSelection}/>
        </Suspense>
      </div>
      <div className="basis-1/4">
        <Suspense fallback={<DefaultSelectList/>}>
          <CourseFilter RWCourseSelection={RWCourseSelection}/>
        </Suspense>
      </div>
      <TrashButton nextCourse={nextCourse} removeCourseSelection={remove}/>
    </div>
  )
}

const TrashButton = ({removeCourseSelection, nextCourse}) => {
  const setSelectedTerm = useUpdateAtom(selectedTermAtom);
  const setSelectedCourse = useUpdateAtom(selectedCourseAtom);
  const setSelectedSubject = useUpdateAtom(selectedSubjectAtom);

  return (
    <button className='text-white' onClick={() => {
      if (nextCourse) {
        setSelectedTerm(nextCourse.term);
        setSelectedCourse(nextCourse.course);
        setSelectedSubject(nextCourse.subject);
      } else {
        setSelectedTerm(null);
        setSelectedCourse(null);
        setSelectedSubject(null);
      }
      removeCourseSelection();
    }}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  )
}

export default CourseSelection;