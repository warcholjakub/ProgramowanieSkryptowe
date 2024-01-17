import { MongoClient } from "npm:mongodb";
import express, { Request, Response } from "npm:express";
import rateLimit from "npm:express-rate-limit";
import bodyParser from "npm:body-parser";
import helmet from "npm:helmet";
import csurf from "npm:csurf";
import cookieParser from "npm:cookie-parser";

const app: any = express();
app.locals.pretty = app.get("env") === "development";
app.set("view engine", "pug");


app.use(bodyParser.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'self'"],
    mediaSrc: ["'self'"],
    frameAncestors: ["'self'"],
  }
}));


const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
});
app.use(limiter);


let db: any;

app.listen(8000, async () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');

    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    db = client.db("Ksiega");
});


app.get("/", limiter, csrfProtection, async function (request: express.Request, response: express.Response) {
  const collection = db.collection("Wpisy");
  const docs = await collection.find({}).limit(100).toArray();
  console.log(docs);
  response.render("ksiega", {"wpisy": docs, csrfToken: request.csrfToken()});
});



app.post("/", limiter, csrfProtection, async function (request: express.Request, response: express.Response) {
  const collection = db.collection("Wpisy");

  const newEntry = {
    name: request.body.name,
    content: request.body.content,
  };

  await collection.insertOne(newEntry);

  response.set("Content-Type", "text/plain");
  response.send(`Dodano wpis.`);
});

app.use(function (err: express.Error, req: express.Request, res: express.Response, next: any) {
  if (err.status === 403) {
    res.status(403);
    res.set('Content-Security-Policy', "default-src 'self'; frame-ancestors 'self'; form-action 'self';");
    res.send('403, forbidden');
  } else {
    next(err);
  }
});

app.use(function (req: express.Request, res: express.Response, next: any) {
  res.status(404);
  res.set('Content-Security-Policy', "default-src 'self'; frame-ancestors 'self'; form-action 'self';");
  res.send('404, page not found');
});
