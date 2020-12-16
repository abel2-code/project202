import React, { useState, useEffect } from "react";
import { googleTranslate } from "./utils/googleTranslate";
import "./Nav.css";

function Nav({
  language,
  isAuthenticated,
  chooseHome,
  isLoggedIn,
  chooseLogin,
  chooseTranslateSpeech,
  chooseTranslateText,
  chooseConvertImage,
  chooseNotes,
}) {
  const [home, handleHome] = useState("Home");
  const [login, handleLogIn] = useState(isLoggedIn ? "Log Out" : "Log In");
  const [translateSpeech, handleTranslateSpeech] = useState("Translate Speech");
  const [translateText, handleTranslateText] = useState("Translate Text");
  const [convertImage, handleConvertImage] = useState("Convert Image");
  const [notes, handleNotes] = useState("Notes");
  const [logInClicked, handleLogInClicked] = useState(false);
  const [speechClicked, handleSpeechClicked] = useState(false);
  const [textClicked, handleTextClicked] = useState(false);
  const [convertImageClicked, handleConvertImageClicked] = useState(false);
  const [notesClicked, handleNotesClicked] = useState(false);

  useEffect(() => {
    let transState;
    googleTranslate.translate("Home", language, function (err, translation) {
      transState = translation.translatedText;
      translating(transState);
    });

    const translating = (transState) => {
      handleHome(transState);
    };
  }, [language]);

  useEffect(() => {
    let transState;
    googleTranslate.translate("Notes", language, function (err, translation) {
      transState = translation.translatedText;
      translating(transState);
    });

    const translating = (transState) => {
      handleNotes(transState);
    };
  }, [language]);

  useEffect(() => {
    let transState;
    googleTranslate.translate(login, language, function (err, translation) {
      transState = translation.translatedText;
      translating(transState);
    });

    const translating = (transState) => {
      handleLogIn(transState);
    };
  }, [language]);

  useEffect(() => {
    let transState;
    googleTranslate.translate("Speech", language, function (err, translation) {
      transState = translation.translatedText;
      translating(transState);
    });

    const translating = (transState) => {
      handleTranslateSpeech(transState);
    };
  }, [language]);

  useEffect(() => {
    let transState;
    googleTranslate.translate("Text", language, function (err, translation) {
      transState = translation.translatedText;
      translating(transState);
    });

    const translating = (transState) => {
      handleTranslateText(transState);
    };
  }, [language]);

  useEffect(() => {
    let transState;
    googleTranslate.translate("Image", language, function (err, translation) {
      transState = translation.translatedText;
      translating(transState);
    });

    const translating = (transState) => {
      handleConvertImage(transState);
    };
  }, [language]);

  const clearHandles = () => {
    handleLogInClicked(false);
    handleSpeechClicked(false);
    handleTextClicked(false);
    handleConvertImageClicked(false);
    handleNotesClicked(false);
  };

  return (
    <nav className="nav">
      {isAuthenticated ? (
        <ul className="nav__list">
          <li
            className="nav__list"
            onClick={() => {
              chooseHome();
              clearHandles();
            }}
          >
            {home}
          </li>
          <li
            className={`nav__list ${logInClicked && "clicked"}`}
            onClick={() => {
              chooseLogin();
              clearHandles();
              handleLogInClicked(true);
            }}
          >
            {login}
          </li>
          <li
            className={`nav__list ${speechClicked && "clicked"}`}
            onClick={() => {
              chooseTranslateSpeech();
              clearHandles();
              handleSpeechClicked(true);
            }}
          >
            {translateSpeech}
          </li>
          <li
            className={`nav__list ${textClicked && "clicked"}`}
            onClick={() => {
              chooseTranslateText();
              clearHandles();
              handleTextClicked(true);
            }}
          >
            {translateText}
          </li>
          <li
            className={`nav__list ${convertImageClicked && "clicked"}`}
            onClick={() => {
              chooseConvertImage();
              clearHandles();
              handleConvertImageClicked(true);
            }}
          >
            {convertImage}
          </li>
          <li
            className={`nav__list ${notesClicked && "clicked"}`}
            onClick={() => {
              chooseNotes();
              clearHandles();
              handleNotesClicked(true);
            }}
          >
            {notes}
          </li>
        </ul>
      ) : (
        <ul className="nav__list">
          <li
            className="nav__list"
            onClick={() => {
              chooseHome();
              clearHandles();
            }}
          >
            {home}
          </li>
          <li
            className={`nav__list ${logInClicked && "clicked"}`}
            onClick={() => {
              chooseLogin();
              clearHandles();
              handleLogInClicked(true);
            }}
          >
            {login}
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Nav;
