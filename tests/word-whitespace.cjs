const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');

const html = readFileSync(`${__dirname}/../index.html`, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(([, script]) => script);
assert.equal(scripts.length, 2);

// Minimal DOM stand-in to exercise both inline scripts and their event handlers.
function loadPage({ prefersDark = false, storage = {}, blocked = false } = {}) {
    const elements = Object.fromEntries([...html.matchAll(/id="([^"]+)"/g)].map(([, id]) => {
        const tag = html.match(new RegExp(`<[^>]*id="${id}"[^>]*>`))?.[0] || '';
        const classes = new Set();
        return [id, {
            value: '',
            textContent: '',
            checked: /\bchecked\b/.test(tag),
            attributes: {},
            listeners: {},
            classList: {
                add(name) { classes.add(name); },
                remove(name) { classes.delete(name); },
                contains(name) { return classes.has(name); },
            },
            setAttribute(name, value) { this.attributes[name] = value; },
            addEventListener(event, handler) { this.listeners[event] = handler; },
        }];
    }));
    const root = { dataset: {} };
    const media = {
        matches: prefersDark,
        addEventListener(event, handler) { this.onChange = handler; },
        change(matches) { this.matches = matches; this.onChange({ matches }); },
    };
    const localStorage = {
        getItem(key) { if (blocked) throw Error('blocked'); return storage[key]; },
        setItem(key, value) { if (blocked) throw Error('blocked'); storage[key] = value; },
    };
    const clipboardWrites = [];
    const alerts = [];
    const clock = {
        timer: null,
        setTimeout(handler, delay) { this.timer = { handler, delay }; return 1; },
        clearTimeout() { this.timer = null; },
        fire() { const timer = this.timer; this.timer = null; timer.handler(); },
    };
    const context = {
        document: { documentElement: root, getElementById: id => elements[id] },
        window: { matchMedia: () => media },
        localStorage,
        navigator: {
            clipboard: {
                writeText(value) {
                    clipboardWrites.push(value);
                    return { then(handler) { handler(); return { catch() {} }; } };
                },
            },
        },
        alert: message => alerts.push(message),
        setTimeout: (handler, delay) => clock.setTimeout(handler, delay),
        clearTimeout: id => clock.clearTimeout(id),
    };
    runInNewContext(scripts[0], context);
    const beforeRender = root.dataset.theme;
    runInNewContext(scripts[1], context);
    return { elements, root, media, storage, beforeRender, context, clipboardWrites, alerts, clock };
}

const { elements } = loadPage();
assert.equal(elements.outputText.value, '');
assert.equal(elements.trimLines.checked, true);
assert.equal(elements.removeLineBreaks.checked, false);
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

const system = loadPage({ prefersDark: true });
assert.equal(system.beforeRender, 'dark');
assert.equal(system.elements.themeToggle.attributes['aria-pressed'], 'true');
system.media.change(false);
assert.equal(system.root.dataset.theme, 'light');

const storage = {};
const manual = loadPage({ prefersDark: true, storage });
manual.elements.themeToggle.listeners.click();
assert.equal(manual.root.dataset.theme, 'light');
assert.equal(manual.elements.themeToggle.attributes['aria-pressed'], 'false');
assert.equal(storage.theme, 'light');
manual.media.change(false);
manual.media.change(true);
assert.equal(manual.root.dataset.theme, 'light');
const reload = loadPage({ prefersDark: true, storage });
assert.equal(reload.beforeRender, 'light');
assert.equal(reload.elements.themeToggle.attributes['aria-pressed'], 'false');

const unavailable = loadPage({ prefersDark: false, blocked: true });
unavailable.elements.themeToggle.listeners.click();
unavailable.media.change(false);
assert.equal(unavailable.root.dataset.theme, 'dark');

const copy = loadPage();
assert.match(html, /<div id="copyToast" role="status" aria-live="polite"><\/div>/);
assert.equal(copy.elements.copyToast.textContent, '');
copy.elements.outputText.value = 'copy me';
copy.context.copyOutput();
assert.deepEqual(copy.clipboardWrites, ['copy me']);
assert.deepEqual(copy.alerts, []);
assert.equal(copy.elements.copyToast.textContent, 'Text copied to clipboard!');
assert.equal(copy.elements.copyToast.classList.contains('visible'), true);
assert.equal(copy.clock.timer.delay, 2000);
copy.clock.fire();
assert.equal(copy.elements.copyToast.textContent, '');
assert.equal(copy.elements.copyToast.classList.contains('visible'), false);

// Theme switching must not touch an in-progress transformation.
update('inputText', 'one two');
update('wordSeparator', '-');
const before = [elements.inputText.value, elements.wordSeparator.value, elements.outputText.value];
elements.themeToggle.listeners.click();
assert.deepEqual([elements.inputText.value, elements.wordSeparator.value, elements.outputText.value], before);

console.log(`${cases.length} regression cases, theme state, and live-update checks passed.`);
