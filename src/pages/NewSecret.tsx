import React, { BaseSyntheticEvent, useState, useRef, Fragment } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { createSecret } from "../graphql/mutations";
import { toast } from "react-toastify";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

import { PencilIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";

import NewSecretModal from "../components/modal/NewSecretModal";
import { createID, encryptText } from "../utils";

dayjs.extend(utc);

export type secret = {
  id: string;
  secretText: string;
  expiration: number;
  passphraseProtected: boolean;
  decryptAttempts: number;
};

const expirationDurations: { value: number; name: string }[] = [
  { value: 1, name: "1 Hour" },
  { value: 4, name: "4 Hours" },
  { value: 12, name: "12 Hours" },
];

const NewSecretForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [textAreaLength, setTextAreaLength] = useState(0); // used to show character limit in text area
  const [secret, setSecret] = useState<secret | null>(null); // holds secretID to pass to modal
  const [expiration, setExpiration] = useState(expirationDurations[0]);
  const toastId: any = useRef(null);

  const handleNewSecretSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    // handle empty form submission
    if (e.target[0].value === "") {
      // warn user that secret is required
      toast.warn("please enter a secret!");
      return; // return function early
    }
    // secret creation feedback that upload is pending
    toastId.current = toast("uploading...", { autoClose: false });

    try {
      let secretPassphrase;
      let passphraseProtected;
      // if password field has a value use it to encrypt text
      if (e.target[2].value) {
        secretPassphrase = e.target[2].value;
        passphraseProtected = true;
      } else {
        secretPassphrase = "password";
        passphraseProtected = false;
      }
      // create object for secret upload
      const newSecret: secret = {
        id: createID(),
        secretText: encryptText(e.target[0].value, secretPassphrase),
        expiration: dayjs.utc().add(expiration.value, "hours").unix(),
        passphraseProtected: passphraseProtected,
        decryptAttempts: 0
      };
      // upload secret to the cloud
      await API.graphql(
        graphqlOperation(createSecret, {
          input: newSecret,
        })
      );
      // save secretid in state
      setSecret(newSecret);
      // clear form
      e.target[0].value = "";
      if (e.target[2].value) e.target[2].value = "";
      // notify user of success uploading
      toast.update(toastId.current, {
        render: "secret uploaded to the cloud and link created!",
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
      });
    } catch (error) {
      // notify user of error uploading
      toast.update(toastId.current, {
        render: "unable to upload secret!",
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
      console.log(error);
    }
    setModalIsOpen(true);
  };

  return (
    <>
      <NewSecretModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        secretID={secret ? `${secret.id}` : "loading"}
      />
      <form
        className="
          m-2
          flex
          h-full
          flex-col
          justify-end
          py-4
          md:mx-auto
          md:max-w-3xl
          md:justify-start
          md:px-8
        "
        onSubmit={handleNewSecretSubmit}
      >
        <div
          className="
            relative
            h-2/5
            w-full
            "
        >
          <label
            className="
                text-center
                text-3xl
                font-bold
                tracking-wider
                text-slate-800
                md:text-4xl
              "
          >
            Enter a New Secret
          </label>
          <textarea
            className="
              landscape-keyboard
              h-3/4
              w-full
              rounded-lg
              border-4
              border-slate-800
              bg-slate-200
              p-2
              text-lg
              tracking-tighter
              md:text-2xl
            "
            placeholder="Private information you want to share goes here"
            onChange={(e) => setTextAreaLength(e.target.textLength)}
            maxLength={500}
          />
          <p className="absolute bottom-4 right-2 text-lg text-slate-500 md:bottom-10 md:right-4 md:text-2xl">
            {textAreaLength}/500
          </p>
        </div>

        <div
          className="
            flex
            items-center
            text-left
            text-lg
            font-bold
            uppercase
            tracking-wider
            mb-6
            md:text-2xl
            "
        >
          <p className="font-light tracking-tighter pt-2">
            secrets expire after {expiration.name}!
          </p>
          <Listbox
            as="div"
            className="p-2 hover:cursor-pointer"
            value={expiration}
            onChange={setExpiration}
          >
            <Listbox.Button className="hover: flex rounded-lg border-2 border-slate-800 p-1 shadow-md shadow-slate-700 hover:bg-slate-200">
              <PencilIcon className="h-6 w-6" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="absolute mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {expirationDurations.map((expirationTime: any) => (
                    <Listbox.Option
                      key={expirationTime.name}
                      value={expirationTime}
                      className={({ active }) =>
                        `relative cursor-pointer pl-10 pr-4 text-sm md:text-base ${
                          active
                            ? "bg-slate-600 text-slate-200"
                            : "text-slate-900"
                        }`
                      }
                    >
                      {expirationTime.name}
                    </Listbox.Option>
                  ))}
                </div>
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
        <div className="mx-auto mb-8 flex w-full flex-col items-start justify-center">
          <label
            className="mb-2 text-sm font-bold tracking-tighter md:text-xl md:tracking-wider"
            htmlFor="passphrase"
          >
            (optional: require passphrase to open secret)
          </label>
          <input
            className="w-full rounded-md p-4 "
            type="password"
            name="passphrase"
            placeholder="Enter a passphrase here"
            id="passphrase"
          />
        </div>

        <button
          type="submit"
          className="open-secret button"
        >
          Create New Secret
        </button>
      </form>
    </>
  );
};

export default NewSecretForm;
