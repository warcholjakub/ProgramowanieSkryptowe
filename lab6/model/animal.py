from model.core import MoveDirection, Vector2d, MapDirection, log, log_to

class Animal:
    def __init__(self, position: Vector2d, orientation: MapDirection = MapDirection.NORTH):
        self.position: Vector2d = position
        self.orientation: MapDirection = orientation
    
    def __str__(self):
        return f'{str(self.orientation)}'
    
    def __repr__(self):
        return str(self)
    
    def isAt(self, position: Vector2d) -> bool:
        return position == self.position

    def move(self, direction: MoveDirection, validator) -> None:
        
        self.orientation = (direction == MoveDirection.RIGHT and self.orientation.next()) or (direction == MoveDirection.LEFT and self.orientation.previous()) or self.orientation
        self.position = \
        ((direction == MoveDirection.FORWARD and validator.canMoveTo(self.position.add(self.orientation.toUnitVector())))) and self.position.add(self.orientation.toUnitVector()) \
        or ((direction == MoveDirection.BACKWARD and validator.canMoveTo(self.position.subtract(self.orientation.toUnitVector()))) and self.position.subtract(self.orientation.toUnitVector())) \
        or self.position
        
        
        # match direction:
        #     case MoveDirection.RIGHT: self.orientation = self.orientation.next()
        #     case MoveDirection.LEFT: self.orientation = self.orientation.previous()
        #     case MoveDirection.FORWARD: 
        #         temp = self.position.add(self.orientation.toUnitVector())
        #         if validator.canMoveTo(temp): self.position = temp
        #     case MoveDirection.BACKWARD: 
        #         temp = self.position.subtract(self.orientation.toUnitVector())
        #         if validator.canMoveTo(temp): self.position = temp