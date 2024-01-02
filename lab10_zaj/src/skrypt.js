import fs from "fs";
const PATH = "/home/jwarchol/ProgramowanieSkryptowe/lab10_zaj/";

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


function warehouse() {
    let data = fs.readFileSync(PATH + "src/produkty.json", "utf8");
    const produkty = JSON.parse(data);
    let out = "Wykonano komendę 'warehouse'\n";
    for (let produkt of produkty) {
        out += (produkt.nazwa + " - Ilość: " + produkt.ilosc + "; Cena: " + produkt.cena + "zł\n");
    }
    return out;
}

function clients() {
    let data = fs.readFileSync(PATH + "src/klienci.json", "utf8");
    const klienci = JSON.parse(data);
    let out = "Wykonano komendę 'clients'\n";
    for (let klient of klienci) {
        out += (klient.id + ": " + klient.imie + " " + klient.nazwisko + "\n");
    }
    return out;
}

function sell(idKlienta, nazwaProduktu, ilosc) {
    let data = fs.readFileSync(PATH + "src/transakcje.json", "utf8");
    let transakcje = JSON.parse(data);
    data = fs.readFileSync(PATH + "src/produkty.json", "utf8");
    let produkty = JSON.parse(data);
    data = fs.readFileSync(PATH + "src/klienci.json", "utf8");
    const klienci = JSON.parse(data);

    let out = "Wykonano komendę 'sell'\n";

    if (klienci.some(e => e.id === idKlienta) == false) { return "Nie ma takiego klienta!"; }
    if (produkty.some(e => e.nazwa === nazwaProduktu) == false) { return "Nie ma takiego produktu!"; }
    let prod_ind = produkty.findIndex((e) => e.nazwa === nazwaProduktu);
    if (produkty[prod_ind].ilosc < ilosc) { return "Nie ma tyle towaru!"; }
    else {
        produkty[prod_ind].ilosc -= ilosc;
        let json = JSON.stringify(produkty);
        fs.writeFileSync(PATH + "src/produkty.json", json);
        transakcje.push(new Transakcja(nazwaProduktu, ilosc, ilosc * produkty[prod_ind].cena, idKlienta));
        json = JSON.stringify(transakcje);
        fs.writeFileSync(PATH + "src/transakcje.json", json);
        return out + `Sprzedano ${ilosc} sztuk/i ${nazwaProduktu} za łącznie ${ilosc * produkty[prod_ind].cena}zł klientowi o id ${idKlienta}`;
    }
}

function show_transactions(idKlienta) {
    let data = fs.readFileSync(PATH + "src/transakcje.json", "utf8");
    const transakcje = JSON.parse(data);
    let out = "Wykonano komendę 'show_transactions'\nTransakcje klienta o id " + idKlienta + ":\n";
    for (let transakcja of transakcje) {
        if (transakcja.id_klienta !== idKlienta) continue;
        out += `${transakcja.nazwa} - Ilość: ${transakcja.ilosc}; Kwota: ${transakcja.kwota}zł\n`;
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

function parse_cmd(json_input) {
    try {
        const input = JSON.parse(json_input);
        switch (input.cmd) {
            case "warehouse":
                return warehouse();
            case "show":
                return show_transactions(input.id);
            case "clients":
                return clients();
            case "sell":
                return sell(input.id, input.nazwa, input.ilosc);
            default:
                console.error("Nieznana komenda");
        }
    }
    catch (SyntaxError) {
        window.alert(SyntaxError.message);
    }
}

export { warehouse, clients, sell, show_transactions, parse_cmd, Klient, Produkt, Transakcja, add_product };