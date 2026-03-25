## Modules System

Node.js has been built on the principle of modularity, allowing developers to break down complex applications into manageable, reusable pieces. This chapter dives into the two primary module systems in Node.js: CommonJS (the default for decades) and ES Modules (the modern standard), along with how module scope prevents naming collisions. Understanding these systems is fundamental to writing maintainable, scalable applications.

### CommonJS (require)

CommonJS has been Node.js's default module system since its inception. It uses `require()` to import modules and `module.exports` to export functionality. This system operates on a **tree-like structure** where each file is a module with its own scope.

Here's how it works in practice:

1. **Exporting**: Modules define exports via `module.exports` (or shorthand `exports`). This creates a named object that other modules can import.
2. **Importing**: Modules use `require()` to fetch exports from other files. The return value is the exported object.

```javascript
// math.js (exported module)
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
```

```javascript
// app.js (importing module)
const math = require('./math');

console.log(math.add(5, 3)); // Output: 8
console.log(math.subtract(10, 4)); // Output: 6
```

**Key characteristics**:
- Works with **file paths** (e.g., `require('./math')`)
- Uses **dynamic imports** (modules are loaded at runtime)
- Supports **named exports** via `module.exports.name = ...`
- Historically the **default in Node.js** (used in v0.10+)

**Common pitfalls to avoid**:
- Forgetting to use `module.exports` (causes `undefined` exports)
- Using `require()` with invalid paths (e.g., `require('math')` won't work without a path)
- Overusing `exports` (which is a shorthand for `module.exports`)

### ES Modules (import/export)

ES Modules (ESM) are the modern module system defined in ECMAScript 2015. Node.js fully supports ESM since version 12 (with `--experimental-modules` for older versions). ESM uses `import`/`export` syntax and follows **static module resolution** (no runtime path resolution).

**Why ESM matters in Node.js**:
- **Simpler syntax**: `import`/`export` replaces `require`/`module.exports`
- **Tree-shaking**: Only imports used in code are included
- **Native support**: No transpilers needed (for modern Node.js)
- **Future-proof**: Aligns with browser standards

Here's a practical ESM example:

```javascript
// math.js (ESM module)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

```javascript
// app.js (ESM module)
import { add, subtract } from './math';

console.log(add(5, 3)); // Output: 8
console.log(subtract(10, 4)); // Output: 6
```

**Critical differences from CommonJS**:
| Feature                | CommonJS                  | ES Modules                |
|------------------------|----------------------------|----------------------------|
| Syntax                 | `require()`, `module.exports` | `import`, `export`         |
| Resolution             | Runtime path resolution    | Static (no runtime lookup) |
| Default exports        | `module.exports` (single)  | `export default` (single)  |
| Module bundling        | Requires bundler (e.g., webpack) | Native tree-shaking |

**ESM in Node.js**:
- Enable with `--experimental-modules` (Node.js v12+)
- Use `import`/`export` in `.mjs` files (modern) or `.js` with `type: 'module'` in `package.json`
- **Do not mix with CommonJS** in the same project (use `type: 'module'` in `package.json` for full ESM)

### Module Scope

Module scope defines **how variables and functions are isolated** across files. Proper scope management prevents naming collisions and unintended side effects.

#### CommonJS Scope
In CommonJS, each module has its **own scope**. Variables defined inside a module are **not accessible** outside it. This is enforced via `module.exports`:

```javascript
// math.js
const privateVar = 'This is private'; // Not visible outside math.js
module.exports = {
  add: (a, b) => a + b
};
```

**Why this matters**:  
If you try to access `privateVar` in another file, you'll get a `ReferenceError`. This isolation is intentional and prevents pollution.

#### ES Modules Scope
ES Modules use **strict scoping** with **top-level scope**:
- Variables declared with `let`/`const` are **block-scoped** (not module-scoped)
- `export`ed variables are **visible only in other modules**
- No global namespace pollution

```javascript
// math.js (ESM)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// This is a module-scoped variable (not visible outside math.js)
const privateVar = 'This is private';
```

**Critical distinction**:  
Unlike CommonJS, ES Modules **do not** share the same global scope. This means:
- No accidental collisions between modules
- `import` statements only bring in what you need
- No `module.exports` pollution

#### Real-world scenario: Avoiding collisions
Imagine two modules both exporting `config`:

```javascript
// moduleA.js (CommonJS)
module.exports.config = { apiKey: 'secret' };
```

```javascript
// moduleB.js (CommonJS)
module.exports.config = { apiBase: 'https://api.example.com' };
```

This causes a collision because both modules share the same `config` property. To fix it:

```javascript
// moduleA.js (CommonJS)
module.exports = {
  config: { apiKey: 'secret' },
  name: 'moduleA'
};
```

```javascript
// moduleB.js (CommonJS)
module.exports = {
  config: { apiBase: 'https://api.example.com' },
  name: 'moduleB'
};
```

**Pro tip**: Always use **unique names** for exports (e.g., `moduleA.config` vs `moduleB.config`) to prevent collisions.

## Summary

In this chapter, we've explored the two core module systems in Node.js: CommonJS (the legacy system using `require`/`module.exports`) and ES Modules (the modern system using `import`/`export`). Both systems provide crucial isolation through **module scope**, preventing naming collisions and ensuring clean code organization. 

- **CommonJS** remains the default for most Node.js applications (v14+), while **ES Modules** are gaining traction in newer projects (v12+).
- **Module scope** is critical: it ensures variables and functions are isolated within each file, avoiding accidental collisions.
- Always choose the system that fits your project's needs—CommonJS for legacy compatibility and ESM for modern, clean code.

Remember, the module system is the backbone of Node.js applications! 🚀