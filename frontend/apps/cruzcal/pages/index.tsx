/* eslint-disable @next/next/no-img-element */
import Script from 'next/script';
import styled from 'styled-components';

import { CourseList, CourseInfo, Day } from '../app/course-list/course-list';
import DropDown from '../app/drop-down/drop-down';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {

  const mockCourses: CourseInfo[] = [
    {
      subject: "CSE",
      classNumber: "44788",
      courseNumber: 115,
      term: "Spring 2022"
      // name: "My Course",
      // description: "A rather profound class",
      // section: "01",
      // days: [Day.Monday, Day.Wednesday, Day.Friday],
    },
    {
      subject: "CHEM",
      classNumber: "12345",
      courseNumber: 1,
      term: "Spring 2022"
    }
    // {
    //   subject: "CSE",
    //   classNumber: "12341",
    //   courseNumber: 130,
    //   term: "Spring 2022"      
    //   // name: "My Course",
    //   // description: "A rather profound class",
    //   // section: "01",
    //   // days: [Day.Monday, Day.Wednesday, Day.Friday],
    // },
  ];

  const subjects = [
    "Computer Science & Engineering", "Education", "Mathematics"
  ];

  const courseNumbers = [
    "1", "101", "111", "115A", "115D", "130", "183"
  ];

  /*
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      {/* <div className="">
        Header
      </div> */}
      <div className="container mx-auto">
        <div className="mb-10 text-white">
          <div className="flex justify-center items-center">
            <h1 className="text-7xl mb-2">CruzCal</h1>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-xl mb-2">All your classes. One calendar file.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="text-white">
            <h2 className="text-5xl mb-5">Course List</h2>
              <CourseList courses={mockCourses} />
          </div>
          <div>
            <div className="flex flex-wrap space-x-4 mb-5">
              <DropDown name="Subject" items={subjects} />
              <DropDown name="Course Number" items={courseNumbers} />
            </div>
            <div className="flex space-x-4">
              {/* TODO: Create button components */}
              <div className="gradient-wrapper">
                <button className="rounded-full px-6 py-0.5">Reset</button>
              </div>
              <div className="gradient-wrapper">
                <button className="rounded-full px-6 py-0.5">Add</button>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          Footer
        </div>
      </div>

    </StyledPage>
  );
}

export default Index;
