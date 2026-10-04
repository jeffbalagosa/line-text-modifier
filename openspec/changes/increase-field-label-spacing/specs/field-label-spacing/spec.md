## Purpose

Define the visible separation between field labels and their associated text inputs and textareas so users can distinguish each label from its field.

## ADDED Requirements

### Requirement: Increase visible label-to-field spacing by five pixels
The tool SHALL increase the visible vertical gap between each field label and its associated text input or textarea by 5 CSS pixels relative to the rendered gap before this change. This requirement SHALL apply to Input Text, Prepend to Each Line, Append to Each Line, Replace Word Gaps With, and Output Text.

The gap SHALL be measured from the bottom edge of the rendered label text box to the top outer border edge of its associated field. For a label that wraps, the bottom edge SHALL be that of its final line. Before-and-after comparisons SHALL use the same browser, viewport dimensions, zoom, font settings, and theme.

#### Scenario: Textarea labels have five additional pixels of separation
- **WHEN** the Input Text and Output Text label-to-textarea gaps are compared with their pre-change gaps under matching viewing conditions
- **THEN** each rendered gap is exactly 5 CSS pixels larger than its pre-change gap

#### Scenario: Text input labels have five additional pixels of separation
- **WHEN** the Prepend to Each Line, Append to Each Line, and Replace Word Gaps With label-to-input gaps are compared with their pre-change gaps under matching viewing conditions
- **THEN** each rendered gap is exactly 5 CSS pixels larger than its pre-change gap

#### Scenario: Wrapped labels retain the spacing increase
- **WHEN** a covered field label wraps onto multiple lines at a narrow viewport and its gap is compared with its pre-change gap under matching viewing conditions
- **THEN** the gap from the final label line to the field's top outer border is exactly 5 CSS pixels larger than its pre-change gap
