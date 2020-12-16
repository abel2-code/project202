import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NoteItem extends Component {
  getStyle = () => {
    return {
      transform:
        this.props.note.id % 2 === 0 ? "rotate(-3deg)" : "rotate(2deg)",
    };
  };
  render() {
    const { id, title } = this.props.note; //destructuring, pulling out variables
    return (
      // <div style={this.getStyle()}>

      <div style={noteStyle1}>
        <p>
          {this.props.note.title}
          <button
            // This will bind the id on click to the delete button and sends it up to state (app)
            onClick={this.props.deleteButton.bind(this, id)}
            style={deleteButton}
          >
            x
          </button>
        </p>
      </div>
    );
  }
}
NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
};

const deleteButton = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 8px",
  opacity: '0.5',
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

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
