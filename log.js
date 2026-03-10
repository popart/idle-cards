const MAX_ENTRIES = 50;

export function logEvent(message) {
  const log = document.querySelector('#event-log');
  const entry = document.createElement('div');
  entry.textContent = message;
  log.prepend(entry);
  while (log.children.length > MAX_ENTRIES) {
    log.removeChild(log.lastChild);
  }
}
