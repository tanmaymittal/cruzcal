/* eslint-disable @next/next/no-img-element */
/* Borrowed libraries */

/* Components */
import CalendarView from '../app/calendar-view/calendar-view';
import CourseSelectionList from '../app/course-selection/CourseSelectionList';

export function Index() {
  /*
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <div>
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
          <CourseSelectionList />
        </div>
        <p className="text-center text-gray-500 text-xs">
            &copy;2022 CruzCal. All rights reserved.
        </p>
        <div className="">
          Footer
        </div>
      </div>
    </div>
  );
}

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

export default Index;
