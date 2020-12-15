import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GetAllNotes.css";
import { googleTranslate } from "../utils/googleTranslate";

export default function GetAllNotes({ language }) {
  const [notes, handleNotes] = useState([]);
  const [getAllNotesPrompt, handleGetAllNotesPrompt] = useState(
    "Get All Notes"
  );

  const handleGetAllNotes = (event) => {
    // Handles the get notes event
    axios.get("http://localhost:9000/notes").then((res) => {
      const allNotes = res.data;
      handleNotes(allNotes);
      console.log(allNotes);
    });
  };

  useEffect(() => {
    let transState;
    googleTranslate.translate(
      "Get All Notes",
      language,
      function (err, translation) {
        transState = translation.translatedText;
        translating(transState);
      }
    );

    const translating = (transState) => {
      handleGetAllNotesPrompt(transState);
    };
  }, [language]);

  return (
    <div>
      <button onClick={handleGetAllNotes}>{getAllNotesPrompt}</button>
      {notes.map((note) => (
        <div className={Math.random() < 0.5 ? "noteStyle1" : "noteStyle2"}>
          <h3>{note.user.student}</h3>
          <p>{note.user.notes}</p>
        </div>
      ))}
    </div>
  );
}
