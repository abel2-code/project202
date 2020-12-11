import React, { useState, useEffect } from "react";
import { googleTranslate } from "./utils/googleTranslate";

function TranslateSpeech({ message, language }) {
  const [translatedMessage, handleTranslatedMessage] = useState("");

  useEffect(() => {
    let transMessage = "";

    if (language) {
      googleTranslate.translate(message, language, (err, translation) => {
        transMessage = translation.translatedText;
        translating(transMessage);
      });
    }

    const translating = (transMessage) => {
      handleTranslatedMessage(transMessage);
    };
  }, [message, language]);

  useEffect(() => {
    let newMessage;
    let nationality;

    if (newMessage !== translatedMessage) {
      newMessage = translatedMessage;
      if (language === "en") {
        nationality = "US English";
      }
      if (language === "es") {
        nationality = "Spanish Latin American";
      }
      if (language === "fr") {
        nationality = "French";
      }
      if (language === "de") {
        nationality = "Deutsch";
      }
      if (language === "it") {
        nationality = "Italian";
      }
      if (language === "ru") {
        nationality = "Russian";
      }
      if (language === "nl") {
        nationality = "Dutch";
      }
      if (language === "ko") {
        nationality = "Korean";
      }
      if (language === "zh-TW" || language === "zh-CN") {
        nationality = "Chinese";
      }
      if (language === "hi") {
        nationality = "Hindi";
      }
      if (language === "id") {
        nationality = "Indonesian";
      }
      if (language === "pl") {
        nationality = "Polish";
      }
      if (language === "pt") {
        nationality = "Portuguese";
      }

      window.responsiveVoice.speak(newMessage, `${nationality} Female`);
    }
  }, [translatedMessage, language]);
  return (
    <div>
      {message}
      <br />
      {translatedMessage}
      <br />
      <br />
    </div>
  );
}

export default TranslateSpeech;
