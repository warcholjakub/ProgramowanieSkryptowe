#!/bin/python3

import operations
import sys

def string(s):
    print(operations.first_character(s))
    print(operations.first_two_characters(s))
    print(operations.all_characters_except_first_two(s))
    print(operations.penultimate_character(s))
    print(operations.last_three_characters(s))
    print(operations.all_characters_in_even_positions(s))
    print(operations.merge_characters_and_duplicate(s))

if __name__ == "__main__":
    s = sys.argv[1]
    string(s)
