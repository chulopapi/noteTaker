// const router = require("express").Router();
// const db = require("../db/db.js");
// const uuidv1 = require('uuid/v1');
// //const { v1: uuidv1 } = require('uuid');


// // GET route
// router.get("/notes", async (req, res) => {
//     try {
//       const existingNote = await DB.readNotes();
//       console.log(existingNote);
//       res.json(existingNote);
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   // POST route

//   router.post("/notes", async (req, res) => { 
//     try {
//       const olderNotes = await DB.readNotes();
//       const note = req.body; 
//       note.id = uuidv1();
  
//       const newNote = await DB.writeNote([...olderNotes, note]);
//       res.status(200).json(newNote);
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   router.delete('/notes/:id',async (req, res) => {
//     DB.removeNote(req.params.id)
//     .then(() => res.json({message: 'note deleted'}))
//     .catch(err => res.status(500).json(err))
//   })
  
//   module.exports = router;

const express = require("express");
const path = require("path");
const routes = express.Router();
const {Note, deleteNote} = require('./../db/db');

routes.get('/api/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

routes.post('/api/notes', async (req, res)=>{
    try {
        const newReq = req.body
        const newNote = new Note(newReq.title, newReq.text)
        await newNote.addNote()
        res.send(newNote)
    } catch (err){
        throw err
    }
})

routes.delete('/api/notes/:id', async (req, res)=>{
    try {
        const id = req.params.id
        await deleteNote(id)
        res.send('Note deleted')
    } catch (err) {
        throw err
    }
})

module.exports= routes;