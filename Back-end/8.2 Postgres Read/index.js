import express from "express";
import bodyParser from "body-parser";
import { Client } from 'pg'

const app = express();
const port = 3000;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let quiz = [
  {country: "United Kingdom", flag: "United Kingdom", capital: "London"},
  {country: "United States", flag: "United States", capital: "New York"},
  {country: "China", flag: "China", capital: "Beijing"}

];

const client = new Client({
  user: 'postgres',
  password: 'wkx',
  host: 'localhost',
  port: 5432,
  database: 'world',
})

await client.connect();

try {
  const query = 'SELECT name,capital,flag FROM capitals JOIN flags ON country = name;';
  quiz = await client.query(query);
  console.log("There are " + quiz.rows.length + " records retrieved.");
} catch (err) {
  console.error(err);
} finally {
  await client.end();
}

let totalCorrect = 0;

let currentQuestion;

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

function nextQuestion() {
  const randomCountry = quiz.rows[Math.floor(Math.random() * quiz.rows.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
