from model import Vector2d

pos1 = Vector2d(1, 2)
pos2 = Vector2d(-2, 1)

def test_precedes():
    assert pos1.precedes(pos2) == False
    assert pos2.precedes(pos1) == True

def test_follows():
    assert pos1.follows(pos2) == True
    assert pos2.follows(pos1) == False

def test_add():
    pos3 = pos1.add(pos2)
    assert str(pos3) == "(-1, 3)" 

def test_subtract():
    pos3 = pos1.subtract(pos2)
    assert str(pos3) == "(3, 1)"

def test_upperRight():
    pos3 = pos1.upperRight(pos2)
    assert str(pos3) == "(1, 2)"

def test_lowerLeft():
    pos3 = pos1.lowerLeft(pos2)
    assert str(pos3) == "(-2, 1)"

def test_opposite():
    assert str(pos1.opposite()) == "(-1, -2)"
    assert str(pos2.opposite()) == "(2, -1)"