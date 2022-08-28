import React, { BaseSyntheticEvent, useRef, useState } from "react";
import NewSecretModal from "../components/modal/NewSecretModal";
import { createID, encryptText } from "../utils";

const initialSecret = {
  secretID: "",
  secretText: "",
};

const NewSecretForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSecret, setNewSecret] = useState(initialSecret);
  const [textAreaLength, setTextAreaLength] = useState(0)
  const secretTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleNewSecretSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (secretTextAreaRef && secretTextAreaRef.current) {
      const encryptedSecret = encryptText(e.target.value, process.env.REACT_APP_KEY as string)
      setNewSecret({
        secretID: createID(),
        secretText: encryptedSecret,
      });
      secretTextAreaRef.current.value = "";
    }
    setModalIsOpen(true);
  };

  return (
    <>
      <NewSecretModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        secretID={newSecret.secretID}
      />
      <form
        className="m-2 flex h-full flex-col justify-end md:px-8 md:mx-auto md:max-w-3xl relative"
        onSubmit={handleNewSecretSubmit}
      >
        <label className="text-center font-bold tracking-wider text-3xl text-slate-800 md:text-4xl">
          Enter a New Secret
        </label>
        <textarea
          className="mb-2 md:mb-6 h-2/3 rounded-lg border-4 border-slate-800 bg-slate-100 p-2 text-lg tracking-tighter md:h-3/4  md:text-2xl"
          placeholder="Private information you want to share goes here"
          ref={secretTextAreaRef}
          required
          onChange={e => setTextAreaLength(e.target.textLength)}
          maxLength={500}
        />
        <button
          type="submit"
          className="mb-6 bg-slate-700 md:hover:bg-slate-400 md:hover:text-slate-100 md:hover:shadow-slate-700 py-4 text-2xl tracking-wider uppercase text-slate-200 shadow-lg shadow-slate-100 md:py-6 md:text-4xl md:font-bold"
        >
          Create New Secret
        </button>
        <p className="absolute bottom-32 right-5 text-lg md:bottom-40 md:right-16 md:text-2xl">{textAreaLength}/500</p>
      </form>
    </>
  );
};

export default NewSecretForm;
