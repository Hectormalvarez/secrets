import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { API, graphqlOperation } from "aws-amplify"
import { getSecret } from "../graphql/queries"
import { deleteSecret } from "../graphql/mutations";

import useAPI from '../hooks/use-api';
import { decryptText } from "../utils";

const OpenSecret = () => {
  const secretTextRef = useRef<HTMLTextAreaElement>(null);
  const [secretData, setSecretData] = useState<any>()
  const [secretIsDecrypted, setSecretIsDecrypted] = useState(false)
  const { isLoading, error, sendAPICall } = useAPI()
  const { secretID } = useParams()

  const destroySecret = async () => {
    try {
      await API.graphql(graphqlOperation(deleteSecret, { input: { id: secretID } }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenSecret = () => {
    const secretText = decryptText(secretData.getSecret.secretText, "password")
    setSecretIsDecrypted(true)

    const newSecretData = { ...secretData }
    newSecretData.getSecret.secretText = secretText
    setSecretData(newSecretData)
    destroySecret()
  };

  const handleCopyToClipboard = () => {
    console.log("COPIED TO CLIPBOARD")
    secretTextRef.current!.focus()
  };

  if (secretTextRef.current) {
    if (secretData) { secretTextRef.current!.value = secretData.getSecret.secretText }
    else { secretTextRef.current!.value = "loading..." }
    if (error) secretTextRef.current!.value = error as string
  }

  useEffect(() => {
    if (!secretIsDecrypted) {
      const downloadSecret = async () => await sendAPICall({ id: secretID }, getSecret, setSecretData)
      downloadSecret()
    }
  }, [secretID, sendAPICall, secretIsDecrypted])


  return (
    <section
      className="open-secret-section"
    >
      <h2
        className="
        text-center
        text-2xl
        "
      >
        open a one time secret!
      </h2>
      <textarea
        className={`${error ? "textarea-error" : ""} open-secret-textarea`}
        ref={secretTextRef}
        disabled
        readOnly
      />
      <OpenSecretButton error={error} isLoading={isLoading} handleOnClick={!secretIsDecrypted ? handleOpenSecret: handleCopyToClipboard} secretIsDecrypted={secretIsDecrypted} />
      <CreateNewSecretButton error={error} secretIsDecrypted={secretIsDecrypted} useNavigate={useNavigate} />
    </section>
  );
};

const CreateNewSecretButton = ({ secretIsDecrypted, error, useNavigate }: any) => {
  const navigate = useNavigate()
  if (secretIsDecrypted || error) {
    return (
      <button
        type="submit"
        className="create-new-secret button"
        onClick={() => { navigate("/") }}
      >
        Create New Secret!
      </button>
    );
  };
  return <></>;
}

const OpenSecretButton = ({ isLoading, handleOnClick, secretIsDecrypted, error }: any) => {
  if (error) return <></>;
  if (secretIsDecrypted) return (
    <button
      type="submit"
      className="open-secret button"
      onClick={handleOnClick}
    >
      copy to clipboard!
    </button>
  )
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
