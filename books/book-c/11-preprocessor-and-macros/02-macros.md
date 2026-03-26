## Macros

In C, macros are a powerful feature of the preprocessor that allow you to define reusable code snippets. This section covers two critical aspects: **function-like macros** and **conditional compilation**.

### Function-like Macros

Function-like macros are preprocessor directives that take arguments and expand to a sequence of tokens. They mimic the behavior of functions but operate at the text substitution level (not runtime), meaning they lack the safety and error checking of true functions.

**Critical Implementation**:  
Always enclose arguments in parentheses to avoid operator precedence issues. For example:

```c
// Unsafe version (causes errors with complex expressions)
#define SQUARE(x) x * x

// Safe version (correctly handles complex expressions)
#define SQUARE(x) ((x) * (x))
```

**Why parentheses matter**:  
When `SQUARE(a + 1)` is expanded using the unsafe version, it becomes `a + 1 * a + 1` (due to operator precedence), which evaluates to `a + a + 1` instead of `(a + 1)²`. The safe version ensures `((a + 1) * (a + 1))` is generated.

**Pro tip**: When defining function-like macros, *always* use parentheses around arguments to guarantee correct evaluation.

---

### Conditional Compilation

Conditional compilation lets you include or exclude sections of code based on predefined macros or conditions. This is essential for writing portable code, enabling debugging features, and supporting different platforms.

#### Key Directives
| Directive | Purpose |
|-----------|---------|
| `#ifdef` | Check if a macro is defined |
| `#ifndef` | Check if a macro is **not** defined |
| `#if` | Evaluate a condition (e.g., `#if defined(MACRO)`) |
| `#elif` | Else-if condition |
| `#else` | Else clause |
| `#endif` | End the conditional block |

#### Practical Examples

**1. Platform-specific code**:
```c
#ifdef _WIN32
// Windows-specific code (e.g., Win32 API calls)
#else
// Linux-specific code (e.g., POSIX API calls)
#endif
```

**2. Debugging feature**:
```c
// Define DEBUG macro to enable debug prints
#define DEBUG

#ifdef DEBUG
#define DEBUG_PRINT(message) printf("DEBUG: %s\n", message)
#else
#define DEBUG_PRINT(message)
#endif

// Usage:
DEBUG_PRINT("Hello, world!");
```
*This ensures debug messages only appear when `DEBUG` is defined.*

**3. Cross-platform condition**:
```c
#if defined(_WIN32) || defined(__WINDOWS__)
// Windows code
#elif defined(__linux__) || defined(__linux)
// Linux code
#else
// Other platforms (e.g., macOS, iOS)
#endif
```

---

## Summary

- **Function-like macros** provide reusable code but *must* use parentheses around arguments to avoid subtle bugs.
- **Conditional compilation** enables platform-specific and debugging code through directives like `#ifdef`, `#if`, and `#endif`.
- Always prioritize safe macro definitions and leverage conditional compilation for portable, maintainable code. 🚀