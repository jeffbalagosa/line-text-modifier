## Purpose

Lets users read and operate the text modifier in either a light or dark appearance, with a dark palette suited to low-light use.

## ADDED Requirements

### Requirement: Dark appearance
The tool SHALL offer a dark appearance using ink black `#001a23`, pine teal `#31493c`, alice blue `#e8f1f2`, celadon `#b3efb2`, and muted teal `#7a9e7e`. The page, headings, labels, text fields, checkboxes, output, copy control, and focus indicators SHALL remain legible and visibly distinguishable in both appearances. The light appearance SHALL remain available.

#### Scenario: Dark theme covers the tool
- **WHEN** dark appearance is active
- **THEN** the page and interactive controls use the supplied dark palette rather than retaining bright light-theme backgrounds, and text and focus indicators remain visible

#### Scenario: Light theme remains usable
- **WHEN** light appearance is active
- **THEN** the page and controls retain a readable light appearance

### Requirement: Theme selection follows preference until overridden
Without a saved explicit choice, the tool SHALL follow the browser's system light/dark preference, including changes while the page is open. The tool SHALL provide a keyboard-operable, clearly labeled control to switch between light and dark appearances. An explicit choice SHALL override the system preference and persist across reloads in the same browser.

#### Scenario: First visit follows system preference
- **WHEN** a visitor opens the page without a saved choice and the browser prefers dark appearance
- **THEN** the tool displays dark appearance

#### Scenario: System preference changes before manual selection
- **WHEN** the browser's preference changes from dark to light and no explicit choice has been made
- **THEN** the open page switches to light appearance

#### Scenario: Manual choice persists
- **WHEN** a visitor switches to light appearance while the browser prefers dark, then reloads the page
- **THEN** light appearance remains active and the control indicates the active appearance

#### Scenario: Manual choice ignores subsequent system changes
- **WHEN** a visitor has explicitly chosen dark appearance and the browser's preference changes
- **THEN** dark appearance stays active

### Requirement: Editing behavior is independent of appearance
Changing the appearance SHALL NOT alter input text, transformation settings, output text, or copy behavior.

#### Scenario: Switch while editing
- **WHEN** a visitor changes appearance after entering text and selecting transformations
- **THEN** the input, settings, and generated output remain unchanged
