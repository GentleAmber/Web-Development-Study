import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "GentleAmber";
const yourPassword = "RGUtena1229!";
const yourAPIKey = "90562f20-ed50-4a75-89a9-0aa9ca22b0d7";
const yourBearerToken = "8c9a847b-4162-4c52-84b7-9f330920cafe";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + 'random');
    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    console.error(error);
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", (req, res) => {
  
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908

  axios.get(API_URL + 'all?page=2', {
    auth: {
      username: yourUsername,
      password: yourPassword
    },
  })
  .then(function (response) {
    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  })
  .catch(function (error) {
    console.log(error);
  })
});

app.get("/apiKey", (req, res) => {
  //filter?score=5

  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  axios.get(API_URL + 'filter?score=5&apiKey=' + yourAPIKey, {
    
  })
  .then(function (response) {
    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  })
  .catch(function (error) {
    console.log(error);
  })
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  
  axios.get(API_URL + 'secrets/42', {
    headers: { 
      Authorization: `Bearer ` +  yourBearerToken
    },
  })
  .then(function (response) {
    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  })
  .catch(function (error) {
    console.log(error);
  })
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
