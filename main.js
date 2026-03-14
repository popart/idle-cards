import { onAnswer } from './anki.js';
import { logEvent } from './log.js';
import { getState, updateState, resetState, subscribe } from './data/store.js';
import { renderHUD } from './widgets/hud.js';
import { renderGameLog } from './widgets/game-log.js';
import { Enemy } from './data/enemy.js';

subscribe(renderGameLog);
subscribe(renderHUD);

function onCardAnswered(ease) {
    const state = getState();
    state.enemy.hp -= 2;
    logEvent(`Attacked the ${state.enemy.name} for 2 dmg!`);

    if (state.enemy.hp <= 0) {
        logEvent(`${state.enemy.name} defeated!!`);
        const enemyName = ['kobold', 'slime', 'goblin'][Math.floor(Math.random() * 3)];
        state.enemy = new Enemy(enemyName);
        logEvent(`A ${state.enemy.name} appeared!`);
    }

    updateState();
}
onAnswer(onCardAnswered);

document.querySelector('#reset-btn').addEventListener('click', () => {
  if (confirm('Reset all save data? This cannot be undone.')) {
    resetState();
  }
});

updateState({})
