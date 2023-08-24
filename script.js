// JavaScript

// Default values
const decimalPlaces = 10
let previousVal = ''
let currentVal = '0'
let sumVal = ''
let currentOperator = null
let currentError = null
let forceSum = false


// DOM node selectors
const themeToggle = document.getElementById('theme-toggle')
const page = document.querySelector('html')

const displayPrevious = document.querySelector('.display .previous')
const displayCurrent = document.querySelector('.display .current')
const displayError = document.querySelector('.display .error')

const keyBtns = document.querySelectorAll('button.key')
const operatorBtns = document.querySelectorAll('button.operator')
const modifierBtns = document.querySelectorAll('button.modifier')
const equalBtn = document.getElementById('equals')


// Event listeners
window.addEventListener('keydown', (e) => keyboardInput(e.key))

themeToggle.addEventListener('click', () => {
    if (page.getAttribute('data-theme') == 'dark') {
        page.setAttribute('data-theme', 'light')
    } else page.setAttribute('data-theme', 'dark')
})

keyBtns.forEach(key => key.addEventListener('click', () => appendKey(key.id)))
operatorBtns.forEach(operator => operator.addEventListener('click', () => setOperation(operator.id)))
modifierBtns.forEach(modifier => modifier.addEventListener('click', () => modifyDisplay(modifier.id)))

equalBtn.addEventListener('click', () => {
    forceSum = true
    controller()
})


// Program functions
function keyboardInput(key) {
    value = replaceValue(key)
    if ((value >= '0' && value <= '9') || value == '.') appendKey(value)
    else if (value == 'plus' || 
             value == 'minus' || 
             value == 'multiply' ||
             value == 'divide' ||
             value == 'percentage' ||
             value == 'power' ||
             value == 'factorial') setOperation(value)
    else if (value == 'equals') {
        console.log(value)
        forceSum = true
        controller()
    } else if (value == 'backspace' || value == 'clear') modifyDisplay(value)
    else return
}

function replaceValue(value) {
    if (value >= 0 && value <= 9) value = value.toString()
    else if (value == '.') return value
    else if (value == '+') value = 'plus'
    else if (value == '-') value = 'minus'
    else if (value == '*') value = 'multiply'
    else if (value == '/') value = 'divide'
    else if (value == '%') value = 'percentage'
    else if (value == '^') value = 'power'
    else if (value == '!') value = 'factorial'
    else if (value == 'Backspace') value = 'backspace'
    else if (value == 'Enter') value = 'equals'
    else if (value == 'Escape') value = 'clear'
    return value
}

function appendKey(value) {
    if (currentVal == sumVal) reset()
    if (checkLength(currentVal)) return
    if (value == '.' && currentVal.includes('.')) return
    if ((value == '.') || currentVal !== '0') {
        currentVal += value
    } else currentVal = value
    updateDisplay()
}

function setOperation(value) {
    // allows change of symbol before new value is entered
    if (previousVal !== '' && currentOperator !== null && currentVal == '0') {
        if (value == 'root' || value == 'factorial') return
        currentOperator = value
        updateDisplay()
        return
    }

    // calculate current sum before considering new operations
    if (currentOperator !== null) controller()

    // filter out invalid operations
    if (currentVal == 'Invalid Input' || currentVal == 'NaN' || currentVal == 'undefined') {
        updateDisplay()
        reset()
        return
    }
    currentOperator = value

    // forces sum calculation of root and factorial operators
    if (currentOperator == 'root' || currentOperator == 'factorial') {
        forceSum = true
        controller()
        return  
    } else {
    previousVal = currentVal
    currentVal = '0'
    updateDisplay()
    }
}

function modifyDisplay(value) {
    if (value == 'clear-entry') { 
        if (currentVal !== sumVal) {   // clears currentDisplay only, unless a sum has been produced via '=' (via forceSum)
            resetCurrentDisplay()
        } else clearDisplay()
    } else if (value == 'clear') {
        clearDisplay()
    } else if (value == 'backspace') {
        currentVal = currentVal.slice(0, -1)
        if (currentVal == '') {
            currentVal = '0'
        }
        updateDisplay()
    } else {
        currentVal = 'ERR'
        updateDisplay()
    }
}

function controller() {
    if (currentOperator == null) return forceSum = false

    // prints out full calculation along with the result if '=' is pressed
    if (forceSum == true) {
        sumVal = roundSum(compute(currentOperator, previousVal, currentVal), decimalPlaces).toString()
        updateDisplay()
        previousVal = ''
        currentVal = sumVal
        currentOperator = null
        forceSum = false
        return
    }

    // calculates current sum before considering new operations
    sumVal = roundSum(compute(currentOperator, previousVal, currentVal), decimalPlaces).toString()
    currentVal = sumVal
    sumVal = ''
    previousVal = ''
    currentOperator = null
}

