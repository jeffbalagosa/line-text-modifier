## Context

See `proposal.md` for motivation and `specs/field-label-spacing/spec.md` for the required rendered-gap measurements.

The page is a single dependency-free `index.html`. Each covered label and field shares a plain `div`, within either the column-flex `.container` or the `.transform-inputs` grid. Labels remain inline. The fields occupy 100% of their wrapper's content width and flow onto the line after the label. Labels can wrap within that same inline formatting context.

The shared label rule declares `margin-bottom: 5px`, but vertical margins on non-replaced inline boxes do not determine line-box height. The existing visible gap comes from font metrics, line boxes, and the browser's control alignment, rather than a reliable 5px margin. Checkbox labels have a separate flex layout. The output copy button is absolutely positioned against `.output-section`, with `top: calc(10px + 1rem)`.

The ambiguity worth resolving here is how to add exactly 5 CSS pixels without replacing the existing formatting context. CSS defines relative positioning as an offset applied after normal-flow layout, preserving size and line breaks. See [CSS relative positioning](https://www.w3.org/TR/CSS2/visuren.html#relative-positioning) and [inline height calculations](https://www.w3.org/TR/CSS2/visudet.html#inline-non-replaced).

## Goals / Non-Goals

**Goals:**

- Preserve the pre-change inline layout as the baseline and add a fixed 5px offset to each field's rendered border box.
- Reserve the displaced space in the wrapper so the increased gap does not consume the existing separation from the next group.
- Keep the copy button at its existing position relative to the output field.

**Non-Goals:**

- Normalize browser-specific baseline gaps, change label display modes, or introduce a new field-layout component.
- Add JavaScript measurements, dependencies, or a browser-test framework to the application.

## Decisions

### Offset fields after normal-flow layout

Add `position: relative` and `top: 5px` to the existing shared `textarea, input[type="text"]` rule. In the current markup this selector covers exactly the five fields named in the spec. Keep label typography, display, margins, and field dimensions as they are.

Relative positioning moves the field's rendered border box down by exactly 5px without changing the inline layout that placed it. The label's final text line stays at its normal-flow position, including when it wraps. If `F` is the original field-border top and `L` the original final label-line bottom, the original gap is `F - L`; the new gap is `(F + 5) - L`, exactly 5px larger. A common displacement of the wrapper by `D` cancels from the comparison: `(F + D + 5) - (L + D)`.

Changing the inline label margin from 5px to 10px would not produce the required layout gap. Making labels block-level and setting a margin or flex/grid gap would change the original line-box and control-baseline geometry, so a nominal 5px increment would not prove the required rendered delta. A transform could also provide a visual offset, but relative positioning supplies the same offset without creating a transform stacking context.

### Reserve the offset below each field wrapper

Add one grouped rule with `padding-bottom: 5px` for these selectors:

```css
.container > div:not(.transform-inputs),
.transform-inputs > div:not(.checkbox-container)
```

Against the current source, this selects only the Input Text wrapper, the three text-input wrappers, and `.output-section`. It excludes the grid container and checkbox groups. These wrappers currently have no padding or fixed height.

Bottom padding increases the space each wrapper occupies without changing its content width, content origin, line boxes, or label wrapping. It compensates for the field's downward offset and keeps the original clearance below the rendered field. The outer container and grid retain their existing 20px gaps. Grid items can still stretch to their row height as before.

Using only the visual offset would consume 5px of the following group's clearance. Putting the compensating margin on the inline field could change its line-box height and baseline alignment. Wrapper padding avoids both problems. Reuse the existing wrapper structure rather than adding classes or elements solely for this adjustment.

### Move the output copy button with its field

Change `.copy-icon` to `top: calc(15px + 1rem)`, adding the same 5px offset as the output textarea. `.output-section` remains the button's positioning ancestor. Bottom padding does not move that ancestor's top edge.

This preserves the button's pre-change offset from the textarea border under each matching viewing condition. Repositioning the button through a new wrapper or JavaScript would add unnecessary structure. Leaving its top offset unchanged would move it 5px upward relative to the field.

### Verify rendered deltas against the original page

During implementation, record a baseline from the original `index.html` before applying these CSS edits. Use the same browser, viewport dimensions, zoom, font settings, and theme for each before-and-after pair, as required by the spec.

For each field ID, find its associated `label[for]`. Create a DOM `Range` over the label's text and use its `getClientRects()` to identify the bottom edge of the final rendered text line. Measure the field's top outer border with `getBoundingClientRect().top`. Subtract the text-line bottom from the field top and record all five gaps in CSS pixels. Do not measure the label wrapper's height, include its margin, or infer the gap from computed CSS declarations.

Repeat the measurements after the change. Require each gap delta to equal 5 CSS pixels, retaining fractional coordinates rather than rounding to screen pixels. Allow only numerical floating-point noise in the comparison, not a visual tolerance that permits a different gap.

Cover desktop and the single-column responsive layout, with both themes. Include narrow viewport cases where covered labels actually wrap; confirm the measured text rectangles include multiple lines and use the final line. Use additional narrow cases as needed to exercise short labels too. Check widths and line counts against the baseline so unexpected horizontal reflow is visible.

Also inspect the lower clearance of each field, resize the textareas, and confirm the copy button's offset from the output border is unchanged and the button remains clickable. The existing `node tests/word-whitespace.cjs` check can verify functional regressions during implementation, but its DOM stand-in cannot verify rendered spacing. Browser geometry is the acceptance evidence.

## Risks / Trade-offs

- Relative offsets do not enlarge normal-flow boxes. Mitigation: pair every field's 5px offset with 5px of bottom padding on its wrapper.
- The wrapper selectors depend on the current two-level markup. Mitigation: verify they match exactly five wrappers during implementation and revisit them if field groups are later reorganized.
- Browser font metrics produce different absolute baseline gaps. Mitigation: compare each field against its own pre-change gap under identical viewing conditions; do not hard-code an assumed original gap.
- Rasterized screenshots can obscure fractional CSS-pixel geometry. Mitigation: use DOM text-line and border coordinates for the exact delta, with visual inspection for overlap and focus behavior.
- The copy button's existing top formula does not derive its position from a wrapped output label. Mitigation: preserve its before-and-after field-relative offset by adding the same 5px, and check the wrapped-label cases rather than redesigning the button anchor in this change.

## Migration plan

Capture the browser baselines, apply the three CSS edits in `index.html`, and run the rendered-gap and regression checks above. Deploy the updated static page through the existing delivery method. Rollback consists of removing the field offsets and wrapper padding and restoring the copy button's original top value.
