// const http = require('node:http');
// const { URL } = require('node:url');

import http from "node:http";
import fs from "fs-extra";
import { URL } from "node:url";

/**
 * Handles incoming requests.
 *
 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * The answer sent by this stream must consist of two parts: the header and the body.
 * <ul>
 *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
 *  <li>The body contains the correct data, e.g. a form definition.
 * </ul>
 * @author Stanisław Polak <polak@agh.edu.pl>
 */

function requestListener(request, response) {
  console.log("--------------------------------------");
  console.log(`The relative URL of the current request: ${request.url}`);
  console.log(`Access method: ${request.method}`);
  console.log("--------------------------------------");
  // Create the URL object
  const url = new URL(request.url, `http://${request.headers.host}`);
  /* ************************************************** */
  // if (!request.headers['user-agent'])
  if (url.pathname !== "/favicon.ico")
    // View detailed URL information
    console.log(url);

  /* ******** */
  /* "Routes" */
  /* ******** */

  /* ---------------- */
  /* Route "GET('/')" */
  /* ---------------- */
  if (url.pathname === "/" && request.method === "GET") {
    const wpisy = fs.readFileSync("/home/jwarchol/ProgramowanieSkryptowe/lab10/src/wpisy.html");

    // Generating the form if the relative URL is '/', and the GET method was used to send data to the server'
    /* ************************************************** */
    // Creating an answer header — we inform the browser that the returned data is HTML
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    /* ************************************************** */
    // Setting a response body
    response.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Księga gości</title>
  </head>
  <body>
    ${wpisy}
    <hr></hr>
    <h3>Nowy wpis:</h3>
    <main>
      <form method="GET" action="/submit">
        <label for="name">Twoje imię i nazwisko</label>
        <br>
        <input type="text" name="name">
        <br>
        <label for="content">Treść wpisu</label>
        <br>
        <textarea name="content" cols="50" rows="10"></textarea>
        <br>
        <input type="submit" value="Dodaj wpis">
      </form>
    </main>
  </body>
</html>`);
    /* ************************************************** */
    response.end(); // The end of the response — send it to the browser
  } else if (url.pathname === "/submit" && request.method === "GET") {
    fs.appendFile("/home/jwarchol/ProgramowanieSkryptowe/lab10/src/wpisy.html", `<h2>${url.searchParams.get('name')}</h2><p>${url.searchParams.get('content')}</p>`);
    /* ---------------------- */
    /* Route "GET('/submit')" */
    /* ---------------------- */
    // Processing the form content, if the relative URL is '/submit', and the GET method was used to send data to the server'
    /* ************************************************** */
    // Creating an answer header — we inform the browser that the returned data is plain text
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    /* ************************************************** */
    // Place given data (here: 'Hello <name>') in the body of the answer
    // response.write(`Hello ${url.searchParams.get("name")}`); // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
    response.write(`Właśnie dodałeś swój post!`); // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
    /* ************************************************** */
    response.end(); // The end of the response — send it to the browser
  } else {
    /* ---------------------- */
    /* If no route is matched */
    /* ---------------------- */
    response.writeHead(501, { "Content-Type": "text/plain; charset=utf-8" });
    response.write("Error 501: Not implemented");
    response.end();
  }
}

/* ************************************************** */
/* Main block
/* ************************************************** */
const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log("The server was started on port 8000");
console.log('To stop the server, press "CTRL + C"');
