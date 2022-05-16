import coursesAtom, { CourseInfo } from "apps/cruzcal/atoms/courses";
import selectedCourseAtom from "apps/cruzcal/atoms/selected-course";
import selectedSubjectAtom from "apps/cruzcal/atoms/selected-subject";
import selectedTermAtom from "apps/cruzcal/atoms/selected-term";
import subjectsAtom, { SubjectInfo } from "apps/cruzcal/atoms/subjects";
import { useUpdateAtom, useAtomValue, waitForAll } from "jotai/utils";
import { useEffect } from "react";
import SelectList from "../select-list/select-list";

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
}

export const CourseSelectionFilters = ({ selection, setSelection }) => {
  const setSelectedTerm = useUpdateAtom(selectedTermAtom);
  const setSelectedSubject = useUpdateAtom(selectedSubjectAtom);
  const setSelectedCourse = useUpdateAtom(selectedCourseAtom);

  useEffect(() => {
    setSelectedTerm(selection.term);
    setSelectedSubject(selection.subject);
    setSelectedCourse(selection.course);
  }, [selection]);

  return (
    <div className='w-full grid grid-cols-[2fr_3fr] gap-x-3'>
      <div>
        <SubjectFilter selection={selection} setSelection={setSelection}/>
      </div>
      <div>
        <CourseFilter selection={selection} setSelection={setSelection}/>
      </div>
    </div>
  )
}