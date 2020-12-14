import React, { Component } from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

export default class Notes extends Component {
  render() {
    return this.props.notes.map((note) => (
      <NoteItem
        key={note.id}
        note={note}
        deleteButton={this.props.deleteButton}
      />
    ));
  }
}
Notes.propTypes = {
  notes: PropTypes.array.isRequired,
};
