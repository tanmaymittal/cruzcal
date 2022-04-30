/* eslint-disable @next/next/no-img-element */
import Script from 'next/script';
import styled from 'styled-components';

import { CourseList, CourseInfo, Day } from '../app/course-list/course-list';
import DropDown from '../app/drop-down/drop-down';
import { Subject, SelectList } from '../app/select-list/select-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import CalendarView from '../app/calendar-view/calendar-view';

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
  ];

  const subjects: Subject[] = [
    { name: "Computer Science & Engineering" },
    { name: "Education" },
    { name: "Mathematics" },
  ]

  const courseNumbers: Subject[] = [
    { name: "1" },
    { name: "101" },
    { name: "111" },
    { name: "115A" },
    { name: "115D" },
    { name: "130" },
    { name: "183" },
  ]

  /*
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <div className="container mx-auto">
        {/* TODO: Header Components */}
        <div className="mb-10 text-white">
          <div className="flex justify-center items-center">
            <h1 className="text-7xl mb-2">CruzCal</h1>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-xl mb-2">All your classes. One calendar file.</p>
          </div>
        </div>
        {/* Index Body */}
        <div className="flex flex-col md:flex-row gap-x-14">
          {/* Calendar View */}
          <div className="basis-3/5 border-solid border-2 border-white text-white">
            {/* Potential Calendar UI: https://github.com/hoangnm/react-native-week-view */}
            {/* <h2 className="text-3xl mb-5">April 2022</h2> */}
            <CalendarView />
          </div>
          {/* Add Classes */}
          <div className="basis-2/5">
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-x-3 mb-5">
              <div className="basis-3/4">
                <SelectList listName="Subject" listOptions={subjects} />
              </div>
              <div className="basis-1/4">
                <SelectList listName="Course #" listOptions={courseNumbers} />
              </div>
              {/* TODO: Delete button to remove a row */}
              <button className='text-white'><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
            <div className="flex justify-center">
              {/* TODO: Add button component to add another row of dropdowns */}
              <button className="text-4xl text-white"><FontAwesomeIcon icon={faPlusSquare} /></button>
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
