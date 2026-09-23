# Line Text Modifier

A simple, browser-based tool for modifying text line by line.

## Features

- **Prepend Text**: Add text to the beginning of each line
- **Append Text**: Add text to the end of each line
- **Word Gap Replacement**: Replace each space/tab gap between words with one chosen character
- **Whitespace Trimming**: Remove leading and trailing whitespace from each line
- **Line Break Removal**: Combine all lines into a single continuous string
- **Real-time Preview**: See changes immediately as you type
- **Copy to Clipboard**: Easily copy the modified text with one click

## Usage

1. Open index.html in any web browser
2. Paste or type your text in the "Input Text" area
3. Configure your modifications:
   - Add text to prepend to each line
   - Add text to append to each line
   - Optionally enter a character in "Replace Word Gaps With". It is blank by default, which preserves spaces and tabs. Each run of spaces/tabs between words becomes one chosen character, so `one   two` becomes `one-two` with `-`. Leading/trailing whitespace, line breaks, and prepend/append text are unaffected by this option.
   - Check "Remove Whitespace at Start and End of Each Line" to remove edge whitespace without changing gaps between words
   - Check "Remove Line Breaks" to join all lines together
4. The modified text appears in the "Output Text" area in real-time
5. Click the copy icon to copy the result to your clipboard

## Implementation

The tool is built with vanilla HTML, CSS, and JavaScript with no external dependencies. It works entirely in the browser with no server-side processing.

## Regression check

Run `node tests/word-whitespace.cjs` to check transformations and live-update handlers. The check uses Node.js built-ins; no packages are required.

## Browser Compatibility

Works in all modern browsers that support ES6 and the Clipboard API.
