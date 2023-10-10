from io import StringIO

import skrypt

def test_display_false(capsys):
    tab = ['1', '2']
    skrypt.display(tab, False)
    captured = capsys.readouterr()
    assert captured.out == '1\n2\n'

def test_display_true(capsys):
    tab = ['1', '2']
    skrypt.display(tab, True)
    captured = capsys.readouterr()
    assert captured.out == 'args[0]: 1\nargs[1]: 2\n'

def test_run(capsys):
    moves = ['f', 'b', 'q']
    desc = {'f': 'Zwierzak idzie do przodu', 'b': 'Zwierzak idzie do tyłu', 'l': 'Zwierzak skręca w lewo', 'r': 'Zwierzak skręca w prawo'}
    skrypt.run(moves, desc)
    captured = capsys.readouterr()
    assert captured.out == 'Zwierzak idzie do przodu\nZwierzak idzie do tyłu\n'
