import { useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';

import CourseSelectionList from '../app/course-selection/CourseSelectionList';
import Header from '../app/header/header';
import Footer from '../app/footer/footer';
import { versionAtom } from '../atoms/version';
import dynamic from 'next/dynamic'

export interface MobileProps {}

const Calendar = dynamic(
  () => import('../app/calendar-view/calendar-view'),
  { ssr: false}
)

export const Mobile = () => {
  const dispatchVersion = useUpdateAtom(versionAtom);

  useEffect(() => {
    dispatchVersion({type: 'check'});
  }, []);

  return (
    <div className="container mx-auto p-3 block md:hidden">
      <div className="flex flex-col md:flex-row gap-x-14 mb-5">
        <div className="basis-2/3 border-solid border-2 border-white rounded-lg text-white">
          <Calendar />
        </div>
        <div className="basis-1/3">
          <CourseSelectionList />
        </div>
      </div>
    </div>
  );
}

export default Mobile