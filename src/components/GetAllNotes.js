import React from 'react';
import axios from 'axios';

export default class GetAllNotes extends React.Component{
    state = {
        notes: []
    }


    handleGetAllNotes = (event) => {
        // Handles the get notes event
        axios.get("http://localhost:9000/notes")
        .then(res => {
            const notes = res.data;
            this.setState({ notes });
            console.log(notes)
        })
       
    }

    render(){
        return(
            <button onClick={this.handleGetAllNotes}>
                Get All Notes
                </button>
        )
    }
}