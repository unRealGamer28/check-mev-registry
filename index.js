'use strict';

const axios = require("axios");

// A static server using Node and Express
const express = require("express");
const app = express();

// instead of older body-parser 
app.use(express.json());

// make all the files in 'public' available on the Web
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

// -------------------------------------------------

app.get("/checkRegistry", (req, res) => {
  axios.get(req.query.checkUrl)
    .then(function (response) {
      res.status(200).send(true);
    })
    .catch(function (error) {
      res.status(200).send(false);
    });
});

// -------------------------------------------------

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});
