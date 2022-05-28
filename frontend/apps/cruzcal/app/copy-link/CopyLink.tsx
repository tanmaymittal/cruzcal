import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import shareLinkAtom from "../../atoms/share-link";
import { useAtomValue } from "jotai";
import { useRef } from "react";

export const CopyLink = () => {
  const shareLink = useAtomValue(shareLinkAtom);
  const inputText = useRef(null);

  const copyLink = () => {
    inputText.current.focus();
    inputText.current.select();
  }

  return (
    <div className={`flex justify-end gap-2`}>
      <div className="grow flex justify-center align-middle bg-white text-black border-none text-sm rounded-lg">
        <input
          value={shareLink}
          ref={inputText}
          className="w-full truncate bg-transparent p-2"
          onChange={() => console.log(shareLink)}
        />
      </div>
      <button
        type='button'
        onClick={copyLink}
        className="flex-none bg-white border-none outline-none px-3 rounded-lg"
      >
        <FontAwesomeIcon icon={faCopy} />
      </button>
    </div>
  );
};

export default CopyLink;
