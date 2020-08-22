// HTML routes


const express = require("express");
const path = require("path");
const routes = express.Router();

routes.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

routes.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

module.exports = routes;