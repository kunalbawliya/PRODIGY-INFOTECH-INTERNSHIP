const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

function updateDisplay() {
  const time = new Date(elapsedTime);
  const minutes = String(time.getUTCMinutes()).padStart(2, '0');
  const seconds = String(time.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
  display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

startBtn.addEventListener("click", () => {
  if (running) return;
  running = true;
  startTime = Date.now() - elapsedTime;

  interval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
});

stopBtn.addEventListener("click", () => {
  running = false;
  clearInterval(interval);
});

resetBtn.addEventListener("click", () => {
  running = false;
  clearInterval(interval);
  elapsedTime = 0;
  updateDisplay();
  lapList.innerHTML = ""; // Clear laps
});

lapBtn.addEventListener("click", () => {
  if (!running) return;
  const li = document.createElement("li");
  li.textContent = display.textContent;
  lapList.appendChild(li);
});

updateDisplay();
