import { logEvent } from './log.js';
import { initEvents, checkTriggers } from './events-engine.js';

const PASSIVE_RATE = 1;      // energy per tick
const TICK_INTERVAL = 1000;  // ms

// ease → energy reward: (everything = 10)
const EASE_REWARD = { 1: 10, 2: 10, 3: 10, 4: 10 };

// --- state ---
const DEFAULT_STATE = {
  energy: 0,
  firedEvents: [],
  // future: inventory, upgrades, etc.
};

const SAVE_KEY = 'idle-cards-save';

function loadState() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.firedEvents = new Set(parsed.firedEvents ?? []);
      return { ...DEFAULT_STATE, ...parsed };
    }
  } catch { /* fall through */ }
  return { ...DEFAULT_STATE, firedEvents: new Set() };
}

function saveState() {
  const serializable = { ...state, firedEvents: [...state.firedEvents] };
  localStorage.setItem(SAVE_KEY, JSON.stringify(serializable));
}

const state = loadState();
window.__game = { state, save: saveState, render: () => render() };

function render() {
  document.querySelector('#energy').textContent = Math.floor(state.energy);
  document.querySelector('#passive-rate').textContent = (PASSIVE_RATE * 1000 / TICK_INTERVAL).toFixed(1);
  document.querySelector('#active-rate').textContent = EASE_REWARD[1];
}

export function onCardAnswered(ease) {
  const reward = EASE_REWARD[ease] ?? 1;
  state.energy += reward;
  logEvent(`The Monolith pulses brightly (+${reward} energy)`);
  checkTriggers('energy', state);
  saveState();
  render();
}

// passive income tick
setInterval(() => {
  state.energy += PASSIVE_RATE;
  checkTriggers('energy', state);
  saveState();
  render();
}, TICK_INTERVAL);

export function resetGame() {
  Object.assign(state, { ...DEFAULT_STATE, firedEvents: new Set() });
  saveState();
  initEvents(state);
  render();
}

initEvents(state);
render();
