from enum import Enum


class MoveDirection(Enum):
    F = 'Zwierzak idzie do przodu'
    B = 'Zwierzak idzie do tylu'
    L = 'Zwierzak skreca w lewo'
    R = 'Zwierzak skreca w prawo'


class Vector2d:
    __x, __y = 0, 0
    def __init__(self, x: int, y: int):
        self.x_cord = x
        self.y_cord = y

    def __str__(self):
        return f"({self.x_cord}, {self.y_cord})"
    
    def __eq__(self, other_Vector2d):
        if not isinstance(other_Vector2d, Vector2d): return NotImplemented
        return self.x_cord == other_Vector2d.x_cord and self.y_cord == other_Vector2d.y_cord
    
    # def __hash__(self):
    #     return hash((self.x_cord, self.y_cord))


    # __x property
    @property
    def x_cord(self):
        return self.__x
    
    @x_cord.setter
    def x_cord(self, x: int):
        self.__x = x

    @x_cord.getter
    def x_cord(self):
        return self.__x
    
    # __y property
    @property
    def y_cord(self):
        return self.__y
    
    @y_cord.setter
    def y_cord(self, y: int):
        self.__y = y

    @y_cord.getter
    def y_cord(self):
        return self.__y
    
    
    def precedes(self, other_Vector2d):
        if not isinstance(other_Vector2d, Vector2d): raise ValueError
        if self.x_cord <= other_Vector2d.x_cord and self.y_cord <= other_Vector2d.y_cord: return True
        else: return False
    
    def follows(self, other_Vector2d):
        if not isinstance(other_Vector2d, Vector2d): raise ValueError
        if self.x_cord >= other_Vector2d.x_cord and self.y_cord >= other_Vector2d.y_cord: return True
        else: return False

    def add(self, other_Vector2d):
        if not isinstance(other_Vector2d, Vector2d): raise ValueError
        return Vector2d(
            self.x_cord + other_Vector2d.x_cord,
            self.y_cord + other_Vector2d.y_cord
            )

    def subtract(self, other_Vector2d):
        if not isinstance(other_Vector2d, Vector2d): raise ValueError
        return Vector2d(
            self.x_cord - other_Vector2d.x_cord,
            self.y_cord - other_Vector2d.y_cord
            )
    
    def upperRight(self, other_Vector2d):
        if not isinstance(other_Vector2d, Vector2d): raise ValueError
        return Vector2d(
                self.x_cord if self.x_cord >= other_Vector2d.x_cord else other_Vector2d.x_cord,
                self.y_cord if self.y_cord >= other_Vector2d.y_cord else other_Vector2d.y_cord
            )
    
    def lowerLeft(self, other_Vector2d):
        if not isinstance(other_Vector2d, Vector2d): raise ValueError
        return Vector2d(
                self.x_cord if self.x_cord <= other_Vector2d.x_cord else other_Vector2d.x_cord,
                self.y_cord if self.y_cord <= other_Vector2d.y_cord else other_Vector2d.y_cord
            )
    
    def opposite(self):
        return Vector2d(
                self.x_cord * -1,
                self.y_cord * -1
            )
        