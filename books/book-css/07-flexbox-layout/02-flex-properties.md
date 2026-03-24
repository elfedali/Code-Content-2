## Flex Properties

Flexbox is a foundational layout model that gives you precise control over the arrangement of items in modern web design. In this section, we'll explore the core properties that define how flex containers and items interact. These properties work together to create responsive, flexible interfaces while maintaining clean, predictable behavior. Let's dive in!

### justify-content

The `justify-content` property controls the **alignment of flex items along the main axis** (the direction items are laid out). This is your primary tool for distributing space *horizontally* within a flex container. It’s especially powerful for creating balanced layouts where items naturally flow and share available space.

Here’s how it works in practice:

| Value              | Behavior                                                                 |
|---------------------|--------------------------------------------------------------------------|
| `flex-start`        | Items align at the start of the container (default)                       |
| `flex-end`          | Items align at the end of the container                                  |
| `center`            | Items centered within the container                                      |
| `space-between`     | Items spaced evenly with the first at the start and last at the end       |
| `space-around`     | Items spaced evenly with equal padding around each item                  |
| `space-evenly`     | Items spaced evenly with equal spacing between items (including ends)     |

**Real-world example**: Imagine a navigation bar with buttons that need equal spacing. Using `space-around` ensures consistent padding on all sides:

```html
<div class="nav-container">
  <button>Home</button>
  <button>About</button>
  <button>Contact</button>
</div>
```

```css
.nav-container {
  display: flex;
  justify-content: space-around;
  padding: 10px;
}
```

**Key insight**: This property *only* affects horizontal alignment. For vertical alignment, we use `align-items` (covered next). Remember: `justify-content` is your go-to for horizontal spacing control—especially when creating responsive designs where items need to shift dynamically.

### align-items

The `align-items` property governs the **alignment of flex items along the cross axis** (the direction perpendicular to the main axis). This is your primary tool for vertical alignment within a flex container. It ensures items stack neatly and share vertical space consistently.

Here’s how it works in practice:

| Value              | Behavior                                                                 |
|---------------------|--------------------------------------------------------------------------|
| `flex-start`        | Items align at the top of the container (default)                         |
| `flex-end`          | Items align at the bottom of the container                               |
| `center`            | Items centered vertically within the container                            |
| `baseline`          | Items align based on their baseline (text lines)                          |
| `stretch`           | Items stretch to fill the cross axis (default for flex items)             |

**Real-world example**: A card grid where items need consistent vertical spacing:

```html
<div class="card-grid">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>
```

```css
.card-grid {
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Stretch cards to fill height */
  gap: 10px; /* We'll cover gap next */
}
.card {
  padding: 10px;
  background: #f0f0f0;
  min-height: 50px;
}
```

**Key insight**: `align-items` is crucial for creating uniform vertical spacing. When combined with `justify-content`, it gives you complete control over both horizontal and vertical alignment. For complex layouts, pair it with `flex-wrap` to handle multi-line arrangements.

### align-content

The `align-content` property controls the **alignment of flex lines** (the horizontal lines in multi-line flex containers) along the cross axis. This property only matters when your flex container wraps items into multiple lines (i.e., when `flex-wrap` is set to `wrap` or `wrap-reverse`). It’s your tool for fine-tuning vertical spacing *between lines*.

Here’s how it works in practice:

| Value              | Behavior                                                                 |
|---------------------|--------------------------------------------------------------------------|
| `flex-start`        | Lines align at the top of the container                                   |
| `flex-end`          | Lines align at the bottom of the container                                |
| `center`            | Lines centered within the container                                      |
| `space-between`     | Lines spaced evenly with first line at top and last at bottom             |
| `space-around`     | Lines spaced evenly with equal padding around each line                  |
| `stretch`           | Lines stretch to fill the cross axis (default for flex lines)             |

**Real-world example**: A multi-line grid where lines need even spacing:

```html
<div class="multi-line-grid">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
```

```css
.multi-line-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; /* Triggers multi-line layout */
  align-content: space-between; /* Distributes lines evenly */
  gap: 10px;
}
.item {
  min-width: 100px;
  padding: 5px;
  background: #e0e0e0;
}
```

**Key insight**: This property is often misunderstood because it only applies to *multi-line* containers. If you don’t have `flex-wrap: wrap`, `align-content` has no effect. Use it when you need to control the vertical spacing between lines—especially in responsive grids.

### flex-wrap

The `flex-wrap` property determines **when flex items move to the next line** within the container. This is essential for creating responsive layouts that adapt to varying screen sizes without breaking.

Here’s how it works in practice:

| Value              | Behavior                                                                 |
|---------------------|--------------------------------------------------------------------------|
| `nowrap`            | Items stay on a single line (default)                                    |
| `wrap`              | Items wrap to new lines when space is insufficient                       |
| `wrap-reverse`      | Items wrap to new lines but in reverse order (mirrored)                  |

**Real-world example**: A responsive product grid that wraps on small screens:

```html
<div class="product-grid">
  <div class="product">Product 1</div>
  <div class="product">Product 2</div>
  <div class="product">Product 3</div>
  <div class="product">Product 4</div>
</div>
```

```css
.product-grid {
  display: flex;
  flex-wrap: wrap; /* Items wrap to new lines */
  gap: 15px;
}
.product {
  min-width: 200px;
  padding: 10px;
  background: #f0f0f0;
}
```

**Key insight**: `flex-wrap` is your gateway to responsive layouts. Without it, items will overflow the container (causing layout breaks). Pair it with `flex-direction` (e.g., `column` for vertical wrapping) to create complex responsive patterns.

### gap

The `gap` property sets **spacing between flex items** in both the main and cross axes. It’s a modern, powerful alternative to `margin` and `padding` for controlling item spacing. This property works with *both* flex and grid layouts (though it’s most relevant here for flex).

Here’s how it works in practice:

- **Single value**: Sets equal spacing in both directions (e.g., `gap: 10px` = 10px between items horizontally *and* vertically)
- **Two values**: Sets different spacings (e.g., `gap: 10px 5px` = 10px horizontally, 5px vertically)

**Real-world example**: A clean, consistent spacing system for a dashboard:

```html
<div class="dashboard">
  <div class="dashboard-item">Chart 1</div>
  <div class="dashboard-item">Chart 2</div>
  <div class="dashboard-item">Chart 3</div>
</div>
```

```css
.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 8px; /* 12px horizontal, 8px vertical */
}
.dashboard-item {
  padding: 10px;
  background: #f0f0f0;
  min-width: 150px;
}
```

**Key insight**: `gap` simplifies spacing management by replacing multiple `margin`/`padding` rules with a single property. It’s especially valuable for mobile-first designs where consistent spacing is critical.

## Summary

These five properties form the backbone of flexible web layouts:
- `justify-content` → Horizontal alignment
- `align-items` → Vertical alignment
- `align-content` → Multi-line vertical alignment
- `flex-wrap` → Line wrapping for responsiveness
- `gap` → Consistent item spacing

Mastering them lets you build layouts that adapt seamlessly across devices while maintaining visual harmony. Remember: **start simple** (e.g., `flex-wrap: wrap` + `gap`), then refine with `justify-content` and `align-items` for precise control. Flexbox is your most versatile layout tool—use these properties to create interfaces that feel intentional and responsive.

> 💡 Pro tip: Always pair `gap` with `flex-wrap` for clean, mobile-friendly grids. This combination handles spacing and wrapping without relying on margins or padding hacks.