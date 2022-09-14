import React, { useState } from "react";
import "./NewSecretInput.css"

const EnterSecret = () => {
  const [textAreaLength, setTextAreaLength] = useState(0); // used to show character limit in text area

  return (
    <div className="enter secret">
      <label className="enter-secret label">Enter a New Secret</label>
      <textarea
        className="enter-secret input"
        placeholder="Private information you want to share goes here"
        onChange={(e) => setTextAreaLength(e.target.textLength)}
        maxLength={500}
      />
      <p className="absolute bottom-4 right-2 text-lg text-slate-500 md:bottom-10 md:right-4 md:text-2xl">
        {textAreaLength}/500
      </p>
    </div>
  );
};

export default EnterSecret;
