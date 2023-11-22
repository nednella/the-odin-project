// JavaScript

const game = (() => {

    let gameBoard = Array(9).fill('?')
    /* 
        0 1 2
        3 4 5
        6 7 8
    */

    const resetGameBoard = () => gameBoard.forEach((element, index) => gameBoard[index] = '!')
    const setGameBoard = (i, sign) => gameBoard[i - 1] = sign
    const getGameBoard = (i) => gameBoard [i - 1]

    const checkWin = (sign) => {
        // TODO: Add check for win functionality
    }
    const checkDraw = (sign) => {
        // TODO: Add check for draw functionality
    }

    // TODO: Insert helper functions here

    return {
        resetGameBoard,
        setGameBoard,
        getGameBoard,
        checkWin,
        checkDraw,
    }
})()

const player = (sign, isCurrent) => {
    let playerSign = sign
    let currentPlayer = isCurrent

    const getSign = () => { return playerSign }
    const isCurrentPlayer = () => { return currentPlayer }
    const setCurrentPlayer = () => { return currentPlayer = true }
    const unsetCurrentPlayer = () => { return currentPlayer = false }

    return {
        getSign,
        isCurrentPlayer,
        setCurrentPlayer,
        unsetCurrentPlayer,
    }
} 

const controller = (() => {

    // Public Functions
    const newGame = () => {
        do {
            playRound()
        } while (!game.isGameOver())
    }
    const resetGame = () => {
        // TODO: Add reset functionality
    }

    // Private Variables
    const welcomeMsg = 'Welcome to JS Tic Tac Toe (Browser Console Version)'
    const playerX = player('X', false)
    const playerO = player('O', false)
    let currentSign = null

    // Private Functions
    const welcome = () => console.log(welcomeMsg)

    const playRound =() => {
        // TODO: Add play a round functionality
    }

    // TODO: Insert helper functions here

    return {
        newGame,
        resetGame,
    }
})()
