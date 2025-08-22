import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";

function bandNameGenerator(req, res, next) {
  bandName = req.body.street + req.body.pet;
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/submit", bandNameGenerator);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Here is your band name: </h1><h2>${bandName}</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
