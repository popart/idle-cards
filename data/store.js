import { Hero } from './hero.js'
import { Enemy } from './enemy.js'
import {ENEMY_TYPES} from './enemy-types.js'

const SAVE_KEY = 'idle-cards-save';

function defaultState() {
    return {
        energy: 0,
        gold: 0,
        gameLog: [],
        hero: new Hero('andy'),
        enemy: new Enemy('slime'),
    };
}

function load() {
    try {
        const saved = localStorage.getItem(SAVE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...defaultState(), ...parsed };
        }
    } catch { /* fall through */ }
    return defaultState();
}

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

const state = load();
const subscribers = [];

export function getState() {
    //actually it's not like we're deep copying
    // so letting anyone just update state directly
    console.log('fetching state');
    console.log(state);
    return state;
}

export function updateState() {
    subscribers.forEach(fn => fn(state));
    save();
}

export function subscribe(fn) {
  subscribers.push(fn);
}

export function resetState() {
    // make a copy of the state
    Object.assign(state, defaultState());
    save();
    subscribers.forEach(fn => fn(state));
}

// expose for console debugging
window.__game = { getState, updateState, resetState };

//initEvents(state);
//subscribers.forEach(fn => fn(state));
