window['valueA'] = "";
window['valueB'] = "";
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

function updateDisplay(text) {
    if (text.length > 12) return;
    display.innerText = text;
}

function operateButtonClicked() {
    if (this.dataset.key === "calculate") {

    }

}

function numButtonClicked() {
    if (valueA.length < 11) {
        window[currentValue] += this.dataset.key;
        updateDisplay(window[currentValue]);
    }
    
}

function specialButtonClicked() {

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