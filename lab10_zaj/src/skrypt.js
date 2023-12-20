let sklepDB;

class Transakcja {
    constructor(nazwa, ilosc, kwota) {
        this.nazwa = nazwa;
        this.ilosc = ilosc;
        this.kwota = kwota;
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

class Store {
    
}


function warehouse() {
    const tx = sklepDB.transaction('produkty', 'readonly');
    const produkty = tx.objectStore('produkty');
    const cursorRequest = produkty.openCursor();
    console.groupCollapsed("Magazyn")
    cursorRequest.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            var value = cursor.value;
            let out = document.getElementById('out')
            out.innerText = ""
            out.innerText += (value.nazwa + " - Ilość: " + value.ilosc + "; Cena: " + value.cena + "zł\n");
            cursor.continue();
        }
    }
    console.groupEnd();
}

function clients() {
    const tx = sklepDB.transaction('klienci', 'readonly');
    const produkty = tx.objectStore('klienci');
    const cursorRequest = produkty.openCursor();
    console.groupCollapsed("Klienci")
    let out = document.getElementById('out')
    out.innerText = ""
    cursorRequest.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            var value = cursor.value;
            
            out.innerText += (value.id + ": " + value.imie + " " + value.nazwisko + "\n");
            cursor.continue();
        }
    }
    console.groupEnd();
}

function sell(idKlienta, nazwaProduktu, ilosc) {
    const tx = sklepDB.transaction(['klienci', 'produkty'], 'readwrite');
    const klienciStore = tx.objectStore('klienci');
    const produktyStore = tx.objectStore('produkty');
    const klientRequest = klienciStore.get(idKlienta);
    klientRequest.onsuccess = function (event) {
        if (klientRequest.result === undefined) {
            window.alert("Nie ma takiego klienta");
            return;
        }
        const klient = klientRequest.result;
        const produktRequest = produktyStore.get(nazwaProduktu);
        produktRequest.onsuccess = function (event) {
            if (produktRequest.result === undefined) {
                window.alert("Nie ma takiego produktu");
                return;
            }
            const produkt = produktRequest.result;
            if (produkt.ilosc >= ilosc) {
                klient.transakcje.push(new Transakcja(nazwaProduktu, ilosc, ilosc * produkt.cena));
                produkt.ilosc -= ilosc;
                produktyStore.put(produkt);
                klienciStore.put(klient);
                document.getElementById(produkt.nazwa).innerText = `Dostępnych sztuk: ` + produkt.ilosc
                if (produkt.ilosc === 0){
                    document.getElementById(produkt.nazwa+'-cont').classList.remove('w3-sand')
                    document.getElementById(produkt.nazwa+'-cont').classList.add('w3-gray')
                }
                console.log(`Sprzedano ${ilosc} sztuk/i ${nazwaProduktu} za ${ilosc * produkt.cena}zł`);
            }
            else {
                window.alert("Nie ma tyle towaru");
            }
        }
    }
}

function show_transactions(idKlienta) {
    const tx = sklepDB.transaction('klienci', 'readonly');
    const objectStore = tx.objectStore('klienci');
    const request = objectStore.get(idKlienta);
    request.onsuccess = function () {
        if (request.result === undefined) {
            window.alert("Nie ma takiego klienta");
            return;
        }
        let suma = 0
        const transakcje = request.result.transakcje;
        console.groupCollapsed(`Transakcje klienta ${request.result.imie} ${request.result.nazwisko}`);
        for (let i = 0; i < transakcje.length; i++) {
            let out = document.getElementById('out')
            out.innerText = ""
            out.innerText += (`${transakcje[i].nazwa} - Ilość: ${transakcje[i].ilosc}; Kwota: ${transakcje[i].kwota}zł\n`);
            suma += transakcje[i].kwota;
        }
        out.innerText += (`Sumaryczna kwota: ${suma}zł`);
        console.groupEnd();
    }
}

function parse(json_input) {
    try {
        const input = JSON.parse(json_input);
        switch (input.cmd) {
            case "warehouse":
                warehouse();
                break;
            case "show":
                show_transactions(input.id);
                break;
            case "clients":
                clients();
                break;
            case "sell":
                sell(input.id, input.nazwa, input.ilosc);
                break;
            default:
                console.error("Nieznana komenda");
        }
    }
    catch (SyntaxError) {
        window.alert(SyntaxError.message);
    }
}

export { warehouse, clients, sell, show_transactions, parse };