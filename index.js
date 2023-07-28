// flavors array
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
  "matcha"
];

// toppings array
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

// variables 
let selectedWord = "";
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 5;
const maxHintsPerRound = 5;
let hintsUsed=0;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let score = 0; 



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

function showHint() {
  if (guessedLetters.length < selectedWord.length && hintsUsed < maxHintsPerRound) {
    const unguessedLetters = selectedWord.split("").filter((letter) => !guessedLetters.includes(letter));
    const hintLetter = unguessedLetters[0];
    guessedLetters.push(hintLetter);
    displayWord();
    hintsUsed++;
    checkHintsLimit(); // checks if the hints limit has been reached
  }
}

function checkHintsLimit() {
  const hintsLeft = maxHintsPerRound - hintsUsed;
  const hintButton = document.getElementById("hintButton");

  if (hintsLeft === 0) {
    hintButton.disabled = true;
    hintButton.innerText = "No Hints Left";
  } else {
    hintButton.innerText = `Show Hint (${hintsLeft} left)`;
  }
}

// starts the game
function startGame(wordType) {
  selectedWord = getRandomWord(wordType);
  guessedLetters = [];
  incorrectGuesses = 0;
  hintsUsed = 0; // Reset the hints used count when starting a new round
  createLetterButtons();
  displayWord();
  checkHintsLimit(); // check and update the state of hint button
  document.getElementById("hintButton").disabled = false; // enable the hint button @ start of round
  document.getElementById("guessesLeft").style.display = "block";
  document.getElementById("score").style.display = "block";
}

function checkWinOrLoss() {
  if (guessedLetters.length > 0) {
    const wrongGuesses = guessedLetters.filter((letter) => !selectedWord.includes(letter));
    incorrectGuesses = wrongGuesses.length;
  }

  const guessesLeft = maxIncorrectGuesses - incorrectGuesses;
  document.getElementById("guessesLeft").innerText = `Guesses Left: ${guessesLeft}`

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
  // document.getElementById("sundaeImage").style.display = "none";
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

updateScore();