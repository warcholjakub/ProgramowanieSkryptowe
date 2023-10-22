from options_parser import OptionsParser

def test_parser():
    var1 = ['F', 'F', 'B']
    assert OptionsParser.parse(var1) == ['Zwierzak idzie do przodu', 'Zwierzak idzie do przodu', 'Zwierzak idzie do tylu']

    var2 = ['L', 'X', 'R']
    assert OptionsParser.parse(var2) == ['Zwierzak skreca w lewo', 'Zwierzak skreca w prawo']