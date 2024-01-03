import fs from "fs";
import { MongoClient } from "mongodb";
const PATH = "/home/jwarchol/ProgramowanieSkryptowe/lab11_zaj/";
const client = new MongoClient("mongodb://127.0.0.1:27017");

class Transakcja {
    constructor(nazwa, ilosc, kwota, id_klienta) {
        this.nazwa = nazwa;
        this.ilosc = ilosc;
        this.kwota = kwota;
        this.id_klienta = id_klienta;
    }
}

class Produkt {
    constructor(nazwa, ilosc, cena) {
        this.nazwa = nazwa;
        this.ilosc = ilosc;
        this.cena = cena;
    }
}

class Klient {
    constructor(id, imie, nazwisko) {
        this.id = id;
        this.imie = imie;
        this.nazwisko = nazwisko;
    }
}

async function getFromDB(collectionName) {
    await client.connect();
    const db = client.db("Sklep_AGH");
    const collection = db.collection(collectionName);
    const docs = await collection.find({}).toArray();
    await client.close();

    return docs;
}

async function warehouse() {
    const produkty = await getFromDB("produkty");

    let out = "Wykonano komendę 'warehouse'\n";
    for (let produkt of produkty) {
        out += (produkt.nazwa + " - Ilość: " + produkt.ilość + "; Cena: " + produkt.cena + "zł\n");
    }
    return out;
}

async function clients() {
    const klienci = await getFromDB("klienci");

    let out = "Wykonano komendę 'clients'\n";
    for (let klient of klienci) {
        out += (klient.id + ": " + klient.imie + " " + klient.nazwisko + "\n");
    }
    return out;
}

async function sell(idKlienta, nazwaProduktu, ilosc) {
    let produkty = await getFromDB("produkty");
    const klienci = await getFromDB("klienci");

    await client.connect();
    const db = client.db("Sklep_AGH");

    let out = "Wykonano komendę 'sell'\n";

    if (klienci.some(e => e.id === idKlienta) == false) { await client.close(); return "Nie ma takiego klienta!"; }
    if (produkty.some(e => e.nazwa === nazwaProduktu) == false) { await client.close(); return "Nie ma takiego produktu!"; }
    let prod_ind = produkty.findIndex((e) => e.nazwa === nazwaProduktu);
    if (produkty[prod_ind].ilosc < ilosc) { await client.close(); return "Nie ma tyle towaru!"; }
    else {
        
        db.produkty.updateOne({ nazwa: nazwaProduktu }, { $set: { ilosc: produkty[prod_ind].ilosc - ilosc } });
        db.transakcje.insertOne({ nazwa: nazwaProduktu, ilość: ilosc, kwota: ilosc * produkty[prod_ind].cena, id_klienta: idKlienta });
        await client.close();
    }
    // return (out + `Sprzedano ${ilosc} sztuk/i ${nazwaProduktu} za łącznie ${ilosc * produkty[prod_ind].cena}zł klientowi o id ${idKlienta}`);
    return out;
}

async function show_transactions(idKlienta) {
    const transakcje = await getFromDB("transakcje");
    let out = "Wykonano komendę 'show_transactions'\nTransakcje klienta o id " + idKlienta + ":\n";
    for (let transakcja of transakcje) {
        if (transakcja.id_klienta !== idKlienta) continue;
        out += `${transakcja.nazwa} - Ilość: ${transakcja.ilość}; Kwota: ${transakcja.kwota}zł\n`;
    }
    return out;
}

function add_product(nazwa, ilosc, cena) {
    let data = fs.readFileSync(PATH + "src/produkty.json", "utf8");
    let produkty = JSON.parse(data);
    produkty.push(new Produkt(nazwa, ilosc, cena));
    let json = JSON.stringify(produkty);
    fs.writeFileSync(PATH + "src/produkty.json", json);
}

async function parse_cmd(json_input) {
    try {
        const input = JSON.parse(json_input);
        switch (input.cmd) {
            case "warehouse":
                return await warehouse();
            case "show":
                return await show_transactions(input.id);
            case "clients":
                return await clients();
            case "sell":
                return await sell(input.id, input.nazwa, input.ilosc);
            default:
                console.error("Nieznana komenda");
        }
    }
    catch (SyntaxError) {
        console.error("Błąd parsowania JSON");
    }
}

export { warehouse, clients, sell, show_transactions, parse_cmd, Klient, Produkt, Transakcja, add_product };