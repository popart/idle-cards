import { getState, updateState } from './data/store.js';
import { logEvent } from './log.js';

const PASSIVE_RATE = 1;      // energy per tick
const TICK_INTERVAL = 1000;  // ms

export const EASE_REWARD = { 1: 10, 2: 10, 3: 10, 4: 10 };

export function onCardAnswered(ease) {
  const reward = EASE_REWARD[ease] ?? 1;
  logEvent(`The Monolith pulses brightly (+${reward} energy)`);
  updateState({ energy: getState().energy + reward });
}

setInterval(() => {
  updateState({ energy: getState().energy + PASSIVE_RATE });
}, TICK_INTERVAL);
