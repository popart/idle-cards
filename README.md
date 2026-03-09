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
