import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const day = new Date().getDay();
    // const day = 6;
    res.render(__dirname + "/views/index.ejs", {
        dateStatus: day <= 5 ? "a weekday" : "the weekend",
        toDo: day <= 5 ? "work" : "play"
    })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});