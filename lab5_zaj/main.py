from klasy import *
from typing import Final
import datetime
import pickle


store = Store({})


while True:
    try:
        temp = input("> ")
    except EOFError: break

    line_split = temp.split(" ")

    if line_split[0] == "warehouse":
        print(Store.products)
    elif line_split[0] == "add_product":
        try:
            nazwa = line_split[1]
            cena = int(line_split[2])
            ilosc = int(line_split[3])
        except: print(f'\tBłąd: Zły format komendy.'); continue
        Store.products.append(Produkt(nazwa, cena, ilosc))
    elif line_split[0] == "add_service":
        try:
            nazwa = line_split[1]
            cena = int(line_split[2])
        except: print(f'\tBłąd: Zły format komendy.'); continue
        Store.services.append(Service(nazwa, cena))
    elif line_split[0] == "show":
        try: name = line_split[1]; surname = line_split[2]
        except: print(f'\tBłąd: Zły format komendy.'); continue
        store.show_transactions(name, surname)
    elif line_split[0] == "sell_product":
        try:
            name = line_split[1]
            surname = line_split[2]
            y = line_split[3]
            z = int(line_split[4])
        except: print(f'\tBłąd: Zły format komendy.'); continue
        store.buy_product(y, z, name, surname)
    elif line_split[0] == "sell_service":
        try:
            name = line_split[1]
            surname = line_split[2]
            y = line_split[3]
        except: print(f'\tBłąd: Zły format komendy.'); continue
        store.buy_service(y, name, surname)
    else:
        print(f'\tBłąd: Zły format komendy.'); continue
    
del store

