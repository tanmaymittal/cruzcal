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
  name: string;
  classNumber: string;
  description: string;
  section: string;
  days: Day[]
};

/* eslint-disable-next-line */
export interface CourseListProps {
  courses: CourseInfo[];
}

const CITitle: FC<{}> = (props) => {
  return (
    <h3 className="font-bold">
      {props.children}
    </h3>
  );
};

export function CourseView(props: CourseInfo) {
  return (
  <div className="course-view">
    <div>
      <CITitle>Name:</CITitle>
      <p>{props.name}</p>
    </div>

    <div>
      <CITitle>ClassNo:</CITitle>
      <p>{props.classNumber}</p>
    </div>

    <div>
      <CITitle>Description:</CITitle>
      <p>{props.description}</p>
    </div>

    <div>
      <CITitle>Section:</CITitle>
      <p>{props.section}</p>
    </div>

    <div>
      <CITitle>Days:</CITitle>
      <p>{props.days}</p>
    </div>
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
    <div className="flex">
      {allCourses}
    </div>
  );
}

export default CourseList;
