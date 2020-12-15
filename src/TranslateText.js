import React, { useState, useEffect } from "react";
import { googleTranslate } from "./utils/googleTranslate";
// import { debounce }  from 'lodash';
import "./TranslateText.css";

function TranslateText({ language }) {
  const [greeting, handleGreeting] = useState("");
  const [textMessage, handleTextMessage] = useState("");
  const [placeHolderText, handlePlaceHolderText] = useState("");

  useEffect(() => {
    let transGreeting;

    googleTranslate.translate(
      "Please type out a message to have it translated",
      language,
      function (err, translation) {
        transGreeting = translation.translatedText;
        translating(transGreeting);
      }
    );

    const translating = (transGreeting) => {
      handleGreeting(transGreeting);
    };
  }, [language]);

  useEffect(() => {
    let transPlaceHolderText;

    googleTranslate.translate(
      "Type your message here to translate...",
      language,
      function (err, translation) {
        transPlaceHolderText = translation.translatedText;
        translating(transPlaceHolderText);
      }
    );

    const translating = (transPlaceHolderText) => {
      handlePlaceHolderText(transPlaceHolderText);
    };
  }, [language]);

  const translateText = (typedMessage) => {
    let transMessage = "";

    googleTranslate.translate(typedMessage, "en", function (err, translation) {
      transMessage = translation.translatedText;
      translating(transMessage);
    });

    const translating = (transMessage) => {
      handleTextMessage(transMessage);
    };
  };

  return (
    <div>
      {/* {greeting}
            <br /><br /> */}
      <div className="messages">
        <div className="message">
          <textarea
            placeHolder={placeHolderText}
            onChange={(e) => translateText(e.target.value)}
          ></textarea>
        </div>
        <div className="message">{textMessage}</div>
      </div>
    </div>
  );
}

export default TranslateText;
