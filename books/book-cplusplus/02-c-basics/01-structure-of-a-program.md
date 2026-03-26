## Structure of a Program

In C++, every program follows a precise structure that ensures clarity, portability, and maintainability. This section explores the three foundational elements that define how C++ programs are organized: the `main()` function, headers, and namespaces. Understanding these components is essential for writing professional, production-grade C++ code.

### main() Function

The `main()` function serves as the **entry point** of every C++ program. It's the single function that the operating system calls when your program starts executing. Without a `main()` function, your program will not run at all. 

The `main()` function must:
1. Be named exactly `main`
2. Have a return type of `int` (to indicate success/failure via exit code)
3. Be placed in the global namespace (unless you use a namespace)
4. Be defined once per program

Here's the simplest valid `main()` implementation:

```cpp
int main() {
  // Program execution begins here
  return 0;
}
```

This minimal implementation demonstrates the core requirement: the function must return an integer (typically `0` for success). Real-world programs add logic inside this function.

**Practical example**: A program that prints "Hello, World!" to the console:

```cpp
int main() {
  std::cout << "Hello, World!\n";
  return 0;
}
```

When this program runs, it executes the `std::cout` statement (which we'll cover next) and returns `0` to indicate normal termination.

> 💡 **Pro tip**: Always include a `return 0;` statement in your `main()` function. Omitting it causes undefined behavior and may lead to program crashes.

### Headers

Headers (or header files) are **essential building blocks** that provide access to precompiled code without duplicating it across multiple source files. They act as a bridge between your program and the C++ standard library or custom code.

#### Key characteristics of headers:
- **Preprocessor directives**: Headers are processed by the C++ preprocessor before compilation
- **Standard library headers**: Use `<...>` format (e.g., `<iostream>`)
- **User-defined headers**: Use `"` format (e.g., `"my_utils.h"`)
- **Contain**: Function declarations, class definitions, macros, and type templates

#### How headers work:
When you write `#include <iostream>`, the preprocessor inserts the contents of the `iostream` header file into your code *before* compilation begins. This gives you access to standard input/output functionality.

**Practical examples**:

1. **Basic I/O header** (standard library):
```cpp
#include <iostream>
int main() {
  std::cout << "Basic I/O works!\n";
  return 0;
}
```

2. **Multi-header program** (using multiple standard libraries):
```cpp
#include <iostream>
#include <vector>
#include <string>

int main() {
  std::vector<std::string> names = {"Alice", "Bob", "Charlie"};
  std::cout << "First name: " << names[0] << std::endl;
  return 0;
}
```

3. **User-defined header** (for demonstration):
```cpp
// my_utils.h
#ifndef MY_UTILS_H
#define MY_UTILS_H

int add(int a, int b);
std::string capitalize(std::string s);

#endif
```

```cpp
// main.cpp
#include "my_utils.h"
#include <iostream>

int main() {
  std::cout << "Sum: " << add(3, 4) << std::endl;
  std::cout << "Capitalized: " << capitalize("hello") << std::endl;
  return 0;
}
```

> ⚠️ **Critical note**: Never include headers multiple times in the same translation unit. The preprocessor handles this with `#ifndef` guards (as shown in the user-defined header example).

### Namespaces

Namespaces are **a critical organizational tool** that prevents naming collisions and improves code readability. They group related types (classes, functions, variables) into logical units, making your code more maintainable.

#### Why namespaces matter:
- Avoid conflicts between libraries (e.g., two different libraries might define a `print()` function)
- Encapsulate implementation details
- Allow for modular code design

#### Core concepts:
- `std` (standard) namespace: Contains all standard library components
- Custom namespaces: Defined by you for your project
- Scope: Namespaces limit identifier visibility to their own scope

**Practical examples**:

1. **Basic namespace usage**:
```cpp
#include <iostream>

namespace my_namespace {
  int counter = 0;
  void increment() {
    counter++;
  }
}

int main() {
  my_namespace::increment();
  std::cout << "Counter: " << my_namespace::counter << std::endl;
  return 0;
}
```

2. **Using `std` namespace** (two common approaches):
```cpp
// Approach 1: Explicit std:: prefix (recommended)
#include <iostream>

int main() {
  std::cout << "Explicit std:: prefix" << std::endl;
  return 0;
}
```

```cpp
// Approach 2: Using directive (for small programs only)
#include <iostream>

int main() {
  using namespace std; // ⚠️ Avoid in large projects!
  cout << "Using directive" << endl;
  return 0;
}
```

**Comparison of namespace approaches**:

| Approach | Example | Pros | Cons | When to Use |
|----------|---------|------|------|-------------|
| `std::` prefix | `std::cout` | Clear, avoids collisions | More typing | **All professional code** |
| `using namespace std;` | `cout` | Less typing | Naming collisions possible | Small scripts only |

> 🚀 **Key insight**: Always prefer the `std::` prefix in production code. The `using` directive is a quick shortcut for small projects but causes serious maintenance issues in larger applications.

## Summary

The structure of a C++ program is built upon three essential pillars:
1. **The `main()` function**: Your program's starting point and only entry point
2. **Headers**: The mechanism for accessing libraries and shared code without duplication
3. **Namespaces**: The solution for organizing code and preventing naming conflicts

Mastering these fundamentals ensures your programs are:
- **Portable** (works across different systems)
- **Maintainable** (clear structure for future changes)
- **Robust** (avoids common pitfalls like naming collisions)

Remember: the main function is your program's starting point! 🚀