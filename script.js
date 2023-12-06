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
    const checkGameBoard = (sign) => {
        if (checkWin(sign)) return 'win'
        else if (checkTie()) return 'tie'
        else return null
    }
    const checkWin = (sign) => {
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
    const checkTie = () => {
        return !gameBoard.includes(undefined)
    }

    return {
        resetGameBoard,
        setGameBoard,
        getGameBoard,
        getGameBoardAtIndex,
        getGameBoardEmptyFields,
        checkGameBoard,
    }
})()

const player = (sign, icon, isHuman, aiMode) => {
    let player_Name = `Player ${sign}`
    let player_Sign = icon
    let player_isHuman = isHuman
    let ai_difficulty = aiMode

    const getPlayerName = () => { return player_Name }
    const getPlayerSign = () => { return player_Sign }
    const isPlayerHuman = () => { return player_isHuman }
    const getAiDifficulty = () => { return ai_difficulty }

    return {
        name: getPlayerName,
        sign: getPlayerSign,
        isHuman: isPlayerHuman,
        difficulty: getAiDifficulty,
    }
}

const defaultConfig = (() => {
    const playerX = player('X', '❤️', true, )
    const playerO = player('O', '💚', true, )

    return {
        playerX,
        playerO,
    }
})()

const gameController = (() => {
    const playerX = defaultConfig.playerX,
          playerO = defaultConfig.playerO
    
    let currentPlayer, opponentPlayer, currentRound, isGameOver, gameStatus
        
    const resetGame = () => {
        currentPlayer = playerX
        opponentPlayer = playerO

        currentRound = 0
        isGameOver = false
        gameStatus = ''

        game.resetGameBoard()
        displayController.renderGameMessage(`It's ${currentPlayer.name()}'s turn...`)
    }

    const play = (pos) => {
        if (!isGameOver) {
            validMove = gameLogic.checkValidMove(pos)
            if (validMove) {
                gameLogic.playRound(pos)
            }
        }
        if (!isGameOver && !opponentPlayer.isHuman()) {
            setTimeout(() => {
                gameLogic.playRound()
            }, 300)   
        }
    }

    const gameLogic = (() => {
        const checkValidMove = (move) => {
            return game.getGameBoardAtIndex(move) == undefined ? true : false
        }

        const playRound = (pos) => {
            currentRound++
            newTurn()
            handleMove(pos)
            checkBoard()
    
            isGameOver
                ? setGameOver()
                : displayController.renderGameMessage(`It's ${opponentPlayer.name()}'s turn...`)
        } 

        const newTurn = () => {
            if (currentRound !== 1) {
                currentPlayer == playerX
                    ? (currentPlayer = playerO, opponentPlayer = playerX)
                    : (currentPlayer = playerX, opponentPlayer = playerO)
            } 
            return
        }

        const handleMove = (pos) => {
            currentPlayer.isHuman()
                ? move = pos
                : move = aiLogic.findMove(currentPlayer, opponentPlayer)

            game.setGameBoard(move, currentPlayer.sign())
            displayController.renderGameBoard(game.getGameBoard())
            return
        }

        const checkBoard = () => {
            result = game.checkGameBoard(currentPlayer.sign())

            if (result == 'win' || result == 'tie') {
                setGameStatus(result)
            } else return
        }

        const setGameStatus = (result) => {
            gameStatus = result
            return isGameOver = true
        }

        const setGameOver = () => {
            message = 'Game over, '

            gameStatus == 'win'
                ? message += ` ${currentPlayer.name()} wins!`
                : message += ` it's a tie!`

            console.log(message)
            return displayController.renderGameMessage(message)
        }

        return {
            checkValidMove,
            playRound,
        }
    })()

    return {
        resetGame,
        play,
    }
})()

