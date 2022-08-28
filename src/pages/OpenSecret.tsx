import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, Slide, toast } from "react-toastify";
import { decryptText } from "../utils";
import { API, graphqlOperation } from 'aws-amplify'
import { getSecret } from "../graphql/queries";
import { deleteSecret } from "../graphql/mutations";
import useCopy from "use-copy";

const OpenSecret = () => {
  const [secret, setSecret] = useState("");
  const [decryptedSecret, setDecryptedSecret] = useState("")
  const secretTextRef = useRef<HTMLTextAreaElement>(null);
  const [copied, copy, setCopied] = useCopy(decryptedSecret);

  const { secretID } = useParams();

  const handleSecretClick = () => {
    if (secret === "Unable to Download Secret") return;
    if (copied) {
      copy();
      setCopied(true);
      secretTextRef.current?.select();
      toast.success("copied to clipboard!", {
        toastId: "already-open-error",
      });
    } else {
      toast.error("Open Secret First!", {
        toastId: "secret-click-error",
      });
    }
  };

  const handleOpenSecret = () => {
    if (secret === "Unable to Download Secret") return;
    copy();
    setCopied(true);
    const decryptedText = decryptText(secret as string, "password")
    setDecryptedSecret(decryptedText);
    toast.dismiss();
    toast.success("Secret Opened and Copied to Clipboard!", {
      toastId: "opened-success",
    });
    secretTextRef.current?.select();
    destroySecret(secretID as string)
  };

  const downloadSecret = async (secretID: string) => {
    try {
      const secretData: any = await API.graphql(graphqlOperation(getSecret, { id: secretID }))
      const secretText = secretData.data.getSecret.secretText
      setSecret(secretText)
    } catch (error) {
      setSecret("Unable to Download Secret")
      toast.error("Unable to Download Secret")
    }
  }

  const destroySecret = async (secretID: string) => {
    try {
      await API.graphql(graphqlOperation(deleteSecret, {input: {id: secretID}}))
    } catch (error) {
      toast.error("Unable to destroy secret!", {
        autoClose: 3000
      })
    }
  }

  useEffect(() => {
    if (secretID) {
      downloadSecret(secretID)
    }
  }, [secretID]);

  return (
    <section className="m-2 flex h-full flex-col justify-center md:mx-auto md:max-w-3xl md:px-8">
      <ToastContainer
        transition={Slide}
        position={toast.POSITION.BOTTOM_CENTER}
        autoClose={1500}
        className="open secret toast"
      />
      <h2 className="text-center text-2xl">open a one time secret!</h2>
      <textarea
        className=" mb-2 h-2/3 rounded-lg border-4 border-slate-800 bg-slate-100 p-2 text-sm tracking-tighter md:mb-6 md:h-3/4  md:text-2xl"
        defaultValue={`${copied ? decryptedSecret : secret}`}
        onClick={handleSecretClick}
        ref={secretTextRef}
        readOnly
      />
      <button
        type="submit"
        className="mb-6 bg-slate-700 py-4 text-2xl uppercase tracking-wider text-slate-200 shadow-lg shadow-slate-100 md:py-6 md:text-4xl md:font-bold md:hover:bg-slate-400 md:hover:text-slate-100 md:hover:shadow-slate-700"
        onClick={!copied ? handleOpenSecret : handleSecretClick}
      >
        {!copied ? "Open Secret!" : "Copy to Clipboard"}
      </button>
    </section>
  );
};

export default OpenSecret;
