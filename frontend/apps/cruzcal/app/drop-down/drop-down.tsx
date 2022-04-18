import { Menu, Transition } from '@headlessui/react'
import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

/* eslint-disable-next-line */
export interface DropDownProps {
  name: string;
  items: string[];
};

export const DropDown: FC<DropDownProps> = ({name, items}) => {
  const createMenuItem = (item) => {
    return (
      <Menu.Item>
      {({ active }) => (
          <button
            className={`${
              active ? 'bg-violet-500 text-white' : 'text-gray-900'
            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
          >
            {item}
          </button>
        )}
      </Menu.Item>
    )
  };

  const menuItems = items.map(createMenuItem);

  return (
    <div className="w-56 text-right fixed top-16">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-black bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {name}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        {/* Use the Transition component. */}
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {menuItems}
            </div>
          </Menu.Items>
        </Transition>
    </Menu>
  </div>
  );
};

export default DropDown;
