
document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("inputbox");
    const buttons = document.querySelectorAll("button");

    let currentInput = "0";
    let firstOperand = null;
    let secondOperand = null;
    let currentOperator = null;

    
    document.addEventListener("keydown", handleKeyboardInput);

    
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const buttonText = event.target.textContent;
            if (buttonText === "=") {
                calculateResult();
            } else if (buttonText === "AC") {
                clearDisplay();
            } else if (buttonText === "DEL") {
                backspace(); 
            } else if (["%", "/", "*", "-", "+", "."].includes(buttonText)) {
                setOperator(buttonText);
            } else {
                appendNumber(buttonText);
            }
        });
    });

    const keyMap = {
        0: () => appendNumber("0"),
        1: () => appendNumber("1"),
        2: () => appendNumber("2"),
        3: () => appendNumber("3"),
        4: () => appendNumber("4"),
        5: () => appendNumber("5"),
        6: () => appendNumber("6"),
        7: () => appendNumber("7"),
        8: () => appendNumber("8"),
        9: () => appendNumber("9"),
        ".": appendDecimal,
        "+": () => setOperator("+"),
        "-": () => setOperator("-"),
        "*": () => setOperator("*"),
        "/": () => setOperator("/"),
        Enter: calculateResult,
        "=": calculateResult,
        Escape: clearDisplay,
        c: clearDisplay,
        Backspace: backspace,
    };

    function handleKeyboardInput(event) {
        if (keyMap[event.key]) {
            event.preventDefault();
            keyMap[event.key]();
        }
    }

    function backspace() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1); 
        } else {
            currentInput = "0"; 
        }
        updateDisplay();
    }

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
        if (b === 0) {
            return "Cannot divide by 0";
        }
        return a / b;
    }

    function operate(operator, a, b) {
        switch (operator) {
            case "+":
                return add(a, b);
            case "-":
                return subtract(a, b);
            case "*":
                return multiply(a, b);
            case "/":
                return divide(a, b);
            default:
                return "Error: Unknown operator";
        }
    }

    function updateDisplay() {
        inputBox.value = currentInput;
    }

    function appendNumber(number) {
        if (currentInput === "0") {
            currentInput = number.toString();
        } else {
            currentInput += number.toString();
        }
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

    function setOperator(operator) {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput); 
        } else if (currentOperator) {
            secondOperand = parseFloat(currentInput);
            firstOperand = operate(currentOperator, firstOperand, secondOperand); 
        }

        currentOperator = operator;
        currentInput = "0"; 
    }

    function calculateResult() {
        if (currentOperator && firstOperand !== null) {
            secondOperand = parseFloat(currentInput);
            let result = operate(currentOperator, firstOperand, secondOperand);

            if (typeof result === "string") {
                currentInput = result; 
                updateDisplay();

                setTimeout(() => {
                    clearDisplay(); 
                }, 1000);
            } else {
                currentInput = parseFloat(result.toFixed(4)).toString(); 
                firstOperand = parseFloat(currentInput);
                currentOperator = null;
                updateDisplay();
            }
        }
