# Line Text Modifier

A simple, browser-based tool for modifying text line by line.

## Features

- **Prepend Text**: Add text to the beginning of each line
- **Append Text**: Add text to the end of each line
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
   - Check "Trim Whitespace" to remove leading/trailing spaces from each line
   - Check "Remove Line Breaks" to join all lines together
4. The modified text appears in the "Output Text" area in real-time
5. Click the copy icon to copy the result to your clipboard

## Implementation

The tool is built with vanilla HTML, CSS, and JavaScript with no external dependencies. It works entirely in the browser with no server-side processing.

## Browser Compatibility

Works in all modern browsers that support ES6 and the Clipboard API.
