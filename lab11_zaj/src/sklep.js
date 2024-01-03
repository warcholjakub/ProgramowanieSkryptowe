import express from "express";
import morgan from "morgan";
import * as path from "path";
import { fileURLToPath } from "url";
import http from "node:http";
import fs from "fs";
import { URL } from "node:url";
import queryString from "query-string";
import {
  warehouse,
  clients,
  sell,
  show_transactions,
  parse_cmd,
  Transakcja,
  Klient,
  Produkt,
  add_product,
} from "/home/jwarchol/ProgramowanieSkryptowe/lab11_zaj/src/skrypt.js";

const PATH = "/home/jwarchol/ProgramowanieSkryptowe/lab11_zaj/";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.locals.pretty = app.get("env") === "development"; 

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

/* ******** */
/* "Routes" */
/* ******** */

/* ------------- */
/* Route 'GET /' */
/* ------------- */
app.get("/", async function (request, response) {
  // const client = new MongoClient("mongodb://127.0.0.1:27017");
  // await client.connect();
  // const db = client.db("AGH");
  // const collection = db.collection("students");
  // const docs = await collection.find({}).toArray();
  // console.log(docs);
  // client.close();
  response.sendFile(PATH + "views/home.html"); // Render the 'index' view
  
});


app.post("/", async function (request, response) {
  response.set("Content-Type", "text/plain");
  response.send(`${await parse_cmd(request.body.command)}`);
});

/* ************************************************ */

app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});

