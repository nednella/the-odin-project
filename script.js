// JavaScript

// global variables
const DEFAULT_COLOUR = '#000000'
const BG_COLOUR = '#FFFFFF'
const DEFAULT_MODE = 'draw' 
const DEFAULT_SIZE = '16'

var currentColour = DEFAULT_COLOUR
var currentMode = DEFAULT_MODE              // default: 'draw' ----- options: 'grab', 'fill', 'shade', 'bright', 'erase';
var currentSize = DEFAULT_SIZE


// variable updaters and helper functions
function updateCurrentColour(newColour) {
    currentColour = newColour
    updateCurrentMode(DEFAULT_MODE)         // QOL: sets mode to default drawing mode if new colour picked whilst a different mode is active
}

function updateCurrentMode(newMode) {
    if (currentMode === newMode) {
        currentMode = DEFAULT_MODE
        toggleButton(currentMode)
    } else {
        currentMode = newMode
        toggleButton(currentMode)
    }
}

function updateCurrentSize(newSize) {
    currentSize = newSize
}


// DOM nodes
// titles
const gridSize = document.getElementById('gridSize')                    // complete
// selectors
const selectorColour = document.getElementById('colourSelector')        // complete
const selectorSize = document.getElementById('sizeSelector')            // complete
// modes
const btnGrab = document.getElementById('btn-grab')                     //
const btnFill = document.getElementById('btn-fill')                     //
const btnShade = document.getElementById('btn-shade')                   //
const btnBright = document.getElementById('btn-bright')                 //
const btnErase = document.getElementById('btn-erase')                   // complete
// misc
const btnGridlines = document.getElementById('btn-gridlines')           // complete
const btnReset = document.getElementById('btn-reset')                   // complete



// event handling
// selectors
selectorColour.oninput = (e) => updateCurrentColour(e.target.value)     // complete
selectorSize.onmousemove = (e) => updateGridSizeUI(e.target.value)      // complete
selectorSize.onchange = (e) => updateGrid(e.target.value)               // complete
// misc
btnGridlines.onclick = () => toggleGridlines()                          // complete
btnReset.onclick = () => resetGrid()                                    // complete - mousedown is more responsive for larger grids



// app functions
function createGrid(n) {
    grid.style.gridTemplateColumns = `repeat(${n},1fr)`
    grid.style.gridTemplateRows = `repeat(${n},1fr)`

    for (let i = 0; i < n * n; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('gridElement')
        gridElement.setAttribute('draggable', 'false')
        gridElement.addEventListener('mousedown', drawClick)
        gridElement.addEventListener('mouseenter', drawClick)
        grid.appendChild(gridElement)
    }
}

function wipeGrid() {
    grid.innerHTML = ''
}

function resetGrid() {
    wipeGrid()
    createGrid(currentSize)
}

function updateGrid(n) {
    wipeGrid()
    updateCurrentSize(n)
    createGrid(currentSize)
}

function updateGridSizeUI(n) {
    gridSize.innerHTML = `${n} x ${n}`
}

function toggleButton(currentMode) {
    btnGrab.classList.remove('active')
    btnFill.classList.remove('active')
    btnShade.classList.remove('active')
    btnBright.classList.remove('active')
    btnErase.classList.remove('active')
    
    if (currentMode === DEFAULT_MODE) return
    if (currentMode === 'grab') {
        btnGrab.classList.add('active')
    } else if (currentMode === 'fill') {
        btnFill.classList.add('active')
    } else if (currentMode === 'shade') {
        btnShade.classList.add('active')
    } else if (currentMode === 'bright') {
        btnBright.classList.add('active')
    } else if (currentMode === 'erase') {
        btnErase.classList.add('active')
    } 
}

function toggleGridlines() {   
    const gridElements = document.querySelectorAll('.gridElement')
    gridElements.forEach(e => e.classList.toggle('border-top-left'))
}

function drawClick(e) {
    if (e.buttons != 1) return
    e.preventDefault()                  // prevents 'not allowed' mouse symbol as result of a drag action from bugging out the drawing action

    if (currentMode === DEFAULT_MODE) {
        e.target.style.backgroundColor = currentColour
    } else if (currentMode === 'grab') {
        return
    } else if (currentMode === 'fill') {
        return
    } else if (currentMode === 'shade') {
        return
    } else if (currentMode === 'bright') {
        return
    } else if (currentMode === 'erase') {
        e.target.style.backgroundColor = ''
    } else return
}

window.onload = () => {
    createGrid(DEFAULT_SIZE)
}