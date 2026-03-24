## Text Formatting Tags

In HTML5, text formatting tags provide semantic ways to emphasize, annotate, and structure content without relying on CSS. These tags improve accessibility, readability, and maintainability while keeping your markup clean and meaningful. We’ll explore each tag in detail with practical examples—no fluff, just actionable knowledge.

### `<strong>` Tag

The `<strong>` tag denotes text with **critical importance**. Unlike purely presentational tags, it carries semantic meaning for accessibility (screen readers announce it as "strong"), making it ideal for headings, warnings, or key concepts. This is the *only* text formatting tag that should be used for emphasis that impacts the document’s meaning.

**Example**:  
```html
<p>This is a <strong>critical error</strong> in our system.</p>
```
Rendered as: *This is a **critical error** in our system.*

**Why use `<strong>`?**  
- Screen readers highlight it as "strong" (e.g., "critical error" is read with emphasis)  
- Works with ARIA roles for dynamic content  
- Preferred over `<b>` for accessibility compliance  

### `<em>` Tag

The `<em>` tag represents **emphasized text** with less intensity than `<strong>`. It’s used for words that need subtle emphasis (e.g., stressed terms in sentences, foreign words, or parenthetical notes). Screen readers announce it as "emphasized," but it doesn’t carry the same weight as `<strong>`.

**Example**:  
```html
<p>She said, "This is an <em>important</em> message."</p>
```
Rendered as: *She said, "This is an *important* message."*

**Key difference from `<i>`**:  
- `<em>` = semantic emphasis (read as "emphasized")  
- `<i>` = visual italics (read as "italic")  

### `<b>` Tag

The `<b>` tag applies **bold formatting** without semantic meaning. It’s purely presentational and should be used sparingly—only for stylistic bolding where semantic intent isn’t critical (e.g., decorative elements). Modern best practices recommend using `<strong>` instead for emphasis to avoid accessibility issues.

**Example**:  
```html
<p>This is a <b>bold</b> sentence for visual effect.</p>
```
Rendered as: *This is a **bold** sentence for visual effect.*

**When to avoid `<b>`**:  
- Never use for critical emphasis (use `<strong>`)  
- Avoid in accessibility-compliant workflows (screen readers ignore it)  

### `<i>` Tag

The `<i>` tag denotes **italicized text**. It’s used for visual styling (e.g., foreign words, scientific terms, or parenthetical notes) but *not* for semantic emphasis. Screen readers typically read it as "italic" or ignore it—this is why it’s less common than `<em>` for accessibility.

**Example**:  
```html
<p>The word <i>italic</i> is written in italics.</p>
```
Rendered as: *The word *italic* is written in italics.*

**Practical tip**:  
Use `<i>` only when you need *visual* italics (not semantic emphasis). For emphasis, always prefer `<em>`.

### `<mark>` Tag

The `<mark>` tag highlights text for **special attention** (e.g., annotations, warnings, or user-generated highlights). It’s particularly useful for accessibility since screen readers can distinguish it as "marked" text. This tag is often used in content review workflows.

**Example**:  
```html
<p>This is a <mark>highlighted</mark> section of text.</p>
```
Rendered as: *This is a <mark>highlighted</mark> section of text.*

**Real-world use cases**:  
- Marking errors in user-submitted content  
- Highlighting key phrases in documentation  
- Creating visual cues for screen readers  

### `<small>` Tag

The `<small>` tag reduces text size for **secondary content** (e.g., footnotes, copyright notices, or small print). It’s ideal for small text that doesn’t require bolding or emphasis but needs to stand out visually from the main content.

**Example**:  
```html
<p>This is normal text. <small>Small text here.</small></p>
```
Rendered as: *This is normal text. <small>Small text here.</small>*

**Accessibility note**:  
- Screen readers don’t alter text size with this tag (it’s purely visual)  
- Use for legal disclaimers or metadata where size matters  

### Text Formatting Tags Comparison

| Tag      | Purpose                                  | Accessibility Meaning       | Example Use Case                     | Visual Style       |
|----------|------------------------------------------|-----------------------------|--------------------------------------|---------------------|
| `<strong>` | Critical importance                     | "Strong" (high priority)    | Error messages, headings            | **Bold**            |
| `<em>`     | Subtle emphasis                         | "Emphasized"                | Stressed words, foreign terms       | *Italic*            |
| `<b>`     | Pure visual bolding                     | None (ignored)              | Decorative bolding                 | **Bold**            |
| `<i>`     | Visual italics                          | "Italic" (or ignored)       | Foreign words, scientific terms    | *Italic*            |
| `<mark>`  | Highlighted text (attention)             | "Marked" (high priority)    | Annotations, warnings              | ✅ Highlighted      |
| `<small>` | Reduced font size                       | None (ignored)              | Copyright, footnotes               | Smaller font        |

**Critical insight**:  
Always prioritize semantic meaning over visual styling. Use `<strong>` for critical emphasis and `<em>` for subtle emphasis—never `<b>` or `<i>` for semantic intent.

## Summary

We’ve covered six essential HTML5 text formatting tags: `<strong>` (critical emphasis), `<em>` (subtle emphasis), `<b>` (pure visual bolding), `<i>` (visual italics), `<mark>` (highlighted text), and `<small>` (reduced size). Each serves a distinct purpose with accessibility implications:  
- **Use `<strong>`** for critical emphasis (screen readers announce it as "strong")  
- **Use `<em>`** for subtle emphasis (screen readers announce it as "emphasized")  
- **Avoid `<b>` and `<i>`** for semantic meaning—reserve them for visual styling only  
- **Use `<mark>`** for user-generated highlights or warnings  
- **Use `<small>`** for secondary text with reduced size  

Semantic HTML isn’t just about aesthetics—it’s the foundation of accessible, maintainable web content. By choosing the right tag for the right purpose, you create experiences that work for *all* users. 💡