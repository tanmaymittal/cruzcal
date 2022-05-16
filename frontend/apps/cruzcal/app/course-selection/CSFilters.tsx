import { Suspense, useEffect } from "react";
import { useAtomValue, useUpdateAtom } from "jotai/utils";

import SelectList, { DefaultSelectList } from "../select-list/select-list";

import coursesAtom, { CourseInfo } from "../../atoms/courses";
import subjectsAtom, { SubjectInfo } from "../../atoms/subjects";
import termsAtom, { TermInfo } from '../../atoms/terms';
import { courseSelectionsAtom } from "../../atoms/course-selector";
import selectedTermAtom from "../../atoms/selected-term";
import selectedSubjectAtom from "../../atoms/selected-subject";
import selectedCourseAtom from "../../atoms/selected-course";

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

  return (
    <SelectList
      listName="Course"
      options={courses}
      selected={selection.course}
      setSelected={(course: CourseInfo) => (
        setSelection((prev) => ({...prev, course}))
      )}
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


export const CSFilters = ({courseSelection, setCourseSelection}) => {
  const setSelectedTerm = useUpdateAtom(selectedTermAtom);
  const setSelectedSubject = useUpdateAtom(selectedSubjectAtom);
  const setSelectedCourse = useUpdateAtom(selectedCourseAtom);

  useEffect(() => {
    setSelectedTerm(courseSelection.term);
    setSelectedSubject(courseSelection.subject);
    setSelectedCourse(courseSelection.course);
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