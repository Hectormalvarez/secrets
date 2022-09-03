import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { API, graphqlOperation } from "aws-amplify";
import { getSecret } from "../graphql/queries";
import { deleteSecret } from "../graphql/mutations";

import { decryptText } from "../utils";


const OpenSecret = () => {
  const secretTextRef = useRef<HTMLTextAreaElement>(null);
  const { secretID } = useParams();


  const handleSecretClick = () => {

  };

  const handleOpenSecret = () => {

  };

  // function to retreive secret from cloud
  const downloadSecret = async (secretID: string) => {
    try {
      const secretData: any = await API.graphql(
        graphqlOperation(getSecret, { id: secretID })
      );
      return secretData.data.getSecret.secretText;
    } catch (error) {
      toast.error("Unable to Download Secret", {
        toastId: "download-secret-error",
      });
    }
  };

  // function for deleting secrets from cloud
  const destroySecret = async (secretID: string) => {
    await API.graphql(
      graphqlOperation(deleteSecret, { input: { id: secretID } })
    );
  };

  useEffect(() => {
    console.log(secretID)
  }, [secretID]);

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
        className="open-secret-ta"
        onClick={handleSecretClick} // copies text to clipboard if open
        ref={secretTextRef}
        readOnly
      />
      <OpenSecretButton
        handleOpenSecret={handleOpenSecret}
        handleSecretClick={handleSecretClick}
      />
      <CreateNewSecretButton
      />
    </section>
  );
};

const CreateNewSecretButton = ({ }: any) => {
  let navigate = useNavigate();
  return (
    <button
      type="submit"
      className="create-new-secret button"
      onClick={() => {
        navigate("/new-secret", { replace: true });
      }}
    >
      Create New Secret!
    </button>
  );
};

const OpenSecretButton = ({ }: any) => {
  // if secret contain unable to download error show create secret button
  return (
    <button
      type="submit"
      className="open-secret button"
    >
      open secret!
    </button>
  );
};

export default OpenSecret;
