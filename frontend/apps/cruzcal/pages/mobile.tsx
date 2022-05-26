import { Tab } from '@headlessui/react';

import CourseSelectionList from '../app/course-selection/CourseSelectionList';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

export interface MobileProps {}

const Calendar = dynamic(() => import('../app/calendar-view/calendar-view'), {
  ssr: false,
});

export const Mobile = () => {
  return (
    <div className="container mx-auto p-3">
      <Tab.Group>
        <Tab.List className={'mb-2 flex justify-around gap-1'}>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg bg-white py-2 text-lg ${
                  selected ? 'bg-zinc-700 text-white' : 'bg-white text-black'
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
                  selected ? 'bg-zinc-700 text-white' : 'bg-white text-black'
                }`}
              >
                Add Classes
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

export default Mobile;
