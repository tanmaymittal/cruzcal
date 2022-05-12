/* eslint-disable @next/next/no-img-element */
import { useAtomValue } from 'jotai';
import { Suspense } from 'react';

/* Components */
import CalendarView from '../app/calendar-view/calendar-view';
import CourseSelectionList from '../app/course-selection/CourseSelectionList';
import WarningDialog from '../app/warning-dialog/warning-dialog';
import { warningsAtom } from '../atoms/warnings';
import { CourseSelector } from '../atoms/course-selector';

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

/* Potential Calendar UI: https://github.com/hoangnm/react-native-week-view */
const CalendarViewBody = () => {
  return (
    <div className="basis-3/5 border-solid border-2 border-white text-white">
      {/* <h2 className="text-3xl mb-5">May 2022</h2> */}
      {/* <CalendarView /> */}
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

const WarningDialogBox = () => {
  const warnings = useAtomValue(warningsAtom) as CourseSelector[];
  let warningAppears;
  if (warnings.length > 0) {
    warningAppears = <WarningDialog warningsAtom={warningsAtom}/>
  } else {
    warningAppears = <></>
  }

  return (
    <Suspense fallback={"loading..."}>
      {warningAppears}
    </Suspense>
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

          <WarningDialogBox />

          <PageFooter />
        </div>

      </div>
  );
}

export default Index;
