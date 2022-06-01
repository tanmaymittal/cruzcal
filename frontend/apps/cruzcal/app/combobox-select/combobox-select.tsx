import { Dispatch, FC, Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import { SubjectInfo } from '../../atoms/subjects';;
import { TermInfo } from '../../atoms/terms';
import { CourseInfo } from '../../atoms/courses';

export type BaseSubject = {
  name: string,
};

export type Subject = SubjectInfo | TermInfo | CourseInfo | BaseSubject;

/* eslint-disable-next-line */
export interface ComboboxSelectProps {
  listName: string,
  options: Subject[];
  disabled?: boolean,
  selected: Subject,
  setSelected: Dispatch<Subject>,
}

export const ComboboxSelect: FC<ComboboxSelectProps> = ({listName, options, disabled = false, selected, setSelected}) => {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected} disabled={disabled}>
        <div className="relative">
          <div className={`relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md sm:text-sm ${disabled ? 'bg-gray-400' : 'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300'}`}>
            <Combobox.Input
              aria-label={`combobox-input-${listName}`}
              className="w-full truncate border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={() => selected ? selected.name : `Select ${listName}`}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button aria-label={`combobox-dropdown-${listName}`} className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options
              aria-label={`combobox-options-${listName}`}
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
            >
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option, optionId) => (
                  <Combobox.Option
                    key={optionId}
                    aria-label={`combobox-option-${listName}`}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-bold' : 'font-normal'
                          }`}
                        >
                          {option.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export const DefaultComboboxSelect = () => {
  return (
    <ComboboxSelect
      selected={{ name: 'Loading...' }}
      setSelected={() => undefined}
      listName="Default"
      disabled={false}
      options={[]}
    />
  );
};

export default ComboboxSelect;
