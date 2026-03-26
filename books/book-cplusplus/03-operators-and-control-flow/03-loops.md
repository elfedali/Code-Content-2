## Loops

In C++, loops are the cornerstone of iterative computation, enabling you to repeat operations efficiently while maintaining code clarity and control. This section dives deep into the four essential loop constructs: **for**, **while**, **do...while**, and **range-based for**. Each has unique strengths and ideal use cases—mastering them ensures you write robust, maintainable code that scales with your projects. Let's explore them systematically.

### For Loop

The `for` loop is C++'s most versatile iterative construct, designed for scenarios where you know the exact number of iterations or need to initialize, test, and update variables in a single line. Its structure follows this pattern:

```cpp
for (initialization; condition; increment) {
    // loop body
}
```

Here’s a practical example printing numbers from 0 to 2:

```cpp
#include <iostream>

int main() {
    for (int i = 0; i < 3; ++i) {
        std::cout << "Iteration " << i << std::endl;
    }
    return 0;
}
```

This outputs:
```
Iteration 0
Iteration 1
Iteration 2
```

The `for` loop excels when:
- You need precise control over iteration count (e.g., `i < 3`).
- You want to initialize variables (e.g., `int i = 0`).
- You require minimal boilerplate for simple iteration patterns.

**Real-world application**: Calculating factorial with known iterations:
```cpp
#include <iostream>

int main() {
    int n = 5;
    long long factorial = 1;
    for (int i = 1; i <= n; ++i) {
        factorial *= i;
    }
    std::cout << "Factorial of " << n << " is " << factorial << std::endl;
    return 0;
}
```

This outputs: `Factorial of 5 is 120`.

### While Loop

The `while` loop repeats a block of code **as long as a condition remains true**. It’s ideal when the number of iterations is unknown in advance or depends on external state changes. Unlike the `for` loop, it checks the condition **before** each iteration.

```cpp
#include <iostream>

int main() {
    int count = 0;
    while (count < 3) {
        std::cout << "Count: " << count << std::endl;
        ++count;
    }
    return 0;
}
```

This outputs:
```
Count: 0
Count: 1
Count: 2
```

**Key use cases**:
- Handling user input until a valid condition is met.
- Processing data streams where iteration count depends on external input.
- Scenarios requiring manual state updates (e.g., file reading).

**Real-world application**: Summing numbers from 1 to 10:
```cpp
#include <iostream>

int main() {
    int total = 0;
    int num = 1;
    while (num <= 10) {
        total += num;
        ++num;
    }
    std::cout << "Sum from 1 to 10: " << total << std::endl;
    return 0;
}
```

This outputs: `Sum from 1 to 10: 55`.

### Do...While Loop

The `do...while` loop guarantees **at least one execution** of the loop body before checking the condition. This makes it perfect for interactive scenarios where you need to ensure the user gets at least one chance to respond.

```cpp
#include <iostream>

int main() {
    int input;
    do {
        std::cout << "Enter a number (0 to exit): ";
        std::cin >> input;
    } while (input != 0);
    std::cout << "You entered " << input << " to exit." << std::endl;
    return 0;
}
```

This program prompts the user until they enter `0`.

**Critical difference**: The condition is evaluated **after** the loop body runs. This ensures:
- No infinite loops if the user skips the first prompt.
- Guaranteed user interaction (e.g., input validation).

### Range-Based For Loop

The **range-based for** loop (C++11 standard) simplifies iterating over containers like arrays, vectors, and strings by abstracting index management. It’s the preferred choice for modern C++ when working with collections.

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    return 0;
}
```

This outputs: `1 2 3 4 5`

**Key advantages**:
- Eliminates manual index tracking.
- Works with all standard library containers (vectors, lists, maps).
- Supports complex types (e.g., strings, custom objects).

**Real-world application**: Processing characters in a string:
```cpp
#include <iostream>
#include <string>

int main() {
    std::string text = "Hello";
    for (char c : text) {
        std::cout << c;
    }
    std::cout << std::endl;
    return 0;
}
```

This outputs: `Hello`.

### Loop Comparison Summary

| Loop Type       | When to Use                                                                 | Key Strengths                                     |
|-----------------|-----------------------------------------------------------------------------|---------------------------------------------------|
| **For Loop**    | Known iterations, initialization, condition, update in one line               | Precise iteration control; minimal boilerplate     |
| **While Loop**  | Unknown iterations, state-dependent conditions                               | Flexibility for dynamic input processing           |
| **Do...While**  | Must run at least once (e.g., user input validation)                         | Guaranteed first execution                       |
| **Range-Based** | Iterating over containers (vectors, strings, arrays)                         | Readability; no index management required          |

This table highlights critical distinctions—choose the loop that aligns with your specific scenario to maximize code clarity and efficiency.

## Summary

You now have a comprehensive toolkit for iterative control in C++. The **for** loop handles known iterations with precision, the **while** loop manages dynamic conditions, the **do...while** loop ensures user interaction, and the **range-based for** loop streamlines container iteration. Selecting the right loop type directly impacts your code’s maintainability and scalability—always prioritize clarity and context over complexity. 🔄