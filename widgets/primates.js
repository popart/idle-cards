import { logEvent } from '../log.js';

document.querySelector('[data-action="gather-sticks"]').addEventListener('click', () => {
  logEvent('The primates scatter across the forest floor, collecting sticks.');
});

document.querySelector('[data-action="rub-sticks"]').addEventListener('click', () => {
  logEvent('Two sticks are pressed together. Smoke rises. The primates recoil in fear.');
});
