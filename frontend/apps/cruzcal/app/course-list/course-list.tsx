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

export function CourseView(props: CourseInfo) {
  return (
  <div className="course-view">
    <div>
      <p>Name:</p>
      <p>{props.name}</p>
    </div>

    <div>
      <p>ClassNo:</p>
      <p>{props.classNumber}</p>
    </div>

    <div>
      <p>Description:</p>
      <p>{props.description}</p>
    </div>

    <div>
      <p>Section:</p>
      <p>{props.section}</p>
    </div>

    <div>
      <p>Days:</p>
      <p>{props.days}</p>
    </div>
  </div>
  );
}

export function CourseList(props: CourseListProps) {
  const allCourses = props.courses.map((course) => {
    return (
      <CourseView {...course} />
    )
  });

  return (
    <div className="flex">
      {allCourses}
    </div>
  );
}

export default CourseList;
