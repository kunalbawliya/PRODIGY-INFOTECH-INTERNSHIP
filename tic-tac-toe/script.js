const board = document.getElementById("gameBoard");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function init() {
  board.innerHTML = "";
  options = ["", "", "", "", "", "", "", "", ""];
  running = true;
  currentPlayer = "X";
  statusText.textContent = `${currentPlayer}'s Turn`;

  options.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.dataset.index = index;
    cell.addEventListener("click", cellClicked);
    board.appendChild(cell);
  });
}

function cellClicked() {
  const index = this.dataset.index;

  if (options[index] !== "" || !running) return;

  options[index] = currentPlayer;
  this.textContent = currentPlayer;
  checkWinner();
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "🤝 It's a draw!";
    running = false;
  } else {
    changePlayer();
  }
}

restartBtn.addEventListener("click", init);
init();
