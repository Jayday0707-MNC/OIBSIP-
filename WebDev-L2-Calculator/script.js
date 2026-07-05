// =======================================
// Modern Calculator v2.0
// Developed by Nkosinathi Msimango
// =======================================

// ================================
// Elements
// ================================

const display = document.getElementById("display");
const buttons = document.querySelectorAll("#calculator-buttons button");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");
const themeToggle = document.getElementById("theme-toggle");

// ================================
// Variables
// ================================

let expression = "";
let history = [];

// ================================
// Display
// ================================

function updateDisplay() {
    display.value = expression;
}

function clearDisplay() {
    expression = "";
    updateDisplay();
}

// ================================
// History
// ================================

function addHistory(calculation, result) {

    history.unshift({
        calculation,
        result
    });

    renderHistory();

    saveHistory();

}

function renderHistory() {

    historyList.innerHTML = "";

    history.forEach(item => {

        const li = document.createElement("li");

        li.textContent =
            `${item.calculation} = ${item.result}`;

        historyList.appendChild(li);

    });

}

function saveHistory() {

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(history)
    );

}

function loadHistory() {

    const saved =
        localStorage.getItem("calculatorHistory");

    if(saved){

        history = JSON.parse(saved);

        renderHistory();

    }

}

// ================================
// Calculator
// ================================

function calculate() {

    if(expression === "") return;

    try{

        const calculation = expression;

        const result = Function(
            `"use strict"; return (${expression})`
        )();

        if(!isFinite(result))
            throw new Error();

        expression = result.toString();

        updateDisplay();

        addHistory(calculation,result);

    }

    catch{

        display.value="Error";

        expression="";

    }

}
// ================================
// Scientific Functions
// ================================

function squareRoot() {

    if (expression === "") return;

    const value = Number(expression);

    if (isNaN(value) || value < 0) {

        display.value = "Error";
        expression = "";
        return;

    }

    const result = Math.sqrt(value);

    addHistory(`√(${value})`, result);

    expression = result.toString();

    updateDisplay();

}

function square() {

    if (expression === "") return;

    const value = Number(expression);

    if (isNaN(value)) return;

    const result = value * value;

    addHistory(`${value}²`, result);

    expression = result.toString();

    updateDisplay();

}

function toggleSign() {

    if (expression === "") return;

    const value = Number(expression);

    if (isNaN(value)) return;

    expression = (-value).toString();

    updateDisplay();

}

// ================================
// Button Click Events
// ================================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        switch (value) {

            case "C":

                clearDisplay();
                break;

            case "⌫":

                expression = expression.slice(0, -1);
                updateDisplay();
                break;

            case "=":

                calculate();
                break;

            case "√":

                squareRoot();
                break;

            case "x²":

                square();
                break;

            case "±":

                toggleSign();
                break;

            case "xʸ":

                // Future feature
                alert("Power (xʸ) will be added in Version 2.1");
                break;

            default:

                expression += value;
                updateDisplay();

        }

    });

});

// ================================
// Keyboard Support
// ================================

document.addEventListener("keydown", (event) => {

    const key = event.key;

    // Numbers
    if (/^[0-9]$/.test(key)) {

        expression += key;
        updateDisplay();
        return;

    }

    // Operators
    if (["+", "-", "*", "/", "%", "."].includes(key)) {

        expression += key;
        updateDisplay();
        return;

    }

    // Enter
    if (key === "Enter") {

        event.preventDefault();
        calculate();
        return;

    }

    // Backspace
    if (key === "Backspace") {

        expression = expression.slice(0, -1);
        updateDisplay();
        return;

    }

    // Escape
    if (key === "Escape") {

        clearDisplay();
        return;

    }

});
// ================================
// Theme (Dark / Light Mode)
// ================================

function loadTheme() {

    const savedTheme = localStorage.getItem("calculatorTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }

    } else {

        document.body.classList.remove("dark");

        if (themeToggle) {
            themeToggle.textContent = "🌙";
        }

    }

}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("calculatorTheme", "dark");
            themeToggle.textContent = "☀️";

        } else {

            localStorage.setItem("calculatorTheme", "light");
            themeToggle.textContent = "🌙";

        }

    });

}

// ================================
// Clear History
// ================================

if (clearHistoryBtn) {

    clearHistoryBtn.addEventListener("click", () => {

        history = [];

        renderHistory();

        saveHistory();

    });

}

// ================================
// Initialization
// ================================

window.addEventListener("load", () => {

    loadHistory();

    loadTheme();

    updateDisplay();

});

// ================================
// Prevent Invalid Expressions
// ================================

function isOperator(character) {

    return ["+", "-", "*", "/", "%", "."].includes(character);

}

function appendValue(value) {

    if (expression.length === 0 && isOperator(value) && value !== "-") {
        return;
    }

    const lastCharacter = expression.slice(-1);

    if (isOperator(lastCharacter) && isOperator(value)) {
        expression =
            expression.slice(0, -1) + value;
    } else {
        expression += value;
    }

    updateDisplay();

}

// ================================
// Future Features
// ================================

/*

Version 2.1

✔ Memory Buttons
(MC, MR, M+, M-)

✔ Cube (x³)

✔ Power (xʸ)

✔ Sin()

✔ Cos()

✔ Tan()

✔ Log()

✔ Natural Log

✔ Factorial

✔ Percentage Calculator

✔ Copy Answer

✔ Download History

✔ Voice Input

*/