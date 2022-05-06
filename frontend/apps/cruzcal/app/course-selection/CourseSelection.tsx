import CourseFilter from './CourseFilter'
import SubjectFilter from './SubjectFilter'
import TermFilter from './TermFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { PrimitiveAtom, Provider, useAtom } from 'jotai'
import { courseSelectionAtomsAtom, CourseSelector } from '../../atoms/course-selector'
import { FC, Suspense, useEffect } from 'react'
import { useUpdateAtom } from 'jotai/utils'
import { DefaultSelectList } from '../select-list/select-list'

// const CourseSelectionProvider = Provider;
// const CourseSelectionProvider = ({children}) => {
//   return <Provider>{...children}</Provider>;
// };

export const CourseSelection: FC<{courseAtom: PrimitiveAtom<CourseSelector>}> = ({ courseAtom }) => {
  const dispatch = useUpdateAtom(courseSelectionAtomsAtom);
  const deleteCourse = () => dispatch({ type: "remove", atom: courseAtom });

  useEffect(() => {
    console.log("Course atom changed");
  }, [courseAtom]);

  const [{term, subject, course}, setCourseSelection] = useAtom(courseAtom);
  const setTerm = (term) => setCourseSelection((prev) => ({...prev, term}));
  const setSubject = (subject) => setCourseSelection((prev) => ({...prev, subject}));
  const setCourse = (course) => setCourseSelection((prev) => ({...prev, course}));

  return (
    <Provider>
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-x-3 mb-5">
        <div className="basis-3/4">
          <Suspense fallback={<DefaultSelectList/>}>
            <TermFilter term={term} onSelect={setTerm}/>
          </Suspense>
        </div>
        <div className="basis-3/4">
          <Suspense fallback={<DefaultSelectList/>}>
            <SubjectFilter subject={subject} onSelect={setSubject}/>
          </Suspense>
        </div>
        <div className="basis-1/4">
          <Suspense fallback={<DefaultSelectList/>}>
            <CourseFilter course={course} onSelect={setCourse}/>
          </Suspense>
        </div>
        <TrashButton onDelete={deleteCourse} courseAtom={courseAtom}/>
      </div>
    </Provider>
  )
}

const TrashButton = ({onDelete, courseAtom}) => {
  // const resetCourse = useUpdateAtom(courseAtom);
  const del = () => {
    // resetCourse(defaultCourseSelection);
    onDelete();
  }
  return (
    <button className='text-white' onClick={del}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  )
}

export default CourseSelection