## Why

People can prepend and append text to lines, but cannot change the separators between words without editing the result by hand. A configurable word separator makes the tool useful for outputs like `hello-world` or `hello_world`.

## What Changes

- Add an optional, single-character replacement input for whitespace between words. Leaving it empty preserves current behavior.
- Replace each run of spaces or tabs between words with one chosen character. Keep leading and trailing whitespace and line breaks subject to the existing trim and line-break options.
- Update the preview as the replacement changes and document the option in the README.

## Capabilities

### New Capabilities
- `word-whitespace-replacement`: Configure a character to replace each intra-line whitespace gap between words in the output.

### Modified Capabilities

None.

## Impact

`index.html` gains an input and transformation step; `README.md` gains usage guidance. No dependencies or external APIs change.
