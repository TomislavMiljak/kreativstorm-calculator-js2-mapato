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

// Operate function to call the correct operator function
function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        case '%': return a % b; // Modulus operation
        default: return b;
    }
}

// Handle number and decimal input
buttons.forEach(button => {
    if (!button.classList.contains('operator') && button.innerHTML !== 'AC' && button.innerHTML !== 'DEL' && button.innerHTML !== '=') {
        button.addEventListener('click', (e) => {
            let value = e.target.innerHTML;
            if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimal
            currentInput += value;
            updateDisplay();
        });
    }
});

// Handle operator input
buttons.forEach(button => {
    if (button.classList.contains('operator')) {
        button.addEventListener('click', (e) => {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else if (operator) {
                secondOperand = parseFloat(currentInput);
                firstOperand = operate(operator, firstOperand, secondOperand);
                currentInput = firstOperand.toString();
                updateDisplay();
            }
            operator = e.target.innerHTML;
            currentInput = '';
        });
    }
});
// Handle equal button click
document.querySelector('.equal').addEventListener('click', () => {
    if (operator && firstOperand !== null) {
        secondOperand = parseFloat(currentInput);
        let result = operate(operator, firstOperand, secondOperand);
        if (result === 'Error') {
            currentInput = 'Cannot divide by 0';
        } else {
            currentInput = parseFloat(result.toFixed(10)).toString(); // Rounding long decimals
        }
        firstOperand = null;
        secondOperand = null;
        operator = null;
        updateDisplay();
    }
});

// Handle clear button
document.querySelector('.clear').addEventListener('click', () => {
    clearCalculator();
});

// Handle delete (backspace) button
document.querySelector('.delete').addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});
