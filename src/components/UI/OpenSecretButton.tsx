import React from "react";

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
          className="secret button"
          onClick={handleOnClick}
        >
          copy to clipboard!
        </button>
      );
    // if not decrypted opens text
    return (
      <button type="submit" className="secret button" onClick={handleOnClick}>
        {isLoading ? "loading" : "open secret!"}
      </button>
    );
  };

  export default OpenSecretButton;