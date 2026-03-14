export function renderGameLog(state) {
    const gameLog = document.querySelector("#game-log");
    gameLog.innerHTML = '';
    state.gameLog.forEach(msg => {
        const div = document.createElement('div');
        div.textContent = msg;
        gameLog.appendChild(div);
    });

    gameLog.scrollTop = gameLog.scrollHeight;
}
