import fs from "fs";
import { MongoClient } from "mongodb";
const PATH = "/home/jwarchol/ProgramowanieSkryptowe/lab12_zaj/";
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
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    const db = client.db("Sklep_AGH");
    const collection = db.collection(collectionName);
    const docs = await collection.find({}).toArray();
    await client.close();

    return docs;
}

async function updateQuantity() {
    const produkty = await getFromDB("produkty");

    for (let produkt of produkty) {
        document.querySelector("#ilosc" + produkt.nazwa).innerHTML = produkt.ilosc;
    }
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
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    const produkty = await getFromDB("produkty");
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

async function add_product(nazwa, ilosc, cena) {
    await client.connect();
    const db = client.db("Sklep_AGH");
    db.produkty.insertOne({ nazwa: nazwa, ilosc: ilosc, cena: cena });
    return "Dodano produkt do bazy danych";
}

async function client_cmd(json_input) {
    try {
        const input = JSON.parse(json_input);
        switch (input.cmd) {
            case "sell":
                return await sell(input.id, input.nazwa, input.ilosc);
            default:
                console.error("Nieznana komenda");
                return "Nieznana komenda";
        }
    }
    catch (SyntaxError) {
        console.error("Błąd parsowania JSON");
        return "Błąd parsowania JSON";
    }
}

async function admin_cmd(json_input) {
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
            case "add":
                return await add_product(input.nazwa, input.ilosc, input.cena);
            default:
                console.error("Nieznana komenda");
                // return "Nieznana komenda";
        }
    }
    catch (SyntaxError) {
        console.error("Błąd parsowania JSON");
        return "Błąd parsowania JSON";
    }
}

export {
  warehouse,
  clients,
  sell,
  show_transactions,
  client_cmd,
  admin_cmd,
  Klient,
  Produkt,
  Transakcja,
  add_product,
  updateQuantity,
};