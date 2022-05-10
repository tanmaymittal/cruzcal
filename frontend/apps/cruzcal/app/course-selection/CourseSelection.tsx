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
import { DefaultSelectList } from '../select-list/select-list';

/* Atoms */
import { courseSelectionAtomsAtom } from '../../atoms/course-selector';
import selectedCourseAtom from '../../atoms/selected-course';
import selectedSubjectAtom from '../../atoms/selected-subject';
import selectedTermAtom from '../../atoms/selected-term';
import { CourseSelector } from '../../atoms/course-selector';

const nullAtom = atom(null);

export const CourseSelection = ({ courseListAtoms, courseAtom, nextCourseAtom, warningsAtom }) => {
  const dispatch = useUpdateAtom(courseSelectionAtomsAtom);
  const RWCourseSelection = useAtom(courseAtom);

  const nextCourse = useAtomValue(nextCourseAtom || nullAtom);
  const warnings = useAtomValue(warningsAtom) as CourseSelector[];
  const curSelection = useAtomValue(courseAtom) as CourseSelector;

  const warningWrapper = () =>{
    const baseClasses = ["flex", "flex-wrap", "md:flex-nowrap", "justify-center", "gap-x-3", "mb-5"];
    // check if your current course name exists in any of the warnings
    for (let i = 0; i < warnings.length; i++) {
      if (curSelection.course == null) {
          continue;
        }

      if (warnings[i].course.name == curSelection.course.name) {
        return classnames(...baseClasses, "border-2", "border-rose-500", "rounded-lg");
      }
    }

    return classnames(...baseClasses);
  }

  return (
    <Provider>
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
