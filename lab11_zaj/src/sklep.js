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
} from "/home/jwarchol/ProgramowanieSkryptowe/lab11_zaj/src/skrypt.js";

const PATH = "/home/jwarchol/ProgramowanieSkryptowe/lab11_zaj/";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const clientRouter = express.Router();
const adminRouter = express.Router();

app.locals.pretty = app.get("env") === "development"; 

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

/* ******** */
/* "Routes" */
/* ******** */

/* ------------- */
/* Route 'GET /' */
/* ------------- */
clientRouter.get("/", async function (request, response) {
  response.sendFile(PATH + "views/klient.html");
});

clientRouter.post("/", async function (request, response) {
  response.set("Content-Type", "text/plain");
  response.send(`${await client_cmd(request.body.command)}`);
});

adminRouter.get("/", async function (request, response) {
  response.sendFile(PATH + "views/admin.html");
});

adminRouter.post("/", async function (request, response) {
  response.set("Content-Type", "text/plain");
  response.send(`${await admin_cmd(request.body.command)}`);
});

/* ************************************************ */

app.use("/", clientRouter);
app.use("/admin", adminRouter);

app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});