const displayController = (() => {
    titleContainer = document.getElementById('title-container')
    gameContainer = document.getElementById('game-container')
    gridItems = document.querySelectorAll('.grid-item')
    gameInfo = document.getElementById('game-info')
    leftScorecard = document.getElementById('left-scorecard')
    rightScorecard = document.getElementById('right-scorecard')
    variableColourElements = document.querySelectorAll('.variableColour')
    restartButton = document.getElementById('game-restart')
    difficultySelector = document.getElementById('difficultySelector')
    
    gameMode1 = document.getElementById('gameMode1')    // vs AI
    gameMode2 = document.getElementById('gameMode2')    // vs Player
    gameModes = [gameMode1, gameMode2]

    let gameInitialised = false,
        selectedGameMode,
        selectedDifficulty

    const init = (() => {

        gameModes.forEach(button => {                                           // Game Mode
            button.addEventListener('click', (e) => {
                input = e.target.getAttribute("data-gameMode")
                if (!gameInitialised) tmpFnName.initialiseGame()
                if (selectedGameMode == input) return
                else {
                    tmpFnName.setGameMode(input)
                    tmpFnName.newGame()
                }
            })
        })
        
        difficultySelector.addEventListener('click', () => {                    // AI Difficulty
            input = difficultySelector.value
            if (selectedDifficulty == input) return
            else {
                tmpFnName.setDifficulty(input)
                tmpFnName.newGame()
            }
        })

        restartButton.addEventListener('click', () => tmpFnName.newGame())      // Restart

        gridItems.forEach(item => {                                             // Handle Move
            item.addEventListener('click', () => { 
                if (item.innerText == '') {
                    gameController.play(item.dataset.gridPos)   
                }
            })
        })
    })()

    const renderGameBoard = (gameBoard) => {
        for (i = 0; i < gridItems.length; i++) {
            if (gameBoard[i] !== undefined && gridItems[i].innerText == '') {
                gridItems[i].innerText = gameBoard[i]     
            }
        }
    }

    const renderGameMessage = (message) => {
        return gameInfo.innerText = message
    }

    const renderScorecards = () => {
        // TODO: implement scoreboard feature with multi-game scoring
        // IDEA: implement fade-out function for non-current player, and remove the game message feature
    }



    // TODO: suitably name this cluster of functions
    const tmpFnName = (() => {
        const initialiseGame = () => {
            console.log('Game initialised.')
            ui.titleAnimation()
            ui.unhideElements()
            return gameInitialised = true
        }

        const newGame = () => {
            /* UI Resets */
            ui.clearGrid()
            ui.clearScorecards()

            /* Game Resets */
            gameController.resetGame(selectedGameMode, selectedDifficulty)
        }

        const setGameMode = (input) => {
            if (input == 1) console.log('Game Mode: vs AI')
            else console.log('Game Mode: vs Player')

            if (input == 1) setDifficulty(difficultySelector.value)
            else unsetDifficulty()

            ui.toggleDifficultySelector(input)
            ui.changeElementColour(input)



            // TODO: Add config supplier function to supply the selected game mode to the gameController
            // defaultConfig().setOpponentMode(input)


            
            return selectedGameMode = input
        }

        const setDifficulty = (input) => {
            if (input == 'easy' || input == 'medium'
             || input == 'hard' || input == 'impossible') {
                console.log(`AI Difficulty: ${input}`)



                // TODO: Add config supplier function to supply the selected difficulty to the gameController
                // defaultConfig().setOpponentDifficulty(input)
                


                return selectedDifficulty = input
             }
        }

        const unsetDifficulty = () => {
            return selectedDifficulty = undefined
        }

        return {
            initialiseGame,
            newGame,
            setGameMode,
            setDifficulty,
            unsetDifficulty,
        }

    })()

    const ui = (() => {
        const titleAnimation = () => {
            if(titleContainer.classList.contains('title-display-1')) {
                titleContainer.style.animation = 'title-container .7s'
                titleContainer.classList.remove('title-display-1')
                titleContainer.classList.add('title-display-2')
            } else return
        }

        const unhideElements = () => {
            leftScorecard.classList.remove('hidden')
            rightScorecard.classList.remove('hidden')
            setTimeout(() => {
                gameContainer.classList.remove('hidden')
            }, 150)
        }

        const toggleDifficultySelector = (selectedGameMode) => {
            const form = document.querySelector('.difficultyForm')
            if (selectedGameMode == 1) {
                form.classList.remove('hide')
                difficultySelector.removeAttribute('disabled', '')
            } else {
                form.classList.add('hide')
                difficultySelector.setAttribute('disabled', '')
            }
        }

        const changeElementColour = (selectedGameMode) => {
            if (selectedGameMode == 1) {
                variableColourElements.forEach(element => {
                    element.style.color = 'white'
                    element.style.backgroundColor = 'var(--colour-primary)'
                })
            } else {
                variableColourElements.forEach(element => {
                    element.style.color = 'black'
                    element.style.backgroundColor = 'var(--colour-secondary)'
                })
            }
        }

        const clearGrid = () => {
            gridItems.forEach(item => {
                item.innerText = ''
            })
        }

        const clearScorecards = () => {
            // TODO: implement function
        }

        return {
            titleAnimation,
            unhideElements,
            toggleDifficultySelector,
            changeElementColour,
            clearGrid,
            clearScorecards,
        }
    })()

    return {
        renderGameBoard,
        renderGameMessage,
        renderScorecards,
    }
})()

