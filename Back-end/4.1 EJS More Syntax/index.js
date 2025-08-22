import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var data;

app.get("/", (req, res) => {
    data = {
        title: "EJS Tags",
        seconds: new Date().getSeconds(),
        items: ["apple", "banana", "cherry"],
        htmlContent:
            "<em>This is some em text</em>"
    };
    res.render(__dirname + "/views/index.ejs", data);
    console.log("[EJS file path]: " + __dirname + "/views/index.ejs");

});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
