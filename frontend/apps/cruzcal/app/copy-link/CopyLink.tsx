import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import shareLinkAtom from "../../atoms/share-link";
import { useAtomValue } from "jotai";
import { useRef } from "react";

import { Popover } from '@headlessui/react'

export const CopyLink = () => {
  const shareLink = useAtomValue(shareLinkAtom);
  const inputText = useRef(null);

  const copyLink = () => {
    inputText.current.focus();
    inputText.current.select();
    navigator.clipboard.writeText(shareLink).then(() => {
      console.log('copied:', shareLink);
    }, () => {
      console.log('failed to copy:', shareLink);
    });
  }

  return (
    <div className={`flex justify-end `}>
      <div className="grow flex gap-2 justify-center align-middle bg-transparent border-none text-sm">
        <input
          readOnly={true}
          value={shareLink}
          ref={inputText}
          className="w-full truncate bg-white text-black p-2 rounded-lg"
        />
        <Popover className="relative">
          <Popover.Button onClick={copyLink} className="h-full flex-none bg-white text-black outline-none px-3 rounded-lg">
            <FontAwesomeIcon icon={faCopy} />
          </Popover.Button>
          <Popover.Panel className="absolute right-0 top-[125%]">
            {({ close }) => {
              setTimeout(() => close(), 1000);
              return (
                <div className="flex-none bg-white border-none outline-none px-3 rounded-lg">
                  Copied
                </div>
              );
            }}
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
};

export default CopyLink;
