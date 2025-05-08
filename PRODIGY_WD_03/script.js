const board = document.getElementById("gameBoard");
const turnText = document.getElementById("turnText");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restartBtn");
const gifContainer = document.getElementById("resultGif");
const gifImage = document.getElementById("gifImage");
const modeSelect = document.getElementById("modeSelect");

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let mode = "single";

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

modeSelect.addEventListener("change", () => {
  mode = modeSelect.value;
  init();
});

function init() {
  board.innerHTML = "";
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  turnText.textContent = `${currentPlayer}'s Turn`;
  resultText.textContent = "";
  gifContainer.classList.add("hidden");
  gifImage.src = "";

  options.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.dataset.index = i;
    cell.addEventListener("click", cellClicked);
    board.appendChild(cell);
  });
}

function cellClicked() {
  const index = this.dataset.index;

  if (options[index] !== "" || !running) return;

  options[index] = currentPlayer;
  this.textContent = currentPlayer;

  if (checkWinner()) return;

  if (mode === "single" && currentPlayer === "X") {
    changePlayer();
    setTimeout(aiMove, 400);
  } else {
    changePlayer();
  }
}

function aiMove() {
  if (!running) return;
  const emptyCells = options.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  options[randomIndex] = "O";
  board.children[randomIndex].textContent = "O";
  checkWinner() || changePlayer();
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  let won = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      won = true;
      break;
    }
  }

  if (won) {
    turnText.textContent = "";
    resultText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gifImage.src = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxwZDN2ODY0Zm1hcGdkdDl4aHhxMmRjZXM2NGptazd0cHNmZTJnbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3AWqx17MtrKOFZOsso/giphy.gif";
    gifContainer.classList.remove("hidden");
    running = false;
    return true;
  } else if (!options.includes("")) {
    turnText.textContent = "";
    resultText.textContent = "🤝 It's a Draw!";
    gifImage.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3p0aWFiYjAwZ2U2MXVlcDA3ODl6OXdmZnkzcjhvc3M2NjcxZ3A0MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/A0KitrLeiHw52/giphy.gif";
    gifContainer.classList.remove("hidden");
    running = false;
    return true;
  }

  return false;
}

restartBtn.addEventListener("click", init);
init();
