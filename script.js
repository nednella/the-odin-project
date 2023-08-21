// JavaScript

// Default values
let previousVal = ''
let currentVal = '0'
let sumVal = ''
let currentOperator = null
let currentError = null
let forceSum = false

// DOM nodes
const themeBtn = document.getElementById('theme')                       // complete
const page = document.querySelector('html')                             // complete

const displayPrevious = document.querySelector('.display .previous')    // complete
const displayCurrent = document.querySelector('.display .current')      // complete
const displayError = document.querySelector('.display .error')          // complete

const keyBtns = document.querySelectorAll('button.key')                 // complete
const operatorBtns = document.querySelectorAll('button.operator')       // complete
const modifierBtns = document.querySelectorAll('button.modifier')       // complete
const equalBtn = document.getElementById('equals')                      // complete

// Event listeners
themeBtn.addEventListener('click', () => {
    if (page.getAttribute('data-theme') == 'dark') {
        page.setAttribute('data-theme', 'light')
    } else page.setAttribute('data-theme', 'dark')
    
})

keyBtns.forEach(key => { 
    const value = key.id
    key.addEventListener('click', () => appendKey(value))
})

operatorBtns.forEach(operator => {
    const value = operator.id
    operator.addEventListener('click', () => setOperation(value))
})

modifierBtns.forEach(modifier => {
    const value = modifier.id
    modifier.addEventListener('click', () => modifyDisplay(value))
})

equalBtn.addEventListener('click', () => {
    forceSum = true
    controller()
})


// Program functions
function appendKey(value) {
    if (value == '.' && currentVal.includes('.')) return
    if (sumVal !== '') {            // enables fresh calculation if sum has been produced via '=' (via forceSum)
        currentVal = value
        sumVal = ''
    } else if ((value == '.' && currentVal == '0') || currentVal !== '0') {
        currentVal += value
    } else currentVal = value
    updateDisplay()
}

function modifyDisplay(value) {
    if (value == 'clear-entry') { 
        if (previousVal !== '') {   // clears currentDisplay only, unless a result has been printed (previousVal == '')
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

function setOperation(value) {
    // allows change of symbol before new value is entered
    if (previousVal !== '' && currentOperator !== null && currentVal == '0') {
        if (value == 'root' || value == 'factorial') return
        currentOperator = value
        updateDisplay()
        return
    }

    // prevents operator being set before any value is entered   TODO: not needed if value is default '0', as calculations can be performed with 0
    if (currentVal == '') return

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

function controller() {
    // prevents any abuse and/or updateDisplay() bugs
    if (currentVal == '' || currentOperator == null) return forceSum = false

    // prints out full calculation along with the result if '=' is pressed
    if (forceSum == true) {
        sumVal = compute(currentOperator, previousVal, currentVal)
        updateDisplay()
        previousVal = ''
        currentVal = sumVal
        currentOperator = null
        forceSum = false
        return
    }

    // calculates current sum before considering new operations
    sumVal = compute(currentOperator, previousVal, currentVal)
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
    
    //TODO: add tidyDisplay() function to 'previousVal' outputs and limit the number of values + decimals
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
        return // force a return so that the below code does not execute and re-write any printed results
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

function reset() {
    previousVal = ''
    currentVal = '0'
    sumVal = ''
    currentOperator = null
    forceSum = false
}

function tidyDisplay(value) {
    if (value == 'Invalid Input' || value == 'NaN' || value == 'undefined') return value    // do not manipulate invalid inputs
    let displayString = value.toString()
    let integerString = displayString.split('.')[0]
    let decimalString = displayString.split('.')[1]

    let integerNum = parseFloat(integerString)
    integerString = integerNum.toLocaleString('en', {notation: "standard"}).toString()

    // display hard limit of 10 decimal places (does not limit the stored value)
    if (decimalString !== undefined) {
        decimalString = decimalString.substring(0, 10)   
    }

    if (decimalString !== undefined) {
        return `${integerString}.${decimalString}`
    } else return integerString
}
