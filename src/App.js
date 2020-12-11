import React, { useEffect, useState } from "react";
import { googleTranslate } from "./utils/googleTranslate";
import "./App.css";
import TranslateSpeech from "./TranslateSpeech.js";
import cookie from "react-cookies";
import AuthNav from "./components/AuthStatus";
import ConvertImage from "./ConvertImage";
import NoteForm from "./components/NoteForm";
import AuthStatus from "./components/AuthStatus";


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

function App() {
  const [transcript, handleTranscript] = useState([]);
  const [nativeTranscript, handleNativeTranscript] = useState([]);
  const [languageCodes, handleLanguageCodes] = useState([]);
  const [language, handleLanguage] = useState(
    cookie.load("language") ? cookie.load("language") : "en"
  );
  const [inputLanguage, handleInputLanguage] = useState(
    cookie.load("inputLanguage") ? cookie.load("inputLanguage") : "en"
  );
  const [inputSelected, handleInputSelected] = useState(false);
  const [question, handleQuestion] = useState("");

  useEffect(() => {
    googleTranslate.getSupportedLanguages("en", (err, languageCodes) => {
      console.log(languageCodes);
      getLanguageCodes(languageCodes);
    });

    const getLanguageCodes = (languageCodes) => {
      handleLanguageCodes(languageCodes);
    };
  }, []);

  recognition.onstart = () => {
    console.log("voice activated");
  };
  recognition.onresult = (e) => {
    const current = e.resultIndex;

    const newTranscript = e.results[current][0].transcript;
    if (!inputSelected) {
      handleTranscript([...transcript, newTranscript]);
    } else handleNativeTranscript([...nativeTranscript, newTranscript]);
  };

  const changeHandler = (language) => {
    let aquestion = question;
    let cookieLanguage = cookie.load("language");
    let transQuestion = "";

    const translating = (transQuestion) => {
      if (aquestion !== transQuestion) {
        handleQuestion(transQuestion);
        cookie.save("question", transQuestion, { path: "/" });
      }
    };

    if (language !== cookieLanguage) {
      googleTranslate.translate(question, language, (err, translation) => {
        transQuestion = translation.translatedText;
        translating(transQuestion);
      });
    }

    handleLanguage(language);
    cookie.save("language", language, { path: "/" });
  };

  const changeInputHandler = (language) => {
    handleInputLanguage(language);
    cookie.save("inputLanguage", language, { path: "/" });
  };

  return (
    <div className="App">
      <div className="app__question">
        <br />
        <p>What's your language? </p>
        <select
          className="select__language"
          value={language}
          onChange={(e) => changeHandler(e.target.value)}
        >
          {languageCodes.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="app__question">
        Instructor's language
        <select
          className="select-language"
          value={inputLanguage}
          onChange={(e) => changeInputHandler(e.target.value)}
        >
          {languageCodes.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className={`talk`}
        onClick={() => {
          handleInputSelected(false);
          recognition.start();
        }}
      >
        Talk
      </button>
      <button
        className={"talk"}
        onClick={() => {
          recognition.stop();
        }}
      >
        Stop
      </button>
      {transcript.map((text) => (
        <p>{text}</p>
      ))}
      <div>
        <div className="translated-speech">
          <div className="speech-list">
            {transcript.map((text) => (
              <TranslateSpeech message={text} language={language} />
            ))}
          </div>
          <div className="speech-list">
            {nativeTranscript.map((text) => (
              <TranslateSpeech message={text} language={inputLanguage} />
            ))}
          </div>
        </div>
      </div>
      <ConvertImage language={language} />

      <AuthStatus />

      <NoteForm />
      
      
    </div>
  );
}

export default App;
