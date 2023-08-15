// JavaScript

const display_output = document.querySelector('.display .output')
const display_input = document.querySelector('.display .input')

const keys = document.querySelectorAll('button.key')                // partial complete
const operators = document.querySelectorAll('button.operator')      //
const modifiers = document.querySelectorAll('button.modifier')      // partial complete
const period = document.getElementById('period')                    //
const equal = document.getElementById('equals')                     //

let result = ''
let input = '0'


keys.forEach(key => { // output value must be formatted to include ,'s
    const value = key.id
    key.addEventListener('click', () => {
        if (input === '0') {
            input = value
        } else {
            input += value
        }
        display_input.innerHTML = input
    })
})


operators.forEach(operator => {
    const value = operator.id
    operator.addEventListener('click', () => {
        if (value === '') {
            return
        }
    })
})


modifiers.forEach(modifier => {
    const value = modifier.id
    modifier.addEventListener('click', () => {

        if (value === 'clear-entry') { // need to add smart behaviour to this. if already pressed 
            // an operator and typing in additional value, then clear-entry should only remove 
            // the current input and reset to 0, otherwise it acts the same as clear

            // e.g., if input is currently displaying the result, wipe all, else, wipe input only
            input = ''
            display_output.innerHTML = ''
            display_input.innerHTML = '0'


        } else if (value === 'clear') {
            input = ''
            display_output.innerHTML = ''
            display_input.innerHTML = '0'

        } else if (value === 'backspace') {
            input = input.slice(0, -1)
            display_input.innerHTML = input
            if(display_input.innerHTML === '') {
                display_input.innerHTML = '0'
            }
        } else {
            return
        }
    })
})

function add(a, b) {
    return a + b
}
function subtract(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    return a / b
}
function percent(a) {
    return 
}
function power(a, b) {
    return Math.pow(a, b)
}
function root(a) { // a must be a non-negative value
    return Math.sqrt(a)
}
function factorial(a) { // a must be an integer
    return Math.factorial(a)
}


function calculate(operator, a, b) {
    a = Number(a)
    b = Number(b)

    switch(operator) {
        case '':
    }
}