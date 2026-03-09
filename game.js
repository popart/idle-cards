// --- state ---
let coins = 0;
const PASSIVE_RATE = 1;      // coins per tick
const TICK_INTERVAL = 1000;  // ms

// ease → coin reward: (everything = 10)
const EASE_REWARD = { 1: 10, 2: 10, 3: 10, 4: 10 };

function render() {
  document.querySelector('#coins').textContent = Math.floor(coins);
}

export function onCardAnswered(ease) {
  coins += EASE_REWARD[ease] ?? 1;
  render();
}

// passive income tick
setInterval(() => {
  coins += PASSIVE_RATE;
  render();
}, TICK_INTERVAL);

render();
