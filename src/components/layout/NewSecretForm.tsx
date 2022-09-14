import React, { useRef, useState, BaseSyntheticEvent } from "react";
import { toast } from "react-toastify";
import { API } from "aws-amplify";
import { createSecret } from "../../graphql/mutations";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";


import EnterSecretInput from "../form/NewSecretInput"
import SecretExpiration from "../form/NewSecretExpiration"
import "./NewSecretForm.css"
import { createID, encryptText } from "../../utils";

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

const NewSecretForm = ({setSecret, setModalIsOpen}: any) => {
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
        decryptAttempts: 0,
      };
      // upload secret to the cloud
      await API.graphql({
        query: createSecret,
        variables: { input: newSecret },
        authMode: "AWS_IAM",
      });
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
    <form className="secret form" onSubmit={handleNewSecretSubmit}>
      <EnterSecretInput />
      <SecretExpiration expiration={expiration} setExpiration={setExpiration} expirationDurations={expirationDurations} />
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

      <button type="submit" className="secret button">
        Create New Secret
      </button>
    </form>
  );
};

export default NewSecretForm;
