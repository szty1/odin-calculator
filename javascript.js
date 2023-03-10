function add(a ,b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return "ERROR!";
    return a / b;
}

function calculate (operator, a, b) {
    if (a !== undefined || b !== undefined) {
        return window[operator](a, b);
    }
}

console.log(calculate("divide", 20, 0));