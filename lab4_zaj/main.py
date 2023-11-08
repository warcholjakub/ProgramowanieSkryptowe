from klasy import *
from typing import Final
import datetime
import pickle


store = Store()


while True:
    try:
        temp = input("> ")
    except EOFError: break

    line_split = temp.split(" ")

    if line_split[0] == "warehouse":
        print(Store.products)
    elif line_split[0] == "add":
        try:
            nazwa = line_split[1]
            cena = int(line_split[2])
            ilosc = int(line_split[3])
        except: print(f'\tBłąd: Zły format komendy.'); continue
        Store.products.append(Produkt(nazwa, cena, ilosc))
    elif line_split[0] == "show":
        try: x = int(line_split[1])
        except: print(f'\tBłąd: Zły format komendy.'); continue
        store.show_transactions(x)
    elif line_split[0] == "sell":
        try:
            x = int(line_split[1])
            y = line_split[2]
            z = int(line_split[3])
        except: print(f'\tBłąd: Zły format komendy.'); continue
        store.buy(y, z, x)
    else:
        print(f'\tBłąd: Zły format komendy.'); continue
    
del store

