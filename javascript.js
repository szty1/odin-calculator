window['valueA'] = "0";
window['valueB'] = "0";
let operation;
let currentValue = "valueA";

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

function toggleNegative() {
    if (window[currentValue] > 0) {
        window[currentValue] = `-${window[currentValue]}`;
    } else if (window[currentValue] < 0) {
        window[currentValue] = window[currentValue].substring(1);
    }
    updateDisplay(window[currentValue]);
}

function handleClear() {
    valueA = "0";
    valueB = "0";
    operation = undefined;
    currentValue = "valueA";
    updateDisplay(window[currentValue]);
}

function updateDisplay(text) {
    if (text.length > 12) return;
    display.innerText = text;
}

function operateButtonClicked() {
    if (this.dataset.key === "calculate") {

    }

}

function numButtonClicked() {
    if (window[currentValue] === "0") window[currentValue] = "";
    if (window[currentValue].length < 11) {
        window[currentValue] += this.dataset.key;
        updateDisplay(window[currentValue]);
    }
    
}

function specialButtonClicked() {
    switch (this.dataset.key) {
        case 'plusminus':
            toggleNegative();
            break;
        case 'clear':
            handleClear();
            break;
    }
}

const display = document.querySelector('.displaytext');

const operateButtons = Array.from(document.querySelectorAll('.key.operate'));
operateButtons.forEach(key => key.addEventListener('click', operateButtonClicked));
const numButtons = Array.from(document.querySelectorAll('.key.num'));
numButtons.forEach(key => key.addEventListener('click', numButtonClicked));
const specialButtons = Array.from(document.querySelectorAll('.key.special'));
specialButtons.forEach(key => key.addEventListener('click', specialButtonClicked));

console.log(window[currentValue]);
// console.log(window);