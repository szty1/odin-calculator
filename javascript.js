let inputValue = 0; // stores the value currently being input
let storedValue; // store the previously entered input or the last result
let operation; // stores the the selected operation
let resetInput = false; // store if the last input was an operate or calculate button
let fraction = false; // store if decimal point has been clicked

// math functions

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
    // return null if division by 0, will trigger error msg on display
    if (b == 0) return;
    return Number(a) / Number(b);
}

// input handler functions

function plusMinusButtonClicked() {
    inputValue = (inputValue * -1);
    updateDisplay(inputValue);
}

function clearButtonClicked() {
    resetCalculator(0);
}

function backspaceButtonClicked() {
    // check if negative and remove the last numeric digit (incl. decimal point)
    if (!inputValue) return;
    let strInputValue = `${inputValue}`;
    let firstDigit = (inputValue < 0) ? 2 : 1;
    if (strInputValue.length > firstDigit) {
        strInputValue = strInputValue.slice(0, -1);
    } else {
        strInputValue = 0;
    }
    inputValue = Number(strInputValue);
    updateDisplay(inputValue);
}

function operateButtonClicked(key) {
    // find the clicked buton
    let btn = operateButtons.find (btn => btn.getAttribute('data-key') === key);
    
    // set operation
    operation = btn.getAttribute('data-operation');
    setOperatorButtonHighlight(btn);
    
    // if another operate button was press before, don't do anything else
    if (resetInput) return;

    // if we already have a stored and input value, make the calculation
    // (we need this for sequenced calculations)
    // if not, store and reset current inputvalue
    if (inputValue && storedValue) {
        calculate();
    } else {
        storedValue = inputValue;
        inputValue = 0;
    }
    
}

function calculateButtonClicked() {
    // if we have a stored and input value, make the calculation
    if (inputValue && storedValue != null) {
        calculate();
    }
}

function numButtonClicked(key) {
    //if a result is displayed, a new numeric input should reset the inputvalue
    if (resetInput) {
        inputValue = 0;
        resetInput = false;
    }

    // prevent numbers that don't fit on screen
    if (inputValue > 99999999999999) return;

    if (fraction) {
        inputValue = Number(`${inputValue}.${key}`);
        fraction = false;
    }
    else {
        inputValue = Number(`${inputValue}${key}`);
    }
    
    updateDisplay(inputValue);

    setOperatorButtonHighlight(null);
}

function decimalPointButtonClicked() {
    // prevent more than one decimal point in input
    if (fraction || !Number.isInteger(inputValue)) return;

    fraction = true;
}

//

function setOperatorButtonHighlight(btn) {
    // if null, remove all highlight
    operateButtons.forEach(key => key.classList.remove('selected'));
    if (btn) btn.classList.add('selected');
}

function updateDisplay(num) {
    let displayText = `${num}`;
    if (fraction) displayText += ".";
    
    // if number is too large to display or a function returned an error show error msm on display
    if ((Math.abs(num) > 99999999999999) || num === null) {
        display.innerText = 'ERROR!';
        return;
    }

    // do not show decimal point if decimal digits ha no place left
    if (displayText.length > 12 && displayText.includes(".")) {
        displayText = displayText.substring(0, 13);
    }

    display.innerText = displayText;
}

function calculate() {
    // check if operation is defined, perform calculation and display result
    if (!operation) return;
    let result = window[operation](storedValue, inputValue);

    // if no error, move result to storedvalue, flag that an operation has been performed
    if (result != undefined) storedValue = result;
    resetInput = true;

    updateDisplay(result);
}

function resetCalculator(displayText) {
    // everything is reset to default (display is not updated here!)
    inputValue = 0;
    storedValue= undefined;
    operation = undefined;
    resetInput = false;
    setOperatorButtonHighlight(null);
    updateDisplay(inputValue);
}

// input handlers

function handleInput(e) {
    let key = (e.key === undefined) ? this.dataset.key : e.key;

    console.log(key);

    switch(key) {
        case '0':
        case '1': 
        case '2':
        case '3': 
        case '4':
        case '5': 
        case '6':
        case '7': 
        case '8':
        case '9':
            numButtonClicked(key);
            break;

        case '.': 
            decimalPointButtonClicked(key);
            break;

        case '+':
        case '-':
        case '*':
        case '/':
            operateButtonClicked(key);
            break;

        case 'calculate':
        case 'Enter':
            calculateButtonClicked();
            break;

        case 'plusminus':
            plusMinusButtonClicked();
            break;

        case 'clear':
        case 'Escape':
            clearButtonClicked();
            break;

        case 'backspace':
        case 'Backspace':
            backspaceButtonClicked();
            break;
    }

    // reset focus to display to prevent enter key call the focused button
    display.focus();

}

const allButtons = Array.from(document.querySelectorAll('.key'));
allButtons.forEach(key => key.addEventListener('click', handleInput));

window.addEventListener('keydown', handleInput);

// 

const display = document.querySelector('.displaytext');
const negative = document.querySelector('.displaynegative');

const operateButtons = Array.from(document.querySelectorAll('.key.operate'));

display.focus();
