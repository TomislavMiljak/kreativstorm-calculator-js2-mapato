let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');
let currentInput = '';
let firstOperand = null;
let secondOperand = null;
let operator = null;
let isOperatorClicked = false; // To prevent multiple operators input without numbers

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
    isOperatorClicked = false;
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
            if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
            if (isOperatorClicked) {
                currentInput = value; // Start new input after an operator
                isOperatorClicked = false;
            } else {
                currentInput += value;
            }
            updateDisplay();
        });
    }
});

// Handle operator input
buttons.forEach(button => {
    if (button.classList.contains('operator')) {
        button.addEventListener('click', (e) => {
            if (currentInput === '') return; // Prevent operator if no number is entered
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
            isOperatorClicked = true; // Flag to avoid entering multiple operators
        });
    }
});

// Handle equal button click
document.querySelector('.equal').addEventListener('click', () => {
    if (currentInput === '' || operator === null) return; // Prevent equal without valid input
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

// Keyboard support for calculator
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        let value = e.key;
        if (isOperatorClicked) {
            currentInput = value;
            isOperatorClicked = false;
        } else {
            currentInput += value;
        }
        updateDisplay();
    }

    if (e.key === '.') {
        if (currentInput.includes('.')) return;
        currentInput += '.';
        updateDisplay();
    }

    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        if (currentInput === '') return; // Prevent operator if no number is entered
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            secondOperand = parseFloat(currentInput);
            firstOperand = operate(operator, firstOperand, secondOperand);
            currentInput = firstOperand.toString();
            updateDisplay();
        }
        operator = e.key;
        currentInput = '';
        isOperatorClicked = true;
    }

    if (e.key === 'Enter') {
        if (currentInput === '' || operator === null) return; // Prevent equal without valid input
        secondOperand = parseFloat(currentInput);
        let result = operate(operator, firstOperand, secondOperand);
        if (result === 'Error') {
            currentInput = 'Cannot divide by 0';
        } else {
            currentInput = parseFloat(result.toFixed(10)).toString();
        }
        firstOperand = null;
        secondOperand = null;
        operator = null;
        updateDisplay();
    }

    if (e.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    if (e.key === 'Escape') { // Clear on 'Esc'
        clearCalculator();
    }
});
