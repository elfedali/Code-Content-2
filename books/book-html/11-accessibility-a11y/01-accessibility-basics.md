## Accessibility Basics

Accessibility isn't just a compliance checkbox—it's the foundation of inclusive digital experiences that work for *everyone*. In this section, we'll dive into three essential pillars of web accessibility: **ARIA Roles**, **Keyboard Navigation**, and **Alt Text**. These concepts form the backbone of accessible interfaces and are critical for developers to implement from day one. Let's build confidence in your accessibility practices with practical, actionable knowledge.

---

### ARIA Roles: The Semantic Language of Accessible UIs

ARIA (Accessible Rich Internet Applications) roles provide semantic meaning to elements that native HTML doesn't fully cover. Think of them as "accessibility labels" that help screen readers and assistive technologies understand the *purpose* of interactive elements. Without proper roles, your interfaces can become opaque to users who rely on alternative input methods.

**Why roles matter**:  
When you create custom UI components (like dropdowns, sliders, or custom buttons), native HTML elements often lack the precise semantic context needed by assistive technologies. ARIA roles bridge this gap by defining the *functional role* of an element. For example, a `<div>` with a `role="button"` tells screen readers: *"This is a clickable button, not a container."*

**Key principles to remember**:
1.  Use roles *only* when native HTML elements aren't sufficient (e.g., custom form controls)
2.  Always pair roles with `id` and `aria-label`/`aria-labelledby` for context
3.  Avoid overusing roles—keep the interface predictable

Here's a concrete example of a custom button with ARIA roles:

```html
<button 
  aria-role="button" 
  aria-label="Submit the form"
  class="custom-button"
>
  🔒 Submit
</button>
```

*Why this works*:  
The `role="button"` explicitly signals to screen readers that this is a clickable control (not a decorative link). The `aria-label` provides a clear, concise description for users who can't see the button text. This avoids the confusion that would occur if we used a plain `<div>` with just a `class="button"`.

**Common role pitfalls to avoid**:
- ❌ Using `role="button"` on a `<a>` tag (use `role="link"` instead for hyperlinks)
- ❌ Forgetting `aria-label` when the button has no visible text (critical for screen readers)
- ❌ Over-specifying roles (e.g., `role="button"` on a `<button>`—native HTML already handles this)

| Role          | When to Use It                          | Example Element       |
|----------------|------------------------------------------|------------------------|
| `button`       | Custom interactive controls              | `<div role="button">` |
| `link`         | Custom hyperlinks (not native `<a>`)     | `<button role="link">`|
| `tablist`      | Groups of tab buttons (for tab navigation)| `<div role="tablist">`|
| `tabpanel`    | Content sections that switch with tabs   | `<div role="tabpanel">`|

