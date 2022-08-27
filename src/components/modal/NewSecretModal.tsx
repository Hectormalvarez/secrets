import { Fragment, useState, useRef } from "react";

import useCopy from "use-copy";

import { Dialog, Transition } from "@headlessui/react";
import { ClipboardCheckIcon, DocumentAddIcon } from "@heroicons/react/outline";

export default function NewSecretModal({ isOpen, setIsOpen, secretID }: any) {
  const [copied, copy, setCopied] = useCopy(
    `https://secrets.taylormadetech.net/${secretID}`
  );
  const [copiedOnce, setCopiedOnce] = useState(false);
  const [clickedOutsideModal, setClickedOutsideModal] = useState(false);
  const secretLinkRef = useRef(null);

  const handleCopyToClipboardClick = () => {
    copySecretLink();
  };

  const copySecretLink = () => {
    copy();
    setCopiedOnce(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleClickOutsideModal = () => {
    setClickedOutsideModal(true);

    setTimeout(() => {
      setClickedOutsideModal(false);
    }, 3000);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={handleClickOutsideModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-90 transition-opacity"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center md:items-center md:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-md transition-all md:my-8 md:w-full md:max-w-lg">
                {copied && <p>Copied!</p>}
                {clickedOutsideModal && !copiedOnce ? (
                  <p>copy to clipboard to be able to create a new secret!</p>
                ) : (
                  ""
                )}
                {clickedOutsideModal && copiedOnce ? (
                  <p>click create new secret to create a new secret!</p>
                ) : (
                  ""
                )}
                <div className="bg-slate-100 px-4 pt-5 pb-4 md:p-6 md:pb-4">
                  <div className="md:flex md:items-start ">
                    <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex-grow md:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-3xl font-bold leading-6 text-gray-900"
                      >
                        New Secret Created!
                      </Dialog.Title>
                      <div className="mt-2 text-xl">
                        share your one time secret with this link!
                      </div>
                      <input
                        type="text"
                        name="new-secret-link"
                        id="new-secret-link"
                        className="mt-2 w-full overflow-y-auto rounded-lg bg-slate-800 p-2 text-2xl text-slate-200 "
                        value={`https://secrets.taylormadetech.net/${secretID}`}
                        ref={secretLinkRef}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800 px-4 py-3 md:flex md:flex-row-reverse md:px-6">
                  <button
                    type="button"
                    className="
                    md:text-md flex w-full items-center justify-center rounded-md border border-transparent bg-slate-500 px-4 py-2 text-white shadow-md
                      hover:bg-blue-100 md:ml-3 md:w-auto md:hover:text-slate-700"
                    onClick={handleCopyToClipboardClick}
                  >
                    <p className="grow">Copy to Clipboard!</p>
                    <ClipboardCheckIcon className="h-8 w-8" />
                  </button>
                  <button
                    type="button"
                    className={`
                      mt-3 flex w-full items-center justify-center rounded-md border px-4 py-2 text-base
                     md:mt-0 md:ml-3 md:w-auto 
                     ${
                       copiedOnce
                         ? "border-gray-100 bg-gray-200 text-gray-700 md:cursor-pointer md:hover:bg-slate-300 md:hover:text-slate-900"
                         : "border-gray-300 bg-gray-400 text-gray-500"
                     }
                    `}
                    onClick={() => {
                      setCopiedOnce(false);
                      setIsOpen(false);
                    }}
                    disabled={!copiedOnce ? true : false}
                  >
                    <p className="grow">New Secret!</p>
                    <DocumentAddIcon className="h-8 w-8" />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
