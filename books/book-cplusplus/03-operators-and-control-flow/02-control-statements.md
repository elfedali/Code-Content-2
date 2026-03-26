## Control Statements

In C++, control statements are the building blocks that dictate program execution flow. They empower us to make decisions, handle edge cases, and build responsive applications. This section dives into two essential constructs: `if / else` and `switch`. These tools form the backbone of conditional logic in your codebase.

### if / else

The `if / else` statement is C++'s most versatile conditional construct. It evaluates a boolean expression and executes one of two code blocks based on whether the expression is `true` or `false`. This structure is indispensable for handling real-world scenarios where decisions depend on runtime conditions.

Here’s the core syntax:

```cpp
if (condition) {
    // Code to execute if condition is true
} else {
    // Code to execute if condition is false
}
```

Let’s walk through practical examples that demonstrate real-world applications:

**Example 1: Basic positive/negative check**
```cpp
#include <iostream>

int main() {
    int num = -5;
    if (num > 0) {
        std::cout << "Positive number";
    } else {
        std::cout << "Non-positive number";
    }
    return 0;
}
```
*Output*: `Non-positive number`

**Example 2: Grade conversion with else-if chain**
```cpp
#include <iostream>

int main() {
    int score = 78;
    if (score >= 90) {
        std::cout << "A";
    } else if (score >= 80) {
        std::cout << "B";
    } else if (score >= 70) {
        std::cout << "C";
    } else {
        std::cout << "D";
    }
    return 0;
}
```
*Output*: `C`

**Example 3: Nested conditionals for multi-criteria validation**
```cpp
#include <iostream>

int main() {
    int age = 22;
    int height = 172;
    if (age >= 18) {
        if (height >= 170) {
            std::cout << "Adult and tall enough";
        } else {
            std::cout << "Adult but not tall enough";
        }
    } else {
        std::cout << "Not an adult";
    }
    return 0;
}
```
*Output*: `Adult and tall enough`

**Critical best practices**:
- Always use braces `{}` for blocks—even single-line blocks—to prevent ambiguity
- `else if` chains are evaluated sequentially; the first `true` condition triggers execution
- Avoid deep nesting by restructuring logic (e.g., using `else if` chains over multiple `if` statements)
- **Never omit `break` in `switch`** (we’ll cover this in the next section)

The `if / else` construct is your go-to for flexible decision-making. Master it, and you’ll write code that adapts to complex real-world scenarios. 🚀

### switch

The `switch` statement provides an elegant alternative to chained `if / else` when comparing a single expression against multiple discrete values. It’s especially efficient for handling integer, enum, or character-based cases.

Here’s the standard syntax:

```cpp
switch (expression) {
    case value1:
        // Code for value1
        break;
    case value2:
        // Code for value2
        break;
    ...
    default:
        // Code for no matches
}
```

**Example 1: Simple grade-to-score conversion**
```cpp
#include <iostream>

int main() {
    char grade = 'B';
    int score = 0;
    switch (grade) {
        case 'A':
            score = 90;
            break;
        case 'B':
            score = 80;
            break;
        case 'C':
            score = 70;
            break;
        default:
            score = 0;
    }
    std::cout << "Score: " << score;
    return 0;
}
```
*Output*: `Score: 80`

**Example 2: Day-of-week mapping**
```cpp
#include <iostream>

int main() {
    int day = 3;
    std::string dayName;
    switch (day) {
        case 1:
            dayName = "Monday";
            break;
        case 2:
            dayName = "Tuesday";
            break;
        case 3:
            dayName = "Wednesday";
            break;
        default:
            dayName = "Other";
    }
    std::cout << "Day: " << dayName;
    return 0;
}
```
*Output*: `Day: Wednesday`

**Key behaviors to understand**:
- The `expression` must be an integer, enum, or character (C++17+ supports `std::string` via explicit conversion)
- **Always include `break`** after each `case` to prevent "fall-through" (execution continuing to the next case)
- The `default` case executes when no `case` matches
- **No `break` = fall-through** (a common pitfall):
  ```cpp
  switch (day) {
      case 1: std::cout << "Mon"; // No break
      case 2: std::cout << "Tue"; // This runs too!
  }
  ```
  *Output*: `Monto`

#### if / else vs. switch: When to use which

| Feature                | `if / else`                                  | `switch`                                     |
|------------------------|----------------------------------------------|-----------------------------------------------|
| **Best use case**      | Complex conditions, string comparisons       | Discrete integer/enum/char values             |
| **Expression type**    | Any boolean expression                      | Integer, enum, or char (C++17+)               |
| **Case handling**      | One condition per block                     | Multiple discrete values with `case` labels   |
| **Readability**        | High for simple logic                       | Higher for value-based decisions             |
| **Common pitfalls**    | Deep nesting, complex boolean expressions    | Fall-through without `break`                 |

**Pro tip**: Use `switch` for:
- Converting enums to strings
- Mapping discrete codes to actions
- Handling integer inputs with limited valid ranges

Avoid `switch` for:
- String comparisons (use `if / else` or `std::string` methods)
- Complex boolean logic (use `if / else`)

### Summary

You now have two powerful tools for conditional logic in C++:  
- **`if / else`**: For flexible, complex decision-making  
- **`switch`**: For efficient handling of discrete values  

Master these constructs by:  
1. Using braces for all blocks  
2. Adding `break` in every `switch` case  
3. Choosing `switch` for discrete values and `if / else` for complex conditions  

These patterns ensure your code remains readable, maintainable, and robust. Remember: **the right tool for the job makes your logic both efficient and intuitive**. 🔁