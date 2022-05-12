import { Suspense } from 'react';
import classnames from 'classnames';
import { atom, Provider, useAtom, useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

/* Components */
import CourseFilter from './CourseFilter';
import SubjectFilter from './SubjectFilter';
import TermFilter from './TermFilter';

/* Atoms */
import { courseSelectionAtomsAtom } from '../../atoms/course-selector';
import { DefaultSelectList } from '../select-list/select-list';
import selectedCourseAtom from '../../atoms/selected-course';
import selectedSubjectAtom from '../../atoms/selected-subject';
import selectedTermAtom from '../../atoms/selected-term';
import warningsAtom from '../../atoms/warnings';

const nullAtom = atom(null);

// export const CourseSelection = ({ courseListAtoms, courseAtom, nextCourseAtom }) => {
export const CourseSelection = ({ courseListAtoms, courseAtom, nextCourseAtom, warningsAtom }) => { // TODO: testing
  const dispatch = useUpdateAtom(courseSelectionAtomsAtom);
  const RWCourseSelection = useAtom(courseAtom);

  const nextCourse = useAtomValue(nextCourseAtom || nullAtom);
  // const warning = useAtomValue(warningsAtom); // TODO: testing

  const warningWrapper = () =>{
    const baseClasses = ["flex", "flex-wrap", "md:flex-nowrap", "justify-center", "gap-x-3", "mb-5"];
    // check if your current course name exists in any of the warnings
    // check if the warningsAtom has any courses in the listOfErrors set
    // if so, then add those classes to the warningDialog for the user to view

    // if () {
    //   // course.name
    //   return classnames(...baseClasses, "border-2", "border-rose-500");
    // }

    return classnames(...baseClasses);
  }

  return (
    <Provider>
      {/* <div className="flex flex-wrap md:flex-nowrap justify-center gap-x-3 mb-5"> */}
      <div className={warningWrapper()}>
        <div className="basis-3/4">
          <Suspense fallback={<DefaultSelectList/>}>
            <TermFilter RWCourseSelection={RWCourseSelection}/>
          </Suspense>
        </div>
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
        <TrashButton nextCourse={nextCourse} removeCourseSelection={() => dispatch({ type: "remove", atom: courseAtom })}/>
      </div>
    </Provider>
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

export default CourseSelection
