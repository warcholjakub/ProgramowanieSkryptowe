'use strict';

function sum(x, y) {
    return x + y;
}

function sum_strings(a) {
    let sum = 0
    let ans = "";
    for (const line of a) {
        ans = "";
        for (const letter of line) {
            if (isNaN(Number(ans + letter))) { break; }
            ans += letter
        }
        if (ans.length === 0) { ans = 0 }
        else { ans = Number(ans) }
        sum += ans
    }
    return sum;
}

function digits(s) {
    let sum = [0, 0]
    for (const digit of s) {
        let num = Number(digit)
        if (!isNaN(num)) {
            if (num % 2 === 0) { sum[1] += num }
            else { sum[0] += num }
        }
    }
    return sum
}

function letters(s) {
    let sum = [0, 0]
    for (const letter of s) {
        if (isNaN(letter * 1)) {
            if (letter == letter.toUpperCase()) { sum[1] += 1 }
            else if (letter == letter.toLowerCase()) { sum[0] += 1 }
        }
    }
    return sum;
}