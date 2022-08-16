import React, { BaseSyntheticEvent, useState } from "react";


const NewSecretForm = () => {
  const [newSecretText, setNewSecretText] = useState("");

  const handleNewSecretChange = (e: BaseSyntheticEvent) => {
          setNewSecretText(e.target.value);
  }

  const handleNewSecretSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setNewSecretText("");
  };

  return (
    <form
      className="m-2 flex h-full flex-col justify-end sm:justify-center md:px-8 lg:mx-auto lg:max-w-3xl"
      onSubmit={handleNewSecretSubmit}
    >
      <label className="text-xl text-slate-100">Enter a New Secret</label>
      <textarea
        className="mb-6 h-2/3 rounded-lg border-4 border-slate-800 bg-slate-200 p-2  sm:h-3/4"
        value={newSecretText}
        onChange={handleNewSecretChange}
      />
      <button
        type="submit"
        className="mb-6 bg-slate-300 p-2 text-xl hover:bg-slate-600 hover:text-slate-200 md:py-4"
      >
        Create New Secret
      </button>
    </form>
  );
};

export default NewSecretForm;
