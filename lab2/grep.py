import re

def grep(w_flag, i_flag, re_pattern):
    var_tab = []
    if w_flag: re_pattern = r'\b{}\b'.format(re_pattern)

    while True:
        try:
            temp = input()
            var_tab.append(temp)
        except EOFError:
            break

    print("\n")
    for line in var_tab:
        if i_flag:
            if re.search(re_pattern, line, re.IGNORECASE):
                print(line)
        else:
            if re.search(re_pattern, line):
                print(line)
