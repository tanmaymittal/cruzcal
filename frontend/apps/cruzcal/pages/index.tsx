/* eslint-disable @next/next/no-img-element */
/* Components */
import CalendarView from '../app/calendar-view/calendar-view';
import CourseSelectionList from '../app/course-selection/CourseSelectionList';
import Header from '../app/header/header';
import Footer from '../app/footer/footer';
import WarningDialog from '../app/warning-dialog/warning-dialog';

export function Index() {
  return (
    <>
      <div className="container mx-auto">
        <Header />
      </div>
      <div className="container mx-auto p-3">
        <div className="flex flex-col md:flex-row gap-x-14 mb-5">
          <div className="basis-3/5 border-solid border-2 border-white text-white">
            <CalendarView />
          </div>
          <div className="basis-2/5">
            <CourseSelectionList />        
          </div>
        </div>
      </div>    
      <div className="container mx-auto">
        <Footer />
      </div>
    </>

  );
}

export default Index;
