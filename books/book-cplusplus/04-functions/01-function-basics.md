## Function Basics

Functions are the building blocks of C++ programs, enabling you to encapsulate reusable logic, improve code organization, and manage complexity. In this section, we'll explore the foundational concepts of functions—declaration, definition, parameters, and return types—with practical examples that you can run immediately.

### Declaration

A **function declaration** (also called a *prototype*) is a statement that informs the compiler about a function's name, parameters, and return type *before* the function's implementation appears in the code. This is critical for two reasons:  
1. It allows the compiler to check for consistency between the declaration and definition  
2. It enables function calls to occur *before* the function is defined (e.g., in header files or when functions are defined later in the file)

Declaration syntax follows this pattern:  
`return_type function_name(parameters);`

Here's a concrete example of a function declaration for a simple addition operation:

```cpp
int add(int a, int b);
```

This tells the compiler:  
- The function `add` returns an `int`  
- It takes two `int` parameters named `a` and `b`  
- The implementation appears later in the file  

> 💡 **Why declarations matter**: Without declarations, the compiler wouldn't know how to handle calls to `add()` until it sees the implementation. This prevents "undefined reference" errors and enables cleaner code structure.

### Definition

A **function definition** provides the actual implementation of a function. It includes:  
1. The function's return type (or `void` for no return)  
2. The function name  
3. The parameter list  
4. The function body (code that executes when the function is called)  

The definition is where your logic lives. Here's how it looks:

```cpp
int add(int a, int b) {
    return a + b;
}
```

**Key differences between declaration and definition**:  
| Aspect          | Declaration                     | Definition                          |
|------------------|----------------------------------|--------------------------------------|
| **Placement**    | Before function implementation  | After declaration (or at file scope)|
| **Body**         | No body (just signature)        | Contains executable code            |
| **Compiler Check** | Only validates signature      | Validates entire implementation     |

> 🌟 **Pro tip**: In C++, you *can* define a function before its declaration (for simplicity), but declarations are still required for functions called from other scopes. We'll cover this in advanced sections.

### Parameters

Parameters are variables that a function uses to receive input from the caller. They act as placeholders for values that will be passed when the function is invoked. C++ supports three primary parameter types:

1. **Value parameters** (default behavior)  
2. **Reference parameters** (modifies original data)  
3. **Pointer parameters** (advanced use case)  

Let's demonstrate each with runnable examples:

#### Value Parameters
When you pass a value parameter, the function receives a *copy* of the argument. Changes inside the function don't affect the original value.

```cpp
void printValue(int x) {
    std::cout << "Value: " << x << std::endl;
}
```

**Usage**:
```cpp
int main() {
    int num = 10;
    printValue(num); // Prints "Value: 10"
    std::cout << "After call: " << num << std::endl; // Still prints 10
    return 0;
}
```

#### Reference Parameters
Reference parameters (`&`) let the function modify the original variable passed to it. This is more efficient than value parameters for large objects.

```cpp
void modifyValue(int& x) {
    x = 42; // Modifies the original variable
}
```

**Usage**:
```cpp
int main() {
    int num = 10;
    modifyValue(num);
    std::cout << "After call: " << num << std::endl; // Prints 42
    return 0;
}
```

#### Pointer Parameters (Advanced)
Pointer parameters allow direct memory manipulation (use with caution). We'll show a simple example for context:

```cpp
void incrementPointer(int* p) {
    (*p)++;
}
```

**Usage**:
```cpp
int main() {
    int value = 5;
    incrementPointer(&value);
    std::cout << "Value after increment: " << value << std::endl; // Prints 6
    return 0;
}
```

> ⚠️ **When to use references**: Prefer references over pointers for most cases—they're safer and more intuitive for C++. Pointers are reserved for low-level memory operations.

### Return Types

The **return type** specifies the type of value a function sends back to the caller. This is crucial because it:  
- Defines what the caller can expect  
- Enables type checking at compile time  
- Prevents runtime errors from mismatched data

C++ supports these common return types:  
- `int`, `double`, `float` (numeric)  
- `std::string`, `bool` (basic types)  
- `void` (no return value)  
- Complex types (e.g., `std::vector`, custom classes)  

#### Non-void Return Types
Here's a function that calculates the square of a number:

```cpp
int square(int num) {
    return num * num;
}
```

**Usage**:
```cpp
int main() {
    int result = square(5);
    std::cout << "5 squared is: " << result << std::endl; // Prints 25
    return 0;
}
```

#### Void Return Types
Functions that don't return values use `void`. These are useful for side effects (e.g., printing, modifying global state).

```cpp
void printMessage() {
    std::cout << "Hello from a void function!" << std::endl;
}
```

**Usage**:
```cpp
int main() {
    printMessage(); // Prints without returning anything
    return 0;
}
```

> 🔑 **Critical rule**: If a function *must* return a value but has no logic to compute it (e.g., just printing), use `void`. Otherwise, always specify a return type that matches your intended output.

## Summary

Functions are the core mechanism for structuring reusable code in C++. In this section, we've covered:  
- **Declaration**: Prototyping functions for compiler awareness  
- **Definition**: The actual implementation containing executable logic  
- **Parameters**: Input variables (value, reference, or pointer)  
- **Return types**: The data type of values sent back to callers (`int`, `void`, etc.)  

By mastering these fundamentals, you'll build robust, maintainable code that scales from simple scripts to complex systems. Remember: *Every function starts with a declaration and ends with a definition*—this pattern ensures your code is both safe and predictable. 🚀