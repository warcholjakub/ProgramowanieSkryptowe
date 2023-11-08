import datetime
from typing import Final
import pickle

class Produkt:
    def __init__(self, nazwa, ilosc, cena):
        self.nazwa = nazwa
        self.ilosc = ilosc
        self.cena = cena

    def __repr__(self):
        return self.nazwa
    
    def __str__(self):
        return(f'Produkt: {self.nazwa}\nIlość: {self.ilosc}\nCena: {self.cena}')

class Klient:
    id = 1

    def __init__(self, nazwa):
        self.nazwa = nazwa
        self.id = Klient.id
        Klient.id += 1

    def __repr__(self):
        return f'{self.id}: {self.nazwa}'
    
    # def __str__(self):
        # string = ""
        # suma = 0
        # for prod in self.produkty:
        #     string += f"Produkt: {prod.nazwa}, Ilość: {prod.ilosc}\n"
        #     suma += int(prod.cena) * int(prod.ilosc)
        # return(f'{self.nazwa}\n' + string + f'Wartość kupionych towarów wynosi: {suma} zł')
    
    # def buy(self, product1: Produkt, ilosc: int):
    #     for x in self.produkty:
    #         if x.nazwa == product1.nazwa:
    #             if product1.ilosc >= ilosc:
    #                 product1.ilosc -= ilosc
    #                 x.ilosc += ilosc
    #             else: print(f'\t Błąd: Liczba dostępnych sztuk w magazynie to {product1.ilosc}.')
    #             break

class Transaction:
    def __init__(self, client, product, date):
        self.client = client
        self.product = product
        self.date = date

    def __str__(self):
        return f'{self.client} {self.date}: \n{self.product}'


class Store:

    with open('products.pkl' , 'rb') as in_file:
            products = pickle.load(in_file)

    def __init__(self):
        with open('transactions.pkl' , 'rb') as in_file:
            self.transactions = pickle.load(in_file)

    def __del__(self):
        with open('products.pkl', 'wb') as out_file:
            pickle.dump(Store.products, out_file)
        with open('transactions.pkl' , 'wb') as out_file:
            pickle.dump(self.transactions, out_file)

    def buy(self, produkt_nazwa, ilosc, klient_id):
        found = False
        client = ""
        for var in self.transactions:
            if var.client.id == klient_id:
                client = var.client
                found = True; break
        if not found: client = Klient(f'Jan_Kowalski_{Klient.id}')
        for x in Store.products:
            if x.nazwa == produkt_nazwa:
                if x.ilosc >= ilosc:
                    x.ilosc -= ilosc
                    self.transactions.append(Transaction(client, Produkt(x.nazwa, ilosc, x.cena), datetime.datetime.now()))
                else: print(f'\t Błąd: Liczba dostępnych sztuk w magazynie to {x.ilosc}.')
                break
        print(self.transactions[0])

    def show_transactions(self, client_id):
        for x in self.transactions:
            if x.client.id == client_id:
                print(x)
                



