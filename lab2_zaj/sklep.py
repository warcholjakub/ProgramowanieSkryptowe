import argparse
import pathlib
import re

def convert(lst):
   res_dict = {}
   for i in range(0, len(lst), 2):
       res_dict[lst[i]] = lst[i + 1]
   return res_dict

def sklep_func(var: list, filename: str, iterations: int):

    temp_list = []
    client_items_temp = []
    clients_temp = []

    
    if pathlib.Path(filename).is_file():
        file = open(filename, 'r')
        lines = file.readlines()
        for line in lines:
            temp = line.split(':')
            if len(temp)>0:
                if temp[0] == "Magazyn": 
                    temp_list.append(temp[1]); temp_list.append(int(temp[2]))
                    client_items_temp.append(temp[1]); client_items_temp.append(0)
                elif temp[0] == "Klient":
                    clients_temp.append(temp[1]); clients_temp.append(convert(client_items_temp))

    clients = convert(clients_temp)
    warehouse = convert(temp_list)

    for z in range(0, iterations):

        line_split = var[z].split(" ")
        if line_split[0] == "warehouse":
            print('-------------+------------')
            print('Nazwa towaru | Ilość sztuk')
            print('-------------+------------')
            for x in list(warehouse.keys()):
                if warehouse[x] != 0:
                    print(x + ' | ' + str(warehouse[x]))
        elif line_split[0] == "sell":
            for y in range(1, len(line_split)):
                sprzedaz = line_split[y].split(":")
                if sprzedaz[0] not in clients.keys(): print(f"Nie ma takiego klienta: '{line_split[x]}'!"); raise ValueError
                for x in range(1, len(sprzedaz)):
                    przedmioty = sprzedaz[x].split('(')
                            
                    try:
                        przedmioty[1] = int(przedmioty[1][:-1])
                    except: print("Niepoprawny format komendy!"); raise ValueError

                    # print(przedmioty)
                    if przedmioty[0] not in warehouse.keys(): print(f"Nie ma takiego towaru: '{przedmioty[0]}'!"); raise ValueError
                    if przedmioty[1] <= warehouse[przedmioty[0]]:
                        warehouse[przedmioty[0]] -= przedmioty[1]
                        clients[sprzedaz[0]][przedmioty[0]] += przedmioty[1]
                    else: print("Nie ma na tyle przedmiotów w magazynie!"); raise ValueError
                    # print(clients)
                    # print(warehouse)

        elif line_split[0] == "show":
            for x in range(1, len(line_split)):
                # print(f'{line_split[x]}: {len(line_split[x])}')
                if line_split[x] != "|":
                    if line_split[x] not in clients.keys(): print(f"Nie ma takiego klienta: '{line_split[x]}'!"); raise ValueError
                    print(str(line_split[x]))
                    print('-------------+------------')
                    print('Nazwa towaru | Ilość sztuk')
                    print('-------------+------------')
                    for y in list(clients[line_split[x]].keys()):
                        if clients[line_split[x]][y] != 0:
                            print(y + ' | ' + str(clients[line_split[x]][y]))

        else: print("\tNieznana komenda")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('FILE', nargs=1, action = 'store', help='File that stores shop data.')

    temp_list = []
    client_items_temp = []
    clients_temp = []

    args = parser.parse_args()
    filename = '/home/jwarchol/ProgramowanieSkryptowe/lab2_zaj/' + args.FILE[0]
    if pathlib.Path(filename).is_file():
        file = open(filename, 'r')
        lines = file.readlines()
        for line in lines:
            temp = line.split(':')
            if len(temp)>0:
                if temp[0] == "Magazyn": 
                    temp_list.append(temp[1]); temp_list.append(int(temp[2]))
                    client_items_temp.append(temp[1]); client_items_temp.append(0)
                elif temp[0] == "Klient":
                    clients_temp.append(temp[1]); clients_temp.append(convert(client_items_temp))
    else: raise FileNotFoundError

    clients = convert(clients_temp)
    warehouse = convert(temp_list)

    # print(clients)
    # print(warehouse)


    while True:
            try:
                temp = input("> ")
            except EOFError: break
            try:
                line_split = temp.split(" ")
                if line_split[0] == "warehouse":
                    print('-------------+------------')
                    print('Nazwa towaru | Ilość sztuk')
                    print('-------------+------------')
                    for x in list(warehouse.keys()):
                        if warehouse[x] != 0:
                            print(x + ' | ' + str(warehouse[x]))
                elif line_split[0] == "sell":
                    for y in range(1, len(line_split)):
                        sprzedaz = line_split[y].split(":")
                        if sprzedaz[0] not in clients.keys(): print(f"Nie ma takiego klienta: '{line_split[x]}'!"); raise ValueError
                        for x in range(1, len(sprzedaz)):
                            przedmioty = sprzedaz[x].split('(')
                                    
                            try:
                                przedmioty[1] = int(przedmioty[1][:-1])
                            except: print("Niepoprawny format komendy!"); raise ValueError

                            # print(przedmioty)
                            if przedmioty[0] not in warehouse.keys(): print(f"Nie ma takiego towaru: '{przedmioty[0]}'!"); raise ValueError
                            if przedmioty[1] <= warehouse[przedmioty[0]]:
                                warehouse[przedmioty[0]] -= przedmioty[1]
                                clients[sprzedaz[0]][przedmioty[0]] += przedmioty[1]
                            else: print("Nie ma na tyle przedmiotów w magazynie!"); raise ValueError
                            # print(clients)
                            # print(warehouse)

                elif line_split[0] == "show":
                    for x in range(1, len(line_split)):
                        # print(f'{line_split[x]}: {len(line_split[x])}')
                        if line_split[x] != "|":
                            if line_split[x] not in clients.keys(): print(f"Nie ma takiego klienta: '{line_split[x]}'!"); raise ValueError
                            print(str(line_split[x]))
                            print('-------------+------------')
                            print('Nazwa towaru | Ilość sztuk')
                            print('-------------+------------')
                            for y in list(clients[line_split[x]].keys()):
                                if clients[line_split[x]][y] != 0:
                                    print(y + ' | ' + str(clients[line_split[x]][y]))

                else: print("\tNieznana komenda")
            except:
                continue