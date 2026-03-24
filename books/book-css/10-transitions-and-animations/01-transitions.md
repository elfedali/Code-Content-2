## Transitions

Transitions allow you to smoothly transition between CSS property values when they change. They’re a powerful tool for creating subtle, elegant animations without JavaScript—perfect for interactive UIs, micro-interactions, and visual feedback. In this section, we’ll dive deep into the three core pillars of CSS transitions: **duration**, **timing functions**, and **delay**. By mastering these, you’ll create fluid, responsive animations that feel natural to users.

### Duration

The `duration` property defines how long a transition should take to complete. It’s specified in seconds (`s`) or milliseconds (`ms`) and controls the *speed* of the transition. By default, transitions run for `0s` (instantly), so setting a positive value creates smooth motion.

Here’s how it works in practice:

```css
.button {
  background-color: lightblue;
  transition: background-color 0.5s; /* Transition takes 0.5 seconds */
}
.button:hover {
  background-color: purple;
}
```

In this example, when you hover over `.button`, the background color transitions from `lightblue` to `purple` over **0.5 seconds**. If you set `duration: 0.2s`, the transition would be faster (200ms), while `1s` would create a slower, more deliberate effect.

**Pro tip**: Use `duration` to match user expectations—short transitions (e.g., `0.2s`) for quick feedback, longer ones (e.g., `1s`) for emphasis.

### Timing Functions

Timing functions dictate *how* the transition progresses over time. They shape the acceleration and deceleration of the transition, making it feel organic rather than robotic. CSS offers five built-in timing functions:

| Name          | Description                                  | Example Use Case                     |
|----------------|----------------------------------------------|--------------------------------------|
| `linear`       | Constant speed (no acceleration)             | Simple, predictable animations       |
| `ease`         | Default (starts slow, ends fast)             | Most natural motion (e.g., button hover) |
| `ease-in`      | Starts slowly, speeds up                    | "Pulling" effects (e.g., sliding panels) |
| `ease-out`     | Starts fast, slows down                     | "Falling" effects (e. g., falling objects) |
| `ease-in-out`  | Starts slow, speeds up, then slows down      | Smooth oscillations (e. g., bouncing) |

Here’s a real-world example demonstrating the difference:

```css
.box {
  width: 100px;
  height: 100px;
  background: red;
  transition: background 1s ease-in-out; /* Uses ease-in-out */
}
.box:hover {
  background: blue;
}
```

When you hover over `.box`, the background color transitions from red to blue with **ease-in-out** behavior—starting slowly, accelerating, then decelerating. Contrast this with `linear` (constant speed) or `ease` (default smooth curve).

**Key insight**: Timing functions aren’t just for aesthetics—they influence user perception. `ease-in-out` creates the most intuitive motion for most interactions, while `ease` is ideal for subtle, gentle transitions.

### Delay

The `delay` property adds a pause *before* a transition begins. It’s useful for creating timing-based effects, like delaying feedback until after a user action completes.

```css
.button {
  background-color: lightblue;
  transition: background-color 0.5s ease-in 0.2s; /* 0.2s delay */
}
.button:hover {
  background-color: purple;
}
```

In this example, the transition starts **0.2 seconds after** the hover event occurs. This creates a "buffer" effect—users see the button color change after a brief pause, which can improve perceived responsiveness.

**When to use delay**:
- After user interactions (e.g., form submissions)
- To avoid immediate visual feedback that feels "too fast"
- For complex animations where you want to synchronize multiple transitions

---

## Summary

In this section, we’ve explored the three pillars of CSS transitions:  
- **Duration** controls *how long* a transition takes (e.g., `0.5s` for 500ms).  
- **Timing functions** shape *how* the transition progresses (e.g., `ease-in-out` for natural motion).  
- **Delay** adds a *pause* before the transition starts (e.g., `0.2s` for 200ms).  

Mastering these concepts lets you craft transitions that feel intentional, responsive, and user-friendly—without a single line of JavaScript. 🚀