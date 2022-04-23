import React, { FC } from "react";

export enum Day {
  Monday = "Mon",
  Tuesday = "Tue",
  Wednesday = "Wed",
  Thursday = "Thur",
  Friday = "Fri",
  Saturday = "Sat",
  Sunday = "Sun"
}

export interface CourseInfo {
  subject: string;
  classNumber: string;
  courseNumber: number;
  term: string;  
};

/* eslint-disable-next-line */
export interface CourseListProps {
  courses: CourseInfo[];
}

// const CITitle: FC<{}> = (props) => {
//   return (
//     <h3 className="font-bold text-white">
//       {props.children}
//     </h3>
//   );
// };

export function CourseView(props: CourseInfo) {
  return (
  <div className="course-view">
    <p className="text-white">{props.term} / {props.subject} / {props.courseNumber}</p>
  </div>
  );
}

export function CourseList(props: CourseListProps) {
  const allCourses = props.courses.map((course) => {
    return (
      <CourseView key={course.classNumber} {...course} />
    )
  });

  return (
    <div className="flex flex-col">
      {allCourses}
    </div>
  );
}

export default CourseList;
