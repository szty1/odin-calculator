let inputValue = "0";
let storedValue;
let operation;

function add(a ,b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    if (b == 0) return "ERROR!";
    return Number(a) / Number(b);
}

function toggleNegative() {
    inputValue = (inputValue * -1).toString();
    updateDisplay(inputValue);
}

function handleClear() {
    inputValue = "0";
    storedValue= undefined;
    operation = undefined;
    updateDisplay(inputValue);
}

function handleBackspace() {
    let firstdigit = (inputValue < 0) ? 2 : 1
    if (inputValue.length > firstdigit) {
        inputValue = inputValue.slice(0, -1);
    } else {
        inputValue = "0";
    }
    updateDisplay(inputValue);
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

function calculate() {
    storedValue = window[operation](storedValue, inputValue);
    updateDisplay(storedValue);
    inputValue = "0";
}

function operateButtonClicked() {
    if (inputValue && storedValue) {
        calculate();
    } else {
        storedValue = inputValue;
        inputValue = "0";
    }
    operation = this.dataset.key;
}

function calculateButtonClicked() {
    if (inputValue && storedValue) {
        calculate();
        storedValue = undefined;
    }
}

function numButtonClicked() {
    let maxlength = (inputValue < 0) ? 12 : 11;
    if (inputValue === "0") inputValue = "";
    if (inputValue.length < maxlength) {
        inputValue += this.dataset.key;
        updateDisplay(inputValue);
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

const calculateButton = document.querySelector('.key.calculate');
calculateButton.addEventListener('click', calculateButtonClicked);
const operateButtons = Array.from(document.querySelectorAll('.key.operate'));
operateButtons.forEach(key => key.addEventListener('click', operateButtonClicked));
const numButtons = Array.from(document.querySelectorAll('.key.num'));
numButtons.forEach(key => key.addEventListener('click', numButtonClicked));
const specialButtons = Array.from(document.querySelectorAll('.key.special'));
specialButtons.forEach(key => key.addEventListener('click', specialButtonClicked));


// console.log(window);