# idle-cards

A single-page idle RPG where answering Anki flashcards attacks enemies. Review cards, defeat enemies, and watch new ones appear.

## Setup

1. Install the [AnkiConnect](https://github.com/amikey/anki-connect) Anki add-on.

2. Add `http://localhost:8000` to AnkiConnect's CORS whitelist:
   - In Anki: **Tools → Add-ons → AnkiConnect → Config**
   - Update `webCorsOriginList`:
     ```json
     {
       "webCorsOriginList": ["http://localhost", "http://localhost:8000"]
     }
     ```
   - Restart Anki.

3. Serve the app locally (required — opening `index.html` directly as a `file://` URL will cause CORS errors):
   ```
   python3 -m http.server
   ```

4. Open `http://localhost:8000` in your browser.

## Architecture

```
data/
  store.js          — single source of truth for game state. mutate state
                      directly via getState(), then call updateState() to save
                      to localStorage and notify all subscribers.
  hero.js           — Hero entity (name, level, hp, max_hp).
  enemy.js          — Enemy entity (name, level, hp, max_hp).

anki.js             — all AnkiConnect API calls and review UI logic.
                      exposes onAnswer(fn) so main.js can wire it to the game.

log.js              — appends messages to state.gameLog (capped at 50 entries).

widgets/
  hud.js            — subscribes to store, renders hero and enemy HP.
  game-log.js       — subscribes to store, renders the event log.

styles/
  game-log.css      — styling for the game log.

main.js             — wires everything together. subscribes widgets, handles
                      combat logic (each card answer deals 2 damage), and spawns
                      a new random enemy when the current one is defeated.
```

### Adding a new widget

1. Add the HTML element to `index.html`
2. Create `widgets/your-widget.js` — import `subscribe` from `data/store.js`, define a `render(state)` function, call `subscribe(render)`
3. Import it in `main.js`

### Console debugging

```js
__game.getState()            // inspect current state
let s = __game.getState(); s.energy = 500; __game.updateState()  // set values directly
__game.resetState()          // wipe state and restart
```
