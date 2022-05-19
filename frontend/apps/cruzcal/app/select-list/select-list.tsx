import { Dispatch, FC, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

import { SubjectInfo } from '../../atoms/subjects';;
import { TermInfo } from '../../atoms/terms';
import { CourseInfo } from '../../atoms/courses';

export type Subject = SubjectInfo | TermInfo | CourseInfo;

/* eslint-disable-next-line */
export interface SelectListProps {
  listName: string,
  options: Subject[],
  disabled?: boolean,
  selected: Subject,
  warnings?: string,
  setSelected: Dispatch<Subject>,
}

export const SelectList: FC<SelectListProps> = ({ selected, setSelected, listName, options, disabled, warnings }) => {
  return (
    <Listbox value={selected} onChange={setSelected} disabled={disabled}>
      <div className="relative">
        <Listbox.Button 
          className={({disabled}) => 
            `relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default ${warnings} ${disabled ? "bg-gray-400" : "hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500"} sm:text-sm`
          }
        >
          <span className="block truncate">{selected === null ? `Select ${listName}...` : selected.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-black"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            {options.map((option, optionId) => (
              <Listbox.Option
                key={optionId}
                className={({ active }) =>
                  `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                  }`
                }
                value={option}
              >
                {() => { 
                  const target = selected?.name === option.name;
                  return (
                    <>
                      <span className={`block truncate ${target ? 'font-medium' : 'font-normal'}`}>
                        {option.name}
                      </span>
                      {target && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export const DefaultSelectList = () => {
  return (
    <SelectList
      selected={{ name: 'Loading...' }}
      setSelected={() => undefined}
      listName="Default"
      options={[]}
    />
  );
};

export default SelectList;
