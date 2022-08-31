import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { decryptText } from "../utils";
import { API, graphqlOperation } from "aws-amplify";
import { getSecret } from "../graphql/queries";
import { deleteSecret } from "../graphql/mutations";
import useCopy from "use-copy";

const OpenSecret = () => {
  const [secret, setSecret] = useState("");
  const [decryptedSecret, setDecryptedSecret] = useState("");
  const secretTextRef = useRef<HTMLTextAreaElement>(null);
  const [copied, copy, setCopied] = useCopy(decryptedSecret);

  const { secretID } = useParams();
  let navigate = useNavigate();

  const handleSecretClick = () => {
    // if secret not found based on ID returns doing nothing
    if (secret === "Unable to Download Secret") return;
    // using 'copied' as signal that secret has been opened
    // when secret is opened it is copied to clipboard and copied = true
    if (copied) { // if secret has already been opened clicking on the secret will re-copy to clipboard
      copy();
      secretTextRef.current?.select(); // highlights text area to give user feedback of copy
      toast.success("copied to clipboard!", { // notifys user of copy success
        toastId: "already-open-error",
      });
    } else {
      // if secret hasnt been opened yet user is notified of the requirement
      toast.error("Open Secret First!", {
        toastId: "secret-click-error",
      });
    }
  };

  const handleOpenSecret = () => {
    // if secret not found based on ID returns doing nothing
    if (secret === "Unable to Download Secret") return;
    copy(); // copies secret to clipboard
    setCopied(true); // sets copied state to true
    toast.dismiss(); // removes previous toasts
    // notifies user of opening and copying to clipboard
    toast.success("Secret Opened and Copied to Clipboard!", {
      toastId: "opened-success",
    });
    // selects text area as visual feedback to user that text is copied
    secretTextRef.current?.select();
    // deletes secret from cloud
    destroySecret(secretID as string);
  };

  // function to retreive secret from cloud
  const downloadSecret = async (secretID: string) => {
    try {
      const secretData: any = await API.graphql(
        graphqlOperation(getSecret, { id: secretID })
      );
      const secretText = secretData.data.getSecret.secretText;
      setSecret(secretText);
    } catch (error) {
      setSecret("Unable to Download Secret");
      toast.error("Unable to Download Secret", {
        toastId: "download-secret-error",
      });
    }
  };

  // function for deleting secrets from cloud
  const destroySecret = async (secretID: string) => {
    try {
      await API.graphql(
        graphqlOperation(deleteSecret, { input: { id: secretID } })
      );
    } catch (error) {
      toast.error("Unable to destroy secret!", {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    // if secretID parameter is found download secret from cloud
    if (secretID) {
      downloadSecret(secretID);
    }
    // if secret downloaded decrypt text for reveal
    if (secret) {
      const decryptedText = decryptText(secret as string, "password");
      setDecryptedSecret(decryptedText);
    }
  }, [secretID, secret]);

  return (
    <section className="m-2 flex h-full flex-col md:mx-auto md:max-w-3xl md:px-8">
      <h2 className="text-center text-2xl">open a one time secret!</h2>
      <textarea
        className="landscape-keyboard mb-2 h-2/3 rounded-lg border-4 border-slate-800 bg-slate-100 p-2 text-sm tracking-tighter md:mb-6 md:h-3/4  md:text-2xl"
        defaultValue={`${copied ? decryptedSecret : secret}`}
        onClick={handleSecretClick} // copies text to clipboard if open
        ref={secretTextRef}
        readOnly
      />
      <OpenSecretButton
        copied={copied}
        handleOpenSecret={handleOpenSecret}
        handleSecretClick={handleSecretClick}
        secret={secret}
      />
      <CreateNewSecretButton
        navigate={navigate}
        copied={copied}
        secret={secret}
      />
    </section>
  );
};


const CreateNewSecretButton = ({ navigate, copied, secret }: any) => {
  // if clipboard or secret contain unable to download error show create secret button
  if (copied || secret.secretText === "Unable to Download Secret") {
    return (
      <button
        type="submit"
        className="mb-6 rounded-md border-4 border-slate-700 bg-slate-200 py-4 text-2xl uppercase tracking-wider text-slate-700 shadow-lg shadow-slate-600 md:py-6 md:text-4xl md:font-bold md:hover:bg-slate-400 md:hover:text-slate-100 md:hover:shadow-slate-700 md:transition-all md:duration-300 md:hover:scale-105"
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

const OpenSecretButton = ({
  copied, // secret is open or not
  handleOpenSecret, // opens secret
  handleSecretClick, // handles clicking on button or textarea
  secret, // secret data
}: any) => {
  // if secret contain unable to download error show create secret button
  if (secret.secretText === "Unable to Download Secret") return <></>;
  return (
    <button
      type="submit"
      className="mb-4 rounded-md border-4 border-white bg-slate-600 py-4 text-2xl uppercase tracking-wider text-slate-200 shadow-lg shadow-slate-700 md:py-6 md:text-4xl md:font-bold md:transition-all md:duration-300 md:hover:scale-105 md:hover:bg-slate-300 md:hover:text-slate-800"
      // if secret hasnt been opened button opens secret, if secret is open button re-copies to clipboard
      onClick={!copied ? handleOpenSecret : handleSecretClick}
    >
      {!copied ? "Open Secret!" : "Copy to Clipboard!"}
    </button>
  );
};

export default OpenSecret;
