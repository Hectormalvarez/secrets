import React, { Fragment } from "react";
import "./NewSecretExpiration.css"

import { PencilIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";

const SecretExpiration = ({expiration, setExpiration, expirationDurations}: any) => {
  return (
    <div className="secrets expire">
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
                    `relative cursor-pointer pl-10 pr-4 py-4 text-sm md:text-base md:py-2 ${
                      active ? "bg-slate-600 text-slate-200" : "text-slate-900"
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
      <p className="secrets-expire text">secrets expire after {expiration.name}!</p>
    </div>
  );
};

export default SecretExpiration;
