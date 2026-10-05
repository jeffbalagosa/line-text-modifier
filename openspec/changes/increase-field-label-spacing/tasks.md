## 1. Capture the browser baseline

- [x] 1.1 Before editing CSS, record all five label-to-field gaps from the original `index.html`. Use a DOM Range's `getClientRects()` for each label's final text-line bottom and `getBoundingClientRect().top` for the field's outer border. Record fractional CSS-pixel coordinates, field widths, label line counts, lower clearances, and the copy button's field-relative offset. Cover desktop and narrow single-column layouts in both themes, including additional narrow widths where each covered label actually wraps. Record browser, viewport dimensions, zoom, and font settings for matching post-edit comparisons.

## 2. Apply the CSS spacing adjustment

- [x] 2.1 In `index.html`, add `position: relative` and `top: 5px` to the shared `textarea, input[type="text"]` rule. Add grouped `padding-bottom: 5px` for `.container > div:not(.transform-inputs)` and `.transform-inputs > div:not(.checkbox-container)`. Confirm these wrapper selectors match exactly the five covered field groups.
- [x] 2.2 Change `.copy-icon` to `top: calc(15px + 1rem)` so it moves down with the output textarea.

## 3. Verify spacing and regressions

- [x] 3.1 Repeat the baseline browser measurements under identical viewing conditions. Record an exact +5 CSS-pixel gap delta for every field, including final-line measurements for wrapped labels, allowing only floating-point noise. Compare field widths and label line counts with the baseline to confirm no horizontal reflow.
- [x] 3.2 In the same desktop, narrow, and theme cases, confirm lower clearances and the copy button's field-relative offset match the baseline. Resize both textareas and check for overlap, visible keyboard focus, and a clickable copy button that copies the output.
- [x] 3.3 Run `node tests/word-whitespace.cjs` and record the regression result alongside the browser measurement evidence.
