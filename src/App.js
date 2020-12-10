import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginButton from "./components/LoginButton";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

function App() {
  const [transcript, handleTranscript] = useState([]);

  recognition.onstart = () => {
    console.log("voice activated");
  };
  recognition.onresult = (e) => {
    const current = e.resultIndex;

    const newTranscript = e.results[current][0].transcript;
    handleTranscript([...transcript, newTranscript]);
  };
  return (
    <div className="App">
      <button
        className={`talk`}
        onClick={() => {
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
      
      <LoginButton />
    </div>
  );
}

export default App;
