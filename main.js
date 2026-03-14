import { onAnswer } from './anki.js';
import { logEvent } from './log.js';
//import { onCardAnswered } from './game.js';
import { getState, updateState, resetState, subscribe  } from './data/store.js';
import { renderHUD } from './widgets/hud.js';
import { renderGameLog } from './widgets/game-log.js';
//import './widgets/primates.js';
import { Enemy } from './data/enemy.js';

subscribe(renderGameLog);

function checkEnemy(state) {
    const enemy = state.enemy;
    if (enemy.hp <= 0) {
        logEvent(`${enemy.name} defeated!!`);
        const enemyName = ['kobold', 'slime', 'goblin'][Math.floor(Math.random() * 3)]
        state.enemy = new Enemy(enemyName);
        logEvent(`A ${state.enemy.name} appeared!`)
    }
}
subscribe(checkEnemy);
subscribe(renderHUD);

function onCardAnswered(ease) {
    let state = getState();
    state.enemy.hp = state.enemy.hp - 2;
    logEvent(`Attacked the ${state.enemy.name} for 2 dmg!`)
    console.log(`enemy HP ${state.enemy.hp}`)
    updateState(); // will dispatch to listeners
}
onAnswer(onCardAnswered);

document.querySelector('#reset-btn').addEventListener('click', () => {
  if (confirm('Reset all save data? This cannot be undone.')) {
    resetState();
  }
});

updateState({})
