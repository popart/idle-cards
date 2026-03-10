import { onAnswer } from './anki.js';
import { onCardAnswered, resetGame } from './game.js';
import { resetLog } from './log.js';
import './widgets.js';

onAnswer(onCardAnswered);

document.querySelector('#reset-btn').addEventListener('click', () => {
  if (confirm('Reset all save data? This cannot be undone.')) {
    resetLog();
    resetGame();
  }
});
