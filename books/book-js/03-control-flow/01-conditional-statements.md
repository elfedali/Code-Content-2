## Conditional Statements

In JavaScript, **control flow** is the backbone of intelligent applications—your code’s ability to make decisions based on real-world conditions. This section dives into the three most essential conditional statements: `if / else`, `switch`, and the **ternary operator**. We’ll explore each with concrete examples, clear patterns, and practical use cases to build your decision-making confidence. Let’s get started!

### 1. if / else

The `if / else` statement is JavaScript’s most fundamental conditional construct. It evaluates a boolean expression and executes one block of code if the condition is `true`, and another block if it’s `false`. This structure is perfect for binary decisions and forms the foundation of all conditional logic.

Here’s a classic example checking user age:

```javascript
const userAge = 25;
if (userAge >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}
// Output: "You are an adult."
```

**Key patterns to master**:
- **Boolean expressions**: Conditions must evaluate to `true` or `false` (e.g., `x > y`, `x === y`, `!condition`).
- **Chaining with `else if`**: Handle multiple conditions in sequence without nested `if` statements.
- **Avoid fall-through**: Always include `break` (or equivalent) in loops/switches to prevent unintended execution.

Let’s see a real-world application with temperature classification:

```javascript
const temperature = 32;
if (temperature < 0) {
  console.log("Freezing");
} else if (temperature >= 0 && temperature < 10) {
  console.log("Cold");
} else if (temperature >= 10 && temperature < 20) {
  console.log("Chilly");
} else {
  console.log("Warm");
}
// Output: "Cold"
```

**Why this matters**: The `if / else` structure is your first tool for handling real-world binary decisions. It’s simple, explicit, and scales well for complex logic when combined with `else if` chains.

### 2. switch

When comparing a single variable against multiple discrete values, the `switch` statement offers a cleaner, more readable alternative to nested `if / else` statements. It’s especially powerful for handling enums, user roles, or state machines.

Here’s a practical example classifying days of the week:

```javascript
const day = "Wednesday";
switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Tuesday":
    console.log("Midweek");
    break;
  case "Wednesday":
    console.log("Midweek");
    break;
  default:
    console.log("Weekend");
}
// Output: "Midweek"
```

**Key patterns to master**:
- **Exact matches**: `switch` checks values against `case` labels (no range checks).
- **`break` is critical**: Without it, execution falls through to the next `case`. Always include `break` to exit cleanly.
- **Default case**: Handles unexpected values gracefully.

Let’s build a user role handler for an application:

```javascript
const role = "admin";
switch (role) {
  case "admin":
    console.log("You have full access.");
    break;
  case "moderator":
    console.log("You can manage content.");
    break;
  case "user":
    console.log("You have limited access.");
    break;
  default:
    console.log("Unknown role");
}
// Output: "You have full access."
```

**Why this matters**: `switch` eliminates nested conditionals for discrete values, improving readability and maintainability. It’s your go-to when you have a single variable with multiple possible states.

### 3. Ternary Operator

The ternary operator (`condition ? expressionIfTrue : expressionIfFalse`) is JavaScript’s one-liner for simple conditionals. It’s ideal for quick decisions, inline expressions, and concise logic without extra indentation.

Here’s a basic example determining user status:

```javascript
const isAdult = userAge >= 18;
const status = isAdult ? "Adult" : "Minor";
console.log(status);
// Output: "Adult"
```

**Key patterns to master**:
- **Single expression**: The entire ternary is a single expression (useful for assignments, function returns).
- **Avoid overuse**: Stick to simple conditions (e.g., 1–2 lines of logic). Complex cases become hard to read.
- **Chaining**: Can be nested for multi-level decisions (but use cautiously).

Let’s see a real-world discount calculator:

```javascript
const price = 100;
const discount = 0.1;
const total = price * (1 - discount);
const finalPrice = total > 50 ? total : total * 0.9;
console.log(finalPrice);
// Output: 90 (because 100 * 0.9 = 90)
```

**Why this matters**: The ternary operator adds brevity without sacrificing clarity for simple decisions. It’s your secret weapon for clean, minimal code where context is obvious.

## Summary

You’ve now mastered the three pillars of conditional logic in JavaScript:  
- **`if / else`** for binary decisions and chained conditions,  
- **`switch`** for discrete value comparisons, and  
- The **ternary operator** for concise one-liner decisions.  

Choose the right tool for the job: use `if / else` for clarity in complex scenarios, `switch` for discrete states, and the ternary operator for quick, readable expressions. Remember—**precision in decisions leads to robust applications**. 🌟