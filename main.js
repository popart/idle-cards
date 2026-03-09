const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

async function anki(action, params = {}) {
  const res = await fetch('http://localhost:8765', {
    method: 'POST',
    body: JSON.stringify({ action, version: 5, params }),
  });
  const { result, error } = await res.json();
  if (error) throw new Error(error);
  return result;
}

$('#load-decks').addEventListener('click', async () => {
  const decks = await anki('deckNames');
  const list = $('#deck-list');
  list.innerHTML = '';
  decks.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  });
});
