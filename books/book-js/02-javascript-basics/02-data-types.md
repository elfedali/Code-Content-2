## Data Types

JavaScript's data types form the foundation of how values are represented and manipulated in your code. Understanding these concepts is crucial for writing efficient, predictable applications. In this section, we'll explore the core data types in JavaScript—starting with primitives, then reference types, and finally the unique characteristic of dynamic typing.

### Primitive Types

Primitive types are the simplest, most fundamental values in JavaScript. They are **immutable** (cannot be changed after creation) and occupy a fixed amount of memory. JavaScript has **seven** primitive types:

| Type        | Description                                                                 | Example                     |
|-------------|-----------------------------------------------------------------------------|------------------------------|
| `number`    | Numeric values (integers and floating-point numbers)                         | `42`, `3.14`, `-0.001`      |
| `string`    | Text sequences (enclosed in quotes)                                         | `"Hello, world!"`           |
| `boolean`   | True/false values                                                           | `true`, `false`             |
| `null`      | A placeholder for "no value"                                               | `null`                      |
| `undefined` | A value that hasn't been assigned (or the result of a non-existent property) | `undefined`                 |
| `symbol`    | Unique, immutable values (used as object keys)                               | `Symbol("key")`             |
| `bigint`    | Integers with arbitrary precision (for very large numbers)                   | `123456789012345678901234567890n` |

Let's see these in action with concrete examples:

```javascript
// Primitive type examples
const num = 42; // number
const str = "Hello, JavaScript!"; // string
const bool = true; // boolean
const nullVal = null; // null
const undef = undefined; // undefined
const sym = Symbol("unique-key"); // symbol
const bigInt = 123456789012345678901234567890n; // bigint
```

**Key insight**: Primitive values are **copied by value** when assigned. This means modifying a primitive doesn't affect the original value:

```javascript
let a = 10;
let b = a;
b = 20;
console.log(a); // Output: 10 (unchanged)
```

### Reference Types

Reference types represent **complex, mutable objects** in JavaScript. Unlike primitives, they store references (pointers) to objects in memory. These types are **mutable** (can be modified after creation) and include:

- **Objects**: Key-value pairs (e.g., `{ name: "Alice", age: 30 }`)
- **Arrays**: Ordered collections of values (e.g., `[1, 2, 3]`)
- **Functions**: Code blocks that can be called (e.g., `() => console.log("Hello")`)
- **Dates**: Representations of specific points in time (e.g., `new Date()`)
- **Regular Expressions**: Pattern-matching tools (e.g., `/^\d+$/`)

Reference types behave differently from primitives when assigned. Here's why:

```javascript
// Reference type example
const obj = { name: "Alice" };
const arr = [1, 2, 3];
const func = () => console.log("Hello from function");
const date = new Date();
const regex = /abc/;
```

**Critical behavior**: When you reassign a reference variable, you change the **reference** (pointer), not the original object. This means multiple variables can point to the **same object**:

```javascript
// Mutating a reference type
const person = { name: "Bob" };
const anotherPerson = person; // Both point to same object

anotherPerson.name = "Charlie";
console.log(person.name); // Output: "Charlie" (both variables reflect change)
```

This is why reference types require careful handling—changes to an object affect all variables that reference it.

### Dynamic Typing

JavaScript is a **dynamically typed** language. This means the type of a variable is determined **at runtime**, not at compile time. Unlike statically typed languages (e.g., Java, TypeScript), JavaScript doesn't require you to declare variable types upfront.

**Why dynamic typing matters**:
- **Flexibility**: Variables can hold values of any type at any time
- **Type coercion**: Automatic conversion between types during operations
- **Runtime checks**: Type validation happens when you use values, not when you declare them

Here's a practical demonstration:

```javascript
// Dynamic typing in action
let value = 42; // Initially a number
value = "Hello"; // Now a string (type changed at runtime)
console.log(typeof value); // Output: "string"

// Type coercion example
const num1 = "5";
const num2 = "10";
const sum = num1 + num2; // String concatenation (not number addition)
console.log(sum); // Output: "510" (because both are strings)
```

**Key difference from static typing**: In statically typed languages, you'd get a compile-time error if you tried to assign a string to a number variable. In JavaScript, this error only appears at runtime (via `typeof` checks or unexpected behavior).

### Summary

In this section, we've explored JavaScript's foundational data types. **Primitive types** are immutable and represent basic values, while **reference types** are complex, mutable objects that store references to memory locations. JavaScript's **dynamic typing** allows variables to hold values of any type at runtime, enabling flexible code but requiring careful handling of type coercion and object mutations.

✨