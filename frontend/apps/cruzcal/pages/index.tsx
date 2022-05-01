/* eslint-disable @next/next/no-img-element */
/* Borrowed libraries */
import Script from 'next/script';
import styled from 'styled-components';
import { useAtom, atom } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

/* Atoms */
import termsAtom from '../atoms/terms/terms';
import selectedTermAtom from '../atoms/selected-term/selected-term';
import coursesAtom from '../atoms/courses/courses';

/* Components */
import { CourseList, CourseInfo, Day } from '../app/course-list/course-list';
import { Subject, SelectList } from '../app/select-list/select-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import CalendarView from '../app/calendar-view/calendar-view';


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

  /**
   * Represents the list of all of the Term Names
   * It's an atom that subscribes to the Term atom (which pulls all of the data that we don't necessarily need)
   *
   *  An atom called 'termNamesAtom' that fetches all of the terms from our backend/API
   * e.g., 2022 Spring Quarter, 2022 Summer Quarter, etc.
  */
  const termNamesAtom = atom(
    (get) => get(termsAtom).map((titem) => ({
      name: titem.name
    }))
  );

  // Below is the mocked data for Term Names - no longer needed
  // const terms: Subject[] = [
  //   {name: "2022 Spring"},
  //   {name: "2022 Winter"},
  //   {name: "2022 Fall"},
  // ]

  // TODO: use as refered for Jotai atomWithQuary (work in-progress)
  // const termsTestData = require("./mockData.json").map((term) => ({
  //   code: parseInt(term.code),
  //   name: term.name,
  //   start: new Date(term.date.start),
  //   end: new Date(term.date.end),
  // }));

  const [terms] = useAtom(termNamesAtom);
  const [selectedTerm, setSelectedTerm] = useAtom(selectedTermAtom);
  const [courses] = useAtom(coursesAtom);

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

  /**
   * TODO: Define `TermInfo`: this would be the data asccociated with
   * TODO: whichever term the user has selected (a transpose of the data)
  */
  // const TermButton = ({terms}: {terms: TermInfo[]}) => {
  //   return (
  //     <SelectList listName="Term" listOptions={terms}  />
  //   );
  // };

  /*
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <>
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

              {/* TODO: Create a CourseSelection Component */}
              {/* <CourseSelection> */}

                <div className="basis-3/4">
                  {/*
                    * TODO: Move the TermButton into a seperate component,
                    * below is an example of how we can accomplish this
                    */}
                  <SelectList listName="Term" listOptions={terms}  />
                  {/* <TermButton terms={terms}/> */}
                </div>

                <div className="basis-3/4">
                  <SelectList listName="Subject" listOptions={subjects} />
                </div>
                <div className="basis-1/4">
                  <SelectList listName="Course #" listOptions={courseNumbers} />
                </div>

                {/* TODO: Create a CourseSelection Component */}
              {/* </CourseSelection> */}

              <button className='text-white'><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
            <div className="flex justify-center">
              {/* TODO: Add button component to add another row of dropdowns */}
              <button className="text-4xl text-white"><FontAwesomeIcon icon={faPlusSquare} /></button>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
            &copy;2022 CruzCal. All rights reserved.
        </p>
        <div className="">
          Footer
        </div>
      </div>


{/*
    Below is an example of how we can section off the components for the main page.
    Building things into components will help us intuitively build out each component,
    starting with simple ones then cobminign them to make more complex components).

    //TODO: Please give me your input on how we want these components organized.

      <Layout>
        <CourseSelection>
          <TermSelectListBox />  // <-- these components with the `/` are smaller, simpler components which reside in CourseSelection
          <SubjectSelectListBox />
          <CourseNoSelectListBox />
        </CourseSelection>

        <CourseList>
          <AddCourseButton />
          <RemoveCourseButton />
          <ClearCoursesButton />
          <DownloadButton />
          <GoogleICSButton />
        <CourseList/>

        <CalendarView>
          <CalendarComponentA>
          <CalendarComponentB>
          <CalendarComponentC>
        <CalendarView/>

      </Layout> */}


    </>
  );
}

export default Index;
