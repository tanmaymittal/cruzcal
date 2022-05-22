import { Suspense, useEffect } from "react";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import classnames from 'classnames';
import { atom, useAtom } from "jotai";

import SelectList, { DefaultSelectList } from "../select-list/select-list";

import coursesAtom, { CourseInfo } from "../../atoms/courses";
import subjectsAtom, { SubjectInfo } from "../../atoms/subjects";
import termsAtom, { TermInfo } from '../../atoms/terms';
import { courseSelectionsAtom, CourseSelector } from "../../atoms/course-selector";
import selectedTermAtom from "../../atoms/selected-term";
import selectedSubjectAtom from "../../atoms/selected-subject";
import selectedCourseAtom from "../../atoms/selected-course";
import warningsAtom from '../../atoms/warnings';


const warningWrapper = (warnings, selection) =>{
  const baseClasses = [''];
  // check if your current course name exists in any of the warnings
  for (let i = 0; i < warnings.length; i++) {
    if (selection.course == null || selection.subject == null || selection.term == null) {
      break;
    }

    if (selection.course.name == warnings[i].course.name) {
      // return true;
      return classnames(...baseClasses, "border-2", "border-rose-500", "rounded-lg");
    }
  }

  // return false;
  return classnames(...baseClasses);
}

export const SubjectFilter = ({selection, setSelection, warnings}) => {
  const subjects = useAtomValue(subjectsAtom);
  const selectedTerm = useAtomValue(selectedTermAtom);
  return (
    <SelectList
      listName="Subject"
      options={subjects}
      selected={selection.subject}
      disabled={selectedTerm ? false : true}
      warnings={warningWrapper(warnings, selection) ? true : false}
      setSelected={(subject: SubjectInfo) => (
        setSelection((prev) => ({...prev, subject, course: null}))
      )}
    />
  );
};

export const CourseFilter = ({selection, setSelection, warnings}) => {
  const courses = useAtomValue(coursesAtom);
  const selectedSubject = useAtomValue(selectedSubjectAtom);

  const coursesMap = {};

  const mapSelection = (course) => {
    if (course === null) return null;
    else {
      const name = `${course.coursenum}: ${course.name}`;
      coursesMap[name] = course;
      return {...course, name};
    }
  };

  return (
    <SelectList
      listName="Course"
      options={courses.map(mapSelection)}
      selected={mapSelection(selection.course)}
      disabled={selectedSubject ? false : true}
      warnings={warningWrapper(warnings, selection) ? true : false}
      setSelected={(courseInfo: CourseInfo) => {
        const course: CourseInfo = coursesMap[courseInfo.name] || null;
        setSelection((prev) => ({...prev, course}));
      }}
    />
  );
};

export const TermFilter = ({selected, setSelected}) => {
  const terms = useAtomValue(termsAtom);
  const setCourseSelections = useUpdateAtom(courseSelectionsAtom);

  return (
    <SelectList
      listName="Term"
      options={terms}
      selected={selected}
      setSelected={(term: TermInfo) => {
        setSelected(term);
        setCourseSelections([{term, subject: null, course: null}]);
      }}
    />
  );
}

const fetchCourseSelectionAtom = atom(null, (get, set, courseSelection: CourseSelector) => {
  set(selectedTermAtom, courseSelection.term);
  set(selectedSubjectAtom, courseSelection.subject);
  set(selectedCourseAtom, courseSelection.course);
})

export const CSFilters = ({courseSelection, setCourseSelection}) => {
  const fetchCourseSelection = useUpdateAtom(fetchCourseSelectionAtom);
  const warnings = useAtomValue(warningsAtom);

  useEffect(() => {
    fetchCourseSelection(courseSelection);
  }, [courseSelection]);

  return (
    <div className='w-full grid grid-cols-[2fr_3fr] gap-x-3'>
      <Suspense fallback={<DefaultSelectList />}>
        <SubjectFilter selection={courseSelection} setSelection={setCourseSelection} warnings={warnings}/>
      </Suspense>
      <Suspense fallback={<DefaultSelectList />}>
        <CourseFilter selection={courseSelection} setSelection={setCourseSelection} warnings={warnings}/>
      </Suspense>
    </div>
  );
};