import argparse
import pathlib

def convert(lst):
   res_dict = {}
   for i in range(0, len(lst), 2):
       res_dict[lst[i]] = lst[i + 1]
   return res_dict

parser = argparse.ArgumentParser()
parser.add_argument('FILE', nargs=1, action = 'store', help='File that stores shop data.')

temp_list = []
client_items_temp = []
clients_temp = []

args = parser.parse_args()
if pathlib.Path(args.FILE[0]).is_file():
    file = open(args.FILE[0], 'r')
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

print(clients)
print(warehouse)

while True:
        try:
            temp = input()
            line_split = temp.split(" ")
            if line_split[0] == "warehouse":
                print('-------------+------------')
                print('Nazwa towaru | Ilość sztuk')
                print('-------------+------------')
                for x in list(warehouse.keys()):
                    print(x + '          ' + str(warehouse[x]))
            elif line_split[0] == "sell":
                for y in range(1, len(line_split)):
                    sprzedaz = line_split[y].split(":")
                    if sprzedaz[0] not in clients.keys(): print("Nie ma takiego klienta!"); raise ValueError
                    for x in range(1, len(sprzedaz)):
                        przedmioty = sprzedaz[x].split('(')
                        try:
                            przedmioty[1] = int(przedmioty[1][:-1])
                        except: print("Niepoprawny format komendy!"); raise ValueError

                        if przedmioty[1] <= warehouse[przedmioty[0]]:
                            warehouse[przedmioty[0]] -= przedmioty[1]
                            clients[sprzedaz[0]][przedmioty[0]] += przedmioty[1]
                        else: print("Nie ma na tyle przedmiotów w magazynie!"); raise ValueError
                # print(clients)
                # print(warehouse)

            elif line_split[0] == "show":
                for x in range(1, len(line_split)):
                    if line_split != "|":
                        pass
        except:
            break