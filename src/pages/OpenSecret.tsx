import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  BaseSyntheticEvent,
} from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getSecret } from "../graphql/queries";
import copyToClipboard from "copy-to-clipboard";
import { toast } from "react-toastify";

import useAPI from "../hooks/use-api";
import {
  decryptText,
  destroySecret,
  updateSecretDecryptAttempts,
} from "../utils";

const OpenSecret = () => {
  const secretTextRef = useRef<HTMLTextAreaElement>(null);
  const secretPassphraseTextRef = useRef<HTMLInputElement>(null);
  const [secretData, setSecretData] = useState<any>();
  const [secretIsDecrypted, setSecretIsDecrypted] = useState(false);
  const { isLoading, error, sendAPICall } = useAPI();
  const { secretID } = useParams();

  // decrypt secret when open secret is clicked
  const handleOpenSecret = (e: BaseSyntheticEvent) => {
    // decrypt text
    try {
      let secretPassphrase;
      if (secretData.getSecret.passphraseProtected) {
        secretPassphrase = secretPassphraseTextRef.current?.value;
      } else {
        secretPassphrase = "password";
      }
      const secretText = decryptText(
        secretData.getSecret.secretText,
        secretPassphrase as string
      );
      if (!secretText) throw new Error("unable to decrypt!");
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
      destroySecret(secretID as string);
    } catch (error: any) {
      toast.error(error.message, {
        toastId: "decrypt-failed-error",
      });
      secretPassphraseTextRef.current!.value = "";
      updateSecretDecryptAttempts({
        id: secretData.getSecret.id,
        decryptAttempts: ++secretData.getSecret.decryptAttempts,
      });
    }
  };

  // re-copies decrypted secret to
  const handleCopyToClipboard = () => {
    // returns early if there's an error
    if (error) return;
    // copies decrypted secret
    copyToClipboard(secretData.getSecret.secretText);
    // alerts user of actions taken
    toast.success("copied to clipboard!", {
      toastId: "copied-clipboard-toast",
    });
    // focus the textarea text as feedback of copy
    secretTextRef.current?.select();
  };

  if (secretTextRef.current) {
    if (secretData && !error) {
      // sets textarea value to secretText if it's loaded & not expired
      secretTextRef.current.value = secretData.getSecret.secretText;
      // focus secretText once decrypted
      if (secretIsDecrypted) secretTextRef.current?.select();
    } else if (!error) {
      // textarea value is "loading..." while secretData downloads
      secretTextRef.current!.value = "loading...";
    }
    if (error) {
      // alerts user of error
      toast.error("Unable to download Secret", {
        toastId: "unable-download-toast",
      });
      // set textarea value to error
      secretTextRef.current!.value = error as string;
    }
    // focus secretText once decrypted
    if (secretIsDecrypted) secretTextRef.current?.select();
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
      <PassphraseField
        isPassphraseProtected={
          secretData ? secretData.getSecret.passphraseProtected : null
        }
        error={error}
        ref={secretPassphraseTextRef}
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

export default OpenSecret;

const PassphraseField = forwardRef(
  ({ isPassphraseProtected, error }: any, ref: any) => {
    if (!isPassphraseProtected || error) return <></>;
    return (
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
          ref={ref}
        />
      </div>
    );
  }
);

const CreateNewSecretButton = ({
  secretIsDecrypted,
  error,
  useNavigate,
}: any) => {
  const navigate = useNavigate();
  // show if secret is decrypted\error exists
  return (
    <button
      type="submit"
      className="secret button"
      onClick={() => {
        navigate("/");
      }}
    >
      Create New Secret!
    </button>
  );
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
      className="secret button"
      onClick={handleOnClick}
    >
      {isLoading ? "loading" : "open secret!"}
    </button>
  );
};
