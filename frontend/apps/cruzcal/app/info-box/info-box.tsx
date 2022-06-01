import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

/* eslint-disable-next-line */
export interface InfoBoxProps {}

export function InfoBox() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full rounded-2xl">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button aria-label="warning-button" className="flex w-full justify-between rounded-lg bg-rose-100 px-4 py-2 text-left text-sm font-bold text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75">
                <span>Warning: Selecting a Different Term with Added Courses</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-rose-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel aria-label="warning-panel" className="px-4 pt-4 pb-2 text-sm text-gray-500">
                After selecting course(s), if you change the <strong>TERM</strong> button it will refresh all selected courses as if it were a new session. Meaning any of the selected courses will be removed.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

export default InfoBox;
