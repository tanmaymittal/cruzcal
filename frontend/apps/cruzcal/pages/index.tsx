/* eslint-disable @next/next/no-img-element */
/* Components */
import CalendarView from '../app/calendar-view/calendar-view';
import CourseSelectionList from '../app/course-selection/CourseSelectionList';
import UserHeader from '../app/user-header/UserHeader';
import WarningDialog from '../app/warning-dialog/warning-dialog';

const PageHeader = () => {
  return (
    <div className="mb-10 text-white">
      <div className="flex justify-center items-center">
        <h1 className="text-7xl mb-2">CruzCal</h1>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-xl mb-2">All your classes. One calendar file.</p>
      </div>
      <div className='flex flex-row-reverse'>
        <UserHeader />
      </div>
    </div>
  )
};

const CalendarViewBody = () => {
  return (
    <div className="basis-3/5 border-solid border-2 border-white text-white">
      <CalendarView />
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


export function Index() {
  return (
    <div className="container mx-auto p-3">
      <PageHeader />
      <div className="flex flex-col md:flex-row gap-x-14 mb-5">
        <CalendarViewBody />
        <CourseSelectionList />        
      </div>
      <PageFooter />
    </div>
  );
}

export default Index;
