## Text Properties

In the world of web typography, text properties are the foundation of readable, engaging, and accessible content. These subtle yet powerful CSS rules shape how words interact with users, influencing everything from visual harmony to cognitive processing. Let's dive into five essential text properties that every CSS practitioner should master—practiced with precision and purpose.

### Text Alignment

Text alignment defines how text flows within its container horizontally. This property is critical for creating visual rhythm and balancing content across layouts. The default value `left` is the most common, but strategic alignment choices can dramatically improve readability and aesthetics.

**Key values** include:
- `left`: Text aligns to the left (default)
- `right`: Text aligns to the right
- `center`: Text aligns to the center
- `justify`: Text aligns to both left and right edges (common for paragraphs)
- `multiline`: Text aligns to the right for multi-line text (less common)

```css
/* Left alignment (default) */
p {
  text-align: left;
}

/* Center alignment */
.centered-text {
  text-align: center;
}

/* Justified alignment */
.paragraph {
  text-align: justify;
  /* Note: Justification often requires manual line breaks for readability */
}
```

**Real-world example**: Consider a blog post where paragraphs flow naturally from left to right. Using `text-align: justify` on paragraphs creates a clean, professional look—though be cautious as over-justification can cause uneven spacing between words. For responsive designs, you might switch to `text-align: left` on mobile to maintain readability.

### Line Height

Line height controls the vertical space between lines of text. It’s arguably the most impactful text property for readability and visual comfort. Unlike font size, line height operates independently and can dramatically alter how text feels—too short creates strain, too long reduces density.

**How it works**:
- **Numerical value**: Relative to font size (e.g., `1.5` = 1.5 times the font size)
- **Length units**: `em`, `rem`, `px`, `pt` (e.g., `1.2em`)
- **Default**: `1.2` (a good baseline for most body text)

```css
/* Body text with optimal line height */
body {
  line-height: 1.5;
}

/* Custom line height for headings */
h1 {
  line-height: 1.2;
}

/* Using relative units */
.card {
  line-height: 1.4em;
}
```

**Why it matters**: Research shows that a line height of **1.5** (for body text) reduces eye fatigue while maintaining sufficient spacing. For short paragraphs, try `1.4em`—it creates a gentle rhythm that feels natural to the eye. In print design, line height is often called *leading*, but in CSS, we use `line-height` for digital contexts.

### Letter Spacing

Letter spacing (or *letter-spacing*) adjusts the horizontal space between individual characters. This property is subtle but powerful for enhancing legibility, creating visual interest, or improving accessibility.

**Common use cases**:
- Fixing tight text in small fonts
- Adding visual weight to headings
- Creating stylistic effects (e.g., "slab" fonts)
- Improving readability for users with visual impairments

```css
/* Default letter spacing (0) */
p {
  letter-spacing: 0;
}

/* Subtle spacing for readability */
.readable-text {
  letter-spacing: 0.05em;
}

/* Bold spacing for emphasis */
.emphasized {
  letter-spacing: 0.2em;
}
```

**Pro tip**: For accessibility, a small positive letter spacing (e.g., `0.05em`) can help users with dyslexia or low vision. However, excessive spacing (`> 0.5em`) may reduce readability—always test with real users!

### Text Transform

Text transform manipulates the case of text characters. This property is essential for consistency in user interfaces and branding, especially when dealing with titles, headings, or labels that require specific casing.

**Key values**:
- `none`: No transformation (default)
- `uppercase`: Converts all letters to uppercase
- `lowercase`: Converts all letters to lowercase
- `capitalize`: Capitalizes the first letter of each word
- `sentence-case`: Capitalizes the first letter of sentences (not standard; use `capitalize` for most cases)

```css
/* Uppercase for headings */
h1 {
  text-transform: uppercase;
}

/* Sentence case for titles */
.title {
  text-transform: capitalize;
}

/* Lowercase for subtle effects */
.footer {
  text-transform: lowercase;
}
```

**When to use**: Avoid `uppercase` for body text—it reduces readability. Use `capitalize` for titles or labels where semantic clarity matters (e.g., "Product Name" vs. "product name"). For accessibility, ensure text transforms don't create confusion—e.g., `uppercase` might be harder to read for screen readers.

### Text Decoration

Text decoration adds visual effects to text—like underlines, strikethroughs, or custom styles—to enhance usability and aesthetics. This property is crucial for interactive elements and semantic cues.

**Common values**:
- `none`: Removes all decorations (default)
- `underline`: Adds a line below text
- `overline`: Adds a line above text
- `line-through`: Adds a strike-through
- `blink`: Creates a blinking effect (rarely used for accessibility)

```css
/* Standard link styling */
a {
  text-decoration: underline;
}

/* Custom link with hover effect */
a:hover {
  text-decoration: underline;
  text-decoration-color: #007bff;
}

/* Strikethrough for completed tasks */
.completed {
  text-decoration: line-through;
}

/* Custom underline for accessibility */
.accessible-link {
  text-decoration: underline;
  text-decoration-color: #333;
}
```

**Accessibility note**: Always use `text-decoration: none` for links that aren’t interactive (e.g., `a` tags in navigation menus) to avoid accidental clicks. For screen readers, ensure decorative underlines don’t interfere with text flow.

## Summary

Mastering these text properties transforms your typography from functional to impactful. **Text alignment** guides horizontal flow, **line height** controls vertical breathing space, **letter spacing** refines character density, **text transform** standardizes casing, and **text decoration** adds intentional visual cues. Each property—when applied thoughtfully—contributes to readability, accessibility, and emotional resonance. Start small: experiment with line height for body text, then layer in letter spacing and text transform for polish. Remember, great typography isn’t about rules—it’s about understanding *how* users experience text. 🌟