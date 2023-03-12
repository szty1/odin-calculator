let inputValue = "0"; // stores the value currently being input
let storedValue; // store the previously entered input or the last result
let operation; // stores the the selected operation
let resetInput = false; // store if the last input was an operate or calculate button

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
    // return null if division by 0, will trigger error mesg on display
    if (b == 0) return;
    return Number(a) / Number(b);
}

function toggleNegative() {
    inputValue = (inputValue * -1).toString();
    updateDisplay(inputValue);
}

function handleClear() {
    // everything is reset to default (display is not updated here!)
    inputValue = "0";
    storedValue= undefined;
    operation = undefined;
    resetInput = false;
    operateButtons.forEach(key => key.classList.remove('selected'));
}

function handleBackspace() {
    // check if negative and remove the last numeric digit (incl. decimal point)
    let firstdigit = (inputValue < 0) ? 2 : 1
    if (inputValue.length > firstdigit) {
        inputValue = inputValue.slice(0, -1);
    } else {
        inputValue = "0";
    }
    updateDisplay(inputValue);
}

function updateDisplay(text) {
    // if number is too large to display or a function returned an error show error msm on display
    if ((Math.abs(Number(text)) > 99999999999) || !text) {
        text = "ERROR!";
        handleClear();
    }

    // make sure variable is the correctg type
    if (typeof(text) === "number") text = text.toString();

    // handle negative sign (has its own container to avoid string length issues)
    if (text < 0) {
        text = text.substring(1);
        negative.innerText = "-";
    }
    else {
        negative.innerText = "";
    }

    // do not show decimal point if decimal digits ha no place left
    if (text.length > 11 && text.includes(".")) {
        text = text.substring(0, 11);
    }

    display.innerText = text;
}

function calculate() {
    // check if operation is defined, perform calculation and display result
    if (!operation) return;
    console.log(storedValue, inputValue)
    let result = window[operation](storedValue, inputValue);
    updateDisplay(result);

    // if no error, move result to storedvalue, flag that an operation has been performed
    if (result != undefined) storedValue = result;
    resetInput = true;
}

function operateButtonClicked() {
    // store operation and display it on the button
    operation = this.dataset.key;
    operateButtons.forEach(key => key.classList.remove('selected'));
    this.classList.add('selected');
    
    // if another operate button was press before, don't do anything else
    if (resetInput) return;

    // if we already have a stored and input value, make the calculation
    // (we need this for sequenced calculations)
    // if not, store and reset current inputvalue
    if (inputValue && storedValue) {
        calculate();
    } else {
        storedValue = inputValue;
        inputValue = "0";
        updateDisplay(inputValue);
    }
    
}

function calculateButtonClicked() {
    // if we have a stored and input value, make the calculation
    if (inputValue && storedValue) {
        calculate();
    }
}

function numButtonClicked() {
    //if a result is displayed, a new numeric input should reset the inputvalue
    if (resetInput) {
        inputValue = "0";
        resetInput = false;
    }

    // prevent more than one decimal point in input
    if (this.dataset.key === "." && inputValue.includes(".")) return;

    if (inputValue === "0") inputValue = "";

    // do not add number if max length is reached
    let maxlength = (inputValue < 0) ? 12 : 11;
    if (inputValue.length < maxlength) {
        inputValue += this.dataset.key;
        updateDisplay(inputValue);
    }

    // remove operate button highlights
    operateButtons.forEach(key => key.classList.remove('selected'));
}

function specialButtonClicked() {
    // handle special buttons
    switch (this.dataset.key) {
        case 'plusminus':
            toggleNegative();
            break;
        case 'clear':
            handleClear();
            updateDisplay(inputValue);
            break;
        case 'bckspc':
            handleBackspace();
            break;
    }
}

function handleKeyboardInput(e) {
    console.log(e.key);

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

window.addEventListener('keydown', handleKeyboardInput);

// console.log(window);