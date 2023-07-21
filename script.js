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

function splitRgb(rgb) {
    rgb = rgb.replace(/^\D+|\D+$/g, "")     // replaces "rgb(X, Y, Z)" with "X, Y, Z"
    rgb = rgb.split(",")                    // turns "X, Y, Z" into an array of [X, Y, Z]
    return rgb 
}

function rgbToHEX(rgb) {
    rgb = splitRgb(rgb)                     // requires variable 'rgb' to be an array
    return "#" + (1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16).slice(1)
}

function elementAdjust(rgb, adjustConstant) {
    rgb[0] = (parseInt(rgb[0]) + adjustConstant)
    rgb[1] = (parseInt(rgb[1]) + adjustConstant)
    rgb[2] = (parseInt(rgb[2]) + adjustConstant)
    rgb = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    return rgb
}



// DOM nodes
// titles
const gridSize = document.getElementById('gridSize')
// selectors
const selectorColour = document.getElementById('colourSelector')
const selectorSize = document.getElementById('sizeSelector')
// modes
const btnGrab = document.getElementById('btn-grab')
const btnFill = document.getElementById('btn-fill')
const btnShade = document.getElementById('btn-shade')
const btnBright = document.getElementById('btn-bright')
const btnErase = document.getElementById('btn-erase')
// misc
const btnGridlines = document.getElementById('btn-gridlines')
const btnReset = document.getElementById('btn-reset')



// event handling
// selectors
selectorColour.oninput = (e) => updateCurrentColour(e.target.value)
selectorSize.onmousemove = (e) => updateGridSizeUI(e.target.value)
selectorSize.onchange = (e) => updateGrid(e.target.value)
// modes
btnGrab.onclick = (e) => updateCurrentMode(btnGrab.value)
btnFill.onclick = (e) => updateCurrentMode(btnFill.value)
btnShade.onclick = (e) => updateCurrentMode(btnShade.value)
btnBright.onclick = (e) => updateCurrentMode(btnBright.value)
btnErase.onclick = (e) => updateCurrentMode(btnErase.value)
// misc
btnGridlines.onclick = () => toggleGridlines()
btnReset.onclick = () => resetGrid()



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
        if (e.target.style.backgroundColor === '') {    // ensures a colour is grabbed when cell is blank
            updateCurrentColour(BG_COLOUR)
            selectorColour.value = currentColour
        } else {
            updateCurrentColour(e.target.style.backgroundColor)
            selectorColour.value = rgbToHEX(currentColour)    
        }
        updateCurrentMode(DEFAULT_MODE)
    } else if (currentMode === 'fill') {
        const gridElements = document.querySelectorAll('.gridElement')
        gridElements.forEach(e => e.style.backgroundColor = currentColour)
        updateCurrentMode(DEFAULT_MODE)
    } else if (currentMode === 'shade') {
        if (e.target.style.backgroundColor === 'rgb(0, 0, 0)') return
        else if (e.target.style.backgroundColor === '') {
            e.target.style.backgroundColor = BG_COLOUR     
        }
        adjustConstant = -25    // negative adjust to darken
        adjustedColour = elementAdjust(splitRgb(e.target.style.backgroundColor), adjustConstant)
        e.target.style.backgroundColor = adjustedColour
    } else if (currentMode === 'bright') {
        if (e.target.style.backgroundColor === 'rgb(255, 255, 255)' || e.target.style.backgroundColor === '') return
        adjustConstant = 25     // positive adjust to brighten
        adjustedColour = elementAdjust(splitRgb(e.target.style.backgroundColor), adjustConstant)
        e.target.style.backgroundColor = adjustedColour
    } else if (currentMode === 'erase') {
        e.target.style.backgroundColor = ''
    } else return
}

window.onload = () => {
    createGrid(DEFAULT_SIZE)
}
