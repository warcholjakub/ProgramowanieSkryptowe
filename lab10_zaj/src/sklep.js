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
  add_product
} from "/home/jwarchol/ProgramowanieSkryptowe/lab10_zaj/src/skrypt.js";

const PATH = "/home/jwarchol/ProgramowanieSkryptowe/lab10_zaj/";

// let produkty = [];
// produkty.push(new Produkt("Komputer", 1000, 5000));
// produkty.push(new Produkt("Laptop", 1500, 4000));
// produkty.push(new Produkt("Telefon", 2000, 2000));

// let json = JSON.stringify(produkty);
// fs.writeFileSync(PATH + "src/produkty.json", json);

function requestListener(request, response) {
  console.log("--------------------------------------");
  console.log(`The relative URL of the current request: ${request.url}`);
  console.log(`Access method: ${request.method}`);
  console.log("--------------------------------------");
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.pathname !== "/favicon.ico") console.log(url);
  if (url.pathname === "/" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.readFile(PATH + "src/home.html", function (error, data) {
      if (error) {
        response.writeHead(404);
        response.write("Error: File Not Found");
      } else {
        response.write(data);
      }
      response.end();
    });
  } else if (url.pathname === "/add" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.readFile(PATH + "src/add.html", function (error, data) {
      if (error) {
        response.writeHead(404);
        response.write("Error: File Not Found");
      } else {
        response.write(data);
      }
      response.end();
    });
  } else if (url.pathname === "/add" && request.method === "POST") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      let parsed = queryString.parse(body);
      add_product(parsed.nazwa, parsed.ilość, parsed.cena);
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.write(`Dodano produkt ${parsed.nazwa}`);
      response.end();
    });
  } else if (url.pathname === "/submit" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.write(parse_cmd(url.searchParams.get("command")));
    response.end();
  } else {
    response.writeHead(501, { "Content-Type": "text/plain; charset=utf-8" });
    response.write("Error 501: Not implemented");
    response.end();
  }
}

const server = http.createServer(requestListener);
server.listen(8000);
console.log("The server was started on port 8000");
console.log('To stop the server, press "CTRL + C"');
