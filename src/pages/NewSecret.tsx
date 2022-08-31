import React, { BaseSyntheticEvent, useState } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { createSecret } from "../graphql/mutations";

import NewSecretModal from "../components/modal/NewSecretModal";

import { createID, encryptText } from "../utils";
import { toast } from "react-toastify";

const NewSecretForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [textAreaLength, setTextAreaLength] = useState(0); // used to show character limit in text area
  const [newSecretID, setNewSecretID] = useState(""); // holds secretID to pass to modal

  const handleNewSecretSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    // handle empty form submission
    if (e.target[0].value === "") {
      // warn user that secret is required
      toast.warn("please enter a secret!");
      return;
    }
    // encrypt text and save in variable to upload
    const encryptedSecret = encryptText(e.target[0].value, "password");
    try {
      // create id for new secret
      const secretID = createID();
      // create expiration date for secret (6 hours from current time)
      const secretDate = new Date(); // get's current datetime
      secretDate.setHours(secretDate.getHours() + 48) // adds 48hours
      
      debugger;
      // upload secret to the cloud
      await API.graphql(
        graphqlOperation(createSecret, {
          input: {
            id: secretID,
            secretText: encryptedSecret,
            expiration: secretDate,
          },
        })
      );
      // save secretid in state
      setNewSecretID(secretID);
      // clear form
      e.target[0].value = "";
      // notify user of success uploading
      toast.success("secret uploaded to the cloud and link created!");
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
        secretID={newSecretID}
      />
      <form
        className="m-2 flex h-full flex-col justify-end md:mx-auto md:max-w-3xl md:justify-start md:px-8"
        onSubmit={handleNewSecretSubmit}
      >
        <label className="text-center text-3xl font-bold tracking-wider text-slate-800 md:text-4xl">
          Enter a New Secret
        </label>
        <div className="w-full h-3/5 relative mb-2">
          <textarea
            className="w-full h-full rounded-lg border-4 border-slate-800 bg-slate-100 p-2 text-lg tracking-tighter md:mb-6 md:text-2xl"
            placeholder="Private information you want to share goes here"
            onChange={(e) => setTextAreaLength(e.target.textLength)}
            maxLength={500}
          />
          <p className="absolute bottom-4 right-8 text-lg md:text-2xl">
            {textAreaLength}/500
          </p>
        </div>
        <button
          type="submit"
          className="mb-6 rounded-lg border-4 border-slate-800 bg-slate-500 py-4 text-2xl uppercase tracking-wider text-slate-200 shadow-md shadow-slate-800 md:py-6 md:text-4xl md:font-bold md:hover:bg-slate-400 md:hover:text-slate-100 md:hover:shadow-slate-700"
        >
          Create New Secret
        </button>
        <p className="text-2xl uppercase font-bold tracking-wider">secrets expire after 48 hours!</p>
      </form>
    </>
  );
};

export default NewSecretForm;
