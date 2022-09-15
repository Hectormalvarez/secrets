import { Fragment, BaseSyntheticEvent } from "react";

import useCopy from "use-copy";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { ClipboardCheckIcon, DocumentAddIcon } from "@heroicons/react/outline";
import "./NewSecretModal.css";

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
        className="
          relative
          z-10
        "
        onClose={!copied ? handleClickOutsideModal : closeModal}
      >
        {/* screen overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal overlay" aria-hidden="true" />
        </Transition.Child>

        <div className="modal base">
          <div className="modal items">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="modal panel">
                <div className="modal info-section">
                  <Dialog.Title as="h3" className="modal title">
                    New Secret Created!
                  </Dialog.Title>
                  <p className="modal text">
                    share your one time secret with this link!
                  </p>
                  <input
                    type="text"
                    name="new-secret-link"
                    id="new-secret-link"
                    className="modal link-text"
                    value={`${window.location.origin}/open-secret/${secretID}`}
                    onClick={handleSecretLinkClick}
                    readOnly
                  />
                </div>
                <div className="modal buttons">
                  <button
                    type="button"
                    className="modal button-base copy-button"
                    onClick={copySecretLink}
                  >
                    <p className="grow">Copy to Clipboard!</p>
                    <ClipboardCheckIcon
                      className="
                        h-8
                        w-8
                      "
                    />
                  </button>
                  <button
                    type="button"
                    className={`modal button-base new-secret
                     ${copied ? `copied-true` : `copied-false`}
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
