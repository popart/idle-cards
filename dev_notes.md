# Dev Notes

## Card Rendering

Cards are rendered in `<iframe srcdoc="...">` elements so that HTML and JavaScript in card content executes properly (`innerHTML` does not run scripts).

### Sizing
The iframe height is set dynamically using a `ResizeObserver` on `doc.documentElement` (the `<html>` element, not `body`). Using `body.scrollHeight` is unreliable due to default body margins and lazy-loading content. Body margin is zeroed out manually via `doc.body.style.margin = '0'`.

### Card HTML
`cardsInfo` returns `question` and `answer` as fully rendered HTML strings, including the card's `<style>` block. No need to inject `css` separately.

### Platform classes
Anki adds platform classes (`win`, `linux`, `mac`, `mobile`) to the `<html>` element when rendering cards. Card stylesheets often scope rules to these classes (e.g. `html.linux:not(.android)`). Since the iframe starts with no classes, these rules are ignored by default.

Fix: add the appropriate class in the `onload` handler:
```js
doc.documentElement.classList.add('linux');
```

Use `'win'` if the card was primarily styled for Windows, or add both.
