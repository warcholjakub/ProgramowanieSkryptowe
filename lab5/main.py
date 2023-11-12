from model.core import *
from controller import *
import sys


if __name__ == "__main__":
    directions: list[MoveDirection] = OptionsParser.parse(sys.argv[1:])
    positions: list[Vector2d] = [Vector2d(2, 2), Vector2d(3, 4), Vector2d(0, 4)]
    simulation: Simulation = Simulation(directions, positions)
    simulation.run()
    print(simulation.animals)