const router = require("express").Router();
const DB = require("../db/DB.js");
const uuidv1 = require('uuid/v1');


// GET route
router.get("/notes", async (req, res) => {
    try {
      const existingNote = await DB.readNotes();
      console.log(existingNote);
      res.json(existingNote);
    } catch (err) {
      console.log(err);
    }
  });

  // POST route

  router.post("/notes", async (req, res) => {
    try {
      const olderNotes = await DB.readNotes();
      const note = req.body; 
      note.id = uuidv1();
  
      const newNote = await DB.writeNote([...olderNotes, note]);
      res.status(200).json(newNote);
    } catch (err) {
      console.log(err);
    }
  });

  router.delete('/notes/:id',async (req, res) => {
    DB.removeNote(req.params.id)
    .then(() => res.json({message: 'note deleted'}))
    .catch(err => res.status(500).json(err))
  })
  
  module.exports = router;