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
    def __init__(self, nazwa):
        self.nazwa = nazwa
        self.produkty = []

    def __repr__(self):
        return self.nazwa
    
    def __str__(self):
        string = ""
        suma = 0
        for prod in self.produkty:
            string += f"Produkt: {prod.nazwa}, Ilość: {prod.ilosc}\n"
            suma += int(prod.cena) * int(prod.ilosc)
        return(f'{self.nazwa}\n' + string + f'Wartość kupionych towarów wynosi: {suma} zł')
    
    def buy(self, product1: Produkt, ilosc: int):
        for x in self.produkty:
            if x.nazwa == product1.nazwa:
                if product1.ilosc >= ilosc:
                    product1.ilosc -= ilosc
                    x.ilosc += ilosc
                else: print(f'\t Błąd: Liczba dostępnych sztuk w magazynie to {product1.ilosc}.')
                break