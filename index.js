const flavorsArray = [
  "Vanilla",
  "Strawberry",
  "Chocolate",
  "Neopolitan",
  "Mint Chocolate Chip",
  "Butter Pecan",
  "Cookies n Cream",
  "Superman",
  "Cookie Dough",
  "Matcha"
];
const toppingsArray = [
  "Sprinkles",
  "Peanuts",
  "Hot Fudge",
  "Caramel",
  "Strawberry Sauce",
  "Cherry",
  "Whipped Cream",
  "Oreo"
];

let selectedWord = "";
let guessedLetters = [];

function startGame(wordType) {
  selectedWord = getRandomWord(wordType);
  guessedLetters = [];
  createLetterButtons();
  displayWord();
}

function getRandomWord(wordType) {
  const wordArray = wordType === "flavors" ? flavorsArray : toppingsArray;
  return wordArray[Math.floor(Math.random() * wordArray.length)];
}

function createLetterButtons() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
    if (
      guessedLetters.includes(letter.toUpperCase()) ||
      guessedLetters.includes(letter.toLowerCase())
    ) {
      wordDisplay.innerText += letter;
    } else if (letter === " ") {
      wordDisplay.innerText += "  ";
    } else {
      wordDisplay.innerText += "_ ";
    }
  }
}

function checkLetter(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    document.getElementById(letter).style.opacity = 0.5;
    document.getElementById(letter).disabled = true;
    displayWord();
  }
}
