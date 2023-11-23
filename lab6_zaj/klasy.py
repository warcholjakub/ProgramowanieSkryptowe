import logging
import datetime
from typing import Final
import pickle
#from main import USER

def user(user):
    def inner(func):
        def wrapper(*args, **kwargs):
            logging.info(f'{datetime.datetime.now()}: Użytkownik {user} wywołał metodę {func.__qualname__} klasy {func.__module__}.')
            return func(*args, **kwargs)
        return wrapper
    return inner

class Sellable:
    def __init__(self, nazwa, cena):
        self.nazwa = nazwa
        self.cena = cena
    def __repr__(self):
        return f'{self.nazwa}'
    def __str__(self):
        return(f'Produkt: {self.nazwa}\nCena: {self.cena}\n')


class Service(Sellable):
    pass


class Produkt(Sellable):
    def __init__(self, nazwa, ilosc, cena):
        super().__init__(nazwa, cena)
        self.ilosc = ilosc
    def __str__(self):
        return super().__str__() + f'Ilosc: {self.ilosc}\n'


class Klient:
    def __init__(self, name, surname):
        self.name = name
        self.surname = surname

    def __repr__(self):
        return f'{self.name}_{self.surname}'
    
    # powinno być hashowanie i __eq__

class Transaction:
    def __init__(self, sellable, date):
        self.sellable = sellable
        self.date = date

    def __str__(self):
        return f'{self.date}: \n{self.sellable}'


class Store:
    
    products: list[Produkt] = []
    services: list[Service] = []   
    

    def __init__(self, clients: dict[Klient, list[Transaction]]):
        self.clients = clients
        

    def __del__(self):
        # with open('products.pkl', 'wb') as out_file:
        #     pickle.dump(Store.products, out_file)
        # with open('clients.pkl' , 'wb') as out_file:
        #     pickle.dump(self.clients, out_file)
        # with open('services.pkl' , 'wb') as out_file:
        #     pickle.dump(Store.services, out_file)
            
        with open('Store.pkl' , 'wb') as out_file:
            saveObject = (Store.products, Store.services, self.clients)
            pickle.dump(saveObject, out_file)

    def buy_product(self, produkt_nazwa, ilosc, name, surname):
        found = False
        client = Klient("N/A", "N/A")
        full_name = name + "_" + surname
        
        found = full_name in [(var.name + "_" + var.surname) for var in self.clients.keys()]
        # for var in self.clients.keys():
        #     if var.name == name and var.surname == surname:
        #         client = var
        #         found = True; break
        
        client = (not found and Klient(name, surname)) or client; self.clients[client] = []
        # if not found: client = Klient(name, surname); self.clients[client] = []
        
        
        for x in Store.products:
            if x.nazwa == produkt_nazwa:
                if x.ilosc >= ilosc:
                    x.ilosc -= ilosc
                    self.clients[client].append(Transaction(Produkt(x.nazwa, ilosc, x.cena), datetime.datetime.now()))
                else: print(f'\t Błąd: Liczba dostępnych sztuk w magazynie to {x.ilosc}.')
                break
        # print(self.transactions[0])

    def buy_service(self, service_name, name, surname):
        found = False
        client = Klient("N/A", "N/A")
        full_name = name + "_" + surname
        for var in self.clients.keys():
            if var.name == name and var.surname == surname:
                client = var
                found = True; break
        if not found: client = Klient(name, surname); self.clients[client] = []
        for x in Store.services:
            if x.nazwa == service_name:
                self.clients[client].append(Transaction(Service(x.nazwa, x.cena), datetime.datetime.now()))
                break

    #@user(USER)
    def show_transactions(self, name, surname):
        for client in self.clients.keys():
            if client.name == name and client.surname == surname:
                for x in self.clients[client]: print(x)
                break
                



