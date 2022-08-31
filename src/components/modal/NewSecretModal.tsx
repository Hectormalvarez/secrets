import { Fragment, BaseSyntheticEvent } from "react";

import useCopy from "use-copy";
import { ToastContainer, Slide, toast } from "react-toastify";

import { Dialog, Transition } from "@headlessui/react";
import { ClipboardCheckIcon, DocumentAddIcon } from "@heroicons/react/outline";

export default function NewSecretModal({ isOpen, setIsOpen, secretID }: any) {
  const [copied, copy, setCopied] = useCopy(
    `${window.location.origin}/open-secret/${secretID}`
  );

  const closeModal = () => {
    if (copied) {
      setCopied(false);
      setIsOpen(false);
    } else {
      handleClickOutsideModal();
    }
  };

  const copySecretLink = () => {
    copy();
    setCopied(true);
    toast.dismiss();
    toast.success("Secret Link Copied!", {
      toastId: "copied-success",
    });
  };

  const handleSecretLinkClick = (e: BaseSyntheticEvent) => {
    e.target.select();
    copySecretLink();
  };

  const handleClickOutsideModal = () => {
    toast.warn("copy to clipboard to be able to create a new secret!", {
      toastId: "havent-copied-link-warning",
    });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={!copied ? handleClickOutsideModal : closeModal}
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
                <div className="bg-slate-100 px-4 pt-5 pb-4 md:p-6 md:pb-4">
                  <div className="md:flex md:items-start ">
                    <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex-grow md:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-3xl font-bold leading-6 text-gray-900"
                      >
                        New Secret Created!
                      </Dialog.Title>
                      <div className="mt-2 md:text-xl">
                        share your one time secret with this link!
                      </div>
                      <input
                        type="text"
                        name="new-secret-link"
                        id="new-secret-link"
                        className="mt-2 w-full overflow-y-auto rounded-lg bg-slate-800 p-2 text-sm text-slate-200 "
                        value={`${window.location.origin}/open-secret/${secretID}`}
                        onClick={handleSecretLinkClick}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-500 px-4 py-3 md:flex md:flex-row-reverse md:px-6">
                  <button
                    type="button"
                    className="
                      md:text-lg flex w-full items-center justify-center rounded-md border-4 border-white bg-slate-500 px-4 py-2 text-white shadow-md
                     hover:bg-blue-100 md:ml-3 md:w-auto md:hover:text-slate-700 md:font-bold tracking-wide md:transition-all md:duration-300 md:hover:scale-105
                    "
                    onClick={copySecretLink}
                  >
                    <p className="grow">Copy to Clipboard!</p>
                    <ClipboardCheckIcon className="h-8 w-8" />
                  </button>
                  <button
                    type="button"
                    className={`
                      mt-3 flex w-full items-center justify-center rounded-md border-4 px-4 py-2 md:text-lg md:font-bold
                     md:mt-0 md:ml-3 md:w-auto 
                     ${
                       copied
                         ? "border-gray-700 bg-gray-200 text-gray-700 md:cursor-pointer md:hover:bg-slate-400 md:hover:text-white md:transition-all md:duration-300 md:hover:scale-105"
                         : "border-gray-300 bg-gray-400 text-gray-500 md:cursor-not-allowed"
                     }
                    `}
                    onClick={closeModal}
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
