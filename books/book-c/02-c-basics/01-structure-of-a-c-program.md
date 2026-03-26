## Structure of a C Program 🐘

Welcome to the world of C programming! Before we dive into the complexities of pointers, memory management, and advanced algorithms, let's build a solid foundation by understanding the essential components that make up a C program. In this section, we'll break down the three pillars: the `main()` function, headers, and statements. By the end, you'll have a clear picture of how to structure and write well-organized C programs from scratch.

### 1. The main() Function

The `main()` function is the **heart of every C program**. It serves as the entry point where the operating system begins executing your code. When you run a C program, the system calls `main()`, and the program terminates when `main()` completes (typically via a `return` statement).

This function is **mandatory** in standard C programs (with rare exceptions for embedded systems). It must be declared with a specific signature:
```c
int main(void);
```
*Note:* While `int main()` is also valid in practice, the modern standard prefers `void` for the parameter list to indicate no arguments are passed.

**Example**:
```c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    return 0;
}
```
This simple program prints "Hello, World!" and exits with a return value of `0` (indicating success).

**Why is `main()` important?**  
- It’s the **only** entry point for program execution.  
- It enables interaction with the operating system (e.g., command-line arguments).  
- It’s where you place your program’s core logic.

**Critical note**: The `main()` function must be defined exactly once in your program. Multiple `main()` definitions will cause compilation errors.

---

### 2. Headers

Headers (or header files) are **files containing declarations and macros** for functions, variables, and other elements you want to use in your code. They act as bridges between your program and external libraries.

In C, headers are typically named with a `.h` extension (e.g., `stdio.h`). You include them using the `#include` preprocessor directive:
```c
#include <header_name.h>
```

**Why use headers?**  
- **Prevent code duplication**: Headers centralize declarations so you don’t rewrite them repeatedly.  
- **Enable modular programming**: Split code into separate files (e.g., `main.c`, `utils.c`) and link headers to share functionality.  
- **Manage dependencies**: Headers specify which libraries your code relies on (e.g., `math.h` for math functions).

**Practical example with multiple headers**:
```c
#include <stdio.h>  // Standard I/O
#include <math.h>   // Math functions

int main(void) {
    double radius = 5.0;
    double area = M_PI * radius * radius; // Uses π from math.h
    printf("Area of circle: %.2f\n", area);
    return 0;
}
```
This program calculates the area of a circle using `M_PI` (defined in `math.h`).

**Key headers to know**:  
| Header        | Purpose                                  | Examples                          |
|----------------|-------------------------------------------|------------------------------------|
| `stdio.h`      | Standard I/O                             | `printf`, `scanf`                 |
| `math.h`       | Mathematical functions                   | `sqrt`, `sin`, `cos`              |
| `stdlib.h`    | Standard library functions               | `malloc`, `free`, `exit`          |
| `string.h`    | String manipulation                      | `strlen`, `strcpy`                |

---

### 3. Statements

In C, a **statement** is a unit of code that performs an action. Statements are the **building blocks** of your program and can be categorized as:

1. **Declaration statements**: Define variables (e.g., `int age = 25;`)
2. **Expression statements**: Evaluate expressions (e.g., `result = 10 + 5;`)
3. **Control flow statements**: Direct program execution (e.g., `if`, `for`, `while`)
4. **Compound statements**: Group multiple statements (e.g., `{ ... }`)

**Examples**:
- **Simple declaration**:
  ```c
  int age = 25; // Declares an integer variable
  ```
- **Expression statement**:
  ```c
  int result = 10 + 5; // Evaluates expression and assigns
  ```
- **Control flow statement**:
  ```c
  if (age > 18) {
      printf("You are an adult.\n");
  }
  ```
- **Compound statement**:
  ```c
  {
      int a = 10;
      int b = 20;
      int sum = a + b;
      printf("Sum: %d\n", sum);
  }
  ```

**Why statements matter**:  
- They enable you to express **logic and behavior** in your program.  
- They are the smallest executable units the compiler processes (ending with `;`).

**Key rules to remember**:  
- Every statement must end with a semicolon (`;`).  
- The body of control structures (like `if`) must be a **single statement** or a **compound statement** (enclosed in `{}`).  

---

## Summary

You’ve now mastered the three pillars of a C program:  
1. **`main()` function**: The program’s entry point and execution starting point.  
2. **Headers**: Libraries of declarations that enable modular, maintainable code.  
3. **Statements**: The building blocks that define program logic and behavior.  

With this foundation, you’re ready to build powerful, structured C programs! 🐘