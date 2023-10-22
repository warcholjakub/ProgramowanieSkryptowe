from model import MoveDirection

class OptionsParser:

    @staticmethod
    def parse(args: list):
        trans = []
        for elem in args:
            try:
                print(MoveDirection[elem].value)
                trans.append(MoveDirection[elem].value)
            except: pass
        return trans