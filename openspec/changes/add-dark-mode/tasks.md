## 1. Theme UI

- [ ] 1.1 Add light and dark color tokens in `index.html`, apply the supplied palette to the page, fields, labels, output, copy icon, and focus indicators, and set native control `color-scheme` for each appearance.
- [ ] 1.2 Add a labeled, keyboard-operable theme toggle near the heading that exposes whether dark mode is active.

## 2. Preference behavior and checks

- [ ] 2.1 Initialize the effective theme before the page renders using saved choice or system preference; handle live system changes until a visitor explicitly chooses, persist manual choices, and keep switching usable when storage is unavailable.
- [ ] 2.2 Update the existing Node regression harness for the early script; add checks for system preference, manual override, reload, and unchanged text transformations.
- [ ] 2.3 Verify both themes in a browser, including labels, placeholders, checkbox, copy control, keyboard focus, and switching while input/output are populated; run the Node regression check and note theme behavior in `README.md`.
