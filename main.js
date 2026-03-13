import { onAnswer } from './anki.js';
//import { onCardAnswered } from './game.js';
import { getState, updateState, resetState, subscribe  } from './data/store.js';
//import { resetLog } from './log.js';
import { renderHUD } from './widgets/hud.js';
//import './widgets/primates.js';

subscribe(renderHUD)

function onCardAnswered(ease) {
    let state = getState();
    state.enemy.hp = state.enemy.hp - 2;
    console.log(`enemy HP ${state.enemy.hp}`)
    updateState(state); // will dispatch to listeners
}
onAnswer(onCardAnswered);


document.querySelector('#reset-btn').addEventListener('click', () => {
  if (confirm('Reset all save data? This cannot be undone.')) {
    //resetLog();
    resetState();
  }
});

updateState({})
