const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.listen(process.env.PORT || 9000);

const notes = [];


server.get("/", (req, res) => {
    res.send("API working");
});

server.get("/notes", (req, res) => {
    res.send(notes);
});

server.post("/notes", (req, res) => {
    notes.push(req.body);
    res.send(notes);
});


server.put("/notes/:student", (req, res) => {
    const student = req.params.student;
    const note = req.body;
    let result = notes.filter(note => note.user.student === student);

    result[0].user.notes = req.body.notes;
    console.log(result[0])
    res.send(result[0])
});

server.delete("/notes/:student", (req, res) =>{
    const student = req.params.student;
    let noteIdx = -1;
    
    notes.map((note, idx) => {
        if(note.user.student.toLowerCase() === student.toLowerCase()){
            noteIdx = idx;
            return;
        }
    })
    if(noteIdx === -1){
        return res.status(404).send("Student not found");
    }
    notes.splice(noteIdx, 1);
    res.send({success: "Success"});
    
    })
    
