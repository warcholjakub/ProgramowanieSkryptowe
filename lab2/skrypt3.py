import argparse
import sys
from skrypt2 import cut_argparser as cut
from skrypt2 import grep_argparse as grep
from skrypt1 import string

parser = argparse.ArgumentParser()
subparsers = parser.add_subparsers(help='Functions')
parser_1 = subparsers.add_parser('cut', help='Uses cut with the following available flags: -d, -f.')
parser_1.add_argument('-f', nargs=1, required=True, help='Select only these fields.')
parser_1.add_argument('-d', type=str, nargs=1, default=['\t'], help='Use DELIM instead of TAB for field delimiter.')

parser_2 = subparsers.add_parser('grep', help='Use grep with the following available flags: -w, -i.')
parser_2.add_argument('-w', action ='store_true', help='Select only those lines containing matches that form whole words.')
parser_2.add_argument('-i', action='store_true', help='Ignore case distinctions in patterns and input data.')
parser_2.add_argument('PATTERN', nargs=1, type=str, action='store')

parser_3 = subparsers.add_parser('string', help='Use skrypt1.py.')
parser_3.add_argument('STRING', type=str, nargs=1, action='store')



args = parser.parse_args()

#print(args)
temp = len(vars(args))

match temp:
    case 1: string(args.STRING[0])
    case 2: cut(args.d[0], args.f[0])
    case 3: grep(args.w, args.i, args.PATTERN[0])
