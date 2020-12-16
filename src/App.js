import React, { useEffect, useState } from "react";
import { googleTranslate } from "./utils/googleTranslate";
import "./App.css";
import TranslateSpeech from "./TranslateSpeech.js";
import cookie from "react-cookies";
import ConvertImage from "./ConvertImage";
import TranslateText from "./TranslateText";
// import NoteForm from "./components/Notes";
import AuthStatus from "./components/AuthStatus";
import GetAllNotes from "./components/GetAllNotes";
import PostNotes from "./components/PostNotes";
import DeleteStudent from "./components/DeleteStudent";
import UpdateNotes from "./components/UpdateNotes";
import { useAuth0 } from "@auth0/auth0-react";
import Nav from "./Nav";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

function App() {
  const { isAuthenticated } = useAuth0();
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
  const [translateSpeech, handleTranslateSpeech] = useState(false);
  const [translateText, handleTranslateText] = useState(false);
  const [convertImage, handleConvertImage] = useState(false);
  const [home, handleHome] = useState(true);
  const [logIn, handleLogIn] = useState(false);
  const [notes, handleNotes] = useState(false);
  const [listenActive, handleListenActive] = useState(false);
  const [talkActive, handleTalkActive] = useState(false);
  const [talk, handleTalk] = useState("Talk");
  const [stop, handleStop] = useState("Stop");
  const [listen, handleListen] = useState("Listen");
  const [firstLanguagePrompt, handleFirstLanguagePrompt] = useState(
    "What's your language?"
  );
  const [secondLanguagePrompt, handleSecondLanguagePrompt] = useState(
    "Instructor's language"
  );

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

  useEffect(() => {
    let transState;
    googleTranslate.translate(
      "Your language: ",
      language,
      function (err, translation) {
        transState = translation.translatedText;
        translating(transState);
      }
    );

    const translating = (transState) => {
      handleFirstLanguagePrompt(transState);
    };
  }, [language]);

  useEffect(() => {
    let transState;
    googleTranslate.translate(
      "Instructor's language: ",
      language,
      function (err, translation) {
        transState = translation.translatedText;
        translating(transState);
      }
    );

    const translating = (transState) => {
      handleSecondLanguagePrompt(transState);
    };
  }, [language]);

  useEffect(() => {
    let transMessage;
    googleTranslate.translate("Talk", language, function (err, translation) {
      transMessage = translation.translatedText;
      translating(transMessage);
    });

    const translating = (transMessage) => {
      handleTalk(transMessage);
    };
  }, [language]);

  useEffect(() => {
    let transMessage;
    googleTranslate.translate("Listen", language, function (err, translation) {
      transMessage = translation.translatedText;
      translating(transMessage);
    });

    const translating = (transMessage) => {
      handleListen(transMessage);
    };
  }, [language]);

  useEffect(() => {
    let transMessage;
    googleTranslate.translate("Stop", language, function (err, translation) {
      transMessage = translation.translatedText;
      translating(transMessage);
    });

    const translating = (transMessage) => {
      handleStop(transMessage);
    };
  }, [language]);

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

  const clearStatus = () => {
    handleHome(false);
    handleTranslateSpeech(false);
    handleTranslateText(false);
    handleConvertImage(false);
    handleLogIn(false);
    handleNotes(false);
  };

  return (
    <div className="App">
      <Nav
        language={language}
        chooseHome={() => {
          clearStatus();
          handleHome(true);
        }}
        chooseTranslateSpeech={() => {
          clearStatus();

          handleTranslateSpeech(true);
        }}
        chooseTranslateText={() => {
          clearStatus();
          handleTranslateText(true);
        }}
        chooseConvertImage={() => {
          clearStatus();
          handleConvertImage(true);
        }}
        chooseLogin={() => {
          clearStatus();
          handleLogIn(true);
        }}
        chooseNotes={() => {
          clearStatus();
          handleNotes(true);
        }}
      />
      <div className="app__question">
        <br />
        {firstLanguagePrompt}
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
        {secondLanguagePrompt}
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
      {logIn ? <AuthStatus /> : ""}
      {isAuthenticated ? (
        <div>
          {translateSpeech ? (
            <div>
              <div className="translated-speech">
                <div className="buttons">
                  <button
                    className={`talk ${listenActive && "active-button"}`}
                    onClick={() => {
                      handleInputSelected(false);
                      handleListenActive(true);
                      recognition.lang = { language };
                      recognition.start();
                    }}
                  >
                    {listen}
                  </button>
                  <button
                    className="talk"
                    onClick={() => {
                      recognition.stop();
                      handleListenActive(false);
                      handleTalkActive(false);
                    }}
                  >
                    {stop}
                  </button>
                </div>
                <div className="buttons">
                  <button
                    className={`talk ${talkActive && "active-button"}`}
                    onClick={() => {
                      handleInputSelected(true);
                      handleTalkActive(true);
                      recognition.lang = { inputLanguage };
                      recognition.start();
                    }}
                  >
                    {talk}
                  </button>
                  <button
                    className="talk"
                    onClick={() => {
                      recognition.stop();
                      handleListenActive(false);
                      handleTalkActive(false);
                    }}
                  >
                    {stop}
                  </button>
                </div>
              </div>
              <br />
              <br />
              {transcript || nativeTranscript ? (
                <div className="translated-speech">
                  <div className="speech-list">
                    {transcript.map((text) => (
                      <TranslateSpeech message={text} language={language} />
                    ))}
                  </div>
                  <div className="speech-list">
                    {nativeTranscript.map((text) => (
                      <TranslateSpeech
                        message={text}
                        language={inputLanguage}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          {convertImage ? <ConvertImage language={language} /> : ""}
          {translateText ? <TranslateText language={language} /> : ""}
          {notes ? (
            <div>
              {/* <NoteForm /> */}
              <GetAllNotes language={language} />
              <PostNotes language={language} />
              <DeleteStudent language={language} />
              <UpdateNotes language={language} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
