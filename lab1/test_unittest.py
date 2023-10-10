import unittest
from unittest.mock import patch
from io import StringIO

import skrypt

@patch('sys.stdout', new_callable = StringIO)

class TestSkrypt(unittest.TestCase):

    
    def test_display_false(self, stdout):
        tab = ['1', '2']
        skrypt.display(tab, False)
        self.assertEqual(stdout.getvalue(), '1\n2\n')

        
    def test_display_true(self, stdout):
        tab = ['1', '2']
        skrypt.display(tab, True)
        self.assertEqual(stdout.getvalue(), 'args[0]: 1\nargs[1]: 2\n')

    def test_run(self, stdout):
        moves = ['f', 'b', 'q']
        desc = {'f': 'Zwierzak idzie do przodu', 'b': 'Zwierzak idzie do tyłu', 'l': 'Zwierzak skręca w lewo', 'r': 'Zwierzak skręca w prawo'}
        skrypt.run(moves, desc)
        self.assertEqual(stdout.getvalue(), 'Zwierzak idzie do przodu\nZwierzak idzie do tyłu\n')


if __name__ == '__main__':
    unittest.main()