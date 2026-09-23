## Why

The tool has a fixed light appearance, which is uncomfortable to use in dark environments. Add a dark theme using the supplied palette without changing the text transformation workflow.

## What Changes

- Add a dark theme using ink black `#001a23`, pine teal `#31493c`, alice blue `#e8f1f2`, celadon `#b3efb2`, and muted teal `#7a9e7e` across the page and controls.
- Follow the browser's system color preference by default and provide an accessible light/dark toggle. Remember a user's explicit choice across reloads; until they choose, follow system preference changes.
- Keep both themes readable, including text inputs, output, labels, copy control, focus states, and browser-rendered controls.

## Capabilities

### New Capabilities

- `appearance-theme`: Selection, persistence, and readable rendering of light and dark appearances.

### Modified Capabilities

None. The existing `word-whitespace-replacement` behavior does not change.

## Impact

- `index.html` HTML, CSS, and minimal client-side JavaScript for theme selection.
- Browser-only behavior; no server, API, or new dependency. Existing text processing stays unchanged.
