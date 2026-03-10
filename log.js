const MAX_ENTRIES = 50;
const SAVE_KEY = 'idle-cards-log';

function loadLog() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveLog(entries) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(entries));
}

function renderLog(entries) {
  const log = document.querySelector('#event-log');
  log.innerHTML = '';
  entries.forEach(msg => {
    const div = document.createElement('div');
    div.textContent = msg;
    log.appendChild(div);
  });
}

// --- init: restore log from storage ---
const entries = loadLog();
renderLog(entries);

export function resetLog() {
  entries.length = 0;
  saveLog(entries);
  renderLog(entries);
}

export function logEvent(message) {
  entries.push(message);
  if (entries.length > MAX_ENTRIES) entries = entries.slice(-MAX_ENTRIES);
  saveLog(entries);
  renderLog(entries);
}
