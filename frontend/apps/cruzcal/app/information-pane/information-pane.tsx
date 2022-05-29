import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import InfoBox from '../info-box/info-box';

/* eslint-disable-next-line */
export interface InformationPaneProps {}

export const InformationPane = () => {
  let [isOpen, setIsOpen] = useState(false);

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
        className="rounded-md bg-opacity-20 text-2xl font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <FontAwesomeIcon icon={faCircleQuestion} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog aria-label="information-pane" as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    How do I use this app?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p>
                      You can login with your UCSC credentials to associate your
                      account. To add classes to your schedule,
                    </p>
                    <ol className="ml-4 list-decimal text-gray-600">
                      <li>
                        Select the intended term. The subject dropdown will
                        populate with the respective courses available for that
                        term
                      </li>
                      <li>Select a subject</li>
                      <li>Select your desired course number</li>
                    </ol>
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
