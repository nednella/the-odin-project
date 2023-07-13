// global variables
var playerScore = 0
var computerScore = 0
var roundCount = 1

// DOM nodes
const buttons = document.querySelectorAll('button')
const round = document.getElementById('round')
const scorePlayer = document.getElementById('score-player')
const scoreComputer = document.getElementById('score-computer')
const gameMsg = document.getElementById('game-msg')

// event listeners
buttons.forEach(button => {
    button.addEventListener('click', () => rps(button.value))
})


function getComputerChoice() {
    let choices = ["Rock", "Paper", "Scissors"]
    return choices[Math.floor(Math.random() * 3)]
}


function disableButtons() {
    buttons.forEach(element => {
        element.disabled = true
    })
}


function playRound(playerSelection) {

    roundResult = ""
    const computerSelection = getComputerChoice()
    
    const msgWin = `You Win! ${playerSelection} beats ${computerSelection}`
    const msgLose = `You Lose! ${computerSelection} beats ${playerSelection}`
    const msgTie = "It's a Tie."
    
    if ((playerSelection == "Rock" && computerSelection == "Scissors") ||
        (playerSelection == "Paper" && computerSelection == "Rock") ||
        (playerSelection == "Scissors" && computerSelection == "Paper")) {
        roundResult = msgWin
        playerScore++

    } else if (playerSelection == computerSelection) {
        roundResult = msgTie
        tieCount++

    } else {
        roundResult = msgLose
        computerScore++
    } 

    roundCount++
    round.textContent = "Round " + roundCount
    gameMsg.textContent = roundResult
    scorePlayer.textContent = playerScore
    scoreComputer.textContent = computerScore
    return
}


function rps(playerSelection) {
    if (playerScore == 5 || computerScore == 5) {
        return
    } 
    playRound(playerSelection)

    if (playerScore == 5 || computerScore == 5) {
        disableButtons()
        if (playerScore == 5) {
            gameMsg.textContent = "Game Over, You Win!"
        } else {
            gameMsg.textContent = "Game Over, You Have Lost..."
        }
    }
 }
