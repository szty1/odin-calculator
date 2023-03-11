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
    window[currentValue] = (window[currentValue] * -1).toString();
    updateDisplay(window[currentValue]);
}

function handleClear() {
    valueA = "0";
    valueB = "0";
    operation = undefined;
    currentValue = "valueA";
    updateDisplay(window[currentValue]);
}

function handleBackspace() {
    let firstdigit = (window[currentValue] < 0) ? 2 : 1
    if (window[currentValue].length > firstdigit) {
        window[currentValue] = window[currentValue].slice(0, -1);
    } else {
        window[currentValue] = "0";
    }
    updateDisplay(window[currentValue]);
}

function updateDisplay(text) {
    if (text.length > 12) return;
    if (text < 0) {
        text = text.substring(1);
        negative.innerText = "-";
    }
    else {
        negative.innerText = "";
    }
    display.innerText = text;
}

function operateButtonClicked() {
    if (this.dataset.key === "calculate") {

    }

}

function numButtonClicked() {
    let maxlength = (window[currentValue] < 0) ? 12 : 11;
    if (window[currentValue] === "0") window[currentValue] = "";
    if (window[currentValue].length < maxlength) {
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
        case 'bckspc':
            handleBackspace();
            break;
    }
}

const display = document.querySelector('.displaytext');
const negative = document.querySelector('.displaynegative');

const operateButtons = Array.from(document.querySelectorAll('.key.operate'));
operateButtons.forEach(key => key.addEventListener('click', operateButtonClicked));
const numButtons = Array.from(document.querySelectorAll('.key.num'));
numButtons.forEach(key => key.addEventListener('click', numButtonClicked));
const specialButtons = Array.from(document.querySelectorAll('.key.special'));
specialButtons.forEach(key => key.addEventListener('click', specialButtonClicked));


// console.log(window);