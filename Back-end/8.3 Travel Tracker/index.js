import express from "express";
import bodyParser from "body-parser";
import pkg from 'pg';
const { Client } = pkg;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const connectionConfig = {
  user: 'postgres',
  password: 'wkx',
  host: 'localhost',
  port: 5432,
  database: 'world',
};


app.get("/", async (req, res) => {
  const client = new Client(connectionConfig);
  await client.connect();
  let response;
  let country_code_array = [];
  
  try {
    const query = 'SELECT country_code FROM visited_country;';
    response = await client.query(query);
    console.log("There are " + response.rows.length + " visited countries.");
    for (let i = 0; i < response.rows.length; i++) {
      country_code_array.push(response.rows[i].country_code);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Unexpected error");
  } finally {
    await client.end();
    console.log("Client session in \"GET method\" is ended.");
  }

  const data = {
    total: response.rows.length,
    countries: country_code_array
  };

  res.render("index.ejs", data);
});

app.post("/add", async (req, res) => {
  const client = new Client(connectionConfig);
  await client.connect();
  let response;
  
  try {
    const query = 'SELECT country_code FROM countries WHERE LOWER(country_name) = LOWER($1);';
    response = await client.query(query, [req.body.country]);

    if (response.rows.length != 0) {
      const countryCode = response.rows[0].country_code;
      console.log("Country code: " + countryCode);
      // To check if this country is already in the database. If it is, don't insert again.
      const checkQuery = 'SELECT country_code FROM visited_country WHERE country_code = $1;';
      const checkQueryRes = await client.query(checkQuery, [countryCode]);

      // If there's already such country in the database, 
      if (checkQueryRes.rowCount == 1) {
        res.status(301).render("index.ejs", );
      } else {
        const query = 'INSERT INTO visited_country VALUES(DEFAULT, $1);';
        const queryResponse = await client.query(query, [countryCode]);
        console.log("Insert successfully. Influenced rows: " + queryResponse.rowCount);
        res.redirect("/");
      }

      
    } else {
      res.status(404).send("Invalid country name");
    }
    
  } catch (err) {
    console.error(err);
    res.status(404).send("Error");
  } finally {
    await client.end();
    console.log("Client session in \"POST method\" is ended.");
  }

  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
