const express = require("express");
const monk = require("monk");
const xml = require("xml");
const generateXml = require("./helpers/GenerateXml.js");

const url = require("./config/keys").mongo_url;

const db = monk(url);
db.then(() => {
  console.log("connected correctly to the server");
});

let app = express();

app.listen(5000, () => {
  console.log("listening on port 5000");
});

app.get("/api/episodes", (req, res) => {
  const episodes = db
    .get("episode")
    .find()
    .then(episodes => {
      res.json({ episodes });
    });
});
app.get("/api/episode/:id", (req, res) => {
  db.get("episode")
    .find({ id: req.params.id })
    .then(episode => {
      res.json({ episode });
    });
});
app.get("/feed", (req, res) => {
  db.get("episode")
    .find()
    .then(episodes => {
      res.type("application/xml");
      res.send(generateXml(episodes));
    });
});
// if (process.env.NODE_ENV === "production") {
app.use(express.static("../client/build"));
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});
// }
