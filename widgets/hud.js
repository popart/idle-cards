export function renderHUD(state) {
    document.querySelector('#hud').querySelector('#hero-max-hp').textContent = Math.floor(state.hero.max_hp);
  document.querySelector('#hud').querySelector('#hero-hp').textContent = Math.floor(state.hero.hp);
document.querySelector('#hud').querySelector('#enemy-max-hp').textContent = Math.floor(state.enemy.max_hp);
  document.querySelector('#hud').querySelector('#enemy-hp').textContent = Math.floor(state.enemy.hp);
}
