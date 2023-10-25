from klasy import Klient
from klasy import Produkt


Jan_Kowalski = Klient('Jan_Kowalski')
Anna_Nowak = Klient('Anna_Nowak')


Jan_Kowalski.produkty.append(Produkt('Komputer', 1, 2000))
Jan_Kowalski.produkty.append(Produkt('Laptop', 1, 5000))

Anna_Nowak.produkty.append(Produkt('Komputer', 2, 2000))
Anna_Nowak.produkty.append(Produkt('Laptop', 2, 5000))

clients = [Jan_Kowalski, Anna_Nowak]

warehouse = [
    Produkt('Komputer', 7, 2000),
    Produkt('Laptop', 15, 5000)
]

while True:
    try:
        temp = input("> ")
    except EOFError: break

    line_split = temp.split(" ")

    if line_split[0] == "warehouse":
        print(warehouse)
    elif line_split[0] == "clients":
        print(clients)
    elif line_split[0] == "show":
        try: x = int(line_split[1])
        except: print(f'\tBłąd: Zły format komendy.'); continue
        if x < len(clients):
            print(clients[x])
        else: print(f'\tBłąd: Zły format komendy.'); continue
    elif line_split[0] == "sell":
        try:
            x = int(line_split[1])
            y = int(line_split[2])
            z = int(line_split[3])
        except: print(f'\tBłąd: Zły format komendy.'); continue
        if x >= len(clients) or y >= len(warehouse): print(f'\tBłąd: Zły format komendy.'); continue
        clients[x].buy(warehouse[y], z)
    else:
        print(f'\tBłąd: Zły format komendy.'); continue

