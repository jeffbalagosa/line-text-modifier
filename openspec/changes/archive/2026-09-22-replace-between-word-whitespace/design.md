## Context

`index.html` holds the controls and a single `transformText()` pipeline: split into lines, optionally trim, add prepend/append text, then join with or without line breaks. There are no dependencies or build tools. See `proposal.md` for motivation and `specs/word-whitespace-replacement/spec.md` for the output contract.

## Goals / Non-Goals

**Goals:** Keep the new option within the existing per-line, live-preview flow. Preserve the output when the option is blank.

**Non-Goals:** Replace whitespace at line boundaries, transform the prepend/append values, or add a library.

## Decisions

- Add a labeled text input beside the existing transform controls. Limit the entered value to one Unicode code point in the input handler and call `transformText()` there. Unlike `maxlength=1`, this allows a single supplementary-plane character such as an emoji. An empty value disables the replacement.
- After optional trimming and before adding prepend/append, replace runs of `[ \t]+` bounded by non-whitespace on the same line. Use a regex with a captured left-hand non-whitespace character and a right-hand lookahead; a replacement callback appends the chosen character to the captured value. This avoids replacing leading/trailing whitespace or relying on lookbehind support. Replacing after prepend/append would incorrectly alter user-supplied affix spaces.
- Keep existing line splitting and joining unchanged. A single regex across the whole input would risk treating line breaks as word gaps or altering how the Remove Line Breaks control joins lines.

## Risks / Trade-offs

- [A visually single grapheme may contain multiple code points] -> The control accepts the first code point only, matching the requested single-character scope; document this only if it becomes a reported need.
- [Regex could accidentally consume an edge space or affix] -> Check leading/trailing spaces, multiple gaps, tabs, affixes, and line-break controls in a small runnable or browser-based regression check.
