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
  client_cmd,
  admin_cmd,
  Transakcja,
  Klient,
  Produkt,
  add_product,
} from "/home/jwarchol/ProgramowanieSkryptowe/lab12_zaj/src/skrypt.js";

const PATH = "/home/jwarchol/ProgramowanieSkryptowe/lab12_zaj/";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();

app.locals.pretty = app.get("env") === "development"; 
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(PATH + "src/"));


/* ******** */
/* "Routes" */
/* ******** */

/* ------------- */
/* Route 'GET /' */
/* ------------- */
app.get("/", async function (request, response) {
  response.sendFile(PATH + "views/admin.html");
});

// app.get("/", async function (request, response) {
//   response.send(`${await warehouse()}`);
// });

app.post("/", async function (request, response) {
  response.set("Content-Type", "text/plain");
  // response.send(`${await sell(Number(request.body.uid), request.body.name, Number(request.body.ilosc))}`);
  response.send(`${await sell(1, 'Telefon', 1)}`);
  // response.send(`${request.body.name}`);
});

/* ************************************************ */


app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});

