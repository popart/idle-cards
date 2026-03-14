import { onAnswer } from './anki.js';
import { logEvent } from './log.js';
import { getState, updateState, resetState, subscribe } from './data/store.js';
import { renderHUD } from './widgets/hud.js';
import { renderGameLog } from './widgets/game-log.js';
import { Enemy } from './data/enemy.js';
import { randomEnemyType } from './data/enemy-types.js';

subscribe(renderGameLog);
subscribe(renderHUD);

function onCardAnswered(ease) {
    const state = getState();
    const dmg = 5  // TODO: calcluate damage based on stats
    state.enemy.hp -= dmg;
    logEvent(`Attacked the ${state.enemy.name} for ${dmg} dmg!`);

    if (state.enemy.hp <= 0) {
        const gold = state.enemy.gold;
        state.gold += gold;
        logEvent(`${state.enemy.name} defeated!! (+${gold} gold)`);
        state.enemy = new Enemy(randomEnemyType());
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
