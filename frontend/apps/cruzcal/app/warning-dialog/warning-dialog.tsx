import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useAtomValue } from 'jotai';
import hash from 'object-hash';

/* Atoms */
import { CourseSelector } from '../../atoms/course-selector';
import warningsAtom from '../../atoms/warnings';

/* eslint-disable-next-line */
export const WarningDialog = () => {
  const warnings = useAtomValue(warningsAtom) as CourseSelector[];
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  if (warnings.length === 0) return <></>;

  return (
    <>
      <div className="w-full inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="w-full rounded-md bg-rose-500 bg-opacity-100 px-4 py-2 text-sm font-bold text-black hover:bg-opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          See warnings
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Overlay className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    You may have scheduling conflicts.
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Below are the classes with conflicts, if any.
                    </p>
                      {warnings.map((warning) => {
                        return (
                          <p key={hash(warning)}>{warning.course.name}</p>
                        );
                      })}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-rose-300 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Overlay>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default WarningDialog;
