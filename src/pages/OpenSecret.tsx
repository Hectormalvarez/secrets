import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { API, graphqlOperation } from "aws-amplify";
import { getSecret } from "../graphql/queries";
import { deleteSecret } from "../graphql/mutations";
import copyToClipboard from "copy-to-clipboard";
import { toast } from "react-toastify";

import useAPI from "../hooks/use-api";
import { decryptText } from "../utils";

const OpenSecret = () => {
  const secretTextRef = useRef<HTMLTextAreaElement>(null);
  const [secretData, setSecretData] = useState<any>();
  const [secretIsDecrypted, setSecretIsDecrypted] = useState(false);
  const { isLoading, error, sendAPICall } = useAPI();
  const { secretID } = useParams();

  // deletes secret from cloud
  const destroySecret = async () => {
    try {
      await API.graphql(
        graphqlOperation(deleteSecret, { input: { id: secretID } })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // decrypt secret when open secret is clicked
  const handleOpenSecret = () => {
    // decrypt text
    const secretText = decryptText(secretData.getSecret.secretText, "password");
    setSecretIsDecrypted(true);
    // make new copy of secret data state for update
    const newSecretData = { ...secretData };
    // updates secretText to decrypted text
    newSecretData.getSecret.secretText = secretText;
    // copies decrypted secret
    copyToClipboard(secretText);
    // sets new updated secret to display unencrypted
    setSecretData(newSecretData);
    // alerts user of actions taken
    toast.success("secret opened and copied to clipboard!");
    // delete secret from cloud
    destroySecret();
  };

  // re-copies decrypted secret to
  const handleCopyToClipboard = () => {
    // returns early if there's an error
    if (error) return;
    // copies decrypted secret
    copyToClipboard(secretData.getSecret.secretText);
    // alerts user of actions taken
    toast.success("copied to clipboard!", { toastId: "copied-clipboard-toast" });
    // focus the textarea text as feedback of copy
    secretTextRef.current?.select();
  };

  if (secretTextRef.current) {
    // sets textarea value to secretText
    if (secretData) {
      secretTextRef.current!.value = secretData.getSecret.secretText;
    }
    // textarea value is "loading..." while secret downloads
    else {
      secretTextRef.current!.value = "loading...";
    }
    //  displays error in text area
    if (error) {
      // alerts user of error
      toast.error("Unable to download Secret", { toastId: "unable-download-toast" })
      // set textarea value to error
      secretTextRef.current!.value = error as string;
    }
    else {
      // focus secretText once decrypted
      if (secretIsDecrypted) secretTextRef.current?.select();
    }
  }

  useEffect(() => {
    const downloadSecret = async () =>
      await sendAPICall({ id: secretID }, getSecret, setSecretData);
    // downloads the secret from the cloud
    downloadSecret();
  }, [secretID, sendAPICall]);

  return (
    <section className="open-secret-section">
      <h2
        className="
        text-center
        text-2xl
        "
      >
        open a one time secret!
      </h2>
      <textarea
        className={`open-secret-textarea ${error ? "textarea-error" : ""}`}
        ref={secretTextRef}
        onClick={secretIsDecrypted ? handleCopyToClipboard : undefined}
        readOnly
      />
      <OpenSecretButton
        error={error}
        isLoading={isLoading}
        handleOnClick={
          !secretIsDecrypted ? handleOpenSecret : handleCopyToClipboard
        }
        secretIsDecrypted={secretIsDecrypted}
      />
      <CreateNewSecretButton
        error={error}
        secretIsDecrypted={secretIsDecrypted}
        useNavigate={useNavigate}
      />
    </section>
  );
};

const CreateNewSecretButton = ({
  secretIsDecrypted,
  error,
  useNavigate,
}: any) => {
  const navigate = useNavigate();
  // show if secret is decrypted\error exists
  if (secretIsDecrypted || error) {
    return (
      <button
        type="submit"
        className="create-new-secret button"
        onClick={() => {
          navigate("/");
        }}
      >
        Create New Secret!
      </button>
    );
  }
  // return empty if not decrypted\no error
  return <></>;
};

const OpenSecretButton = ({
  isLoading,
  handleOnClick,
  secretIsDecrypted,
  error,
}: any) => {
  // return empty if there's an error
  if (error) return <></>;
  // if already decrypted copies to clipboard
  if (secretIsDecrypted)
    return (
      <button
        type="submit"
        className="open-secret button"
        onClick={handleOnClick}
      >
        copy to clipboard!
      </button>
    );
  // if not decrypted opens text
  return (
    <button
      type="submit"
      className="open-secret button"
      onClick={handleOnClick}
    >
      {isLoading ? "loading" : "open secret!"}
    </button>
  );
};

export default OpenSecret;
