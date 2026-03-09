const PASSIVE_RATE = 1;      // coins per tick
const TICK_INTERVAL = 1000;  // ms

// ease → coin reward: (everything = 10)
const EASE_REWARD = { 1: 10, 2: 10, 3: 10, 4: 10 };

// --- state ---
const DEFAULT_STATE = {
  coins: 0,
  // future: inventory, upgrades, etc.
};

const SAVE_KEY = 'idle-cards-save';

function loadState() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : { ...DEFAULT_STATE };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

const state = loadState();

function render() {
  document.querySelector('#coins').textContent = Math.floor(state.coins);
  document.querySelector('#passive-rate').textContent = (PASSIVE_RATE * 1000 / TICK_INTERVAL).toFixed(1);
  document.querySelector('#active-rate').textContent = EASE_REWARD[1];
}

export function onCardAnswered(ease) {
  state.coins += EASE_REWARD[ease] ?? 1;
  saveState();
  render();
}

// passive income tick
setInterval(() => {
  state.coins += PASSIVE_RATE;
  saveState();
  render();
}, TICK_INTERVAL);

render();
