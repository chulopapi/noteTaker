const fs = require ('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Note {
    constructor(title, text){
        this.title = title;
        this.text = text;

        Note.id++
        this.id = Note.id
    }
    async addNote(){
        try {
            let notesArr = [];
            notesArr = await readFileAsync(path.join(__dirname, "../db/db.json"), "utf8");
            if (!notesArr){
                notesArr = [];
            } else {
                notesArr = JSON.parse(notesArr);
            }
            notesArr.push(this);
            await writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArr));
            return "New note added"
        } catch (err) {
            throw err
        }
    }
}

Note.id = 0;

async function deleteNote(id){
    try{
        let notesArr = await readFileAsync(path.join(__dirname, "../db/db.json"), "utf8");
        notesArr = JSON.parse(notesArr)
        notesArr = notesArr.filter(element => element.id != parseInt(id))
        await writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArr));
        return "Note Deleted"
    } catch(err){
        throw err
    }
}

module.exports = {
    Note: Note,
    deleteNote: deleteNote
}






// const fs = require("fs");
// const util = require("util");
// //allow to chain promisses
// const readFAsync = util.promisify(fs.readFile);
// const writeFAsync = util.promisify(fs.writeFile);
// class DB {
//   readFile() {
//     return readFAsync("./db/db.json", "utf8");
//   }
//   // This is fs.writeFile(file,data[,options],callback)
//   writeFile(rawNote) {
//     return writeFAsync("./db/db.json", JSON.stringify(rawNote), "utf8");
//   }

//   readNotes() {
//     return this.readFile().then((notes) => {
//       return JSON.parse(notes);
//     });
//   }

//   writeNote(newNote) {
//     console.log("NEW NOTE=>", newNote);
//     return this.writeFile(newNote).then((notes) => {
//       return this.readNotes();
//     });
//   }

//   removeNote(id) {
//       console.log("removing note with id: ", id)
//       return this.readNotes()
//       .then(notes => notes.filter(note => note.id != id))
//       .then(fNotes => this.writeFile(fNotes))
//   }
// }
