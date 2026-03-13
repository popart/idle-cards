import { Hero } from './hero.js'
import { Enemy } from './enemy.js'

const SAVE_KEY = 'idle-cards-save';

const DEFAULT_STATE = {
    energy: 0,
    firedEvents: [],
    hero: new Hero('andy'),
    enemy: new Enemy('slime'),
    // future: inventory, upgrades, etc.
};

function load() {
    try {
        const saved = localStorage.getItem(SAVE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...DEFAULT_STATE, ...parsed };
        }
    } catch { /* fall through */ }
    return DEFAULT_STATE;
}

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

const state = load();
const subscribers = [];

export function getState() {
    //actually it's not like we're deep copying
    // so letting anyone just update state directly
    return state;
}

export function updateState(patch) {
    //since we updated state directly, no need to patch
    //Object.assign(state, patch);
    save();
    subscribers.forEach(fn => fn(state));
}

export function subscribe(fn) {
  subscribers.push(fn);
}

export function resetState() {
  Object.assign(state, { ...DEFAULT_STATE, firedEvents: new Set() });
  save();
  subscribers.forEach(fn => fn(state));
}

// expose for console debugging
window.__game = { getState, updateState, resetState };

//initEvents(state);
//subscribers.forEach(fn => fn(state));
