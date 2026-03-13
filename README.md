# idle-cards

A single-page web app for interacting with Anki via AnkiConnect.

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
store.js            — single source of truth for game state. all mutations go
                      through updateState(patch), which saves to localStorage and
                      notifies all subscribers.

game.js             — passive income tick loop and card answer handler.
                      calls updateState() to mutate energy.

anki.js             — all AnkiConnect API calls and review UI logic.
                      exposes onAnswer(fn) so main.js can wire it to the game.

events.js           — narrative script data. non-programmers edit this file only.
                      each event has a trigger, a log message, and optionally a
                      show: '#element-id' to reveal a hidden UI element.

events-engine.js    — checks event triggers after each updateState and fires any
                      that match. also restores show: state on page load.

log.js              — event log persistence and rendering.

widgets/
  hud.js            — subscribes to store, renders energy and income rates.
  primates.js       — handles button clicks for the primates widget.

main.js             — wires everything together. imports all widgets so they
                      register their subscriptions, and connects anki to the game.
```

### Adding a new widget

1. Add the HTML element to `index.html` (use `hidden` if it should be unlocked later)
2. Create `widgets/your-widget.js` — import `subscribe` from `store.js`, define a `render(state)` function, call `subscribe(render)`
3. Import it in `main.js`
4. To unlock it via a narrative event, add `show: '#your-widget-id'` to an entry in `events.js`

### Console debugging

```js
__game.getState()            // inspect current state
__game.updateState({ energy: 500 })  // set values directly
__game.reset()               // wipe state and restart
```
