import express from 'express';
import path from 'path';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import  articleRoute from "./api/routes/articlesRoute";


// const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
var cors = require("cors");
// import contact route
// const articleRoute = require("./api/routes/articlesRoute");
// Database connection
// const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

// uri for localhost connection
// const uri = 'mongodb://localhost/articledb'

// uri for mongo atlas online cloude connection
// const uri = 'mongodb+srv://admin:admin@cluster0.msalufg.mongodb.net/articledb?retryWrites=true&w=majority&appName=Cluster0'

const uri = config.MONGODB_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
  console.log(config.MONGODB_URL);
});
db.once("open", () => {
  // we're connected!
  console.log("Database Connection Successful");
});

//  db end

// const PORT = process.env.PORT || 3000
const PORT = config.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
// cors
app.use(cors());

app.use("/api/article", articleRoute);

// app.get("/", (req, res) => res.send("Welcome to my Article Blog rest api"));


if (config.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/../frontend/build")));
  //
  app.get("*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Welcome to Article Blog");
  });
  app.get("/api", (req, res) => {
    res.send("Welcome to the api of Article Blog");
  });
}

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

