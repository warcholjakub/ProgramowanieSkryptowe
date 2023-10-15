import re
import sys

def argument_interpreter(args):
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

ans = ["\t"]
try: ans = argument_interpreter(sys.argv)
except: print("Błąd")

if sys.argv[1] == "cut": from cut import cut; cut(ans)
elif sys.argv[1] == "grep": pass
else: raise ValueError()


