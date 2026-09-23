const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');

const html = readFileSync(`${__dirname}/../index.html`, 'utf8');
// Minimal DOM stand-in to exercise the page's actual script and event handlers.
const elements = Object.fromEntries([...html.matchAll(/id="([^"]+)"/g)].map(([, id]) => [id, {
    value: '',
    checked: false,
    listeners: {},
    addEventListener(event, handler) { this.listeners[event] = handler; },
}]));
runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], {
    document: { getElementById: id => elements[id] },
});
assert.equal(elements.outputText.value, '');
assert.match(html, /<label for="wordSeparator">/);

function update(id, value) {
    const element = elements[id];
    const checkbox = typeof value === 'boolean';
    element[checkbox ? 'checked' : 'value'] = value;
    element.listeners[checkbox ? 'change' : 'input']();
}

const cases = [
    ['blank default', { inputText: 'hello   world\tagain' }, 'hello   world\tagain'],
    ['single gap', { inputText: 'hello world', wordSeparator: '-' }, 'hello-world'],
    ['multiple gaps', { inputText: 'one  two\tthree', wordSeparator: '_' }, 'one_two_three'],
    ['mixed gap', { inputText: 'a \t  \tb c', wordSeparator: '-' }, 'a-b-c'],
    ['edge whitespace', { inputText: ' \tone  two\t ', wordSeparator: '-' }, ' \tone-two\t '],
    ['trim and lines', { inputText: '  one two  \nthree four', wordSeparator: '-', trimLines: true }, 'one-two\nthree-four'],
    ['remove line breaks', { inputText: 'one two\nthree four', wordSeparator: '-', removeLineBreaks: true }, 'one-twothree-four'],
    ['affixes', { inputText: 'one two', wordSeparator: '_', prependString: '> ', appendString: ' !' }, '> one_two !'],
    ['all controls', { inputText: ' a b \n\n c d ', wordSeparator: '-', prependString: '> ', appendString: ' !', trimLines: true, removeLineBreaks: true }, '> a-b !> c-d !'],
    ['line endings', { inputText: 'a b\r\nc d\re f\ng h', wordSeparator: '-' }, 'a-b\nc-d\ne-f\ng-h'],
    ['empty line', { inputText: 'a b\n\nc d', wordSeparator: '-', prependString: '>' }, '>a-b\n\n>c-d'],
    ['whitespace-only line', { inputText: 'a b\n \t \nc d', wordSeparator: '-' }, 'a-b\n \t \nc-d'],
    ['empty input', { inputText: '', wordSeparator: '-', prependString: '>' }, ''],
    ['whitespace-only input', { inputText: ' \t\n ', wordSeparator: '-' }, ''],
    ['other whitespace unchanged', { inputText: 'a\u00a0b\v c', wordSeparator: '-' }, 'a\u00a0b\v c'],
    ['literal dollar', { inputText: 'a b c', wordSeparator: '$' }, 'a$b$c'],
    ['space separator', { inputText: 'a\t  b', wordSeparator: ' ' }, 'a b'],
    ['pasted characters', { inputText: 'a b', wordSeparator: '-_' }, 'a-b'],
    ['supplementary code point', { inputText: 'a b c', wordSeparator: '😀_' }, 'a😀b😀c'],
];

for (const [name, values, expected] of cases) {
    for (const element of Object.values(elements)) {
        element.value = '';
        element.checked = false;
    }
    for (const [id, value] of Object.entries(values)) update(id, value);
    assert.equal(elements.outputText.value, expected, name);
    assert.equal(Array.from(elements.wordSeparator.value).length <= 1, true, name);
}

// Edits to either the separator or text refresh the output without another action.
update('wordSeparator', '_');
assert.equal(elements.outputText.value, 'a_b_c');
update('inputText', 'one  two');
assert.equal(elements.outputText.value, 'one_two');
update('wordSeparator', '');
assert.equal(elements.outputText.value, 'one  two');

console.log(`${cases.length} regression cases and live-update checks passed.`);
