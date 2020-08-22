
// Deleting notes

const fs = require ('fs');
const path = require('path');
const util = require('util');

 //allow to chain promisses

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
            return "New note has been added"
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
        return "Note has been Deleted"
    } catch(err){
        throw err
    }
}

module.exports = {
    Note: Note,
    deleteNote: deleteNote
}

