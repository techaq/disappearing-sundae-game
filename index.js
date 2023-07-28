// flavors array
const flavorsAndToppingsArray = [
  "vanilla",
  "strawberry",
  "chocolate",
  "neopolitan",
  "mint chocolate chip",
  "butter pecan",
  "cookies n cream",
  "superman",
  "cookie dough",
  "matcha",
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
let hintsUsed = 0;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let score = 0;
let totalWordsToSolve = 5; // default - can be changed

// Function to update the total words to solve based on the dropdown selection
function updateWordsToSolve() {
  const wordsToSolveSelect = document.getElementById("wordsToSolveSelect");
  totalWordsToSolve = parseInt(wordsToSolveSelect.value);
}

function getRandomWord() {
  if (flavorsAndToppingsArray.length === 0) return "";
  return flavorsAndToppingsArray[Math.floor(Math.random() * flavorsAndToppingsArray.length)];
}

function createLetterButtons() {
  const letterButtonsRow1 = document.getElementById("letterButtonsRow1");
  const letterButtonsRow2 = document.getElementById("letterButtonsRow2");
  letterButtonsRow1.innerHTML = "";
  letterButtonsRow2.innerHTML = "";

  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    const button = document.createElement("button");
    button.innerText = letter;
    button.onclick = () => checkLetter(letter);
    button.id = letter;

    if (i < alphabet.length / 2) {
      letterButtonsRow1.appendChild(button);
    } else {
      letterButtonsRow2.appendChild(button);
    }
  }
}

startGame();

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
function startGame() {
  selectedWord= getRandomWord();
  guessedLetters = [];
  incorrectGuesses = 0;
  hintsUsed = 0; // Reset the hints used count when starting a new round
  createLetterButtons();
  displayWord();
  checkHintsLimit(); // check and update the state of hint button
  document.getElementById("hintButton").disabled = false; // enable the hint button @ start of round
  document.getElementById("guessesLeft").innerText = `Guesses Left: ${maxIncorrectGuesses}`;
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("hintButton").innerText = `Show Hint (${maxHintsPerRound} left)`;
  document.getElementById("replayButton").style.display = "none"; // Hide the replay button at the start of a round
}

let totalIncorrectGuesses = 0;
let wordsSolved = 0;
let guessesLeft = maxIncorrectGuesses;

function checkWinOrLoss() {
  if (guessedLetters.length > 0) {
    const wrongGuesses = guessedLetters.filter((letter) => !selectedWord.includes(letter));
    incorrectGuesses = wrongGuesses.length;
  }

  guessesLeft = maxIncorrectGuesses - incorrectGuesses;
  document.getElementById("guessesLeft").innerText = `Guesses Left: ${guessesLeft}`;

  if (incorrectGuesses >= maxIncorrectGuesses) {
    // Player has lost the word
    alert(`You lost the word "${selectedWord}". The sundae is melting.`);
    endWord();
  } else if (!document.getElementById("word").innerText.includes("_")) {
    // Player has won the word
    alert(`Congratulations! You guessed the word "${selectedWord}" correctly!`);
    wordsSolved++;
    updateScore();
    endWord();
  }
}

function endWord() {
  // Reset the elements for the next word
  guessedLetters = [];
  hintsUsed = 0;
  createLetterButtons();
  selectedWord = getRandomWord(); // Get a new word
  displayWord();
  document.getElementById("hintButton").disabled = false;
  document.getElementById("replayButton").style.display = "none";
  incorrectGuesses = 0;

  if (wordsSolved >= totalWordsToSolve || totalIncorrectGuesses >= totalWordsToSolve) {
    endGame();
  }
}

function endGame() {
  // Game over
  if (wordsSolved >= totalWordsToSolve) {
    alert(`Congratulations! You solved ${wordsSolved} words before the sundae disappeared completely.`);
  } else {
    alert(`Game over! You solved ${wordsSolved} words before the sundae disappeared completely.`);
  }

  document.getElementById("letterButtonsRow1").style.display = "none";
  document.getElementById("letterButtonsRow2").style.display = "none";
  document.getElementById("word").style.display = "none";
  document.getElementById("replayButton").style.display = "block";
}

function replayGame() {
  document.getElementById("replayButton").style.display = "none";
  wordsSolved = 0; // Reset wordsSolved when replaying the game
  score = 0; // Reset score when replaying the game
  guessesLeft = maxIncorrectGuesses; // Reset guessesLeft when replaying the game
  startGame(); // Start a new game 

  // Reset the elements that were hidden at the end of the previous round
  // document.getElementById("sundaeImage").style.display = "block";
  document.getElementById("letterButtonsRow1").style.display = "block";
  document.getElementById("letterButtonsRow2").style.display = "block";
  document.getElementById("word").style.display = "block";
}

function updateScore() {
  document.getElementById("score").innerText = `Score: ${score}`;
}
