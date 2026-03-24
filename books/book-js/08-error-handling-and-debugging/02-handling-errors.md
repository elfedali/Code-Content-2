## Handling Errors

In JavaScript, **error handling** is a critical skill that helps you build robust applications. Without it, your code can crash unexpectedly when things go wrong. Think of error handling as your application's safety net — it catches problems before they become disasters. 🛠️

### try...catch

The `try...catch` statement is the cornerstone of JavaScript error handling. It allows you to **test a block of code** for errors and **handle them gracefully** without crashing your entire application. Here’s how it works:

1. The `try` block contains code that might throw an error.
2. If an error occurs, execution jumps to the `catch` block.
3. The `catch` block executes error-handling logic using the `error` object.

This pattern is essential because it prevents unhandled exceptions from crashing your entire application.

Let’s walk through a concrete example:

```javascript
try {
  // Code that might throw an error
  const result = 10 / 0;
} catch (error) {
  console.log(`Error: ${error.message}`);
}
```

**Output**: `Error: Division by zero`

In this example:
- The `try` block attempts to divide by zero (throwing a `TypeError`).
- The `catch` block captures the error and logs the message.

**Key insights**:
- The `error` variable holds the full **error object** (with properties like `message`, `name`, `stack`, and more).
- You can customize error handling: log to console, retry logic, or redirect users.
- Always include meaningful error messages to aid debugging.

> 💡 **Pro Tip**: Never ignore errors—always log them to understand what went wrong. Use `console.error()` for production-level debugging.

### throw

The `throw` statement lets you **intentionally create errors** in your code. This is crucial for validation, enforcing rules, or signaling unexpected conditions. When you `throw`, you can pass a custom error object or string.

Here’s a practical example:

```javascript
function validateAge(age) {
  if (age < 0) {
    throw new Error("Age cannot be negative");
  }
  return age;
}

try {
  const age = validateAge(-5);
} catch (error) {
  console.log(error.message); // Output: "Age cannot be negative"
}
```

**Why `throw` matters**:
- It gives you control over *when* and *how* errors occur.
- Enables precise error messages for users (e.g., "Invalid input" vs. vague "TypeError").
- Works with specific error types (e.g., `TypeError`, `RangeError`).

**Advanced usage**:  
You can throw custom error objects with detailed context:

```javascript
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.code = "INVALID_INPUT";
  }
}

try {
  throw new CustomError("Email is required");
} catch (error) {
  console.log(error.message); // Output: "Email is required"
  console.log(error.code);    // Output: "INVALID_INPUT"
}
```

### finally

The `finally` block executes **after** both `try` and `catch` complete (whether an error occurred or not). It’s ideal for cleanup tasks like closing file handles or releasing resources.

Here’s a real-world example:

```javascript
try {
  // Code that might throw an error
  const result = 10 / 0;
} catch (error) {
  console.log(`Error: ${error.message}`);
} finally {
  console.log("This runs regardless of errors.");
}
```

**Output**:
```
Error: Division by zero
This runs regardless of errors.
```

**Key use cases**:
- Ensuring resources are released (e.g., database connections).
- Performing cleanup operations that must happen *after* error handling.
- Critical for avoiding resource leaks in production.

> 💡 **Pro Tip**: Always pair `finally` with `try...catch` for resource management—this prevents memory leaks and crashes.

### Error Handling Flow Summary

| Block      | When It Runs                     | Purpose                                      | Example Use Case                     |
|------------|----------------------------------|-----------------------------------------------|--------------------------------------|
| `try`      | Code execution starts            | Tests code for errors                        | Data processing, API calls          |
| `catch`    | When error occurs in `try`       | Handles error (logs, retries)                 | User input validation               |
| `finally`  | After `try` and `catch` complete | Performs cleanup (e.g., closes files)         | Database connections, file handles  |

This table shows how these blocks work together in a **single error-handling cycle**.

---

## Summary

In this section, we’ve explored the core of JavaScript error handling:
- **`try...catch`** lets you catch and handle errors gracefully.
- **`throw`** enables you to create custom errors for validation and control flow.
- **`finally`** ensures critical cleanup code runs regardless of errors.

By mastering these patterns, you’ll build applications that are resilient and user-friendly. Remember: **error handling isn’t about avoiding errors—it’s about managing them wisely**. 🛠️