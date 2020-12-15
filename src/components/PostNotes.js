import React, { useState, useEffect } from "react";
import axios from "axios";
import { googleTranslate } from "../utils/googleTranslate";

//changed class name from GetAllNotes to PostNotes. Worked initially.
export default function PostNotes({ language }) {
  const [student, handleStudent] = useState("");
  const [notes, handleNotes] = useState([]);
  const [studentName, handleStudentName] = useState("Your name");
  const [studentNotePrompt, handleStudentNotePrompt] = useState("Add note");
  const [buttonText, handleButtonText] = useState("Add");

  const handleAddNotesSubmit = (event) => {
    // Handles the get notes event
    event.preventDefault();

    const user = {
      student,
      notes,
    };
    axios
      .post("https://special-project202.herokuapp.com/notes", { user })
      .then((res) => {
        const studentNotes = res.data;
        //  setState({ notes });
        console.log(studentNotes);
      });
  };

  useEffect(() => {
    let transState;
    googleTranslate.translate(
      "Your name",
      language,
      function (err, translation) {
        transState = translation.translatedText;
        translating(transState);
      }
    );

    const translating = (transState) => {
      handleStudentName(transState);
    };
  }, [language]);

  useEffect(() => {
    let transState;
    googleTranslate.translate(
      "Add note",
      language,
      function (err, translation) {
        transState = translation.translatedText;
        translating(transState);
      }
    );

    const translating = (transState) => {
      handleStudentNotePrompt(transState);
    };
  }, [language]);

  useEffect(() => {
    let transState;
    googleTranslate.translate("Add", language, function (err, translation) {
      transState = translation.translatedText;
      translating(transState);
    });

    const translating = (transState) => {
      handleButtonText(transState);
    };
  }, [language]);

  return (
    <div>
      <form onSubmit={handleAddNotesSubmit}>
        <input
          type="text"
          id="student"
          placeholder={studentName}
          name="student"
        />
        <input
          type="text"
          id="notes"
          placeholder={studentNotePrompt}
          name="notes"
        />
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
}
