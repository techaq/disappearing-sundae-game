// The Disappearing Sundae Game

// Array of ice cream flavors and toppings
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
  "oreo",
];

// Game variables
let selectedWord = "";
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 5;
const maxHintsPerRound = 5;
let hintsUsed = 0;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let score = 0;
let totalWordsToSolve = 5; // Default - can be changed
let wordsSolved = 0; // Initialize the wordsSolved variable

// Function to update the total words to solve based on the dropdown selection
function updateWordsToSolve() {
  const wordsToSolveSelect = document.getElementById("wordsToSolveSelect");
  totalWordsToSolve = parseInt(wordsToSolveSelect.value);
}

// Function to get a random word from the flavors array
function getRandomWord() {
  if (flavorsAndToppingsArray.length === 0) return "";
  return flavorsAndToppingsArray[
    Math.floor(Math.random() * flavorsAndToppingsArray.length)
  ];
}

// Function to create letter buttons for the game
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

// Function to start the game
function startGame() {
  selectedWord = getRandomWord();
  guessedLetters = [];
  incorrectGuesses = 0;
  hintsUsed = 0; // Reset the hints used count when starting a new round
  createLetterButtons();
  displayWord();
  checkHintsLimit(); // Check and update the state of the hint button
  document.getElementById("hintButton").disabled = false; // Enable the hint button at the start of a round
  document.getElementById(
    "guessesLeft"
  ).innerText = `Guesses Left: ${maxIncorrectGuesses}`;
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById(
    "hintButton"
  ).innerText = `Show Hint (${maxHintsPerRound} left)`;
  document.getElementById("replayButton").style.display = "none"; // Hide the replay button at the start of a round
}

// Function to display the word with guessed letters
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

// Function to check if the guessed letter is correct
function checkLetter(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    document.getElementById(letter).style.opacity = 0.5;
    document.getElementById(letter).disabled = true;
    displayWord();
  }
}

// Function to show a hint if available
function showHint() {
  if (
    guessedLetters.length < selectedWord.length &&
    hintsUsed < maxHintsPerRound
  ) {
    const unguessedLetters = selectedWord
      .split("")
      .filter((letter) => !guessedLetters.includes(letter));
    const hintLetter = unguessedLetters[0];
    guessedLetters.push(hintLetter);
    displayWord();
    hintsUsed++;
    checkHintsLimit(); // Check if the hints limit has been reached
  }
}

// Function to check if hints limit is reached and update the hint button state
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

// Function to check if the player has won or lost
function checkWinOrLoss() {
  if (guessedLetters.length > 0) {
    const wrongGuesses = guessedLetters.filter(
      (letter) => !selectedWord.includes(letter)
    );
    incorrectGuesses = wrongGuesses.length;
  }

  const guessesLeft = maxIncorrectGuesses - incorrectGuesses;
  document.getElementById(
    "guessesLeft"
  ).innerText = `Guesses Left: ${guessesLeft}`;

  if (incorrectGuesses >= maxIncorrectGuesses) {
    // Player has lost the word
    alert(`You lost the word "${selectedWord}". The sundae is melting.`);
    endWord();
  } else if (!document.getElementById("word").innerText.includes("_")) {
    // Player has won the word
    alert(`Congratulations! You guessed the word "${selectedWord}" correctly!`);
    wordsSolved++;
    score++;
    updateScore();
    hintsUsed = 0; // Reset the hint count to 0
    document.getElementById("hintButton").disabled = false; // Reset the hint button
    document.getElementById(
      "hintButton"
    ).innerText = `Show Hint (${maxHintsPerRound} left)`; // Update the hint button text
    endWord();
  }
}

// Function to handle the end of the current word
function endWord() {
  // Reset the elements for the next word
  guessedLetters = [];
  hintsUsed = 0;
  incorrectGuesses = 0;
  createLetterButtons();
  selectedWord = getRandomWord(); // Get a new word
  displayWord();
  document.getElementById("hintButton").disabled = false; // Reset the hint button
  document.getElementById("replayButton").style.display = "none";

  if (
    wordsSolved >= totalWordsToSolve ||
    incorrectGuesses >= totalWordsToSolve
  ) {
    endGame();
  }
}

// Function to handle the end of the game
function endGame() {
  // Game over
  if (wordsSolved >= totalWordsToSolve) {
    alert(
      `Congratulations! You solved ${wordsSolved} words before the sundae disappeared completely.`
    );
  } else {
    alert(
      `Game over! You solved ${wordsSolved} words before the sundae disappeared completely.`
    );
  }

  document.getElementById("letterButtonsRow1").style.display = "none";
  document.getElementById("letterButtonsRow2").style.display = "none";
  document.getElementById("word").style.display = "none";
  document.getElementById("replayButton").style.display = "block";
}

// Function to increase the player's score
function increaseScore() {
  score++;
  updateScore();
}

// Function to reset the game after a correct word guess
function resetGame() {
  guessedLetters = [];
  incorrectGuesses = 0;
  hintsUsed = 0;
  createLetterButtons();
  displayWord();
  document.getElementById("hintButton").disabled = false;
  document.getElementById(
    "hintButton"
  ).innerText = `Show Hint (${maxHintsPerRound} left)`;
  document.getElementById(
    "guessesLeft"
  ).innerText = `Guesses Left: ${maxIncorrectGuesses}`;
}

// Function to replay the game
function replayGame() {
  document.getElementById("replayButton").style.display = "none";
  wordsSolved = 0; // Reset wordsSolved when replaying the game
  score = 0; // Reset score when replaying the game
  guessesLeft = maxIncorrectGuesses; // Reset guessesLeft when replaying the game
  startGame(); // Start a new game
}

// Function to update the player's score
function updateScore() {
  document.getElementById("score").innerText = `Score: ${score}`;
}

// The initial call to start the game
startGame();
