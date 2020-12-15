import React from "react";
import axios from "axios";

export default class UpdateNotes extends React.Component {
  state = {
    student: "",
    notes: [],
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleUpdateOnSubmit = (event) => {
    // Handles the get notes event
    event.preventDefault();

    const user = {
      student: this.state.student,
      notes: this.state.notes,
    };
    axios
      .put(
        `https://special-project202.herokuapp.com/notes/${this.state.student}`,
        {
          notes: this.state.notes,
        }
      )
      .then((res) => {
        const studentNotes = res.data;
        //  this.setState({ notes });
        console.log(studentNotes);
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleUpdateOnSubmit}>
          <input
            type="text"
            id="student"
            placeholder="Student name"
            name="student"
            onChange={this.handleChange}
          />
          <input
            type="text"
            id="notes"
            placeholder="Update notes"
            name="notes"
            onChange={this.handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}
