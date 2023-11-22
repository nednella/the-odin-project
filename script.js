// JavaScript

const game = (() => {

    let gameBoard = Array(9).fill('?')
    /* 
        0 1 2
        3 4 5
        6 7 8
    */

    const displayGameBoard = () => { // Temporary for Console Version
        tmp = "";

        // First row
        tmp += gameBoard[0] == "" ? "  " : ` ${gameBoard[0]}`;
        tmp += "|";
        tmp += gameBoard[1] == "" ? " " : `${gameBoard[1]}`;
        tmp += "|";
        tmp += gameBoard[2] == "" ? "  \n" : `${gameBoard[2]}\n`;

        // Filler
        tmp += "--|-|--\n";

        // Second row
        tmp += gameBoard[3] == "" ? "  " : ` ${gameBoard[3]}`;
        tmp += "|";
        tmp += gameBoard[4] == "" ? " " : `${gameBoard[4]}`;
        tmp += "|";
        tmp += gameBoard[5] == "" ? "  \n" : `${gameBoard[5]}\n`;

        // Filler
        tmp += "--|-|--\n";

        // Third row
        tmp += gameBoard[6] == "" ? "  " : ` ${gameBoard[6]}`;
        tmp += "|";
        tmp += gameBoard[7] == "" ? " " : `${gameBoard[7]}`;
        tmp += "|";
        tmp += gameBoard[8] == "" ? "  \n" : `${gameBoard[8]}\n`;

        console.log( "" );
        console.log( tmp );
        console.log( "" );
    }

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
        displayGameBoard,
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
