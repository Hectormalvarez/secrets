import React, { BaseSyntheticEvent, useState } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { createSecret } from "../graphql/mutations";

import NewSecretModal from "../components/modal/NewSecretModal";

import { createID, encryptText } from "../utils";
import { ToastContainer, Slide, toast } from "react-toastify";

const NewSecretForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [textAreaLength, setTextAreaLength] = useState(0); // used to show character limit in text area
  const [newSecretID, setNewSecretID] = useState(""); // holds secretID to pass to modal

  const handleNewSecretSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (e.target[0].value === "") {
      toast.warn("please enter a secret!");
      return;
    }
    // encrypt text and save in variable to upload
    const encryptedSecret = encryptText(e.target[0].value, "password");
    try {
      // create id for new secret
      const secretID = createID();
      // upload secret to the cloud
      await API.graphql(
        graphqlOperation(createSecret, {
          input: { id: secretID, secretText: encryptedSecret },
        })
      );
      // save secretid in state
      setNewSecretID(secretID);
      // clear form
      e.target[0].value = "";
      // notify user of success
      toast.success("secret uploaded to the cloud and link created!");
    } catch (error) {
      // notify user of error
      toast.error("unable to upload secret!");
      console.log(error);
    }
    setModalIsOpen(true);
  };

  return (
    <>
      <ToastContainer
        transition={Slide}
        position={toast.POSITION.TOP_LEFT}
        className={"create secret toast"}
      />
      <NewSecretModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        secretID={newSecretID}
      />
      <form
        className="relative m-2 flex h-full flex-col justify-end md:mx-auto md:max-w-3xl md:px-8"
        onSubmit={handleNewSecretSubmit}
      >
        <label className="text-center text-3xl font-bold tracking-wider text-slate-800 md:text-4xl">
          Enter a New Secret
        </label>
        <textarea
          className="mb-2 h-2/3 rounded-lg border-4 border-slate-800 bg-slate-100 p-2 text-lg tracking-tighter md:mb-6 md:h-3/4  md:text-2xl"
          placeholder="Private information you want to share goes here"
          onChange={(e) => setTextAreaLength(e.target.textLength)}
          maxLength={500}
        />
        <button
          type="submit"
          className="mb-6 rounded-lg border-4 border-slate-800 bg-slate-500 py-4 text-2xl uppercase tracking-wider text-slate-200 shadow-md shadow-slate-800 md:py-6 md:text-4xl md:font-bold md:hover:bg-slate-400 md:hover:text-slate-100 md:hover:shadow-slate-700"
        >
          Create New Secret
        </button>
        <p className="absolute bottom-32 right-5 text-lg md:bottom-40 md:right-16 md:text-2xl">
          {textAreaLength}/500
        </p>
      </form>
    </>
  );
};

export default NewSecretForm;
