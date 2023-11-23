// JavaScript

const game = (() => {
    let gameBoard = Array(9).fill(undefined)

    const resetGameBoard = () => gameBoard.forEach((element, index) => gameBoard[index] = undefined)
    const setGameBoard = (i, sign) => gameBoard[i] = sign
    const getGameBoard = () => gameBoard
    const getGameBoardAtIndex = (i) => gameBoard[i]
    const displayGameBoard = () => {
        let tmp = ''
        tmp += (' ' + '\n')
        tmp += (' ' + (gameBoard[0] || '0 ') + ' | ' + (gameBoard[1] || ' 1 ') + ' | ' + (gameBoard[2] || ' 2 ') + '\n')
        tmp += ('---------------' + '\n')
        tmp += (' ' + (gameBoard[3] || '3 ') + ' | ' + (gameBoard[4] || ' 4 ') + ' | ' + (gameBoard[5] || ' 5 ') + '\n')
        tmp += ('---------------'  + '\n')
        tmp += (' ' + (gameBoard[6] || '6 ') + ' | ' + (gameBoard[7] || ' 7 ') + ' | ' + (gameBoard[8] || ' 8 ') + '\n')
        tmp += (' ')
        console.log(tmp)
    }

    return {
        resetGameBoard,
        setGameBoard,
        getGameBoard,
        getGameBoardAtIndex,
        displayGameBoard,
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

const ttt = (() => {
    console.log('%cTo play a game, type "ttt.newGame()"', 'font-size: x-large')
    
    const playerX = player('💚', false)
    const playerO = player('❤️', false)
    let currentPlayer, currentRound, isGameOver, gameResult

    const newGame = () => {
        console.log('%cWelcome to JS Tic Tac Toe (Browser Console Version)', 'font-size: x-large')
        game.displayGameBoard()
        currentRound = 0
        do {
            playRound()
        } while (!isGameOver)
        gameOver()
    }
    const resetGame = () => {
        currentPlayer = ''
        isGameOver  = ''
        gameResult = ''
        game.resetGameBoard()
        playerX.unsetCurrentPlayer()
        playerO.unsetCurrentPlayer()
    }

    const playRound = () => {
        gameLogic.newTurn()
        gameLogic.handleMove()
        gameLogic.checkBoard()
        game.displayGameBoard()
        console.log(currentRound)
    }
    const gameOver = () => {
        console.log(`%cGame Over...`, 'font-size: x-large')
         if (gameResult == 'win') {
            console.log(`%c${currentPlayer} Wins!`, 'font-size: x-large')
        } else if (gameResult == 'tie') {
            console.log(`%cIt's a Tie!`, 'font-size: x-large')
        } else console.log(`Game has been cancelled.`, 'font-size: x-large')
        resetGame()
    }

    const gameLogic = (() => {
        const newTurn = () => {
            if (currentRound == 0) {
                playerX.setCurrentPlayer()
                // TODO: Add logic to alternate currentPlayer for 1st round based on previous winner
            }

            if (playerX.isCurrentPlayer()) { playerX.unsetCurrentPlayer(), playerO.setCurrentPlayer() } 
            else { playerO.unsetCurrentPlayer(), playerX.setCurrentPlayer() }
            setPlayer()
        }

        const handleMove = () => {
            do {
                move = window.prompt(`Enter where you'd like to place your marker (0 - 8) [type "C" to exit]`)
                if ( move == 'C') {
                    helperFns.setGameStatus('exit')
                    break
                }
            } while (game.getGameBoardAtIndex(move) !== undefined)
            game.setGameBoard(move, currentPlayer)
        }

        const checkBoard = () => {
            currentRound++
            if (helperFns.checkWin(currentPlayer)) helperFns.setGameStatus('win')
            else if (currentRound == 9) helperFns.setGameStatus('tie')
        }

        const helperFns = (() => {
            const checkWin = (sign) => {
                gameBoard = game.getGameBoard()
                return false
                    // Rows
                    || (gameBoard[0] == sign && gameBoard[1] == sign && gameBoard[2] == sign)
                    || (gameBoard[3] == sign && gameBoard[4] == sign && gameBoard[5] == sign)
                    || (gameBoard[6] == sign && gameBoard[7] == sign && gameBoard[8] == sign)
                    // Columns
                    || (gameBoard[0] == sign && gameBoard[3] == sign && gameBoard[6] == sign)
                    || (gameBoard[1] == sign && gameBoard[4] == sign && gameBoard[7] == sign)
                    || (gameBoard[2] == sign && gameBoard[5] == sign && gameBoard[8] == sign)
                    // Diagonals
                    || (gameBoard[0] == sign && gameBoard[4] == sign && gameBoard[8] == sign)
                    || (gameBoard[2] == sign && gameBoard[4] == sign && gameBoard[6] == sign)
            }
    
            const setPlayer = () => {
                if (playerX.isCurrentPlayer()) currentPlayer = playerX.getSign()
                else  currentPlayer = playerO.getSign()
            }
    
            const setGameStatus = (result) => {
                gameResult = result
                setGameOver()  
            }
    
            const setGameOver = () => {
                return isGameOver = true
            }

            return {
                checkWin,
                setPlayer,
                setGameStatus
            }
        })()

        return {
            newTurn,
            handleMove,
            checkBoard,
        }

    })()

    return {
        newGame,
        resetGame,
    }
})()
