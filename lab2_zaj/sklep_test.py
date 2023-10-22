from io import StringIO
from sklep import sklep_func

FILE_PATH = "/home/jwarchol/ProgramowanieSkryptowe/lab2_zaj/magazyn.dane"



def test_warehouse(capsys):
    sklep_func(["warehouse"], FILE_PATH, 1)
    captured = capsys.readouterr()
    assert captured.out == "-------------+------------\nNazwa towaru | Ilość sztuk\n-------------+------------\nKomputer | 10\nLaptop | 20\n"
    

def test_sell(capsys):
    sklep_func(["sell Jan_Kowalski:Komputer(1):Laptop(5) Anna_Nowak:Komputer(2)", "warehouse"], FILE_PATH, 2)
    captured = capsys.readouterr()
    assert captured.out == "-------------+------------\nNazwa towaru | Ilość sztuk\n-------------+------------\nKomputer | 7\nLaptop | 15\n"

def test_show(capsys):
    sklep_func(["sell Jan_Kowalski:Komputer(1):Laptop(5) Anna_Nowak:Komputer(2)", "show Jan_Kowalski | Anna_Nowak"], FILE_PATH, 2)
    captured = capsys.readouterr()
    assert captured.out == "Jan_Kowalski\n-------------+------------\nNazwa towaru | Ilość sztuk\n-------------+------------\nKomputer | 1\nLaptop | 5\nAnna_Nowak\n-------------+------------\nNazwa towaru | Ilość sztuk\n-------------+------------\nKomputer | 2\n"