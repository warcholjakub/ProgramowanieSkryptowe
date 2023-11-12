from model.core import *
from model.animal import *

class OptionsParser:

    @staticmethod
    def parse(args: list):
        trans = []
        for elem in args:
            try:
                trans.append(MoveDirection(elem))
            except: pass
        return trans
    
class Simulation:
    directions = []
    animals = []
    def __init__(self, directions: list[MoveDirection], positions: list[Vector2d]) -> None:
        self.directions = directions
        for x in positions:
            self.animals.append(Animal(x))
    
    def run(self) -> None:
        y = len(self.animals)
        for x in range(len(self.directions)):
            self.animals[x%y].move(self.directions[x])
            print(f'Zwierzę {x%y} : {self.animals[x%y].position} {self.animals[x%y].orientation}')
        

