import { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

import InfoBox from '../info-box/info-box';

/* eslint-disable-next-line */
export interface InformationPaneProps {}

export const InformationPane = () => {
  let [isOpen, setIsOpen] = useState(false);
  let completeRef = useRef(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        aria-label="info-button"
        type="button"
        onClick={openModal}
        className="rounded-md bg-opacity-20 text-2xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <FontAwesomeIcon icon={faCircleQuestion} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          aria-label="information-pane"
          as="div"
          className="relative z-10"
          initialFocus={completeRef}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h2"
                    className="text-2xl font-bold leading-6 text-gray-900"
                    ref={completeRef}
                  >
                    How do I use this app?
                  </Dialog.Title>
                  <div className="my-3 rounded-lg bg-gray-200 p-3">
                    <h3 className="text-lg font-bold">
                      How do I add or remove courses to the Calendar?
                    </h3>
                    <p>To add a course to the Calendar:</p>
                    <ol className="ml-8 list-decimal">
                      <li>Select a Term.</li>
                      <li>Select a Subject.</li>
                      <li>Select a Course.</li>
                    </ol>
                    <div className="my-2">
                      <Image
                        src="/assets/images/add-and-delete-classes-demo.gif"
                        layout="responsive"
                        className="rounded-lg"
                        width={800}
                        height={494}
                      />
                    </div>
                    <p>
                      In addition, you can also filter the options by typing in
                      the input.
                    </p>
                    <p className="font-bold">
                      Note: you will not be able to select/type a Subject until
                      you have picked a Term. Similarly, you will not be able to
                      select/type a Course until you have selected a Subject.
                    </p>
                    <p className="mt-2">To add an additional class:</p>
                    <ol className="ml-8 list-decimal">
                      <li>
                        Click the “+” icon below the bottom-most Subject/Course
                        selections row.
                      </li>
                      <li>Select a Subject.</li>
                      <li>Select a Course.</li>
                    </ol>
                    <p className="mt-2">To remove a class:</p>
                    <ol className="ml-8 list-decimal">
                      <li>
                        Click the trashcan icon to the right of a Subject/Course
                        selections row.
                      </li>
                    </ol>
                    <p className="font-bold">
                      Note: The trashcan icon is hidden if there is only a
                      single Subject/Course selections row.
                    </p>
                  </div>
                  <div className="my-3 rounded-lg bg-gray-200 p-3">
                    <h3 className="text-lg font-bold">
                      How do I export my schedule?
                    </h3>
                    <p>
                      You have 3 options to export the courses you have added to
                      the calendar:
                    </p>
                    <ol className="ml-8 list-decimal">
                      <li>
                        JSON: will open a new tab with all of the information
                        related to any courses you have added.
                      </li>
                      <li>
                        ICS: your schedule will be downloaded to your computer
                        as an .ics file.
                      </li>
                      <li>
                        Google: your schedule is automatically imported into
                        your <strong>UCSC Google Calendar</strong>.
                      </li>
                    </ol>
                  </div>
                  <div className="my-3 rounded-lg bg-gray-200 p-3">
                    <h3 className="text-lg font-bold">
                      How do I view the calendar and list of courses added on
                      tablet/mobile?
                    </h3>
                    <p>
                      In order to create an effective user experience, the
                      calendar and list of courses were separated into two
                      separated tabs on smaller devices. In order to switch the
                      calendar and the list of courses added:
                    </p>
                    <ol className="ml-8 list-decimal">
                      <li>
                        Click “Add Courses” to view the list of courses added
                        and to add/remove additional courses.
                      </li>
                      <li>
                        Click “Calendar” to view the schedules of the courses
                        you have added.
                      </li>
                    </ol>
                    <div className="my-2">
                      <Image
                        src="/assets/images/mobile-view-demo.gif"
                        layout="responsive"
                        className="rounded-lg"
                        width={800}
                        height={790}
                      />
                    </div>
                  </div>
                  {/* Feature: Undo and Redo Adding or Removing a Course */}
                  <div className="my-3 rounded-lg bg-gray-200 p-3">
                    <h3 className="text-lg font-bold">
                      Feature: Undo and Redo Adding or Removing a Course
                    </h3>
                    <p>
                      You can click the back button or the forward button in the
                      browser to undo or redo adding or removing a course.
                    </p>
                    <div className="my-2">
                      <Image
                        src="/assets/images/course-selection-history-demo.gif"
                        layout="responsive"
                        className="rounded-lg"
                        width={800}
                        height={482}
                      />
                    </div>
                  </div>
                  {/* Feature: Export and Import Calendars */}
                  <div className="my-3 rounded-lg bg-gray-200 p-3">
                    <h3 className="text-lg font-bold">
                      Feature: Export and Import Calendars
                    </h3>
                    <p>
                      After adding any courses to the Calendar, you have the
                      option to export a link to that Calendar with all of the
                      added courses and send it to another person to import the
                      schedule. In order to export and import the calendar:
                    </p>
                    <ol className="ml-8 list-decimal">
                      <li>Add any course(s) to the Calendar.</li>
                      <li>
                        In the "Export Calendar" section, copy the URL link.
                      </li>
                      <li>
                        In the "Import Schedule" section, paste the URL link and
                        click "Import".
                      </li>
                      <li>
                        The courses will populate in the "Select Schedule"
                        section and the Calendar.
                      </li>
                    </ol>
                    <div className="my-2">
                      <Image
                        src="/assets/images/course-selection-history-demo.gif"
                        layout="responsive"
                        className="rounded-lg"
                        width={800}
                        height={482}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <InfoBox />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default InformationPane;
