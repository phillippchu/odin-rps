const scoreIntro = document.getElementById("score-intro");
const scoreRule = document.getElementById("score-rule");
const playerScoreLabel = document.getElementById("player-score");
const computerScoreLabel = document.getElementById("computer-score");
const playerSign = document.getElementById("player-sign");
const computerSign = document.getElementById("computer-sign");
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");
const endgameModal = document.getElementById("endgame-modal");
const endgameMsg = document.getElementById("endgame-message");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restart-btn");

let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = "tie";
  }
  if (
    (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (playerSelection === "PAPER" && computerSelection === "ROCK") ||
    (playerSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    playerScore++;
    roundWinner = "player";
  }
  if (
    (computerSelection === "ROCK" && playerSelection === "SCISSORS") ||
    (computerSelection === "PAPER" && playerSelection === "ROCK") ||
    (computerSelection === "SCISSORS" && playerSelection === "PAPER")
  ) {
    computerScore++;
    roundWinner = "computer";
  }
  roundResult(roundWinner, playerSelection, computerSelection);
}

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return "ROCK";
    case 1:
      return "PAPER";
    case 2:
      return "SCISSORS";
  }
}

function gameOver() {
  return playerScore === 5 || computerScore === 5;
}

function getPlayerChoice(playerSelection) {
  if (gameOver()) {
    openModal()
    return
  }

  const computerSelection = getComputerChoice()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  updateScore()

  if (gameOver()) {
    openModal()
    setEndgameMessage()
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "ROCK":
      playerSign.innerHTML = '<i class="fas fa-hand-rock fa-7x"></i>'
      break
    case "PAPER":
      playerSign.innerHTML = '<i class="fas fa-hand-paper fa-7x"></i>'
      break
    case "SCISSORS":
      playerSign.innerHTML = '<i class="fas fa-hand-scissors fa-7x"></i>'
      break
  }

  switch (computerSelection) {
    case "ROCK":
      computerSign.innerHTML = '<i class="fas fa-hand-rock fa-7x"></i>'
      break
    case "PAPER":
      computerSign.innerHTML = '<i class="fas fa-hand-paper fa-7x"></i>'
      break
    case "SCISSORS":
      computerSign.innerHTML = '<i class="fas fa-hand-scissors fa-7x"></i>'
      break
  }
}

function updateScore() {
  if (roundWinner === "tie") {
    scoreIntro.textContent = "It's a tie!"
  } else if (roundWinner === "player") {
    scoreIntro.textContent = "You won!"
  } else {
    scoreIntro.textContent = "You lost!"
  }

  playerScoreLabel.textContent = `Player: ${playerScore}`
  computerScoreLabel.textContent = `Computer: ${computerScore}`
}

function roundResult(winner, playerSelection, computerSelection) {
  if (winner === "player") {
    scoreRule.textContent = `${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase()} beats ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1).toLowerCase()}`
    return
  }
  if (winner === "computer") {
    scoreRule.textContent = `${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase()} is beaten by ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1).toLowerCase()}`
    return
  }

  scoreRule.textContent = `${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase()} ties with ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1).toLowerCase()}`
}

function openModal() {
  endgameModal.classList.add("active")
  overlay.classList.add("active")
}

function closeModal() {
  endgameModal.classList.remove("active")
  overlay.classList.remove("active")
}

function setEndgameMessage() {
  return playerScore > computerScore ?
    (endgameMsg.textContent = "You Won!") :
    (endgameMsg.textContent = "You Lost!")
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  scoreIntro.textContent = "Choose Your Weapon"
  scoreRule.textContent = "First to 5 Wins"
  playerScoreLabel.textContent = "Player: 0"
  computerScoreLabel.textContent = "Computer: 0"
  playerSign.innerHTML = `<i class="fa fa-question fa-5x"></i>`
  computerSign.innerHTML = `<i class="fa fa-question fa-5x"></i>`
  endgameModal.classList.remove("active")
  overlay.classList.remove("active")
}

// Event Listeners
rockBtn.addEventListener("click", () => getPlayerChoice("ROCK"))
paperBtn.addEventListener("click", () => getPlayerChoice("PAPER"))
scissorsBtn.addEventListener("click", () => getPlayerChoice("SCISSORS"))
restartBtn.addEventListener("click", restartGame)
overlay.addEventListener("click", closeModal)