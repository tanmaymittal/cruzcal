import { Tab } from '@headlessui/react';

import CourseSelectionList from '../course-selection/CourseSelectionList';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { atomWithStorage } from 'jotai/utils';
import { useAtom } from 'jotai';
import ClientOnly from '../client-only/ClientOnly';

export interface MobileProps {}

const Calendar = dynamic(() => import('../calendar-view/calendar-view'), {
  ssr: false,
});

const tabIndexAtom = atomWithStorage('mobile-view-tab', 0);

export const MobileClientOnly = () => {
  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom);
  return (
    <div className="container mx-auto p-3">
      <Tab.Group defaultIndex={tabIndex} onChange={setTabIndex}>
        <Tab.List className={'mb-2 flex justify-around gap-4'}>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg bg-white py-2 text-lg ${
                  selected ? 'bg-[#3788d8] text-white shadow-inner' : 'bg-white text-black'
                }`}
              >
                Calendar
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg bg-white py-2 text-lg ${
                  selected ? 'bg-[#3788d8] text-white shadow-inner' : 'bg-white text-black'
                }`}
              >
                Add Courses
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="mb-5 flex flex-col">
              <div className="rounded-lg border-2 border-solid border-white text-white">
                <Calendar />
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mb-5 flex flex-col">
              <CourseSelectionList />
            </div>
          </Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export const Mobile = () => (
  <ClientOnly>
    <MobileClientOnly/>
  </ClientOnly>
);

export default Mobile;
