// JavaScript

const game = (() => {

    let gameBoard = Array(9).fill(undefined)
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

    const resetGameBoard = () => gameBoard.forEach((element, index) => gameBoard[index] = undefined)
    const setGameBoard = (i, sign) => gameBoard[i] = sign
    const getGameBoard = () => gameBoard
    const getGameBoardAtIndex = (i) => gameBoard[i]

    return {
        displayGameBoard,
        resetGameBoard,
        setGameBoard,
        getGameBoard,
        getGameBoardAtIndex,
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

    const playerX = player('X', false)
    const playerO = player('O', false)
    let currentSign
    let isGameOver
    let gameResult

    const newGame = () => {
        welcome()
        do {
            playRound()
        } while (!isGameOver)
        gameOver()
    }
    const resetGame = () => {
        currentSign = ''
        isGameOver  = ''
        gameResult = ''
        game.resetGameBoard()
    }

    const welcomeMsg = 'Welcome to JS Tic Tac Toe (Browser Console Version)' // Temporary for Console Version
    const welcome = () => console.log(welcomeMsg) // Temporary for Console Version

    const playRound = () => {
        game.displayGameBoard()
        gameLogic.newTurn()
        gameLogic.promptMove()
        gameLogic.handleMove()
        checkBoard.checkWin(currentSign)
        checkBoard.checkDraw()
    }
    const gameOver = () => {
        game.displayGameBoard()
        let tmp = `Game Over! `
        if (gameResult == 'Win') {
            tmp += `${currentSign} Wins.`
        } else {
            tmp += `It's a Tie.`
        }
        console.log(tmp)
    }

    const gameLogic = (() => {
        const newTurn = () => {
            if (playerX.isCurrentPlayer() == false && playerO.isCurrentPlayer() == false) {
                playerX.setCurrentPlayer() 
            } else if (playerX.isCurrentPlayer() == true && playerO.isCurrentPlayer() == false) {
                playerX.unsetCurrentPlayer()
                playerO.setCurrentPlayer()
            } else {
                playerO.unsetCurrentPlayer()
                playerX.setCurrentPlayer()
            }
            setPlayer()
        }
        const promptMove = () => { // Temporary for Console Version
            do {
                move = window.prompt("Enter the cell you'd like to place your marker (1 - 9)")
            } while (game.getGameBoardAtIndex(move) !== undefined)
        }
        const handleMove = () => {
            game.setGameBoard(move, currentSign)
        }
        const setPlayer = () => {
            if (playerX.isCurrentPlayer()) currentSign = playerX.getSign()
            else if (playerO.isCurrentPlayer()) currentSign = playerO.getSign()
            else currentSign = null
        }
        return {
            newTurn,
            promptMove,
            handleMove
        }
    })()

    const checkBoard = (() => {
        const checkWin = (sign) => {
            gameBoard = game.getGameBoard()
            if (checkRows(gameBoard, sign) || checkColumns(gameBoard, sign) || checkDiagonals(gameBoard, sign)) {
                gameResult = 'Win'
                isGameOver = true
            }
        }
        const checkDraw = () => {
            gameBoard = game.getGameBoard()
            if (gameBoard.every(cell => cell !== '?')) {
                gameResult = 'Tie'
                isGameOver = true
            }
        }
        const checkRows = (board, sign) => {
            gameBoard = board
            if (gameBoard[0] == sign && gameBoard[1] == sign && gameBoard[2] == sign
                || gameBoard[3] == sign && gameBoard[4] == sign && gameBoard[5] == sign
                || gameBoard[6] == sign && gameBoard[7] == sign && gameBoard[8] == sign)
            return true
            else return false
        }
        const checkColumns = (board, sign) => {
            gameBoard = board
            if (gameBoard[0] == sign && gameBoard[3] == sign && gameBoard[6] == sign
                || gameBoard[1] == sign && gameBoard[4] == sign && gameBoard[7] == sign
                || gameBoard[2] == sign && gameBoard[5] == sign && gameBoard[8] == sign)
            return true
            else return false
        }
        const checkDiagonals = (board, sign) => {
            gameBoard = board
            if (gameBoard[0] == sign && gameBoard[4] == sign && gameBoard[8] == sign
                || gameBoard[2] == sign && gameBoard[4] == sign && gameBoard[6] == sign) 
            return true
            else return false
        }
        return {
            checkWin,
            checkDraw,
        }
    })()

    return {
        newGame,
        resetGame,
    }
})()
