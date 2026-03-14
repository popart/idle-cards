import { onAnswer } from './anki.js';
import { logEvent } from './log.js';
//import { onCardAnswered } from './game.js';
import { getState, updateState, resetState, subscribe  } from './data/store.js';
import { renderHUD } from './widgets/hud.js';
import { renderGameLog } from './widgets/game-log.js';
//import './widgets/primates.js';

subscribe(renderHUD);
subscribe(renderGameLog);

function onCardAnswered(ease) {
    let state = getState();
    state.enemy.hp = state.enemy.hp - 2;
    logEvent('Attacked the enemy for 2 dmg!')
    console.log(`enemy HP ${state.enemy.hp}`)
    updateState(state); // will dispatch to listeners
}
onAnswer(onCardAnswered);

document.querySelector('#reset-btn').addEventListener('click', () => {
  if (confirm('Reset all save data? This cannot be undone.')) {
    resetState();
  }
});

updateState({})