const aiLogic = (() => {
    const findMove = (currentPlayer, opponentPlayer) => {
        if (!currentPlayer && currentPlayer.isHuman()) return // function call failsafe

        // Obtain current game state
        let gameBoard = game.getGameBoard()
        let possibleMoves = game.getGameBoardEmptyFields()

        // Determine a move
        move = getMove(gameBoard, possibleMoves, currentPlayer, opponentPlayer)
        console.log(`AI has Chosen a move of... ${move}`)

        // Return move to game controller
        return move
    }

    const getMove = (gameBoard, possibleMoves, currentPlayer, opponentPlayer) => {

        // Initialise variables
        let accuracyRoll = Math.random(),
            easyAccuracy = 0.10,
            mediumAccuracy = 0.50,
            hardAccuracy = 0.80

        // Obtain a move based on AI difficulty setting  ---  CAN POSSIBLY REFACTOR THIS SWITCH FUNCTION
        switch (currentPlayer.difficulty()) {
            case 'easy':
                if (accuracyRoll > easyAccuracy) {
                    console.log(`Current AI Difficulty: EASY... \n` + `Accuracy roll MISSED -> Executing getRandomMove()...\n`)
                    move = getRandomMove(possibleMoves)
                } else {
                    console.log(`Current AI Difficulty: EASY... \n` + `Accuracy roll HIT -> Executing getBestMove()...\n`)
                    move = getBestMove(gameBoard, possibleMoves, currentPlayer, opponentPlayer)
                }
                break

            case 'medium':
                if (accuracyRoll > mediumAccuracy) {
                    console.log(`Current AI Difficulty: MEDIUM... \n` + `Accuracy roll MISSED -> Executing getRandomMove()...\n`)
                    move = getRandomMove(possibleMoves)
                } else {
                    console.log(`Current AI Difficulty: MEDIUM... \n` + `Accuracy roll HIT -> Executing getBestMove()...\n`)
                    move = getBestMove(gameBoard, possibleMoves, currentPlayer, opponentPlayer)
                }
                break

            case 'hard':
                if (accuracyRoll > hardAccuracy) {
                    console.log(`Current AI Difficulty: HARD... \n` + `Accuracy roll MISSED -> Executing getRandomMove()...\n`)
                    move = getRandomMove(possibleMoves)
                } else {
                    console.log(`Current AI Difficulty: HARD... \n` + `Accuracy roll HIT -> Executing getBestMove()...\n`)
                    move = getBestMove(gameBoard, possibleMoves, currentPlayer, opponentPlayer)
                }
                break

            case 'impossible':
                console.log(`Current AI Difficulty: IMPOSSIBLE... \n` +  `Executing getBestMove()...\n`)
                move = getBestMove(gameBoard, possibleMoves, currentPlayer, opponentPlayer)
                
                if (move == undefined) { move = getRandomMove(possibleMoves), console.log(`bestMove returned undefined, executing randomMove()`) }
                break
        }

        // Return move to findMove
        return move
    }

    const getRandomMove = (possibleMoves) => {
        arrayIndex = Math.floor(Math.random() * possibleMoves.length)
        move = possibleMoves[arrayIndex]
        return move
    }

    const getBestMove = (gameBoard, possibleMoves, currentPlayer, opponentPlayer) => {

        /*  MINIMAX ALGORITHM - BASIC IMPLEMENTATION

            - gameBoard is the CURRENT STATE of the game (the top of the minimax tree diagram)
            - currentPlayer has (possibleMoves.length) possible moves to play; each move is a branch of the tree
            - nextPlayer has (possibleMoves.length - 1) possible moves to play; each of those moves is a branch of each currentPlayer node
            - ... eventually you get to a board where there is only 1 move left - those boards can be considered as TERMINAL STATES
            - of those terminal states, currentPlayer wins some, and currentPlayer loses some
            - These 'terminal states' are assigned scores.
                - currentPlayer wins: score = +10
                - currentPlayer ties: score = 0
                - currentPlayer loses: score = -10
            - The scores ripple back up the tree to help currentPlayer decide on the best possible move
                - ... for the MAX player (currentPlayer), the best move is the branch with the highest score
                - ... for the MIN player (opposingPlayer), the best move is the branch with the lowest score
            - When the scores have rippled back to the top-level node, currentPlayer is able to make an calculated decision
            - on the best move to pick out of the available positions


            
            TODO: MINIMAX WITH DEPTH

            As opposed to every terminal state being given a score of +10 / 0 / -10, the score applied to a terminal state 
            increases/reduces by 1 for every extra "layer " reached within the tree.

            - Terminal states found at the lowest levels will have the smallest score handed back to the top
            - The algorithm can now choose more efficient pathing to reach a favourable terminal state



            TODO: MINIMAX WITH DEPTH AND ALPHA-BETA PRUNING

            Allows the algorithm to determine if a specific branch is worth searching entirely or not, creating 
            a faster and more efficient algorithm
        */

        let bestScore = -Infinity,
            bestMove,
            scoresArray = []

        possibleMoves.forEach(possibleMove => {
            let score,
                move = possibleMove - 1                                         // possibleMove is 1-9 whereas array indexing is 0-8

            gameBoard[move] = currentPlayer.sign()                              // Assign the current iteration to enable scoring of the game state
            score = minimax(gameBoard, currentPlayer, opponentPlayer, false)    // Obtain a score for the current iteration
            
            gameBoard[move] = undefined

            if (score > bestScore) {
                bestScore = score
                bestMove = possibleMove
            }
            scoresArray.push(score)                                             // Temporary 
        })
        console.log(`bestScore final value: ${bestScore}`)
        console.log(`Scores Array: ${scoresArray}`)

        return bestMove
    }

    const minimax = (gameBoard, currentPlayer, opponentPlayer, isCurrentPlayersTurn) => {
        let result = checkBoard(gameBoard, currentPlayer, opponentPlayer)   
        if (result !== null) {
            return minimaxScoring[result]                    
        }

        possibleMoves = game.getGameBoardEmptyFields()
        
        const min = () => {
            let bestScore = Infinity

            possibleMoves.forEach(possibleMove => {
                let score,
                    move = possibleMove - 1 
                
                gameBoard[move] = opponentPlayer.sign()
                score = minimax(gameBoard, currentPlayer, opponentPlayer, true)
                gameBoard[move] = undefined

                bestScore = Math.min(score, bestScore)
            })
            return bestScore
        }  

        const max = () => {
            let bestScore = -Infinity

            possibleMoves.forEach(possibleMove => {
                let score,
                    move = possibleMove - 1 

                gameBoard[move] = currentPlayer.sign() 
                score = minimax(gameBoard, currentPlayer, opponentPlayer, false)                   
                gameBoard[move] = undefined

                bestScore = Math.max(score, bestScore)
            })
            return bestScore
        }

        if (isCurrentPlayersTurn) return max()
        else return min()
    }

    const checkBoard = (gameBoard, currentPlayer, opponentPlayer) => {
        let currentPlayerWin = checkWin(gameBoard, currentPlayer),
            opponentPlayerWin = checkWin(gameBoard, opponentPlayer),
            emptyFields = game.getGameBoardEmptyFields()

        if (currentPlayerWin) {
            return 0
        } else if (opponentPlayerWin) {
            return 1
        } else if (emptyFields.length == 0) {
            return 2
        } else return null
    }

    const checkWin = (gameBoard, currentPlayer) => {
        sign = currentPlayer.sign()
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

    // const minimaxScoring = {
    //     currentPlayer: 10,          // minimaxScoring[0] if currentPlayer wins
    //     opponentPlayer: -10,        // minimaxScoring[1] if opponentPlayer wins
    //     tie: 0                      // minimaxScoring[2] if nobody wins
    // }

    const minimaxScoring = [10, -10, 0]

    return {
        findMove,
    }
})()
