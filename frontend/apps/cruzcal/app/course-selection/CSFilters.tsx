import { Suspense, useEffect } from "react";
import { useAtomValue, useUpdateAtom } from "jotai/utils";

import SelectList, { DefaultSelectList } from "../select-list/select-list";

import coursesAtom, { CourseInfo } from "../../atoms/courses";
import subjectsAtom, { SubjectInfo } from "../../atoms/subjects";
import termsAtom, { TermInfo } from '../../atoms/terms';
import { courseSelectionsAtom, CourseSelector } from "../../atoms/course-selector";
import selectedTermAtom from "../../atoms/selected-term";
import selectedSubjectAtom from "../../atoms/selected-subject";
import selectedCourseAtom from "../../atoms/selected-course";
import { atom } from "jotai";

export const SubjectFilter = ({selection, setSelection}) => {
  const subjects = useAtomValue(subjectsAtom);
  
  return (
    <SelectList
      listName="Subject"
      options={subjects}
      selected={selection.subject}
      setSelected={(subject: SubjectInfo) => (
        setSelection((prev) => ({...prev, subject, course: null}))
      )}
    />
  );
};

export const CourseFilter = ({selection, setSelection}) => {
  const courses = useAtomValue(coursesAtom);

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

  useEffect(() => {
    fetchCourseSelection(courseSelection);
  }, [courseSelection]);

  return (
    <div className='w-full grid grid-cols-[2fr_3fr] gap-x-3'>
      <Suspense fallback={<DefaultSelectList />}>
        <SubjectFilter selection={courseSelection} setSelection={setCourseSelection}/>
      </Suspense>
      <Suspense fallback={<DefaultSelectList />}>
        <CourseFilter selection={courseSelection} setSelection={setCourseSelection}/>
      </Suspense>
    </div>
  );
};