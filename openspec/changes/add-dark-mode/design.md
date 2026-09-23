## Context

`index.html` contains the entire UI, stylesheet, and transformation logic. It has fixed light colors, no theme state, and no build step. The existing Node regression check extracts the first inline script, so adding an early theme script requires updating that check.

## Goals / Non-Goals

**Goals:** Keep theming in `index.html`, apply a saved choice before the page paints, and leave text transformations alone.

**Non-Goals:** No theme library, gradient treatment, server persistence, or separate theme settings page. The supplied gradients are optional examples; solid colors keep form text legible.

## Decisions

- Use CSS custom properties for page, form, text, border, accent, and focus colors. Keep the current light values as the base; use a root `data-theme="dark"` selector for dark tokens. Set `color-scheme` per theme for native form controls. Prefer semantic `currentColor` for the copy icon. This avoids duplicating whole component rules. Alternative: two full stylesheets; that would duplicate layout styling.
- Use an early, small inline script in the head to read an explicit `light`/`dark` choice from `localStorage` and otherwise read `matchMedia('(prefers-color-scheme: dark)')`. Apply the effective choice to the root before visible content. The bottom script binds a labeled button with `aria-pressed`, persists manual choices, and listens for media-query changes only when no explicit choice exists. Alternative: CSS media query alone cannot remember an override; bottom-only initialization can flash the wrong theme on reload.
- Treat unavailable storage as an in-memory choice for the open page; theme switching must still work. Keep the selector visually adjacent to the heading, with an obvious keyboard focus style. Do not put appearance state in the transformation function.

## Risks / Trade-offs

- [Storage is blocked or cleared] -> Use the current system preference on the next load; retain manual selection for the current page.
- [An early inline script changes the test harness's first-script assumption] -> Update the existing Node check to target the transformation script and add a small theme-state check with mocked storage, media query, and DOM. Run a browser check for colors, focus, and native controls.
- [A palette shade has weak contrast in a given role] -> Use ink black against celadon/alice blue for text on light accents; verify body text, form text, placeholders, icons, and focus in both modes rather than assigning every color indiscriminately.
