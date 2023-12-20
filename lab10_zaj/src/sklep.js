import http from "node:http";
import fs from "fs";
import { URL } from "node:url";
import queryString from "query-string";
import {
  warehouse,
  clients,
  sell,
  show_transactions,
  parse
} from "/home/jwarchol/ProgramowanieSkryptowe/lab10_zaj/src/skrypt.js";

const PATH = "/home/jwarchol/ProgramowanieSkryptowe/lab10_zaj/";

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
  } else if (url.pathname === "/submit" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.write(`Hello ${url.searchParams.get("name")}`);
    response.end();
  } else if (url.pathname === "/" && request.method === "POST") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      let parsed = queryString.parse(body);
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.write(`Hello ${parsed.name}`);
      response.end();
    });
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
