import re
import sys

def cut_interpreter(args):
    i = 2
    ans = ["\t"]
    while i < len(args):
        if args[i] == "-d":
            if len(args) > i + 1:
                i += 1
                ans[0] = args[i]
            else: raise ValueError()
        elif args[i] == "-f":
            if len(args) > i + 1:

                i += 1

                coma_list = args[i].split(",")
                for temp in coma_list:
                    dash = temp.find("-")
                    if dash != -1:
                        temp_list = [-1, -1]
                        var1 = temp[0:dash]
                        var2 = temp[dash+1:]
                        if len(var1) != 0 and len(var2) != 0:
                            temp_list[0] = int(var1)
                            temp_list[1] = int(var2)
                        elif len(var1) == 0 and len(var2) != 0:
                            temp_list[0] = 0
                            temp_list[1] = int(var2)
                        elif len(var1) != 0 and len(var2) == 0:
                            temp_list[0] = int(var1)
                            temp_list[1] = sys.maxsize
                        else: raise ValueError()
                        if temp_list[0] > temp_list[1]: raise ValueError

                        ans.append(temp_list)
                    else:
                        ans.append(int(temp))

                #-----------------------------------

            else: raise ValueError()    
        else: raise ValueError()
        i += 1
    return ans


def grep_interpreter(args):
    i = 2
    ans = [0,0,""]
    pattern_NF = 1
    while i < len(args):
        if args[i] == "-i": ans[1] = 1
        elif args[i] == "-w": ans[0] = 1
        elif pattern_NF: ans[2] = args[i]; pattern_NF = 0
        else: raise ValueError()
        i += 1
    return ans


def command_interpreter(args):
    if args[1] == "cut":
        from cut import cut
        ans = ["\t"]
        try: ans = cut_interpreter(args)
        except: print("Błąd"); quit()
        cut(ans)
    elif args[1] == "grep":
        from grep import grep
        ans = [0, 0, ""]
        try: ans = grep_interpreter(args)
        except: print("Błąd"); quit()
        print(ans)
        grep(ans[0], ans[1], ans[2])
    else: raise ValueError()

if __name__ == "__main__":
    command_interpreter(sys.argv)


