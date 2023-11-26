// JavaScript

const game = (() => {
    let gameBoard = Array(9).fill(undefined)

    const resetGameBoard = () => gameBoard.forEach((element, index) => gameBoard[index] = undefined)
    const setGameBoard = (i, sign) => gameBoard[i - 1] = sign
    const getGameBoard = () => gameBoard
    const getGameBoardAtIndex = (i) => gameBoard[i - 1]
    const getGameBoardEmptyFields = () => {
        let emptyFields = []

        gameBoard.forEach((element, index) => {
            if (element == undefined) {
                emptyFields.push(index + 1)
            }
        })

        return emptyFields
    }
    const displayGameBoard = () => {
        let tmp = ''
        tmp += (' ' + '\n')
        tmp += (' ' + (gameBoard[0] || '1 ') + ' | ' + (gameBoard[1] || ' 2 ') + ' | ' + (gameBoard[2] || ' 3 ') + '\n')
        tmp += ('---------------' + '\n')
        tmp += (' ' + (gameBoard[3] || '4 ') + ' | ' + (gameBoard[4] || ' 5 ') + ' | ' + (gameBoard[5] || ' 6 ') + '\n')
        tmp += ('---------------'  + '\n')
        tmp += (' ' + (gameBoard[6] || '7 ') + ' | ' + (gameBoard[7] || ' 8 ') + ' | ' + (gameBoard[8] || ' 9 ') + '\n')
        tmp += (' ')
        console.log(tmp)
    }

    return {
        resetGameBoard,
        setGameBoard,
        getGameBoard,
        getGameBoardAtIndex,
        getGameBoardEmptyFields,
        displayGameBoard,
    }
})()

const player = (sign, icon, isCurrent, isHuman, aiMode) => {
    let player_Name = `Player ${sign}`
    let player_Sign = icon
    let player_isCurrent = isCurrent
    let player_isHuman = isHuman
    let ai_difficulty = aiMode

    const getPlayerName = () => { return player_Name }
    const getPlayerSign = () => { return player_Sign }
    const isPlayerCurrent = () => { return player_isCurrent }
    const setPlayerCurrent = () => { return player_isCurrent = true }
    const unsetPlayerCurrent = () => { return player_isCurrent = false }
    const isPlayerHuman = () => { return player_isHuman }
    const isAiDifficulty = () => { return ai_difficulty }

    return {
        name: getPlayerName,
        sign: getPlayerSign,
        isCurrent: isPlayerCurrent,
        setCurrent: setPlayerCurrent,
        unsetCurrent: unsetPlayerCurrent,
        isHuman: isPlayerHuman,
        difficulty: isAiDifficulty,
    }
}

const aiLogic = (() => {

    const findMove = (currentPlayer) => {
        // TODO: handle call to return a move for the AI

        if (!currentPlayer && currentPlayer.isHuman()) return // function call failsafe

        // Initialise Variables
        let aiMode = currentPlayer.difficulty()
        let precision = setPrecision(aiMode)
        let gameBoard = game.getGameBoard()
        let possibleMoves = game.getGameBoardEmptyFields()
        
        move = bestMove(precision, gameBoard, possibleMoves)
        return move
    }

    const bestMove = (precision, gameBoard, possibleMoves) => {
        // TODO: Add AI logic for finding the best possible move
        console.log("precision" + precision)
        console.log('gameBoard' + gameBoard)
        console.log('possibleMoves' + possibleMoves)


        return move
    }

    const setPrecision = (mode) => {
        switch(mode) {
            case 'easy':
                val = '0'
                break

            case 'hard':
                val = '0.5'
                break

            case 'impossible':
                val = '0.75'
                break
        }
        return val
    }

    return {
        findMove,
    }
})()

const defaultConfig = (() => {
    const playerX = player('X', '❤️', false, true, )
    const playerO = player('O', '💚', false, false, 'easy')
    return {
        playerX,
        playerO,
    }
})()

const ttt = (() => {
    console.log('%cTo play a game, type "ttt.newGame()"', 'font-size: x-large')

    const playerX = defaultConfig.playerX
    const playerO = defaultConfig.playerO
    let currentPlayer, currentRound, isGameOver, gameStatus

    const newGame = () => {
        console.clear()
        console.log('%cWelcome to JS Tic Tac Toe (Browser Console Version)', 'font-size: x-large')
        game.displayGameBoard()
        currentRound = 0
        do {
            currentRound++
            playRound()
        } while (!isGameOver)
        gameOver()
    }

    const resetGame = () => {
        currentPlayer = ''
        isGameOver  = ''
        gameStatus = ''
        game.resetGameBoard()
        playerX.unsetCurrent()
        playerO.unsetCurrent()
    }

    const playRound = () => {
        gameLogic.newTurn()
        gameLogic.handleMove()
        gameLogic.checkBoard()
        if (gameStatus !== 'quit') {
            console.log('%cCurrent Round: ' + currentRound, 'font-weight: bold')
            game.displayGameBoard()    
        }
    }

    const gameOver = () => {
        console.log(`%cGame Over...`, 'font-size: x-large')
         if (gameStatus == 'win') {
            console.log(`%c${currentPlayer.name()} (${currentPlayer.sign()}) Wins!`, 'font-size: x-large')
        } else if (gameStatus == 'tie') {
            console.log(`%cIt's a Tie!`, 'font-size: x-large')
        } else console.log(`%cGame has been cancelled.`, 'font-size: x-large')
        resetGame()
    }

    const gameLogic = (() => {
        const newTurn = () => {
            if (currentRound == 0) {
                playerX.setCurrent()
            }
            if (playerX.isCurrent()) { playerX.unsetCurrent(), playerO.setCurrent() } 
            else { playerO.unsetCurrent(), playerX.setCurrent() }
            helperFns.setPlayer()
        }

        const handleMove = () => {
            if (currentPlayer.isHuman()) {
                do {
                    move = window.prompt(`Enter where you'd like to place your marker (1 - 9) ["C" to Quit]`)
                    if ( move == 'C') {
                        helperFns.setGameStatus('quit')
                        break
                    }
                } while (game.getGameBoardAtIndex(move) !== undefined)       
            } else {
                console.log(`currentPlayer (${currentPlayer.name()}) is not Human`)
                // TODO: Add CPU player functionality
                move = aiLogic.findMove(currentPlayer)
            }
            
            game.setGameBoard(move, currentPlayer.sign())
        }

        const checkBoard = () => {
            if (helperFns.checkWin(currentPlayer.sign())) helperFns.setGameStatus('win')
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
                if (playerX.isCurrent()) currentPlayer = playerX
                else  currentPlayer = playerO
            }
    
            const setGameStatus = (result) => {
                gameStatus = result
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
