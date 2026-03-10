import { EVENTS } from './events.js';
import { logEvent } from './log.js';

// firedIds is the set of event ids already fired (persisted in save state)
let firedIds;

export function initEvents(state) {
  firedIds = state.firedEvents;
  checkTriggers('start', state);
}

export function checkTriggers(type, state) {
  for (const event of EVENTS) {
    if (firedIds.has(event.id)) continue;
    if (!matches(event.trigger, type, state)) continue;
    firedIds.add(event.id);
    logEvent(event.message);
  }
}

function matches(trigger, type, state) {
  if (trigger.type !== type) return false;
  if (type === 'energy') return state.energy >= trigger.threshold;
  return true;
}
