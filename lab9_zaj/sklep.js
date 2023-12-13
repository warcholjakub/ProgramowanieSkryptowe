let sklepDB;

class Transakcja {
    constructor(nazwa, ilosc, kwota) {
        this.nazwa = nazwa;
        this.ilosc = ilosc;
        this.kwota = kwota;
    }
}

function createDB() {
    // var req = indexedDB.deleteDatabase('sklepDB');

    const request = indexedDB.open('sklepDB', 1);

    request.onerror = (e) => {
        window.alert(`IndexedDB error: ${request.errorCode}`);
    }
    request.onsuccess = (e) => {
        sklepDB = request.result;
        console.info("Załadowano sklepDB");
        const tx = sklepDB.transaction('produkty', 'readonly');
        const produkty = tx.objectStore('produkty');
        const cursorRequest = produkty.openCursor();
        cursorRequest.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                var value = cursor.value;
                document.getElementById(value.nazwa).innerText = `Dostępnych sztuk: ` + value.ilosc
                if (value.ilosc === 0){
                    document.getElementById(value.nazwa+'-cont').classList.remove('w3-sand')
                    document.getElementById(value.nazwa+'-cont').classList.add('w3-gray')
                }
                cursor.continue();
            }
        }
    }
    request.onupgradeneeded = (e) => {
        sklepDB = request.result;
        console.info("Stworzono sklepDB");

        const klienciObjectStore = sklepDB.createObjectStore('klienci', { keyPath: 'id', autoIncrement: true });
        klienciObjectStore.createIndex('imie', 'imie', { unique: false });
        klienciObjectStore.createIndex('nazwisko', 'nazwisko', { unique: false });
        klienciObjectStore.createIndex('transakcje', 'transakcje', { unique: false });

        const magazynObjectStore = sklepDB.createObjectStore('produkty', { keyPath: 'nazwa', autoIncrement: false });
        magazynObjectStore.createIndex('nazwa', 'nazwa', { unique: true });
        magazynObjectStore.createIndex('ilosc', 'ilosc', { unique: false });
        magazynObjectStore.createIndex('cena', 'cena', { unique: false });

        const tx = e.target.transaction;

        const klienci = tx.objectStore('klienci');
        klienci.add({ imie: 'Jan', nazwisko: 'Kowalski', transakcje: [new Transakcja("Laptop", 1, 3000)] });
        klienci.add({ imie: 'Adam', nazwisko: 'Nowak', transakcje: [new Transakcja("Laptop", 1, 3000)] });
        klienci.add({ imie: 'Anna', nazwisko: 'Kowalska', transakcje: [new Transakcja("Laptop", 1, 3000)] });
        klienci.add({ imie: 'Maria', nazwisko: 'Nowakowska', transakcje: [new Transakcja("Laptop", 1, 3000)] });

        const produkty = tx.objectStore('produkty');
        produkty.add({ nazwa: 'Laptop', ilosc: 300, cena: 3000 });
        produkty.add({ nazwa: 'Komputer', ilosc: 500, cena: 4000 });
        produkty.add({ nazwa: 'Telefon', ilosc: 1000, cena: 2000 });
    }



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
            out = document.getElementById('out')
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
    out = document.getElementById('out')
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
    request.onsuccess = function (event) {
        if (request.result === undefined) {
            window.alert("Nie ma takiego klienta");
            return;
        }
        let suma = 0
        const transakcje = request.result.transakcje;
        console.groupCollapsed(`Transakcje klienta ${request.result.imie} ${request.result.nazwisko}`);
        for (let i = 0; i < transakcje.length; i++) {
            out = document.getElementById('out')
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