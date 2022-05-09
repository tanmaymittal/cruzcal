/* eslint-disable @next/next/no-img-element */

/* Components */
import CalendarView from '../app/calendar-view/calendar-view';
import CourseSelectionList from '../app/course-selection/CourseSelectionList';

const PageHeader = () => {
  return (
    <div className="mb-10 text-white">
      <div className="flex justify-center items-center">
        <h1 className="text-7xl mb-2">CruzCal</h1>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-xl mb-2">All your classes. One calendar file.</p>
      </div>
    </div>
  )
};

const PageFooter = () => {
  return (
    <p className="text-center text-gray-500 text-xs">
      &copy;2022 CruzCal. All rights reserved.
    </p>
  )
};

/* Potential Calendar UI: https://github.com/hoangnm/react-native-week-view */
  const CalendarViewBody = () => {
    return (
      <div className="basis-3/5 border-solid border-2 border-white text-white">
        {/* <h2 className="text-3xl mb-5">May 2022</h2> */}
        <CalendarView />
      </div>
    )
  };

export function Index() {
  /*
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
      <div className="container mx-auto">
      <PageHeader />

        {/* Index Body */}
        <div className="flex flex-col md:flex-row gap-x-14">
          <CalendarViewBody />

          {/* Add Classes */}
          <CourseSelectionList /> 
          
        </div>
        <PageFooter />
      
      </div>
  );
}

export default Index;
