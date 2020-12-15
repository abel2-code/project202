import React, { useState, useEffect } from "react";
import { googleTranslate } from "./utils/googleTranslate";
import "./Nav.css";

function Nav({
  language,
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

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li
          className="nav__list"
          onClick={() => {
            chooseHome();
            handleLogInClicked(false);
            handleSpeechClicked(false);
            handleTextClicked(false);
            handleConvertImageClicked(false);
            handleNotesClicked(false);
          }}
        >
          {home}
        </li>
        <li
          className={`nav__list ${logInClicked && "clicked"}`}
          onClick={() => {
            chooseLogin();
            handleLogInClicked(true);
            handleSpeechClicked(false);
            handleTextClicked(false);
            handleConvertImageClicked(false);
            handleNotesClicked(false);
          }}
        >
          {login}
        </li>
        <li
          className={`nav__list ${speechClicked && "clicked"}`}
          onClick={() => {
            chooseTranslateSpeech();
            handleLogInClicked(false);
            handleSpeechClicked(true);
            handleTextClicked(false);
            handleConvertImageClicked(false);
            handleNotesClicked(false);
          }}
        >
          {translateSpeech}
        </li>
        <li
          className={`nav__list ${textClicked && "clicked"}`}
          onClick={() => {
            chooseTranslateText();
            handleLogInClicked(false);
            handleSpeechClicked(false);
            handleTextClicked(true);
            handleConvertImageClicked(false);
            handleNotesClicked(false);
          }}
        >
          {translateText}
        </li>
        <li
          className={`nav__list ${convertImageClicked && "clicked"}`}
          onClick={() => {
            chooseConvertImage();
            handleLogInClicked(false);
            handleSpeechClicked(false);
            handleTextClicked(false);
            handleConvertImageClicked(true);
            handleNotesClicked(false);
          }}
        >
          {convertImage}
        </li>
        <li
          className={`nav__list ${notesClicked && "clicked"}`}
          onClick={() => {
            chooseNotes();
            handleLogInClicked(false);
            handleSpeechClicked(false);
            handleTextClicked(false);
            handleConvertImageClicked(false);
            handleNotesClicked(true);
          }}
        >
          {notes}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
