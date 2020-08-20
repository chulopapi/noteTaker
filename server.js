//Written by Marlon Guandique

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3999

// parsing data

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Port listening configuration

// Listen for ports
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT} !`);
  });