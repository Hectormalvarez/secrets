import React, { useRef } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { getSecret } from "../graphql/queries";
import { deleteSecret } from "../graphql/mutations";


const OpenSecret = () => {
  const secretTextRef = useRef<HTMLTextAreaElement>(null);

  const downloadSecret = async (secretID: string) => {
    const secretData: any = await API.graphql(
      graphqlOperation(getSecret, { id: secretID })
    );
    return secretData.data.getSecret.secretText;
  };

  // function for deleting secrets from cloud
  const destroySecret = async (secretID: string) => {
    await API.graphql(
      graphqlOperation(deleteSecret, { input: { id: secretID } })
    );
  };

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
        ref={secretTextRef}
        readOnly
      />
      <OpenSecretButton />
      <CreateNewSecretButton />
    </section>
  );
};

const CreateNewSecretButton = () => {
  return (
    <button
      type="submit"
      className="create-new-secret button"
    >
      Create New Secret!
    </button>
  );
};

const OpenSecretButton = () => {
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
