## Modules

Modern JavaScript applications often require organizing code into reusable pieces. **Modules** (introduced in ES6) are the standard way to structure code in JavaScript, enabling **separation of concerns**, **code reusability**, and **dependency management**. 🧱 They solve long-standing challenges like code bloat and tangled dependencies that plagued earlier JavaScript versions. In this section, we'll explore how to implement modules using `import`/`export` syntax—starting with the fundamentals and diving into the critical distinction between default and named exports.

### Import and Export

Modules let you split your code into logical units (e.g., functions, variables, classes) and share them across files. The core pattern involves **exporting** values from one file and **importing** them into another. This creates a clean, predictable dependency chain without global namespace pollution.

Here's a minimal example demonstrating the basic workflow:

```javascript
// math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
```

```javascript
// app.js
import { add, multiply } from './math.js';

console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
```

**Key points about this pattern**:
- `export` statements define what’s available for import
- `import` statements pull specific named exports into the current scope
- Files with `export` statements become **modules** (they can be imported by other files)
- The path `./math.js` uses relative paths (you can also use `../` for parent directories)

This approach works for **named exports** (as shown above) but has a limitation: you can’t export a single default value using this syntax. That’s where default exports come in.

### Default vs Named Exports

The most common source of confusion in modules is the difference between **default exports** and **named exports**. They serve distinct purposes and behave differently in imports. Let’s break them down with concrete examples.

#### Named Exports

Named exports allow you to export multiple values with unique names. Each export gets its own identifier in the import statement. This is ideal when you want to share multiple related items without a single "default" value.

**Example**: Exporting functions and constants

```javascript
// utils.js
export const PI = 3.14159;
export const sqrt = (x) => Math.sqrt(x);
export const factorial = (n) => {
  if (n < 0) throw new Error('Factorial not defined for negative numbers');
  return n === 0 ? 1 : n * factorial(n - 1);
};
```

**Importing named exports** requires specifying each exported name:

```javascript
// app.js
import { PI, sqrt, factorial } from './utils.js';

console.log(PI); // 3.14159
console.log(sqrt(16)); // 4
console.log(factorial(5)); // 120
```

**Why use named exports?**  
- Best for sharing multiple related items (e.g., utility functions)
- Enables precise import of specific values (no need to import everything)
- Avoids ambiguity when multiple values are exported

#### Default Exports

Default exports are a single value that acts as the "primary" export from a module. Only **one** default export per module is allowed (and it must be the last export in the file). This is ideal when you want to share a single primary value or function.

**Example**: Exporting a single utility function

```javascript
// logger.js
export default function log(message) {
  console.log(`[LOG] ${message}`);
}
```

**Importing default exports** uses a simpler syntax without braces:

```javascript
// app.js
import log from './logger.js';

log('Module loaded successfully!'); // [LOG] Module loaded successfully!
```

**Key differences summarized**:

| Feature                | Named Export                     | Default Export               |
|------------------------|----------------------------------|-------------------------------|
| Number of exports      | Multiple (any number)            | Exactly one                   |
| Import syntax          | `import { name1, name2 }`       | `import name`                 |
| Use case               | Sharing multiple related items   | Sharing a single primary item |
| File structure         | Can be used with `export` only   | Must be the last export      |
| Example                 | `export const PI = 3.14159;`    | `export default function()`  |

**Why use default exports?**  
- Simplifies imports when you only need one value
- Avoids the need for braces in imports (cleaner syntax)
- Ideal for libraries where a single function is the main interface

#### Practical Comparison: When to Use Which

Here’s a real-world scenario to illustrate the choice:

**Case 1: Library with multiple utilities**  
If you’re building a utility library that offers several functions (e.g., math operations), use **named exports**:

```javascript
// math-utils.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const square = (x) => x * x;
```

**Case 2: Single-function library**  
If your library has only one core function (e.g., a logger), use **default export**:

```javascript
// logger.js
export default function log(message) {
  console.log(`[LOG] ${message}`);
}
```

**Why this matters**:  
- Named exports give you **granular control** over imports (you can pick exactly what you need)
- Default exports simplify **import statements** for single-value libraries
- Both patterns coexist in real-world code—many libraries mix them (e.g., a default export for the main function + named exports for helpers)

#### Advanced Tip: Default + Named Exports in One File

You can combine default and named exports in a single file. The default export is **always** the last export in the file:

```javascript
// combined.js
export const PI = 3.14159;
export const sqrt = (x) => Math.sqrt(x);

export default function calculateCircleArea(radius) {
  return PI * radius ** 2;
}
```

**Importing both**:

```javascript
// app.js
import { PI, sqrt } from './combined.js';
import calculateCircleArea from './combined.js';

console.log(calculateCircleArea(2)); // 12.566370614359172
```

This pattern is common in libraries that need to maintain backward compatibility with older module systems.

### Summary

Modules are the foundation of modern JavaScript organization. By mastering **import/export** and understanding the critical distinction between **default** and **named exports**, you gain precise control over code structure, dependency management, and reusability. Remember:  
- Use **named exports** when sharing multiple related items (e.g., utility functions)  
- Use **default exports** for single primary values (e.g., core functions)  
- Always place the default export as the last export in your file  

With these patterns, you can build scalable, maintainable applications that avoid the pitfalls of global variables and tangled dependencies. 🚀