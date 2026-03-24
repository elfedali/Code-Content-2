## Functional Programming

Functional programming (FP) is a paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. In JavaScript, FP techniques help us write cleaner, more predictable, and maintainable code—especially as applications grow in complexity. By embracing concepts like pure functions, immutability, and composition, you’ll build systems that are resilient to bugs and easier to test. Let’s dive deep into these foundational principles with practical examples.

---

### Pure Functions

Pure functions are the cornerstone of functional programming. They’re defined by two key properties: **determinism** (the same input always produces the same output) and **no side effects** (they don’t modify external state or dependencies). This predictability makes pure functions ideal for testing, caching, and parallel processing.

Why pure functions matter:
- They eliminate "hidden state" issues common in imperative code.
- They enable easier debugging and refactoring.
- They compose cleanly without worrying about unintended interactions.

Here’s a classic pure function that calculates the square of a number:

```javascript
const square = (num) => num * num;
```

This function is pure because:
1. It always returns `num * num` for a given `num`.
2. It doesn’t alter any external variables or state.

Let’s contrast it with an *impure* function that modifies global state:

```javascript
let globalCounter = 0;

const increment = () => {
  globalCounter += 1;
  return globalCounter;
};
```

This `increment` function is **impure** because it modifies the global `globalCounter` (a side effect). Pure functions avoid this by never changing external state.

#### Why Pure Functions Work So Well in JavaScript
Pure functions excel in JavaScript’s asynchronous ecosystem. For example, consider a pure function that fetches user data from an API without altering the request queue:

```javascript
const getUserData = (userId) => {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => response.json())
    .then(data => data);
};
```

This function is pure because:
- It doesn’t modify any external state (e.g., global variables).
- It returns the same result for the same `userId` (deterministic).
- It handles asynchronous operations without side effects.

> 💡 **Pro Tip**: When writing pure functions, ask: *"If I call this function twice with the same input, will the output be identical and will it change anything outside the function?"* If yes, it’s pure.

---

### Immutability

Immutability means once a data structure is created, it cannot be changed. Instead of modifying existing data, immutable functions create new data structures with updated values. This prevents unexpected state changes and makes code more predictable.

Why immutability matters:
- **No race conditions**: Since data can’t be altered after creation, concurrent operations are safer.
- **Easier debugging**: You can trace state changes without tracking mutations.
- **Better performance**: Modern JavaScript engines optimize immutable data structures (like arrays and objects) for caching.

Let’s demonstrate immutability with arrays and objects:

#### Immutable Array Updates
Instead of mutating an array in place (which is *immutability*), we create a new array:

```javascript
const numbers = [1, 2, 3];
const doubledNumbers = numbers.map(num => num * 2);
```

Here, `doubledNumbers` is a new array `[2, 4, 6]`—the original `numbers` remains unchanged.

#### Immutable Object Updates
For objects, we use `Object.assign()` or spread syntax to create new objects:

```javascript
const user = { name: "Alice", age: 30 };
const updatedUser = { ...user, age: 31 };
```

`updatedUser` is a new object with the updated age. The original `user` is untouched.

#### Common Pitfalls with Immutability
A classic mistake is using `push` or `pop` on arrays (which mutate the original):

```javascript
const fruits = ["apple", "banana"];
fruits.push("orange"); // Mutates original array
console.log(fruits); // ["apple", "banana", "orange"]
```

**Fix**: Always return a new structure:
```javascript
const newFruits = [...fruits, "orange"];
```

| Operation          | Mutable? | Result                          | Why?                                  |
|---------------------|----------|----------------------------------|----------------------------------------|
| `array.push()`      | ❌       | Original array changes          | Alters existing state                 |
| `array.map()`       | ✅       | New array created               | Returns new structure                 |
| `Object.assign()`   | ✅       | New object created              | Copies properties without mutation    |
| `spread operator`   | ✅       | New object/array                | Creates a shallow copy                |

> 💡 **Pro Tip**: Use `const` for variables holding data structures. This enforces immutability by default in JavaScript (since you can’t reassign a `const` variable).

---

### Composition

Composition is the process of building complex functions by combining simpler ones. In functional programming, this avoids "spaghetti code" by breaking logic into reusable, self-contained units. Think of it as *gluing* small functions together to solve larger problems.

Why composition matters:
- **Reusability**: Functions can be reused across multiple contexts.
- **Modularity**: Each function has a single responsibility.
- **Testability**: Small functions are easier to test individually.

Let’s build a real-world example: a user profile service that combines data from multiple sources.

#### Step 1: Create Simple Functions
```javascript
// Function 1: Get user's name from a database
const getName = (userId) => `User ${userId}`;

// Function 2: Get user's age from an API
const getAge = (userId) => 30; // Simplified for demo

// Function 3: Format user data
const formatProfile = (name, age) => `${name} is ${age} years old`;
```

#### Step 2: Compose Functions
Now, combine them into a single workflow:

```javascript
const createProfile = (userId) => {
  const name = getName(userId);
  const age = getAge(userId);
  return formatProfile(name, age);
};
```

This composition is **pure** and **immutably** built:
- Each function returns a new value without side effects.
- The final result depends *only* on inputs (no hidden state).

#### Advanced Composition: Currying and Higher-Order Functions
For even more power, we can create *curried* functions that accept arguments one at a time:

```javascript
// Curried version of createProfile
const createProfileCurried = (userId) => {
  const name = getName(userId);
  return (age) => formatProfile(name, age);
};

// Usage:
const user1Profile = createProfileCurried(123)(30);
```

This pattern lets us build complex workflows incrementally while maintaining purity.

> 💡 **Pro Tip**: Always ask: *"Can this problem be solved by combining smaller, well-defined functions?"* If yes, composition is the right approach.

---

## Summary

Pure functions ensure predictable behavior by avoiding side effects and state changes. Immutability prevents unintended data modifications through careful creation of new structures. Composition builds complex functionality by combining smaller, reusable functions—eliminating tangled code. Together, these principles empower you to write JavaScript that’s **resilient**, **testable**, and **scalable**. Master them, and you’ll transform how you approach even the most complex applications. 🌟