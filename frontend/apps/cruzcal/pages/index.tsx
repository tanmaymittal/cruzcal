/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';

import {CourseList, CourseInfo, Day} from '../app/course-list/course-list';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {

  const mockCourses: CourseInfo[] = [
    {
      name: "My Course",
      classNumber: "44788",
      description: "A rather profound class",
      section: "01",
      days: [Day.Monday, Day.Wednesday, Day.Friday],
    }
  ];

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <div className="">
        Header
      </div>
      <div className="flex justify-center items-center">
        <h1 className="font-bold text-5xl mb-2">CruzCal</h1>
      </div>
      <div className="flex justify-center items-center">
        <p className="font-bold text-xl mb-2">All your classes. One calendar file.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="">
          <h2>Added Courses</h2>
          <CourseList courses={mockCourses} />
        </div>
        <div>
          <div className="flex space-x-4">
            {/* TODO: Create dropdowns */}
            <div>Term Dropdown</div>
            <div>Subject Dropdown</div>
            <div>Number Dropdown</div>
          </div>
          {/* TODO: Create info pane component */}
          <div>Info Pane</div> 
          <div className="flex">
            {/* TODO: Create button components */}
            <button className="">Reset</button>
            <button className="">Add</button>
          </div>        
        </div>
      </div>

      {/* <div className="flex min-h-screen justify-center items-center">
        <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
          <img
            className="w-full"
            src="https://tailwindcss.com/img/card-top.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Next + Tailwind ❤️</div>
            <p className="text-grey-darker text-base">
              Next and Tailwind CSS are a match made in heaven, check out this article on how
              you can combine these two for your next app.
            </p>
          </div>
        </div>
      </div> */}
      <div className="">
        Footer
      </div>
    </StyledPage>
  );
}

export default Index;
