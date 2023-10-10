import sys

def display(args,show_index):
    if(show_index):
        for l in range(len(args)):
            print ('args[' + str(l) + ']: ' + str(args[l]))
    else:
        for l in args:
            print(str(l))

def run(moves, move_descriptions):
    moves_translated = []
    for m in moves:
        if m in move_descriptions:
            moves_translated.append(move_descriptions[m])
    display(moves_translated, False)

    

def main():
    print("System wystartował")

    show_index = True
    desc = {'f': 'Zwierzak idzie do przodu', 'b': 'Zwierzak idzie do tyłu', 'l': 'Zwierzak skręca w lewo', 'r': 'Zwierzak skręca w prawo'}
    # display(sys.argv, show_index)
    run(sys.argv, desc)

    print("System zakończył działanie\n")
if __name__ == '__main__':
    main()