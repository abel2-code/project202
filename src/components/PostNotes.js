import React from 'react';
import axios from 'axios';

//changed class name from GetAllNotes to PostNotes. Worked initially.
export default class PostNotes extends React.Component{
    state = {
        student: "",
        notes: []
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
        
    }

    handleAddNotesSubmit = (event) => {
        // Handles the get notes event
        event.preventDefault();

        const user = {
            student: this.state.student,
            notes: this.state.notes
        }
        axios.post("http://localhost:9000/notes", { user })
        .then(res => {
            const studentNotes = res.data;
         //  this.setState({ notes });
            console.log(studentNotes)
        })
       
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleAddNotesSubmit}>
                    <input type="text" id="student" placeholder="Your name" name="student" onChange={this.handleChange} />
                    <input type="text" id="notes" placeholder="Add notes" name="notes" onChange={this.handleChange} />
                    <button type="submit">Add</button>
                    </form>
            </div>
        )}
}