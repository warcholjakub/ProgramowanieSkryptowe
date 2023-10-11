import json
import sys

# Sprzedaż towarów
def sprzedaz(data, args):
    for x in range(len(args)):
        if args[x] in list(data.keys()):
            if data[args[x]] >= int(args[x+1]):
                data[args[x]] = data[args[x]] - int(args[x+1])
            else:
                print("Nie ma na tyle towaru: " + args[x])
    
# Printowanie stanu magazynu
def stan_magazynu(data, args):
    if '--stan_magazynu' in args:
        print('-------------+------------')
        print('Nazwa towaru | Ilość sztuk')
        print('-------------+------------')
        for x in list(data.keys()):
            print(x + '          ' + str(data[x]))

# Otwieranie pliku JSON
with open('/home/jwarchol/ProgramowanieSkryptowe/lab1/magazyn.json', 'r') as file:
    data = json.load(file)

# Sprawdzanie ile argumentów zostało podanych (wyświetlanie instrukcji)
if len(sys.argv) == 1:
    print('Parametry:\n  • Nazwa_towaru_1 Ilość_sprzedawanych_sztuk Nazwa_towaru_2 Ilość_sprzedawanych_sztuk ...\n  • --stan_magazynu')
else:
    sprzedaz(data, sys.argv)
    stan_magazynu(data, sys.argv)

# Zapisywanie wyniku do pliku JSON
with open('/home/jwarchol/ProgramowanieSkryptowe/lab1/magazyn.json', 'w') as json_file:
    data = json.dump(data, json_file)
