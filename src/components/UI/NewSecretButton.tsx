import React from "react";
import { useNavigate } from "react-router-dom";

const NewSecretButton = () => {
  const navigate = useNavigate();

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
  );;
};

export default NewSecretButton;
