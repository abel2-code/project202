import React from 'react';
import axios from 'axios';

export default class DeleteStudent extends React.Component{
    state = {
        student: ""
        
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
        
    }

    handleDeleteOnSubmit = (event) => {
        // Handles the get notes event
        event.preventDefault();

        const user = {
            student: this.state.student,
            
        }
        axios.delete(`http://localhost:9000/notes/${this.state.student}`)
        .then(res => {
            const studentNotes = res.data;
         //  this.setState({ notes });
            
        }).catch(error => console.log(error))
       
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleDeleteOnSubmit}>
                    <input type="text" id="student" placeholder="Your name" name="student" onChange={this.handleChange} />
                    
                    <button type="submit">Delete Student Notes</button>
                    </form>
            </div>
        )}
}