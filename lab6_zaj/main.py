from klasy import *
import pickle
import argparse

USER = "N/A"

parser = argparse.ArgumentParser()
parser.add_argument('FILE', nargs=1)
parser.add_argument('USER', nargs=1)
subparsers = parser.add_subparsers(help='Functions', dest='command')

warehouse = subparsers.add_parser('warehouse', help='Prints available products.')

services = subparsers.add_parser('services', help='Prints available services.')

add_product = subparsers.add_parser('add_product', help='Adds a product to the warehouse.')
add_product.add_argument('nazwa', nargs=1, action='store', type=str)
add_product.add_argument('cena', nargs=1, action='store', type=int)
add_product.add_argument('ilosc', nargs=1, action='store', type=int)

add_service = subparsers.add_parser('add_service', help='Adds a service to the available services.')
add_service.add_argument('nazwa', nargs=1, action='store', type=str)
add_service.add_argument('cena', nargs=1, action='store', type=int)

show = subparsers.add_parser('show', help='Show transactions of a client.')
show.add_argument('imie', nargs=1, action='store', type=str)
show.add_argument('nazwisko', nargs=1, action='store', type=str)

sell_product = subparsers.add_parser('sell_product', help='Sell a product to the client.')
sell_product.add_argument('imie', nargs=1, action='store', type=str)
sell_product.add_argument('nazwisko', nargs=1, action='store', type=str)
sell_product.add_argument('produkt', nargs=1, action='store', type=str)
sell_product.add_argument('ilosc', nargs=1, action='store', type=int)

sell_service = subparsers.add_parser('sell_service', help='Sell a service to the client.')
sell_service.add_argument('imie', nargs=1, action='store', type=str)
sell_service.add_argument('nazwisko', nargs=1, action='store', type=str)
sell_service.add_argument('usluga', nargs=1, action='store', type=str)


args = parser.parse_args()

USER = args.USER[0]

if __name__ == "__main__":

    
    with open(args.FILE[0] , 'rb') as in_file:
        out = pickle.load(in_file)
        Store.products = out[0]
        Store.services = out[1]
        store = Store(out[2])

    match args.command:
        case "warehouse": print(Store.products)
        case "services": print(Store.services)
        case "add_product": Store.products.append(Produkt(args.nazwa[0], args.cena[0], args.ilosc[0]))
        case "add_service": Store.services.append(Service(args.nazwa[0], args.cena[0]))
        case "show": store.show_transactions(args.imie[0], args.nazwisko[0])
        case "sell_product": store.buy_product(args.produkt[0], args.ilosc[0], args.imie[0], args.nazwisko[0])
        case "sell_service": store.buy_service(args.usluga[0], args.imie[0], args.nazwisko[0])


