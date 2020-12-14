import React, { Component } from "react";

export default class AddNote extends Component {
  // sets initial state for AddNote component
  state = {
    title: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addNote(this.state.title);
    this.setState({ title: "" });
  };
  // this is component state only - sets state for AddNote only to whatever we type in
  onChange = (e) => this.setState({ title: e.target.value });

  render() {
    return (
      <form id="NoteForm" style={{ display: "flex" }} onSubmit={this.onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Add your note here..."
          style={{ flex: "5", padding: "5px" }}
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}
