import supertest from "supertest";
import fs from "fs";
const PATH = "/home/jwarchol/ProgramowanieSkryptowe/lab10_zaj/";

const server = supertest.agent("http://localhost:8000");

describe("GET /", () => {
  it('responds with "HTML form"', (done) => {
    server
      .get("/")
      .expect("Content-Type", /html/)
      .expect(200, /form/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});

describe("GET /submit", () => {
  it("responds with welcome", (done) => {
    let data = fs.readFileSync(PATH + "src/produkty.json", "utf8");
    const produkty = JSON.parse(data);
    let out = "Wykonano komendę 'warehouse'\n";
    for (let produkt of produkty) {
      out +=
        produkt.nazwa +
        " - Ilość: " +
        produkt.ilosc +
        "; Cena: " +
        produkt.cena +
        "zł\n";
    }
    server
      .get("/submit")
      .query({ command: '{"cmd":"warehouse"}' })
      .expect(200, out)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe("GET /add", () => {
  it('responds with "HTML form"', (done) => {
    server
      .get("/")
      .expect("Content-Type", /html/)
      .expect(200, /form/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
