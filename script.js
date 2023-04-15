let input = "";
let nr1;
let nr2;
let operator = '';
let prevOp = '';
let prevOpDisplay = '';
let display = document.querySelector('.display')
let upperDisplay = document.querySelector('#upper-display')
display.textContent = 0;

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
    // if (operator !=='' &&nr2!==undefined) {}
    if (operator == '' && nr2 == undefined) {
        nr1 = Number(input)
        upperDisplay.textContent = nr1;
        display.textContent = nr1;
        if (nr1 == undefined) {
            display.textContent = Number(input);
        }
    }
    else if (nr2 == undefined && input == '') {
        return nr1;
    }
    else if (input == '' && operator !== '' && nr1 !== '' && nr2 !== '') {}
    // else if (input =='') {}
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
        // if (nr1.toString().length > 15) {
        //     nr1 = Number((nr1).toFixed(15 - nr1.toString().indexOf('.'))).toExponential(5)
        //     //.toExponential(5)
        // }
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
        if (input.includes(".")) {
        } else
            display.textContent = Number(input);
    }
    if (nr1 !== undefined && nr2 !== undefined && operator == '' && input == '') {
        nr1 = '';
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
let clear = document.querySelector('#clear');
clear.addEventListener('click', clearDisplay)
let backSpace = document.querySelector('#backspace');
backSpace.addEventListener('click', () => {
    if (display.textContent.includes("e")) {
        return;
    }
    else if (operator !== "" && input == '') {
    }
    // else if (typeof nr1 == "number" && typeof nr2 == "number") {
    //     nr1 = Number(nr1.toString().slice(0, -1));
    //     upperDisplay.textContent = nr1;
    //     display.textContent = display.textContent.slice(0, -1)
    // }
    else if (nr1 !== undefined && nr2 !== undefined && operator == '') {
        nr1 = Number(nr1.toString().slice(0, -1));
        // nr2='';
        display.textContent = display.textContent.slice(0, -1)
    }
    else if (nr1 !== undefined && nr2 == undefined) {
        display.textContent = display.textContent.slice(0, -1)
        input = input.slice(0, -1);
    }
    else if (operator !== '' && input !== '') {
        input = input.slice(0, -1);
        display.textContent = display.textContent.slice(0, -1)
    }
    else {
        display.textContent = display.textContent.slice(0, -1)
        input = input.slice(0, -1);
        upperDisplay.textContent = upperDisplay.textContent.slice(0, -1)
    }
})
let plusMinus = document.querySelector('#plusminus');

let point = document.querySelector('#point');
point.addEventListener('click', () => {
    if (input.includes(".") || display.textContent.includes(".")) { }
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
})


// let equal = document.querySelector('.equal');
// equal.addEventListener('click', () => display.textContent += "=")
// let plusBtn = document.querySelector('.plus');
// plusBtn.addEventListener('click', () => display.textContent += "+")
// let minusBtn = document.querySelector('.minus');
// minusBtn.addEventListener('click', () => display.textContent += "-")
// let divideBtn = document.querySelector('.divide');
// divideBtn.addEventListener('click', () => display.textContent += "÷")
// let multiplyBtn = document.querySelector('.multiply');
// multiplyBtn.addEventListener('click', () => display.textContent += "×")
// let powerBtn = document.querySelector('.power');
// powerBtn.addEventListener('click', () => display.textContent += "^")

// let zero = document.querySelector('#zero');
// zero.addEventListener('click', () => {
//     display.textContent += "0";
//     nr1 += '0';
// })
// let one = document.querySelector('#one');
// one.addEventListener('click', () => {
//     if (display.textContent == '0')
//         display.textContent = "1";
//     else
//         display.textContent += "1"
//     nr1 += '1';
// })
// let two = document.querySelector('#two');
// two.addEventListener('click', () => {
//     if (display.textContent == '0')
//         display.textContent = "2";
//     else
//         display.textContent += "2";
//     nr1 += '2';
// })
// let three = document.querySelector('#three');
// three.addEventListener('click', () => {
//     if (display.textContent == '0')
//         display.textContent = "3";
//     else
//         display.textContent += "3"
//     nr1 += '3';
// })
// let four = document.querySelector('#four');
// four.addEventListener('click', () => {
//     if (display.textContent == '0')
//     display.textContent = "4";
// else
//     display.textContent += "4"
//     nr1 += '4';
// })
// let five = document.querySelector('#five');
// five.addEventListener('click', () => {
//     if (display.textContent == '0')
//     display.textContent = "5";
// else
//     display.textContent += "5"
//     nr1 += '5';
// })
// let six = document.querySelector('#six');
// six.addEventListener('click', () => {
//     if (display.textContent == '0')
//     display.textContent = "6";
// else
//     display.textContent += "6"
//     nr1 += '6';
// })
// let seven = document.querySelector('#seven');
// seven.addEventListener('click', () => {
//     if (display.textContent == '0')
//     display.textContent = "7";
// else
//     display.textContent += "7"
//     nr1 += '7';
// })
// let eight = document.querySelector('#eight');
// eight.addEventListener('click', () => {
//     if (display.textContent == '0')
//         display.textContent = "8";
//     else
//         display.textContent += "8"
//     nr1 += '8';
// })
// let nine = document.querySelector('#nine');
// nine.addEventListener('click', () => {
// //     if (display.textContent == '0')
// //     display.textContent = "9";
// // else
// //     display.textContent += "9"
//     nr1 += '9';
// })

//ex 5+3
//input - 5, apas pe + => nr1=5, input=0
//input - 9, apas pe = =>nr2=9, nr1=14, input=0,
//apas pe +, nr1=14, input=0
//input - 6,  apas pe = => nr2=, afisam result adica 6..


//ex 5+3
//input 5, apas pe + => display=5; upper=5+
//input 3 => sus ramane upper+5, jos ramane doar 3
// apas pe => sus nu ramane nimic, jos ramane 5+3=8


