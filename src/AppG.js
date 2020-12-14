import "./App.css";
import Notes from "./components/Notes";
import AddNote from "./components/AddNote";
import { v4 as uuidv4 } from "uuid";
import React, { Component } from "react"; // Destructuring import statement, because I'm so fancy (instead of *import React from 'react'* and *class ClassComponent extends React.Component*)

class App extends Component {
  state = {
    notes: [
      {
        id: uuidv4(),
        title: "incoming notes",
      },
      {
        id: uuidv4(),
        title: "more incoming notes",
      },
    ],
  };
  // filters out  to keep every note EXCEPT the one related to onClick method
  // which is the one to be deleted
  deleteButton = (id) => {
    this.setState({
      // sets state on notes array after we filter out the one deleted
      notes: [...this.state.notes.filter((note) => note.id !== id)],
    });
  };
  // adds the note and assigns it an id using uuid, title is note content
  addNote = (title) => {
    const newNote = {
      id: uuidv4(),
      title,
    };
    // adds the new note to the state of Notes
    this.setState({ notes: [...this.state.notes, newNote] });
  };
  render() {
    // renders the notes
    return (
      <div className="App">
        <div className="container">
          <AddNote style={{ noteStyle1 }} addNote={this.addNote} />
          <Notes notes={this.state.notes} deleteButton={this.deleteButton} />
        </div>
      </div>
    );
  }
}

const noteStyle1 = {
  backgroundColor: "#ffffa5",
  minWidth: "150px",
  maxWidth: "150px",
  minHeight: "150 px",
  maxHeight: "150px",
  padding: "15px",
  fontFamily: "Snell Roundhand, cursive",
  fontSize: "15px",
  boxShadow: " 2px 4px 6px #444",
  borderBottomRightRadius: "60px 7px",
  transform: "rotate(-3deg)",
  display: "flex",
  position: "relative",
  margin: "5px",
};

const noteStyle2 = {
  backgroundColor: "#ffffa5",
  minWidth: "150px",
  maxWidth: "150px",
  minHeight: "150 px",
  maxHeight: "150px",
  padding: "15px",
  fontFamily: "Snell Roundhand, cursive",
  fontSize: "15px",
  boxShadow: " 2px 4px 6px #444",
  borderBottomRightRadius: "60px 7px",
  transform: "rotate(2deg)",
  display: "flex",
  position: "relative",
  margin: "5px",
};

export default App;
