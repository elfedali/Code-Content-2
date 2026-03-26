## Functions: Basics

In C, functions are the building blocks that allow us to break down complex problems into manageable pieces. They help us write modular, reusable, and maintainable code. This section covers the fundamentals of functions: how to declare them, define them, and call them effectively.

### Declaration

A function declaration (also known as a function prototype) tells the compiler about a function's **name**, **return type**, and **parameters** *before* the function's actual implementation. This is crucial because it enables the compiler to verify that function calls match expected signatures.

Here's a concrete example:
```c
int add(int a, int b);
```

This declaration informs the compiler that:
- The function name is `add`
- It returns an `int`
- It takes two `int` parameters (`a` and `b`)

**Why declarations matter**: Without declarations, the compiler wouldn't know how to handle function calls. In practice, we place declarations *before* `main()` in a file (or in header files for reuse). This allows the compiler to check calls like `add(3, 4)` during compilation.

### Definition

A function definition contains the actual implementation of the function. It includes the function's body (the code that executes when the function is called) and a `return` statement (if applicable).

Here's the complete implementation:
```c
int add(int a, int b) {
    return a + b;
}
```

**Key characteristics**:
- The function body is enclosed in curly braces `{}` 
- The `return` statement provides the output value
- Parameter names (`a`, `b`) are local to this function
- The definition *must* match the declaration's signature (same name, types, and order)

When `main()` calls `add(3, 4)`, the compiler executes the function body, computes `3 + 4 = 7`, and returns `7` to `main()`.

### Calling Functions

To use a function, you call it by writing its name followed by parentheses containing arguments. The function executes and returns a value that can be used in your program.

Here's a practical example demonstrating multiple calls:
```c
#include <stdio.h>

int add(int a, int b);

int main() {
    int sum1 = add(2, 3);
    int sum2 = add(4, 5);
    printf("Sum1: %d, Sum2: %d\n", sum1, sum2);
    return 0;
}
int add(int a, int b) {
    return a + b;
}
```

**How this works**:
1. `add(2, 3)` → Evaluates to `5` and stores in `sum1`
2. `add(4, 5)` → Evaluates to `9` and stores in `sum2`
3. `printf` outputs: `Sum1: 5, Sum2: 9`

This pattern shows how functions enable **reusability** (the same `add` function works for multiple calculations) and **modularity** (each function handles one specific task).

## Summary

In this section, we've covered the three essential aspects of functions in C:

1. **Declaration**: A function declaration (prototype) tells the compiler about a function's signature *without* its body. This enables compiler validation of function calls.
2. **Definition**: The function definition contains the actual implementation (body) and return logic. It must match the declaration's signature.
3. **Calling Functions**: You invoke functions by providing arguments in parentheses. The returned value integrates seamlessly into your program.

Functions are the cornerstone of modular programming in C. By mastering these fundamentals, you'll be able to write clean, efficient, and maintainable code that scales effectively. 🚀