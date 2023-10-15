def first_character(s):
    if len(s) == 0: return ""
    else: return s[0]

def first_two_characters(s):
    if len(s) < 2: return ""
    else: return s[:2]
    
def all_characters_except_first_two(s):
    if len(s) <= 2: return ""
    else: return s[2:]

def penultimate_character(s):
    if len(s) < 2: return ""
    else: return s[-2:-1]

def last_three_characters(s):
    if len(s) < 3: return ""
    else: return s[-3:]

def all_characters_in_even_positions(s):
    if len(s) == 0: return ""
    else: return s[::2]

def merge_characters_and_duplicate(s):
    if len(s) < 2: return ""
    else:
        return len(s) * (first_character(s) + penultimate_character(s))