> 💡 **Pro Tip**: Always test your ARIA roles with [axe DevTools](https://www.deque.com/axe/) or [Lighthouse](https://developer.chrome.com/docs/lighthouse/) to catch missing or conflicting roles.

---

### Keyboard Navigation: Making Your Interface Tab-Friendly

Keyboard navigation is the lifeline for users who can't use a mouse—whether due to motor impairments, physical limitations, or simply preferring keyboard shortcuts. A fully accessible interface must be **navigable via keyboard alone** (using `Tab`, `Shift+Tab`, arrow keys, and Enter).

**Core requirements for keyboard accessibility**:
1.  **All interactive elements** must be focusable (e.g., buttons, links, form inputs)
2.  **Focus states** must be clearly visible (e.g., with `:focus` CSS)
3.  **Tab order** must follow logical flow (e.g., from top to bottom, left to right)
4.  **No skipped elements**—every interactive item must be reachable via keyboard

Here's a runnable example of a keyboard-friendly form:

```html
<form>
  <label for="email">Email</label>
  <input type="email" id="email" aria-label="Email address">
  
  <label for="password">Password</label>
  <input type="password" id="password" aria-label="Password">
  
  <button type="submit" aria-label="Submit form">Sign In</button>
</form>
```

*Why this works*:  
- Every input has a clear `aria-label` for screen readers
- The form follows natural tab order (email → password → submit)
- The button has a meaningful `aria-label` (critical for screen readers)
- No JavaScript is needed—this is **100% keyboard-accessible by default**

**Critical keyboard navigation patterns**:
1.  **Tab order**: Start at the top of the page, move left-to-right, top-to-bottom
2.  **Focus indicators**: Always use `:focus` CSS to show a visible focus state (e.g., a border or outline)
3.  **Skip links**: For long pages, add a `Skip to content` link at the top (e.g., `<a href="#main">Skip to content</a>`)
4.  **No focus traps**: Ensure users can always escape a modal or dialog via `Esc` key

**Real-world example**:  
Imagine a user with limited dexterity trying to fill out a form. Without keyboard navigation, they'd be stuck. With it:
- Press `Tab` → Focuses on email input
- Press `Enter` → Submits the form
- Press `Tab` → Moves to password input
- Press `Esc` → Closes any open dialogs

> ✅ **Key takeaway**: Your interface must work *without* a mouse. Test this by pressing `Tab` repeatedly—every interactive element should be reachable.

---

### Alt Text: The Voice for Images

Alt text is the "voice" for images—describing visual content to users who can't see it (via screen readers, low vision, or slow internet). It's not just for screen readers; it's also critical for SEO, image accessibility, and users with cognitive differences.

**Why alt text matters**:  
- Screen readers read alt text *instead* of images
- Search engines use alt text to index images
- Users with low vision or color blindness need descriptive text

**Best practices for alt text**:
1.  **Be descriptive but concise** (max 120 characters)
2.  **Avoid empty alt text** (`alt=""`) → Screen readers will skip the image
3.  **Use context** for complex images (e.g., "Chart showing quarterly sales growth from 2020–2023")
4.  **For icons**: Use `alt="Icon description"` (e.g., `alt="Search icon"`)

Here's a real-world example with multiple scenarios:

```html
<!-- Good: Describes the image and its purpose -->
<img 
  src="chart-sales.png" 
  alt="Quarterly sales growth chart showing 2020 to 2023 revenue trends"
  class="sales-chart"
>

<!-- Good: Icon with context -->
<img 
  src="search-icon.svg" 
  alt="Search icon for finding products"
  aria-hidden="true" <!-- Hidden from screen readers (only for icons) -->
>

<!-- Bad: Empty alt text -->
<img src="logo.png" alt=""> <!-- Screen readers will ignore this -->

<!-- Bad: Overly long alt text -->
<img src="complex-diagram.png" alt="This image shows a detailed flowchart of the user journey with 12 steps, including login, payment, and order confirmation processes">
```

**When to omit alt text**:
- For decorative images (use `alt=""` or `aria-hidden="true"` for icons)
- For images that are purely functional (e.g., a button with a background image)

> 🌟 **Pro tip**: Test your alt text with [screen readers](https://www.w3.org/WAI/standards-guidelines/wcag21/)—if it reads clearly and helps users understand the image's purpose, you've got it right.

---

## Summary

In this section, we've covered the three pillars of accessible web fundamentals:  
1. **ARIA Roles** provide semantic meaning to custom UI elements (e.g., `role="button"` for interactive controls).  
2. **Keyboard Navigation** ensures interfaces work without a mouse (tab order, focus states, and no focus traps).  
3. **Alt Text** gives images meaningful context for screen readers and users with visual impairments.  

These practices aren't just compliance requirements—they're the foundation of truly inclusive digital experiences. By implementing them thoughtfully, you create interfaces that work for *everyone*, from users with disabilities to those in low-bandwidth environments. Remember: accessibility is a journey, not a destination. Start small, test relentlessly, and keep learning. 🌟