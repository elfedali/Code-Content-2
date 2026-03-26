## Advanced Functions

### Recursion

Recursion is a powerful technique where a function calls itself to solve problems by breaking them into smaller, identical subproblems. It’s especially valuable for tasks like tree traversal, mathematical computations, and divide-and-conquer algorithms. However, **recursion requires careful design** to avoid stack overflow and performance pitfalls. Let’s explore this concept with concrete examples.

#### Why Recursion Matters
Recursion simplifies complex problems by reducing them to base cases and recursive calls. For instance, calculating factorial (`n! = n × (n-1) × ... × 1`) becomes elegantly concise:

```c
int factorial(int n) {
    if (n == 0) {
        return 1;
    }
    return n * factorial(n - 1);
}
```

This implementation **exhausts the problem space** by recursively reducing `n` until it reaches the base case (`n == 0`). The function calls itself with `n-1` until it hits the stopping condition.

#### Practical Example: Fibonacci Sequence
To demonstrate recursion’s real-world application, let’s compare recursive and iterative approaches for the Fibonacci sequence (`F(n) = F(n-1) + F(n-2)`):

```c
// Recursive version (exponential time)
int fibonacci_recursive(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2);
}
```

*Note: This recursive version is inefficient for large `n` (exponential time complexity), but it’s ideal for understanding recursion mechanics.*

For contrast, here’s an iterative version that avoids recursion overhead:

```c
// Iterative version (linear time)
int fibonacci_iterative(int n) {
    if (n <= 1) {
        return n;
    }
    int a = 0, b = 1, c;
    for (int i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

#### Key Considerations
- **Base Case**: Always define a condition to stop recursion (e.g., `n == 0` in factorial). Without this, recursion becomes infinite.
- **Stack Overflow**: Deep recursion chains can exhaust the stack. For example, a 1,000-level recursion might crash on most systems.
- **Performance**: Recursion is slower than iteration due to function call overhead. Use it only when the problem naturally lends itself to recursive decomposition.

Recursion is a **double-edged sword**—it simplifies code but demands meticulous handling to prevent crashes and inefficiency. 🔄

### Inline Functions

Inline functions are a compiler optimization hint that instructs the compiler to replace function calls with the function’s body at compile time. This reduces overhead from function calls in performance-critical code. In C, the `inline` keyword (introduced in C99) enables this behavior.

#### How It Works
When a function is declared `inline`, the compiler may choose to inline it (i.e., replace calls with the function’s code) **if**:
1. The function is small (typically < 10 lines)
2. The compiler determines inlining improves performance
3. The function is called frequently

Here’s a practical example:

```c
inline int square(int x) {
    return x * x;
}
```

In compiled code, `square(5)` might become `5 * 5` directly, eliminating function call overhead. However, **the compiler is not obligated** to inline—it decides based on context, size, and optimization goals.

#### When to Use Inline Functions
- ✅ **Use cases**: Small utility functions called repeatedly (e.g., `square()`, `min()`, `max()`).
- ❌ **Avoid cases**: Large functions (> 20 lines), functions with complex logic, or functions called infrequently.

#### Inline vs. Macros: Critical Differences
Inline functions are **not** the same as macros. Here’s why:

| Feature                | Inline Functions                     | Macros (`#define`)                |
|------------------------|--------------------------------------|-----------------------------------|
| **Type Checking**      | Yes (compiler validates types)      | No (text substitution)           |
| **Side Effects**       | Safe (no unintended behavior)       | Risky (e.g., macro expansions in loops) |
| **Code Bloat**         | Minimal (if inlined)                | Can cause large code expansion   |
| **Debugging**          | Easier (clear function boundaries)  | Harder (no function-like structure) |

For example, macros can cause subtle bugs in expressions:
```c
// Macro bug: No parentheses cause incorrect evaluation
#define ADD(a, b) a + b
int result = ADD(1 + 2, 3); // Evaluates to 4 + 3 = 7 (not 5)
```

Inline functions avoid these pitfalls while offering similar performance benefits. ⚡

## Summary

In this section, we explored **recursion**—a technique where functions solve problems by calling themselves recursively—and **inline functions**, a compiler hint to optimize small, frequently called code. Recursion simplifies complex problems but requires careful base cases and stack management. Inline functions reduce call overhead without sacrificing type safety, making them safer alternatives to macros. Remember: **recursion is a double-edged sword** and **inline functions are a tool for optimization, not a magic fix**. 🔄⚡