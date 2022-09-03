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
      className="
        m-2
        flex
        h-full
        flex-col
        md:mx-auto
        md:max-w-3xl
        md:px-8
      "
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
        className="
          landscape-keyboard
          mb-2
          h-2/3
          rounded-lg
          border-4
          border-slate-800
          bg-slate-100
          p-2
          text-sm
          tracking-tighter
          md:mb-6
          md:h-3/4
          md:text-2xl
        "
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

  // if clipboard or secret contain unable to download error show create secret button
  if (copied || secret === "Unable to Download Secret") {
    return (
      <button
        type="submit"
        className="
          mb-6
          rounded-md
          border-4
          border-slate-700
          bg-slate-200
          py-4
          text-2xl
          uppercase
          tracking-wider
          text-slate-700
          shadow-lg
          shadow-slate-600
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
        onClick={() => {
          navigate("/new-secret", { replace: true });
        }}
      >
        Create New Secret!
      </button>
    );
  }
  // returns empty component otherwise
  return <></>;
};

const OpenSecretButton = ({ }: any) => {
  // if secret contain unable to download error show create secret button
  return (
    <button
      type="submit"
      className="
        mb-4
        rounded-md
        border-4
        border-white
        bg-slate-600
        py-4
        text-2xl
        uppercase
        tracking-wider
        text-slate-200
        shadow-lg
        shadow-slate-700
        md:py-6
        md:text-4xl
        md:font-bold
        md:transition-all
        md:duration-300
        md:hover:scale-105
        md:hover:bg-slate-300
        md:hover:text-slate-800
      "
    >
      open secret!
    </button>
  );
};

export default OpenSecret;
