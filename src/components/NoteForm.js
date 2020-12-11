import React from "react";
import ReactDOM from "react-dom";

export default class NoteForm extends React.Component {
  // Creates and exports NoteForm class
  constructor(props) {
    // Uses a constructor to set the initial
    super(props); // state to a blank string
    this.state = { note: "" };
  }

  handleNoteEvent = (event) => {
    // Handles the input event

    this.setState({ note: event.target.value }); // by getting the note value
  };
  render() {
    // and giving render instructions
    // to change the value of empty string to note input
    // and display it as an h3
    return (
      <React.Fragment>
        <form>
          <label htmlFor="note">Note</label>
          <input
            type="text"
            name="note"
            value={this.state.note}
            onChange={this.handleNoteEvent}
          />
        </form>

        <h3>Note: {this.state.note}</h3>
      </React.Fragment>
    );
  }
}
