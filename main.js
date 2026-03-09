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

// --- state ---
let queue = [];
let current = null;

// --- init: populate deck dropdown ---
const decks = await anki('deckNames');
const select = $('#deck-select');
select.innerHTML = '';
decks.forEach(name => {
  const opt = document.createElement('option');
  opt.textContent = name;
  select.appendChild(opt);
});

// --- start review ---
$('#start-btn').addEventListener('click', async () => {
  const deck = $('#deck-select').value;
  const cardIds = await anki('findCards', { query: `deck:"${deck}" is:due` });

  if (cardIds.length === 0) {
    $('#deck-picker').hidden = true;
    $('#done').hidden = false;
    return;
  }

  const cards = await anki('cardsInfo', { cards: cardIds });
  queue = cards;
  $('#deck-picker').hidden = true;
  $('#review').hidden = false;
  showNext();
});

function showNext() {
  if (queue.length === 0) {
    $('#review').hidden = true;
    $('#done').hidden = false;
    return;
  }

  current = queue.shift();
  const fields = Object.values(current.fields);

  $('#card-front').innerHTML = fields[0].value;
  $('#card-back').innerHTML = fields.slice(1).map(f => f.value).join('<hr>');
  $('#card-back').hidden = true;
  $('#rating-buttons').hidden = true;
  $('#show-answer-btn').hidden = false;
  $('#queue-status').textContent = `${queue.length} cards remaining`;
}

function returnToDeckPicker() {
  queue = [];
  current = null;
  $('#review').hidden = true;
  $('#done').hidden = true;
  $('#deck-picker').hidden = false;
}

$('#end-btn').addEventListener('click', returnToDeckPicker);

$('#show-answer-btn').addEventListener('click', () => {
  $('#card-back').hidden = false;
  $('#rating-buttons').hidden = false;
  $('#show-answer-btn').hidden = true;
});

$$('#rating-buttons button').forEach(btn => {
  btn.addEventListener('click', async () => {
    const ease = parseInt(btn.dataset.ease);
    await anki('answerCards', { answers: [{ cardId: current.cardId, ease }] });
    showNext();
  });
});
