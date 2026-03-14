import { getState, updateState } from './data/store.js';

const MAX_ENTRIES = 50;

export function logEvent(message) {
    const state = getState();
    state.gameLog.push(message);
    if (state.gameLog.length > MAX_ENTRIES) {
        state.gameLog = state.gameLog.slice(-MAX_ENTRIES);
    }
}
