let input = "";
let nr1;
let nr2;
let operator = '';
let prevOp = '';
let prevOpDisplay = '';
let display = document.querySelector('.display')
let upperDisplay = document.querySelector('#upper-display')
display.textContent = 0;
let plusMinus = document.querySelector('#plus-minus');
plusMinus.addEventListener('click', negateNumber);
let point = document.querySelector('#point');
point.addEventListener('click', addDecimalPoint);
let clear = document.querySelector('#clear');
clear.addEventListener('click', clearDisplay)
let backSpace = document.querySelector('#backspace');
backSpace.addEventListener('click', handleBackspace);

function add(nr1, nr2) {
    return nr1 + nr2;
}
function subtract(nr1, nr2) {
    return nr1 - nr2;
}
function multiply(nr1, nr2) {
    return nr1 * nr2;
}
function divide(nr1, nr2) {
    if (nr2 == 0)
        return "Oops";
    else
        return nr1 / nr2;;
}
function power(nr1, nr2) {
    return nr1 ** nr2;
}
function operate(nr1, nr2, operator) {
    if (operator == '+')
        return add(nr1, nr2)
    else if (operator == '-')
        return subtract(nr1, nr2)
    else if (operator == '*')
        return multiply(nr1, nr2)
    else if (operator == '/')
        return divide(nr1, nr2)
    else if (operator == '**')
        return power(nr1, nr2)
}
function repeatOperation() {
    if (prevOp == '*')
        prevOpDisplay = '×';
    else if (prevOp == '/')
        prevOpDisplay = '÷';
    else if (prevOp == '**')
        prevOpDisplay = '^';
    else
        prevOpDisplay = prevOp;
}
function checkLength() {
    if (nr1.toString().split(".")[0].length > 12) {
        nr1 = nr1.toExponential(5)
    }
    if (nr1.toString().includes('.') && !nr1.toString().includes('e')) {
        if (nr1.toString().split(".")[1].length > 4)
            nr1 = Number((nr1).toFixed(4));
        else return;
    }
}
function calculateNumber() {
    if (operator == '' && nr2 == undefined) {
        nr1 = Number(input)
        upperDisplay.textContent = nr1;
    }
    else if (nr2 == undefined && input == '') {
        return nr1;
    }
    else if (input == '' && operator !== '' && nr1 !== '' && nr2 !== '') { }
    else if (operator == '') {
        upperDisplay.textContent = nr1 + prevOpDisplay + nr2 + "=";
        nr1 = operate(nr1, nr2, prevOp);
        checkLength();
        display.textContent = nr1;
    }

    else {
        nr2 = Number(input);
        upperDisplay.textContent += (nr2 + "=");
        input = '';
        nr1 = operate(nr1, nr2, operator);
        checkLength();
        display.textContent = nr1;
        prevOp = operator;
        operator = '';
    }
}
function clearDisplay() {
    display.textContent = '0';
    upperDisplay.textContent = '';
    nr1 = undefined; // inainte era cu null, daca nu mai merge, schimba la loc
    nr2 = undefined;
    operator = '';
    prevOp = '';
    input = '';
}
function clickNumber(event) {
    let numberValue = event.target.textContent;
    if (operator !== '' && upperDisplay.textContent !== '') {
        if (input.includes(".")) { } else
            display.textContent = Number(input);
    }
    if (nr1 !== undefined && nr2 !== undefined && operator == '' && input == '') {
        nr1 = undefined;
        nr2 = undefined;
        prevOp = '';
        upperDisplay.textContent = '';
        display.textContent = Number(input);
    }
    if (input.length > 12)
        return;
    else
        input += numberValue;

    if (display.textContent == '0') {
        display.textContent = numberValue;
    } else if (display.textContent.length >= 12) { return; }
    else {
        display.textContent += numberValue;
    }
}
let numbers = document.querySelectorAll('.number');
for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', clickNumber);
}
function negateNumber() {
    if (nr1 == undefined && nr2 == undefined) {
        if (Number(input) > 0) {
            input = -input;
            display.textContent = "-" + display.textContent;
        } else if (Number(input) < 0) {
            input = -input;
            display.textContent = display.textContent.substring(1);
        }
    }
    else if (nr2 !== undefined && operator == '') {
        if (nr1 > 0) {
            nr1 = -nr1;
            display.textContent = "-" + display.textContent;
        } else if (nr1 < 0) {
            nr1 = -nr1;
            display.textContent = display.textContent.substring(1);
        }
    }
    else {
        if (Number(input) > 0) {
            input = -input;
            display.textContent = "-" + display.textContent;
        } else if (Number(input) < 0) {
            input = -input;
            display.textContent = display.textContent.substring(1);
        }
    }
}
function addDecimalPoint() {
    if (input.toString().includes(".") || display.textContent.includes(".")) { }
    else if (display.textContent.length >= 12) { return; }
    else if (typeof nr1 == 'number' && input == '' && operator == '') {
        clearDisplay();
        display.textContent += ".";
        input += ".";
    }
    else {
        display.textContent += ".";
        input += ".";
    }
}
function handleBackspace() {
    if (display.textContent.includes("e")) {
        return;
    }
    else if (operator !== "" && input == '') { }
    else if (nr1 !== undefined && nr2 !== undefined && operator == '') {
        nr1 = Number(nr1.toString().slice(0, -1));
        display.textContent = display.textContent.slice(0, -1)
    }
    else if (nr1 !== undefined && nr2 == undefined) {
        display.textContent = display.textContent.slice(0, -1)
        input = input.toString().slice(0, -1);
    }
    else if (operator !== '' && input !== '') {
        input = input.toString().slice(0, -1);
        display.textContent = display.textContent.slice(0, -1)
    }
    else {
        display.textContent = display.textContent.slice(0, -1)
        input = input.toString().slice(0, -1);
        upperDisplay.textContent = upperDisplay.textContent.slice(0, -1)
    }
}
function pressButton(button) {
    button.click();
}
function keyboardSupport() {
    document.addEventListener('keydown', (event) => {
        if (event.key == "0") { pressButton(document.querySelector("#btn0")); }
        else if (event.key == "1") { pressButton(document.querySelector("#one")); }
        else if (event.key == "2") { pressButton(document.querySelector("#two")); }
        else if (event.key == "3") { pressButton(document.querySelector("#three")); }
        else if (event.key == "4") { pressButton(document.querySelector("#four")); }
        else if (event.key == "5") { pressButton(document.querySelector("#five")); }
        else if (event.key == "6") { pressButton(document.querySelector("#six")); }
        else if (event.key == "7") { pressButton(document.querySelector("#seven")); }
        else if (event.key == "8") { pressButton(document.querySelector("#eight")); }
        else if (event.key == "9") { pressButton(document.querySelector("#nine")); }
        else if (event.key == "+") { pressButton(document.querySelector("#plus")); }
        else if (event.key == "-") { pressButton(document.querySelector("#minus")); }
        else if (event.key == "*") { pressButton(document.querySelector("#multiply")); }
        else if (event.key == "/") { pressButton(document.querySelector("#divide")); }
        else if (event.key == "^") { pressButton(document.querySelector("#power")); }
        else if (event.key == "Backspace") { pressButton(document.querySelector("#backspace")); }
        else if (event.key == ".") { pressButton(document.querySelector("#point")); }
        else if (event.key == "Escape") { pressButton(document.querySelector("#clear")); }
        else if (event.key == "=" || event.key == "Enter") { pressButton(document.querySelector("#equal")); }
    });
}
keyboardSupport();

