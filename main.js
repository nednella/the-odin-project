// global variables
var playerScore = 0
var computerScore = 0

// DOM nodes
const rock = document.getElementById('btn-rock')
const paper = document.getElementById('btn-paper')
const scissors = document.getElementById('btn-scissors')
const gameMsg = document.getElementById('game-msg')
const scorePlayer = document.getElementById('score-player')
const scoreComputer = document.getElementById('score-computer')

// event listeners
rock.addEventListener('click', () => rps('Rock'))
paper.addEventListener('click', () => rps('Paper'))
scissors.addEventListener('click', () => rps('Scissors'))

// returns a random int between 1 and max
function getRandInt(max) {
    return Math.floor(Math.random() * max) + 1;         
}

// returns a random choice of rps for the computer using getRandInt()
function getComputerChoice() {
    let choice = getRandInt(3)
    if (choice == 1) {
        return "Rock"
    } else if (choice == 2) {
        return "Paper"
    } else {
        return "Scissors"
    }
}

// returns a message based on winner of round
function playRound(playerSelection) {

    result = ""
    const computerSelection = getComputerChoice()
    
    const msgWin = `You Win! ${playerSelection} beats ${computerSelection}`
    const msgLose = `You Lose! ${computerSelection} beats ${playerSelection}`
    const msgTie = "Tie!"

    if ((playerSelection == "Rock" && computerSelection == "Scissors") ||
        (playerSelection == "Paper" && computerSelection == "Rock") ||
        (playerSelection == "Scissors" && computerSelection == "Paper")) {
        // win
        playerScore++
        result = msgWin

    } else if (playerSelection == computerSelection) {
        // tie
        result = msgTie

    } else {
        //lose
        computerScore++
        result = msgLose
    } 

    return result
}

function rps(btnSelected) {

    // if game over, terminate
    if (playerScore == 5 || computerScore == 5) {
        return
    }

    // play round
    playerSelection = btnSelected
    roundResult = playRound(playerSelection)

    // display results
    gameMsg.textContent = roundResult
    scorePlayer.textContent = "Player Score: " + playerScore
    scoreComputer.textContent = "Computer Score: " + computerScore

    // if winner, display result
    if (playerScore == 5 || computerScore == 5) {
        if (playerScore == 5) {
            // end, player win
            gameMsg.textContent = "Game Over. You Win!"
        } else {
            // end, computer win
            gameMsg.textContent = "Game Over. You Have Lost."
        }
    }
 }















// // string method prototype that returns a string in title case
// String.prototype.toTitleCase = function () {
//     return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// }

// function obtainInput() {
//     do {
//         var userInput = window.prompt("Enter your Rock Paper Scissors choice: ")
//     } while (userInput != "Rock" && userInput != "Paper" && userInput != "Scissors") 
//     return userInput
// }