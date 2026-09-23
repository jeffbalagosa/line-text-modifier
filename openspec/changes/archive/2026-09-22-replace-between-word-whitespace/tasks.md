## 1. Add the word-gap option

- [x] 1.1 Add a labeled, optional replacement-character input to `index.html`; constrain its value to one Unicode code point and refresh the preview on input.
- [x] 1.2 Update the per-line transformation in `index.html` to replace each interior run of spaces/tabs with the chosen character after trimming and before prepend/append, leaving blank-option and line-break behavior unchanged.

## 2. Check behavior and document it

- [x] 2.1 Run a focused regression check for blank replacement, single and multiple word gaps, tabs, edge spaces, trim, line-break removal, affixes, and live updates.
- [x] 2.2 Update `README.md` to explain the new input, its blank default, and its one-character-per-gap behavior.
