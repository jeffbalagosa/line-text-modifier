## Browser baseline

Captured before any CSS edits on 2026-10-04 from commit `9260b988133385ac4c694d6ce29440c845294c38`, with a clean working tree.

- Browser: installed Microsoft Edge / Chromium `154.0.4258.53`, headless, Windows.
- Tooling: installed Playwright `1.60.0`, Node `v25.0.0`; no project dependencies added.
- Viewports: `1200 x 1000`, `390 x 1000`, `180 x 1600`, `96 x 1800`, each independently measured in light and dark themes.
- Fresh browser contexts, 100% zoom, `deviceScaleFactor: 1`, measured `devicePixelRatio: 1` and `visualViewport.scale: 1`.
- Fonts: body `16px Arial, sans-serif`; labels `700 16px Arial, sans-serif`; textareas `16px monospace`; root font size `16px`. Waited for `document.fonts.ready`.
- Served the unchanged page over loopback HTTP. Each label was measured with a DOM Range over its text, using the final text rectangle's bottom. Field coordinates are `getBoundingClientRect()` outer-border coordinates. All values below are fractional CSS pixels, without rounding.
- Browser runner: `C:\Users\jeffb\AppData\Local\Temp\opencode\field-spacing-browser.cjs`. Compact baseline data: `C:\Users\jeffb\AppData\Local\Temp\opencode\field-spacing-baseline.json`. These are temporary verification tools, not application files.

Both themes produced the same geometry in each viewport. Every baseline gap was exactly `1px`.

| Viewport | Field ID | Final label bottom | Field top | Field width | Label lines |
| --- | --- | ---: | ---: | ---: | ---: |
| 1200 x 1000 | inputText | 136.875 | 137.875 | 800 | 1 |
| 1200 x 1000 | prependString | 417.875 | 418.875 | 390 | 1 |
| 1200 x 1000 | appendString | 417.875 | 418.875 | 390 | 1 |
| 1200 x 1000 | wordSeparator | 495.875 | 496.875 | 390 | 1 |
| 1200 x 1000 | outputText | 573.875 | 574.875 | 800 | 1 |
| 390 x 1000 | inputText | 174.875 | 175.875 | 370 | 1 |
| 390 x 1000 | prependString | 494.875 | 495.875 | 370 | 1 |
| 390 x 1000 | appendString | 572.875 | 573.875 | 370 | 1 |
| 390 x 1000 | wordSeparator | 650.875 | 651.875 | 370 | 1 |
| 390 x 1000 | outputText | 728.875 | 729.875 | 370 | 1 |
| 180 x 1600 | inputText | 211.875 | 212.875 | 160 | 1 |
| 180 x 1600 | prependString | 601.875 | 602.875 | 160 | 2 |
| 180 x 1600 | appendString | 697.875 | 698.875 | 160 | 2 |
| 180 x 1600 | wordSeparator | 793.875 | 794.875 | 160 | 2 |
| 180 x 1600 | outputText | 871.875 | 872.875 | 160 | 1 |
| 96 x 1800 | inputText | 266.875 | 267.875 | 76 | 2 |
| 96 x 1800 | prependString | 656.875 | 657.875 | 152.6875 | 2 |
| 96 x 1800 | appendString | 752.875 | 753.875 | 152.6875 | 2 |
| 96 x 1800 | wordSeparator | 848.875 | 849.875 | 152.6875 | 2 |
| 96 x 1800 | outputText | 944.875 | 945.875 | 76 | 2 |

The transform grid has two `390px` columns at desktop, then one column of `370px`, `160px`, and `152.6875px` respectively. Its existing intrinsic minimum width exceeds the content width at the `96px` viewport; the baseline records this rather than assuming the grid fits that viewport.

Lower clearance is recorded both to the wrapper's bottom and to the nearest following normal-flow group. For the last output group, the latter uses the body's bottom edge.

| Field | Wrapper clearance | Following-group clearance, desktop | Following-group clearance, narrow |
| --- | ---: | ---: | ---: |
| inputText | 4 | 24 | 24 |
| prependString | 0 | 20 | 20 |
| appendString | 0 | 20 | 20 |
| wordSeparator | 0 | 20 | 20 |
| outputText | 4 | 24 | 14 |