function compute(operator, a, b) {
    a = parseFloat(a)
    b = parseFloat(b)

    switch(operator) {
        case 'percentage':
            return (a / 100) * b                    // 'a'% of 'b'

        case 'power':
            return Math.pow(a, b)

        case 'root':
            if (b < 0) {
                setError('root')
                return 'Invalid Input'              // rejects non-positive values
            }
            else return Math.sqrt(b)

        case 'factorial':
            if (b < 0 || !Number.isInteger(b)) {
                setError('factorial')
                return 'Invalid Input'              // only accepts positive integers
            }
            else return factorial(b)

        case 'divide':
            if (b == 0) {
                setError('divide')
                return 'Invalid Input'              // rejects divison by 0
            } else return a / b

        case 'multiply':
            return a * b

        case 'plus':
            return a + b

        case 'minus':
            return a - b

        default:
            return
    }
}

function factorial(b) {
    let result = 1
    for (let i = 2; i <= b; i++) {
        result = (result * i)
    }
    return result
}

function getSymbol(operator) {
    switch (operator) {
        case 'percentage':
            return '%'

        case 'power':
            return '^'

        case 'root':
            return '√'

        case 'factorial':
            return '!'

        case 'divide':
            return '÷'

        case 'multiply':
            return '×'

        case 'plus':
            return '+'

        case 'minus':
            return '-'
    }
}

function updateDisplay() {
    
    console.log("current operator: " + currentOperator)
    console.log("prev: " + previousVal)
    console.log("curr: " + currentVal)
    console.log("sum: " + sumVal)
    console.log("error: " + currentError)
    console.log("------------------------")
    
    // displays currentError
    if (currentError !== null) {
        displayError.textContent = currentError
        currentError = null
    } else displayError.textContent = ''
    
    // prints out full calculation along with the result if 'forceSum' is true
    if (forceSum == true) {
        switch(currentOperator) {
            case 'percentage':
                displayPrevious.textContent = `${previousVal}${getSymbol(currentOperator)} ${getSymbol('multiply')} ${currentVal} =`
                displayCurrent.textContent = tidyDisplay(sumVal)
                break

            case 'root':
                displayPrevious.textContent = `${getSymbol(currentOperator)}${currentVal} =`
                displayCurrent.textContent = tidyDisplay(sumVal)
                break

            case 'factorial':
                displayPrevious.textContent = `${currentVal}${getSymbol(currentOperator)} =`
                displayCurrent.textContent = tidyDisplay(sumVal)
                break
            
            default:
                displayPrevious.textContent = `${previousVal} ${getSymbol(currentOperator)} ${currentVal} =`
                displayCurrent.textContent = tidyDisplay(sumVal)
        }
        return // force a return so that the below code does not execute and overwrite any printed results
    }

    // displays continuation of calculation if additional operators are selected and forceSum = false
    if (currentOperator !== null) {
        switch(currentOperator) {
            case 'percentage':
                displayPrevious.textContent = `${previousVal}${getSymbol(currentOperator)} ${getSymbol('multiply')}`
                break

            default:
                displayPrevious.textContent = `${previousVal} ${getSymbol(currentOperator)}`
                break
        }
    } else displayPrevious.textContent = previousVal

    // displays currentVal
    displayCurrent.textContent = tidyDisplay(currentVal)
}

function tidyDisplay(value) {
    if (value == 'Invalid Input' || value == 'NaN' || value == 'undefined') return value    // do not manipulate invalid inputs

    let displayString = value.split('e')[0]
    let scientificString = value.split('e')[1]

    let integerString = displayString.split('.')[0]
    let decimalString = displayString.split('.')[1]
    
    integerString = parseFloat(integerString).toLocaleString('en', {notation: "standard"})
    if (decimalString !== undefined) decimalString = decimalString.slice(0, decimalPlaces)  // only slices scientific notation as decimals are already rounded via roundSum()

    if (decimalString !== undefined && scientificString !== undefined) {
        return `${integerString}.${decimalString}e${scientificString}`
    } else if (decimalString !== undefined) {
        return `${integerString}.${decimalString}`
    } else return integerString
}

function clearDisplay() {
    previousVal = ''
    currentVal = '0'
    sumVal = ''
    currentOperator = null
    forceSum = false
    updateDisplay()
}

function resetCurrentDisplay() {
    currentVal = '0'
    updateDisplay()
}

function reset() {
    previousVal = ''
    currentVal = '0'
    sumVal = ''
    currentOperator = null
    forceSum = false
}

function checkLength(currentVal) {
    if (currentVal.includes('.')) {
        integerString = currentVal.split('.')[0]
        decimalString = currentVal.split('.')[1]
        currentVal = integerString + decimalString
    }
    if (currentVal.length >= 16) return true
}

function roundSum(n, decimalPlaces) {
    if (isNaN(n)) return n
    else return Math.round(n * Math.pow(10, decimalPlaces))/(Math.pow(10, decimalPlaces))
}

function setError(value) {
    switch (value) {
        case 'root':
            currentError = 'Root value must be positive'
            return

        case 'factorial':
            currentError = 'Factorial value must be a positive integer'
            return

        case 'divide':
            currentError = 'Cannot divide by zero'
            return
    }
}
