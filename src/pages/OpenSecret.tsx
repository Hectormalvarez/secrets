import React, { useEffect, useRef, useState } from "react";

import useCopy from "use-copy";
import { useParams } from "react-router-dom";

import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { encryptText, decryptText } from "../utils";

const OpenSecret = () => {
  const [secret, setSecret] = useState("");
  const secretTextRef = useRef<HTMLTextAreaElement>(null);
  const [copied, copy, setCopied] = useCopy(secret);

  const { secretID } = useParams();

  const handleSecretClick = () => {
    if (copied) {
      copy()
      setCopied(true)
      secretTextRef.current?.select();
      toast.success("Copied to Clipboard!", {
        toastId: "already-open-error",
      });
    } else {
      toast.error("Open Secret First!", {
        toastId: "secret-click-error",
      });
    }
  };

  const handleOpenSecret = () => {
    copy()
    setSecret(decryptText(secret as string, "password"));
    toast.dismiss();
    toast.success("Secret Opened and Copied to Clipboard!", {
      toastId: "opened-success",
      autoClose: 3000,
    });
    secretTextRef.current?.select();
  };

  useEffect(() => {
    const encryptSecretID = encryptText(secretID as string, "password");
    setSecret(encryptSecretID);
  }, [secretID]);

  // use effect to select secret text once opened
  useEffect(() => {
    if (copied) secretTextRef.current?.select();
  }, [secret, copied])

  return (
    <section className="relative m-2 flex h-full flex-col justify-center md:mx-auto md:max-w-3xl md:px-8">
      <ToastContainer
        transition={Slide}
        position={toast.POSITION.BOTTOM_CENTER}
        autoClose={1500}
      />
      <h2 className="text-center text-2xl">open a one time secret!</h2>
      <textarea
        className=" mb-2 h-2/3 rounded-lg border-4 border-slate-800 bg-slate-100 p-2 text-sm tracking-tighter md:mb-6 md:h-3/4  md:text-2xl"
        defaultValue={secret}
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