The copy button's field-relative offsets were `x=766, y=8` at desktop, `x=336, y=8` at `390px`, `x=126, y=8` at `180px`, and `x=42, y=-10` at `96px`. Right inset was `10px` in every case. The negative vertical offset at `96px` is existing behavior with a wrapped output label.

The grouped wrapper selector matched exactly `inputText`, `prependString`, `appendString`, `wordSeparator`, and `outputText`, excluding the grid container and checkbox groups. All five labels genuinely wrapped in the `96px` case; the three text-input labels also wrapped at `180px`.

## CSS and rendered-gap verification

Tasks 2.1 and 2.2 were checked in the real browser after each edit. All five fields computed to `position: relative; top: 5px`, with `5px` bottom padding on exactly their five wrappers. The copy button computed top changed from `26px` to `31px`, matching `calc(15px + 1rem)` at the recorded root font size.

Task 3.1 repeated all eight baseline cases with identical browser version, viewport dimensions, scale, device pixel ratio, fonts, and themes. All 40 rendered gaps changed from exactly `1px` to exactly `6px`, a `+5px` delta with zero numerical error. Field widths, heights, label line counts, and grid columns were unchanged. Comparisons use a `1e-9` CSS-pixel tolerance only for floating-point noise.

Post-edit fractional coordinates below apply independently to both themes. Widths and line counts match the baseline table above.

| Viewport | Field ID | Final label bottom | Field top | Gap |
| --- | --- | ---: | ---: | ---: |
| 1200 x 1000 | inputText | 136.875 | 142.875 | 6 |
| 1200 x 1000 | prependString | 422.875 | 428.875 | 6 |
| 1200 x 1000 | appendString | 422.875 | 428.875 | 6 |
| 1200 x 1000 | wordSeparator | 505.875 | 511.875 | 6 |
| 1200 x 1000 | outputText | 588.875 | 594.875 | 6 |
| 390 x 1000 | inputText | 174.875 | 180.875 | 6 |
| 390 x 1000 | prependString | 499.875 | 505.875 | 6 |
| 390 x 1000 | appendString | 582.875 | 588.875 | 6 |
| 390 x 1000 | wordSeparator | 665.875 | 671.875 | 6 |
| 390 x 1000 | outputText | 748.875 | 754.875 | 6 |
| 180 x 1600 | inputText | 211.875 | 217.875 | 6 |
| 180 x 1600 | prependString | 606.875 | 612.875 | 6 |
| 180 x 1600 | appendString | 707.875 | 713.875 | 6 |
| 180 x 1600 | wordSeparator | 808.875 | 814.875 | 6 |
| 180 x 1600 | outputText | 891.875 | 897.875 | 6 |
| 96 x 1800 | inputText | 266.875 | 272.875 | 6 |
| 96 x 1800 | prependString | 661.875 | 667.875 | 6 |
| 96 x 1800 | appendString | 762.875 | 768.875 | 6 |
| 96 x 1800 | wordSeparator | 863.875 | 869.875 | 6 |
| 96 x 1800 | outputText | 964.875 | 970.875 | 6 |

## Clipboard blocker resolved

The first interaction run paused on desktop/light at its exact clipboard-readback assertion:

```text
Expected textarea/output text: "> one-two!\n> three!"
Actual Clipboard API readback: "> one-two!\r\n> three!"
```

With user approval, the runner loaded the original `index.html` into memory using `git show 9260b988133385ac4c694d6ce29440c845294c38:index.html`, without overwriting workspace files. It served original and current pages over the same loopback HTTP server and compared them in fresh contexts at all four recorded viewports and both themes. Browser version, viewport, zoom, device pixel ratio, fonts, and theme matched for each pair.

All eight original/current pairs produced exactly the same result. Each of the 16 textarea values contained LF, and every real Clipboard API readback contained CRLF. Each copy used a real mouse click with `event.isTrusted === true`, the unmodified Clipboard API, real clipboard permissions, and the application's successful copy toast.