let operations = {
    equal: document.querySelector('#equal'),
    plus: document.querySelector('#plus'),
    minus: document.querySelector('#minus'),
    multiply: document.querySelector('#multiply'),
    divide: document.querySelector('#divide'),
    power: document.querySelector('#power'),
}
operations.equal.addEventListener('click', () => {
    calculateNumber();
    repeatOperation();
})
operations.plus.addEventListener('click', () => {
    display.textContent = '0';
    if (operator == '' && input == '' && typeof nr1 == "number" && typeof nr2 == "number") {
    } else calculateNumber();
    if (nr1 == null) {
        nr1 = Number(input);
    }
    if (operator == '') {
        upperDisplay.textContent = Number(nr1);
        upperDisplay.textContent += "+";
        operator = "+";
    } else if (operator !== '') {
        operator = "+";
        upperDisplay.textContent = upperDisplay.textContent.slice(0, -1);
        upperDisplay.textContent += "+";
    }
    input = '';
})
operations.minus.addEventListener('click', () => {
    display.textContent = '0';
    if (operator == '' && input == '' && typeof nr1 == "number" && typeof nr2 == "number") {
    } else calculateNumber();
    if (nr1 == null) {
        nr1 = Number(input);
    }
    if (operator == '') {
        upperDisplay.textContent = Number(nr1);
        upperDisplay.textContent += "-";
        operator = "-";
    } else if (operator !== '') {
        operator = "-";
        upperDisplay.textContent = upperDisplay.textContent.slice(0, -1);
        upperDisplay.textContent += "-";
    }
    input = '';
})
operations.multiply.addEventListener('click', () => {
    display.textContent = '0';
    if (operator == '' && input == '' && typeof nr1 == "number" && typeof nr2 == "number") {
    } else calculateNumber();
    if (nr1 == null) {
        nr1 = Number(input);
    }
    if (operator == '') {
        upperDisplay.textContent = Number(nr1);
        upperDisplay.textContent += "×";
        operator = "*";
    } else if (operator !== '') {
        operator = "*";
        upperDisplay.textContent = upperDisplay.textContent.slice(0, -1);
        upperDisplay.textContent += "×";
    }
    input = '';
})
operations.divide.addEventListener('click', () => {
    display.textContent = '0';
    if (operator == '' && input == '' && typeof nr1 == "number" && typeof nr2 == "number") {
    } else calculateNumber();
    if (nr1 == null) {
        nr1 = Number(input);
    }
    if (operator == '') {
        upperDisplay.textContent = Number(nr1);
        upperDisplay.textContent += "÷";
        operator = "/";
    } else if (operator !== '') {
        operator = "/";
        upperDisplay.textContent = upperDisplay.textContent.slice(0, -1);
        upperDisplay.textContent += "÷";
    }
    input = '';
})
operations.power.addEventListener('click', () => {
    display.textContent = '0';
    if (operator == '' && input == '' && typeof nr1 == "number" && typeof nr2 == "number") {
        operator = "**";
    } else calculateNumber();
    if (nr1 == null) {
        nr1 = Number(input);
    }
    if (operator == '') {
        upperDisplay.textContent = Number(nr1);
        upperDisplay.textContent += "^";
        operator = "**";
    } else if (operator !== '') {
        operator = "**";
        upperDisplay.textContent = upperDisplay.textContent.slice(0, -1);
        upperDisplay.textContent += "^";
    }
    input = '';
})
