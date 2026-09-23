# Word whitespace replacement specification

## Purpose

Lets users choose a single character to stand in for whitespace gaps between words on each line of the live text preview.

## Requirements

### Requirement: Optional word-gap replacement
The tool SHALL provide an optional single-character input for replacing intra-line whitespace between non-whitespace text. When the input is empty, the tool SHALL retain its current output behavior.

#### Scenario: No replacement selected
- **WHEN** the replacement input is empty and the user enters `hello   world`
- **THEN** the output retains the three spaces between `hello` and `world`

#### Scenario: Replacement input changes
- **WHEN** the user enters `-` as the replacement character for input `hello world`
- **THEN** the live output becomes `hello-world` without an additional action

### Requirement: Replace each gap once without changing line boundaries
When a replacement character is set, the tool SHALL replace each uninterrupted run of spaces or tabs between non-whitespace text on the same line with one occurrence of that character. It SHALL leave line breaks untouched by this option and SHALL continue to honor the existing trim and remove-line-breaks controls.

#### Scenario: Multiple spaces and tabs form one gap
- **WHEN** the input line contains `one`, two spaces, `two`, a tab, and `three`, and the replacement is `_`
- **THEN** the output line is `one_two_three`

#### Scenario: Edge whitespace is not between words
- **WHEN** the input line is `  one  two  `, replacement is `-`, and trimming is off
- **THEN** the output line is `  one-two  `

#### Scenario: Existing line controls still apply
- **WHEN** the input is `  one two  ` followed by a line break and `three four`, replacement is `-`, trimming is on, and remove-line-breaks is off
- **THEN** the output is `one-two` followed by a line break and `three-four`

#### Scenario: Remove line breaks remains independent
- **WHEN** the input is `one two` followed by a line break and `three four`, replacement is `-`, and remove-line-breaks is on
- **THEN** the output is `one-twothree-four`

#### Scenario: Prepend and append text are preserved
- **WHEN** the input is `one two`, prepend is `> `, append is ` !`, and replacement is `_`
- **THEN** the output is `> one_two !`
