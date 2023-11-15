from model.interface import IMoveValidator, IWorldMap
from model.view import *
from model.animal import Animal
from model.core import *

class WorldMap(IWorldMap, IMoveValidator):
    def __init__(self, height: int, width: int) -> None:
        self.animals: dict[Vector2d, Animal] = {}
        self.height = height
        self.width = width
    
    def __str__(self):
        map = MapVisualizer(self)
        return map.draw(Vector2d(0,0), Vector2d(self.width, self.height))

    def isOccupied(self, position: Vector2d) -> bool:
        if position in self.animals.keys(): return True
        else: return False

    def canMoveTo(self, position: Vector2d) -> bool:
        if not self.isOccupied(position) and position.precedes(Vector2d(self.width, self.height)) and position.follows(Vector2d(0, 0)): return True
        else: return False

    def objectAt(self, position: Vector2d) -> Animal | None:
        if position in self.animals.keys(): return self.animals[position]

    def place(self, animal: Animal) -> bool:
        if self.canMoveTo(animal.position): self.animals[animal.position] = animal; return True
        else: return False

    def move(self, animal: Animal, direction: MoveDirection) -> None:
        if self.objectAt(animal.position):
            match direction:
                case MoveDirection.RIGHT: self.animals[animal.position].orientation = animal.orientation.next()
                case MoveDirection.LEFT: self.animals[animal.position].orientation = animal.orientation.previous()
                case MoveDirection.FORWARD: 
                    temp = animal.position.add(animal.orientation.toUnitVector())
                    if self.canMoveTo(temp) and not self.isOccupied(temp): self.animals.pop(animal.position); animal.move(direction, self); animal.position = temp; self.place(animal)
                case MoveDirection.BACKWARD: 
                    temp = animal.position.subtract(animal.orientation.toUnitVector())
                    if self.canMoveTo(temp) and not self.isOccupied(temp): self.animals.pop(animal.position); animal.move(direction, self); animal.position = temp; self.place(animal)

class RectangularMap(WorldMap):
    pass
    

class InfiniteMap(WorldMap):
    def __init__(self) -> None:
        self.animals: dict[Vector2d, Animal] = {}

    def __str__(self) -> str:
        map = MapVisualizer(self)
        init = False
        LL = Vector2d(-1, -1)
        UR = Vector2d(-1, -1)
        for x in self.animals.keys():
            if not init:
                LL = x
                UR = x
                init = True
            else:
                LL = LL.lowerLeft(x)
                UR = UR.upperRight(x)
            
        return map.draw(LL, UR)
    
    def canMoveTo(self, position: Vector2d) -> bool:
        if not super().isOccupied(position): return True
        else: return False
    
