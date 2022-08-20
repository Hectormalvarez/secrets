import React, { BaseSyntheticEvent, useRef } from "react";
import ReactDOM from "react-dom";
import NewSecretModal from "../components/modal/NewSecretModal";

//import CryptoJS from "crypto-js";
import { useState } from "react";

// code to encrypt text
//CryptoJS.AES.encrypt(
//   e.target[0].value,
//   process.env.REACT_APP_SECRET_KEY as string
// ).toString()

// code to decrypt
// CryptoJS.AES.decrypt(
//   e.target[0].value,
//   process.env.REACT_APP_KEY as string
// ).toString(CryptoJS.enc.Utf8);

const NewSecretForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const secretTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleNewSecretSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(secretTextAreaRef.current?.value);
    if (secretTextAreaRef && secretTextAreaRef.current) {
      secretTextAreaRef.current.value = "";
    }
    setModalIsOpen(true);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <NewSecretModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />,
        document.getElementById("overlay-root") as HTMLElement
      )}
      <form
        className="m-2 flex h-full flex-col justify-end sm:justify-center md:px-8 lg:mx-auto lg:max-w-3xl"
        onSubmit={handleNewSecretSubmit}
      >
        <label className="text-xl text-slate-100">Enter a New Secret</label>
        <textarea
          className="mb-6 h-2/3 rounded-lg border-4 border-slate-800 bg-slate-200 p-2  sm:h-3/4"
          placeholder="Enter New Secret Here"
          ref={secretTextAreaRef}
          required
        />
        <button
          type="submit"
          className="mb-6 bg-slate-300 p-2 text-xl hover:bg-slate-600 hover:text-slate-200 md:py-4"
        >
          Create New Secret
        </button>
      </form>
    </>
  );
};

export default NewSecretForm;