This confirms the line-ending behavior predates the CSS change. Only the temporary interaction assertion now uses `clipboard.text.replace(/\r\n/g, '\n')` before comparing with the exact expected LF output. Standalone carriage returns and all other characters remain significant. The original/current comparison still checks raw clipboard strings for exact equality and the expected CRLF value. Application JavaScript is unchanged.

## Interaction verification complete

Task 3.2 passed in all eight viewport/theme cases after resolving the baseline clipboard behavior:

- All five fields' wrapper and following-group clearances matched the recorded baseline, including the output group's desktop/narrow distinction. The measured copy offsets and `10px` right inset also matched, including `y=-10px` when the output label wrapped at `96px`.
- Both textareas were resized with actual native mouse-handle drags from `200px` to `224px` and back to `200px` in every case: 32 successful drags in total. No CSS or script-driven size changes substituted for these drags. After every drag, field widths, label line counts, `6px` gaps, lower clearances, and copy offsets remained correct.
- Field/field and copy-button/output-label intersection checks found no overlap before resizing, after each resize, or after the copy interaction, including genuinely wrapped labels.
- Nine actual Tab presses per case reached the theme button, both textareas, both checkboxes, all three text inputs, and the copy button in DOM order: 72 successful keyboard-focus checks. Each control matched `:focus-visible`, had a solid `2px` outline with `2px` offset, intersected the viewport, and had no clipping ancestor. Outline color was `rgb(223, 230, 235)` in light mode and `rgb(179, 239, 178)` in dark mode.
- Eight further trusted copy-button clicks copied the actual transformed output `"> one-two!\n> three!"`. Real Clipboard API readbacks matched after only the confirmed CRLF-to-LF normalization, and the successful copy toast was visible in every case.
- The interaction run also repeated all 40 initial gap-delta, width, height, label-line-count, grid-column, and matching-view-condition checks successfully.

No browser verification blockers remain.

## Regression verification

Task 3.3 passed with exit code `0` using the existing dependency-free check:

```text
node tests/word-whitespace.cjs
19 regression cases, theme state, and live-update checks passed.
```

All six change tasks are complete. Application changes remain limited to the three specified CSS adjustments in `index.html`; no dependencies or persistent test framework were added.

## Commands used

All shell commands used the project root as their working directory. The temporary parent directory was checked with `Test-Path` before creating the runner and baseline data; all file edits used `apply_patch`.

```powershell
npm root -g
Test-Path -LiteralPath "C:\Users\jeffb\AppData\Local\Temp\opencode"
git status --short
git rev-parse HEAD
openspec instructions apply --change "increase-field-label-spacing" --json
node -e "const p=require('C:/Users/jeffb/AppData/Roaming/npm/node_modules/playwright'); console.log('Chromium API available:', Boolean(p.chromium));"
node "C:\Users\jeffb\AppData\Local\Temp\opencode\field-spacing-browser.cjs" baseline
node "C:\Users\jeffb\AppData\Local\Temp\opencode\field-spacing-browser.cjs" wrappers
node "C:\Users\jeffb\AppData\Local\Temp\opencode\field-spacing-browser.cjs" copy-style
node "C:\Users\jeffb\AppData\Local\Temp\opencode\field-spacing-browser.cjs" geometry
node "C:\Users\jeffb\AppData\Local\Temp\opencode\field-spacing-browser.cjs" clipboard-compare
node "C:\Users\jeffb\AppData\Local\Temp\opencode\field-spacing-browser.cjs" interactions
node tests/word-whitespace.cjs
git diff --check
git diff --stat
git diff -- index.html
git status --short
openspec instructions apply --change "increase-field-label-spacing" --json
```

To reproduce the original page independently, obtain `index.html` from the recorded baseline commit and serve it over loopback HTTP. Use the exact viewport and fresh-context settings above, then measure each `label[for]` with `Range.getClientRects()` and each field with `getBoundingClientRect()`. The saved baseline table supports comparison without relying on temporary files. The `geometry` and `interactions` runner modes target the current working-tree page; the `baseline` mode targets whichever page is currently in the working tree, so rerunning it now would measure the edited page.
