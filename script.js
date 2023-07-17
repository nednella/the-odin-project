// JavaScript

// global variables
const DEFAULT_COLOUR = '#000000'
const DEFAULT_MODE = 'colour' //colour, grab, fill, shade, bright, erase
const DEFAULT_SIZE = '16'


// variable updaters
var currentColour = DEFAULT_COLOUR
function updateCurrentColour(newColour) {
    currentColour = newColour
}

var currentMode = DEFAULT_MODE
function updateCurrentMode(newMode) {
    currentMode = newMode
}

var currentSize = DEFAULT_SIZE
function updateCurrentSize(newSize) {
    currentSize = newSize
}


// DOM nodes
// selectors
const selectorColour = document.getElementById('colourSelector')        // complete
const selectorSize = document.getElementById('sizeSelector')            // 

// modes
const colourGrab = document.getElementById('btn-grab')                  // 
const colourFill = document.getElementById('btn-fill')                  // 
const togglePaint = document.getElementById('btn-colour')               // 
const toggleShader = document.getElementById('btn-shader')              // 
const toggleBrighten = document.getElementById('btn-brighten')          // 
const toggleEraser = document.getElementById('btn-eraser')              // 

// misc
const toggleGridlines = document.getElementById('btn-gridlines')        // 
const reset = document.getElementById('btn-reset')                      // complete


// event handling
selectorColour.oninput = (e) => updateCurrentColour(e.target.value)
reset.onclick = () => resetGrid()





// app functions
function createGrid(n) {
    grid.style.gridTemplateColumns = `repeat(${n},1fr)`
    grid.style.gridTemplateRows = `repeat(${n},1fr)`

    for (let i = 0; i < n * n; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('gridElement')
        gridElement.setAttribute('draggable', 'false')
        gridElement.addEventListener('mousedown', changeColour)
        gridElement.addEventListener('mouseover', changeColour)
        grid.appendChild(gridElement)
    }
}

function changeColour(e) {
    e.target.style.backgroundColor = currentColour
}

function resetGrid() {
    grid.innerHTML = ''
    createGrid(currentSize)
}

window.onload = () => createGrid(DEFAULT_SIZE)