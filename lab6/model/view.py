"""
Autor: Stanisław Polak
Data utworzenia: 02-11-2023
Data modyfikacji: 02-11-2023
Wersja: 1.0
Opis: Wizualizator mapy
"""
from typing import Final
from model.core import Vector2d


class MapVisualizer:
    """
    The map visualizer converts the IWorldMap map into a string representation.

    author: polaksta
    Based on Java code (author: apohllo, idzik)
    """

    EMPTY_CELL: Final = " "
    FRAME_SEGMENT: Final = "-"
    CELL_SEGMENT: Final = "|"

    def __init__(self, map) -> None:
        self.map = map

    def draw(self, lowerLeft: Vector2d, upperRight: Vector2d) -> str:
        """
            Convert selected region of the map into a string. It is assumed that the
        indices of the map will have no more than two characters (including the
        sign).

        Parameters:
            lowerLeft: Vector2d
                The lower left corner of the region that is drawn.
            upperRight: Vector2d
                The upper right corner of the region that is drawn.
        Returns:
            String representation of the selected region of the map.
        """
        builder: str = "\033c" # Clear screen
        for i in range(upperRight.y_cord + 1, lowerLeft.y_cord - 1, -1):
            if i == upperRight.y_cord + 1:
                builder += self._drawHeader(lowerLeft, upperRight)
            builder += f"{i:4d}"
            for j in range(lowerLeft.x_cord, upperRight.x_cord + 2):
                if i < lowerLeft.y_cord or i > upperRight.y_cord:
                    builder += self._drawFrame(j <= upperRight.x_cord)
                else:
                    builder += self.__class__.CELL_SEGMENT
                    if j <= upperRight.x_cord:
                        builder += self._drawObject(Vector2d(j, i))
            builder += "\n"
        return builder

    def _drawHeader(self, lowerLeft: Vector2d, upperRight: Vector2d) -> str:
        builder: str = ""
        builder += " y\\x"
        for j in range(lowerLeft.x_cord, upperRight.x_cord + 1):
            builder += f"{j:2d}"

        builder += "\n"
        return builder

    def _drawFrame(self, innerSegment) -> str:
        if innerSegment:
            return self.__class__.FRAME_SEGMENT * 2
        else:
            return self.__class__.FRAME_SEGMENT

    def _drawObject(self, currentPossition: Vector2d):
        if self.map.isOccupied(currentPossition):
            obj = self.map.objectAt(currentPossition)
            if obj is not None:
                return str(obj)
        return self.__class__.EMPTY_CELL