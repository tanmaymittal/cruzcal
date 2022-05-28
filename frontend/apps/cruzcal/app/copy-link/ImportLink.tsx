import { defaultScheduleSelection, scheduleSelectionAtom } from "apps/cruzcal/atoms/course-selector";
import { fetchSchedule } from "apps/cruzcal/atoms/share-link";
import { server } from "apps/cruzcal/config";
import { useUpdateAtom } from "jotai/utils";
import { useEffect, useRef, useState } from "react";

export const ImportLink = () => {
  const [link, setLink] = useState('');
  const inputLink = useRef(null);
  const setScheduleSelection = useUpdateAtom(scheduleSelectionAtom);

  const updateState = (searchParams: URLSearchParams) => {
    if (searchParams.has('termCode') && searchParams.has('courseIDs')) {
      fetchSchedule(`?${searchParams}`)
        .then(setScheduleSelection)
        .catch(console.error);
    } else if (`${searchParams}` === '') {
      setScheduleSelection(defaultScheduleSelection);
    } else {
      history.replaceState(null, '', `${server}/`);
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    updateState(searchParams);
  }, [location.search]);

  const importLink = async (link: string) => {
    try {
      const url = new URL(link);
      updateState(url.searchParams);
      // setSearchParams(url.search);

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
