import { useRef, useState } from "react";

import {
  useSearchParams
} from 'react-router-dom';

export const ImportLink = () => {
  const [link, setLink] = useState('');
  const inputLink = useRef(null);
  const [, setSearchParams] = useSearchParams();

  const importLink = async (link: string) => {
    try {
      const url = new URL(link);
      setSearchParams(url.search);

      // Reset import input
      inputLink.current.value = '';
    } catch (error) {
      console.log(error);
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
