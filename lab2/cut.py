MAX_STRING=50

def cut(args):
    var_tab = []
    bool_tab = MAX_STRING * [0]
    while True:
        try:
            temp = input()
            var_tab.append(temp)
        except EOFError:
            break

    for i in range (1, len(args)):
        if isinstance(args[i], list):
            for j in range(args[i][0]-1, min(args[i][1],MAX_STRING)):
                bool_tab[j] = 1
        else:
            bool_tab[args[i]-1] = 1
    
    for elem in var_tab:
        arr = elem.split(args[0])
        for i in range(len(arr)):
            if i != 0 and bool_tab[i]: print(args[0],end="")
            if bool_tab[i]: print(arr[i],end="")
        print("\n")