let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');
let currentInput = '';
let firstOperand = null;
let secondOperand = null;
let operator = null;

// Update the display
function updateDisplay() {
    input.value = currentInput || '0';
}

// Clear everything
function clearCalculator() {
    currentInput = '';
    firstOperand = null;
    secondOperand = null;
    operator = null;
    updateDisplay();
}

// Perform basic operations
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}
