import React, { useState } from "react";

import NewSecretModal from "../components/modal/NewSecretModal";
import NewSecretForm, { secret } from "../components/form/NewSecretForm";

const NewSecret = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [secret, setSecret] = useState<secret | null>(null); // holds secretID to pass to modal

  return (
    <>
      <NewSecretModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        secretID={secret ? `${secret.id}` : "no-secret-id"}
      />
      <NewSecretForm setSecret={setSecret} setModalIsOpen={setModalIsOpen} />
    </>
  );
};

export default NewSecret;
