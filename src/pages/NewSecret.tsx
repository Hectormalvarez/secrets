import React, { BaseSyntheticEvent, useState, useRef, Fragment } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { createSecret } from "../graphql/mutations";
import { toast } from "react-toastify";
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'

import { PencilIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from '@headlessui/react'

import NewSecretModal from "../components/modal/NewSecretModal";

import { createID, encryptText } from "../utils";

dayjs.extend(utc)

type secret = {
  id: string;
  secretText: string;
  expiration: number;
};

const expirationDurations: any = [
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
      return;
    }

    toastId.current = toast("uploading...", { autoClose: false });

    try {
      // encrypt text and save in variable to upload
      const encryptedSecret = encryptText(e.target[0].value, "password");
      // create id for new secret
      const secretID = createID();
      // create expiration date for secret (6 hours from current time)
      const secretExpirationDate = dayjs.utc().unix(); // get's current datetime
      // create object for secret upload
      const newSecret: secret = {
        id: secretID,
        secretText: encryptedSecret,
        expiration: secretExpirationDate,
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
      // notify user of success uploading
      toast.update(toastId.current, { render: "secret uploaded to the cloud and link created!", type: toast.TYPE.SUCCESS, autoClose: 5000 });
    } catch (error) {
      // notify user of error uploading
      toast.error("unable to upload secret!");
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
          md:mx-auto
          md:max-w-3xl
          md:justify-start
          md:px-8
        "
        onSubmit={handleNewSecretSubmit}
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
        <div
          className="
            relative
            mb-2
            h-3/5
            w-full
          "
        >
          <textarea
            className="
              landscape-keyboard
              h-full
              w-full
              rounded-lg
              border-4
              border-slate-800
              bg-slate-100
              p-2
              text-lg
              tracking-tighter
              md:mb-6
              md:text-2xl
            "
            placeholder="Private information you want to share goes here"
            onChange={(e) => setTextAreaLength(e.target.textLength)}
            maxLength={500}
          />
          <p className="absolute bottom-4 right-8 text-lg md:text-2xl">
            {textAreaLength}/500
          </p>
        </div>

        <div
          className="
            text-center
            text-lg
            font-bold
            uppercase
            tracking-wider
            flex
            justify-center
            items-center
            md:text-2xl
            "
        >
          <Listbox as="div" className="p-2 hover:cursor-pointer" value={expiration} onChange={setExpiration}>
            <Listbox.Button className="flex">
              <PencilIcon className="w-6 h-6" />
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
                        `relative cursor-pointer text-sm md:text-base py-2 pl-10 pr-4 ${active ? 'bg-slate-600 text-slate-200' : 'text-slate-900'}`
                      }
                    >
                      {expirationTime.name}
                    </Listbox.Option>
                  ))}
                </div>
              </Listbox.Options>
            </Transition>
          </Listbox>
          <p className="tracking-tighter font-light">secrets expire after {expiration.name}!</p>

        </div>
        <button
          type="submit"
          className="
          mb-6
          rounded-lg
          border-4
          border-slate-800
          bg-slate-500
          py-4
          text-2xl
          uppercase
          tracking-wider
          text-slate-200
          shadow-md
          shadow-slate-800
          md:py-6
          md:text-4xl
          md:font-bold
          md:transition-all
          md:duration-300
          md:hover:scale-105
          md:hover:bg-slate-400
          md:hover:text-slate-100
          md:hover:shadow-slate-700
          "
        >
          Create New Secret
        </button>
      </form>
    </>
  );
};

export default NewSecretForm;
