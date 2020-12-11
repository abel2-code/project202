import React, { useState, useEffect } from "react";
import { googleTranslate } from "./utils/googleTranslate";

function TranslateImage({ text, language }) {
  const [translatedImage, handleTranslatedImage] = useState("");

  useEffect(() => {
    let transState;
    googleTranslate.translate(text, language, (err, translation) => {
      transState = translation.translatedText;
      translating(transState);
    });

    const translating = (transState) => {
      handleTranslatedImage(transState);
    };
  }, [language, text]);
  return (
    <div>
      <li>{translatedImage}</li>
    </div>
  );
}

export default TranslateImage;
