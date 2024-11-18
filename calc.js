document.addEventListener("DOMContentLoaded", function () {
    // Input and button references
    const inputBox = document.getElementById("inputbox");
    const buttons = document.querySelectorAll("button");

    // State variables
    let currentInput = "0";
    let firstOperand = null;
    let secondOperand = null;
    let currentOperator = null;

    // Keyboard input map
    const keyMap = {
        "0": () => appendNumber("0"),
        "1": () => appendNumber("1"),
        "2": () => appendNumber("2"),
        "3": () => appendNumber("3"),
        "4": () => appendNumber("4"),
        "5": () => appendNumber("5"),
        "6": () => appendNumber("6"),
        "7": () => appendNumber("7"),
        "8": () => appendNumber("8"),
        "9": () => appendNumber("9"),
        ".": appendDecimal,
        "+": () => setOperator("+"),
        "-": () => setOperator("-"),
        "*": () => setOperator("*"),
        "/": () => setOperator("/"),
        "%": () => setOperator("%"),
        "Enter": calculateResult,
        "=": calculateResult,
        "Escape": clearDisplay,
        "c": clearDisplay,
        "Backspace": backspace,
    };

    // Add keyboard event listener
    document.addEventListener("keydown", handleKeyboardInput);

    // Add click event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const buttonText = event.target.textContent;

            if (buttonText === "=") calculateResult();
            else if (buttonText === "AC") clearDisplay();
            else if (buttonText === "DEL") backspace();
            else if (["+", "-", "*", "/", "%"].includes(buttonText)) setOperator(buttonText);
            else if (buttonText === ".") appendDecimal();
            else appendNumber(buttonText);
        });
    });

    // Function to handle keyboard inputs
    function handleKeyboardInput(event) {
        if (keyMap[event.key]) {
            event.preventDefault();
            keyMap[event.key]();
        }
    }

    // Helper functions
    function updateDisplay() {
        inputBox.value = currentInput;
    }

    function appendNumber(number) {
        currentInput = currentInput === "0" ? number : currentInput + number;
        updateDisplay();
    }

    function appendDecimal() {
        if (!currentInput.includes(".")) {
            currentInput += ".";
            updateDisplay();
        }
    }

    function clearDisplay() {
        currentInput = "0";
        firstOperand = null;
        secondOperand = null;
        currentOperator = null;
        updateDisplay();
    }

    function backspace() {
        currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
        updateDisplay();
    }

    function setOperator(operator) {
        if (firstOperand === null) {
            // Initialize the first operand
            firstOperand = parseFloat(currentInput);
        } else if (currentOperator && currentInput !== "0") {
            // Calculate intermediate result when a second operator is entered
            secondOperand = parseFloat(currentInput);
            firstOperand = operate(currentOperator, firstOperand, secondOperand);
            currentInput = firstOperand.toString(); // Update display with intermediate result
            updateDisplay();
        }

        // Update the current operator
        currentOperator = operator;
        currentInput = "0"; // Reset input for the next operand
    }

    function calculateResult() {
        if (currentOperator && firstOperand !== null && currentInput !== "0") {
            // Calculate the final result
            secondOperand = parseFloat(currentInput);
            const result = operate(currentOperator, firstOperand, secondOperand);

            if (typeof result === "string") { // Handle errors like division by zero
                currentInput = result;
                updateDisplay();
                setTimeout(clearDisplay, 3000); // Clear display after 3 seconds
            } else {
                currentInput = parseFloat(result.toFixed(4)).toString(); // Precision adjustment
                firstOperand = parseFloat(currentInput); // Update firstOperand for further calculations
                currentOperator = null; // Clear the operator
                updateDisplay();
            }
        }
    }

    // Arithmetic operation functions
    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function divide(a, b) {
        return b === 0 ? "Cannot divide by 0" : a / b;
    }

    function modulo(a, b) {
        return b === 0 ? "Cannot divide by 0" : a % b;
    }

    function operate(operator, a, b) {
        switch (operator) {
            case "+": return add(a, b);
            case "-": return subtract(a, b);
            case "*": return multiply(a, b);
            case "/": return divide(a, b);
            case "%": return modulo(a, b);
            default: return "Error: Invalid Operator";
        }
    }
});
