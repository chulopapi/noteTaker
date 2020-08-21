//Written by Marlon Guandique

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

const path = require("path");

// const htmlRoutes = require("./routes/htmlRoutes.js");
// app.use(htmlRoutes);
// const apiRoutes = require("./routes/apiRoutes.js");
// app.use(apiRoutes);

// parsing data

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//In order to make request to the server involving data we use api base
//app.use('/api', require('./routes/apiRoutes'))
//app.use('/', require('./routes/htmlRoutes'))

const htmlRoutes = require("./routes/htmlRoutes.js");
app.use(htmlRoutes);
const apiRoutes = require("./routes/apiRoutes.js");
app.use(apiRoutes);

// Port listening configuration
// app.listen(PORT, () => {
//     console.log(`API server now on port ${PORT} !`);

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
  });