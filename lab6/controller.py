from model.core import *
from model.animal import *
from model.interface import IWorldMap
from model.map import RectangularMap
from time import sleep
import os

class OptionsParser:

    @staticmethod
    def parse(args: list):
        trans = []
        for elem in args:
            if elem not in MoveDirection._value2member_map_: raise ValueError(f'"{elem}" is not legal move specification.')
            trans.append(MoveDirection(elem))
        return trans
    
class Simulation():
    directions = []
    animals = []
    def __init__(self, directions: list[MoveDirection], positions: list[Vector2d], map: IWorldMap) -> None:
        self.directions = directions
        self.map = map
        for x in positions:
            try:
                self.map.place(Animal(x))
            except PositionAlreadyOccupiedError: continue
            self.animals.append(Animal(x))
    
    def run(self) -> None:
        y = len(self.animals)
        for x in range(len(self.directions)):
            os.system("clear")
            print(self.map)
            sleep(1)
            self.map.move(self.animals[x%y], self.directions[x])
            # self.animals[x%y].move(self.directions[x])
            # print(f'Zwierzę {x%y} : {self.animals[x%y].position} {self.animals[x%y].orientation}')
        else:
            os.system("clear")
            print(self.map)
        

