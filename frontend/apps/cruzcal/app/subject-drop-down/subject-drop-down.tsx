import { Menu, Transition } from '@headlessui/react'
import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

/* eslint-disable-next-line */
export interface SubjectDropDownProps {}

export const SubjectDropDown: FC<SubjectDropDownProps> = (props) => {
  return (
    <Menu as="div" className="bg-blue-500">
      <Menu.Button>More</Menu.Button>

      {/* Use the Transition component. */}
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items>
          <Menu.Item>
            <span className="opacity-75">Invite a friend (coming soon!)</span>
          </Menu.Item>
        </Menu.Items>
      </Transition>
  </Menu>
  );
};

export default SubjectDropDown;
