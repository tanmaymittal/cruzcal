import { defaultScheduleSelection, scheduleSelectionAtom } from "apps/cruzcal/atoms/course-selector";
import { fetchSchedule } from "apps/cruzcal/atoms/share-link";
import { useUpdateAtom } from "jotai/utils";
import { useEffect, useRef, useState } from "react";

export const ImportLink = () => {
  const [link, setLink] = useState('');
  const inputLink = useRef(null);
  const setScheduleSelection = useUpdateAtom(scheduleSelectionAtom);

  const updateSchedule = async (scheduleQuery: string) => {
    try {
      const schedule = await fetchSchedule(scheduleQuery);
      setScheduleSelection(schedule);
    } catch (error) {
      // State couldn't be updated
      console.error(error);
      setScheduleSelection(defaultScheduleSelection);
    }
  }

  useEffect(() => {
    // Update schedule on window.back press
    window.onpopstate = function(event) {
      if (event.state.hasOwnProperty('search')) updateSchedule(event.state.search);
      else {
        const queryStart = event.state.url.indexOf('?');
        const search = event.state.url.substring(queryStart);
        updateSchedule(search);
      }
    }

    // Update state on first render
    const {search} = new URL(location.href);
    updateSchedule(search);
  }, []);

  const importLink = async (link: string) => {
    try {
      const url = new URL(link);
      updateSchedule(url.search);

      // Reset import input
      inputLink.current.value = '';
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={`flex justify-end gap-2`}>
      <div className="grow flex justify-center align-middle bg-white text-black border-none text-sm rounded-lg">
        <input
          ref={inputLink}
          className="w-full resize-none truncate bg-transparent p-2"
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button
        type='button'
        onClick={() => importLink(link)}
        className="flex-none bg-white border-none outline-none px-3 rounded-lg"
      >
        Import
      </button>
    </div>
  );
};

export default ImportLink;
