import { MongoClient } from "npm:mongodb";
import express, { Request, Response } from "npm:express";

const app: any = express();
const PATH: string = "/home/jwarchol/ProgramowanieSkryptowe/lab13/";
app.locals.pretty = app.get("env") === "development";
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));

app.get("/", async function (request: express.Request, response: express.Response) {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const db = client.db("Ksiega");
  const collection = db.collection("Wpisy");
  const docs = await collection.find({}).toArray();
  console.log(docs);
  response.render("ksiega", {"wpisy": docs});
});

app.post("/", async function (request: express.Request, response: express.Response) {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const db = client.db("Ksiega");
  const collection = db.collection("Wpisy");

  const newEntry = {
    name: request.body.name,
    content: request.body.content,
  };

  await collection.insertOne(newEntry);

  response.set("Content-Type", "text/plain");
  response.send(`Dodano wpis.`);
});

app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});