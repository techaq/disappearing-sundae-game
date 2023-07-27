const flavorsArray = [
  "vanilla",
  "strawberry",
  "chocolate",
  "neopolitan",
  "mint chocolate chip",
  "butter pecan",
  "cookies n cream",
  "superman",
  "cookie dough",
  "match"
];
const toppingsArray = [
  "sprinkles",
  "peanuts",
  "hot fudge",
  "caramel",
  "strawberry sauce",
  "cherry",
  "whipped cream",
  "oreo"
];

let selectedWord = "";
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 5;
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function startGame(wordType) {
  selectedWord = getRandomWord(wordType);
  guessedLetters = [];
  incorrectGuesses = 0;
  createLetterButtons();
  displayWord();
}

function getRandomWord(wordType) {
  const wordArray = wordType === "flavors" ? flavorsArray : toppingsArray;
  return wordArray[Math.floor(Math.random() * wordArray.length)];
}

function createLetterButtons() {
  const letterButtonsDiv = document.getElementById("letterButtons");
  letterButtonsDiv.innerHTML = "";

  for (let letter of alphabet) {
    const button = document.createElement("button");
    button.innerText = letter;
    button.onclick = () => checkLetter(letter);
    button.id = letter;
    letterButtonsDiv.appendChild(button);
  }
}

function displayWord() {
  const wordDisplay = document.getElementById("word");
  wordDisplay.innerText = "";

  for (let letter of selectedWord) {
    if (guessedLetters.includes(letter)) {
      wordDisplay.innerText += letter;
    } else if (letter === " ") {
      wordDisplay.innerText += "  ";
    } else {
      wordDisplay.innerText += "_ ";
    }
  }

  checkWinOrLoss();
}

function checkLetter(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    document.getElementById(letter).style.opacity = 0.5;
    document.getElementById(letter).disabled = true;
    displayWord();
  }
}

function checkWinOrLoss() {
  if (guessedLetters.length > 0) {
    const wrongGuesses = guessedLetters.filter((letter) => !selectedWord.includes(letter));
    incorrectGuesses = wrongGuesses.length;
  }

  if (incorrectGuesses >= maxIncorrectGuesses) {
     // Player has lost the game
    alert("You lost! The sundae has disappeared.");
    endGame();
  } else if (!document.getElementById("word").innerText.includes("_")) {
    // Player has won the game
    alert("Congratulations! You won!");
    score++;
    updateScore();
    endGame();
  }
}

function endGame() {
  document.getElementById("sundaeImage").style.display = "none";
  document.getElementById("letterButtons").style.display = "none";
  document.getElementById("word").style.display = "none";
  document.getElementById("replayButton").style.display = "block";
}

function replayGame() {
  document.getElementById("options").style.display = "block";
  document.getElementById("replayButton").style.display = "none";
  startGame("flavors"); // Start a new game with flavors by default, change as needed
}

function updateScore() {
  document.getElementById("score").innerText = `Score: ${score}`;
}

// Initial display, hide game-related elements
updateScore();