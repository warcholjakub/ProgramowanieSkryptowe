import express from "express";
import morgan from "morgan";
import * as path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// let students = [
//   {
//     fname: "Jan",
//     lname: "Kowalski",
//   },
//   {
//     fname: "Anna",
//     lname: "Nowak",
//   },
// ];

// let locals = {
//     students: students
// }

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();

app.locals.pretty = app.get("env") === "development"; // The resulting HTML code will be indented in the development environment
app.set('view engine', 'pug');

/* ************************************************ */

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "files")));

/* ******** */
/* "Routes" */
/* ******** */

/* ------------- */
/* Route 'GET /' */
/* ------------- */
app.get("/", async function (request, response, next) {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const db = client.db('AGH');
  const collection = db.collection('students');
  const docs = await collection.find({}).toArray();
  console.log(docs);
  response.render("index", {"students": docs}); // Render the 'index' view
  client.close();
});

app.get("/:wydzial", async function (request, response, next) {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const db = client.db("AGH");
  const collection = db.collection("students");
  const docs = await collection.find({'wydział': request.params.wydzial}).toArray();
  console.log(docs);
  response.render("index", { students: docs }); // Render the 'index' view
  client.close();
});

app.get("/submit", (request, response) => {
  // Processing the form content, if the relative URL is '/submit', and the GET method was used to send data to the server'
  /* ************************************************** */
  // Setting an answer header — we inform the browser that the returned data is plain text
  response.set("Content-Type", "text/plain");
  /* ************************************************** */
  // Place given data (here: 'Hello <name>') in the body of the answer
  response.send(`Hello ${request.query.name}`); // Send a response to the browser
});


app.post('/', (request, response) => {
  // Processing the form content, if the relative URL is '/submit', and the POST method was used to send data to the server'
  /* ************************************************** */
  // Setting an answer header — we inform the browser that the returned data is plain text
  response.set("Content-Type", "text/plain");
  /* ************************************************** */
  // Place given data (here: 'Hello <name>') in the body of the answer
  response.send(`Hello ${request.body.name}`); // Send a response to the browser
});

/* ************************************************ */

app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});
