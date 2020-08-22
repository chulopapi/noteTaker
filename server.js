//Written by Marlon Guandique

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000
const path = require("path");

// parsing data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes

const htmlRoutes = require("./routes/htmlRoutes.js");
app.use(htmlRoutes);
const apiRoutes = require("./routes/apiRoutes.js");
app.use(apiRoutes);

// Port listening configuration

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});