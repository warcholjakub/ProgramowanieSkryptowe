import logging
import datetime
import pickle
import re
from main import USER



logging.basicConfig(filename='sklep.log', filemode='a', format='%(message)s', level=logging.INFO)

class AccessError(Exception):
    def __init__(self, user) -> None:
        self.user = user
        
    def __str__(self):
        return(f'Access denied, {self.user} is not an admin!')

def user(user):
    def inner(func):
        def wrapper(*args, **kwargs):
            logging.info(f'{datetime.datetime.now()}: Użytkownik {user} wywołał metodę {func.__qualname__.split(".")[1]} klasy {func.__qualname__.split(".")[0]}.')
            return func(*args, **kwargs)
        return wrapper
    return inner

def admin(func):
    def wrapper(*args, **kwargs):
        x = re.search("^admin_", USER)
        if not x: raise AccessError(USER)
        return func(*args, **kwargs)
    return wrapper

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
    
    def __hash__(self):
        return hash(self.name+"_"+self.surname)
    
    def __eq__(self, other):
        if isinstance(other, Klient):
            return self.name == other.name and self.surname == other.surname
        return NotImplemented
    

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
        with open('Store.pkl' , 'wb') as out_file:
            saveObject = (Store.products, Store.services, self.clients)
            pickle.dump(saveObject, out_file)
            

    def buy_product(self, produkt_nazwa, ilosc, name, surname):
        client = Klient(name, surname)
        full_name = name + "_" + surname
        self.clients[client] = (full_name in [(var.name + "_" + var.surname) for var in self.clients.keys()] and self.clients[client]) or []
        try: 
            index = [x.nazwa for x in Store.products].index(produkt_nazwa)
            if Store.products[index].ilosc >= ilosc: self.clients[client].append(Transaction(Produkt(Store.products[index].nazwa, ilosc, Store.products[index].cena), datetime.datetime.now()))
            Store.products[index].ilosc = (Store.products[index].ilosc >= ilosc and Store.products[index].ilosc - ilosc) or Store.products[index].ilosc
        except ValueError: print("Nie ma takiego produktu!\n") 
        

    def buy_service(self, service_name, name, surname):
        client = Klient(name, surname)
        full_name = name + "_" + surname
        self.clients[client] = (full_name in [(var.name + "_" + var.surname) for var in self.clients.keys()] and self.clients[client]) or []
        try: 
            index = [x.nazwa for x in Store.services].index(service_name)
            self.clients[client].append(Transaction(Service(Store.services[index].nazwa, Store.services[index].cena), datetime.datetime.now()))
        except ValueError: print("Nie ma takiej usługi!\n") 


    @admin
    def show_transactions(self, name, surname):
        full_name = name + "_" + surname
        try:
            client = [x for x in self.clients.keys()][[(client.name + "_" + client.surname) for client in self.clients.keys()].index(full_name)]
            print(*self.clients[client], sep="\n")
        except ValueError: print("Nie ma takiego klienta!")
                



