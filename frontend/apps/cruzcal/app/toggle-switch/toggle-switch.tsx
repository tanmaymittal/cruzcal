import { useState } from 'react';
import { Switch } from '@headlessui/react';

/* eslint-disable-next-line */
export interface ToggleSwitchProps {}

export function ToggleSwitch(props: ToggleSwitchProps) {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="py-16">
      {/* <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-rose-500' : 'bg-teal-500'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch> */}
      <Switch.Group>
      <div className="flex items-center">
        {/* <Switch.Label className="mr-4 text-zinc-50">Yes, I want to change the term</Switch.Label> */}
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-rose-500' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
{/*
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-4 text-zinc-50">No, I want to keep this term</Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-rose-500' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group> */}
    </div>
  );
}

export default ToggleSwitch;
