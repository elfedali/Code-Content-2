## Loops

Loops are the backbone of iterative logic in C programming—they allow you to execute blocks of code repeatedly until specific conditions are met. Mastering loops is essential for handling repetitive tasks efficiently, from simple counting operations to complex data processing. In this section, we’ll explore three fundamental loop structures: `for`, `while`, and `do...while`. Each serves distinct purposes and appears in real-world applications across diverse domains like algorithm implementation, file processing, and user input validation.

### For Loops

The `for` loop is C’s most versatile iteration construct. It combines initialization, condition checking, and iteration increment/decrement into a single concise statement, making it ideal for predictable counting scenarios and array traversal. Its structure follows this pattern:

```c
for (initialization; condition; increment) {
    // loop body
}
```

Here’s how it works step-by-step:
1. **Initialization**: Sets up the starting value (e.g., `int i = 0`).
2. **Condition**: Evaluates whether to continue looping (e.g., `i < 5`).
3. **Increment**: Updates the loop variable after each iteration (e.g., `i++`).

This structure ensures precise control over the loop’s execution flow and is particularly efficient for scenarios where you know the exact number of iterations upfront.

Let’s demonstrate with a concrete example that prints numbers from `0` to `4`:

```c
#include <stdio.h>

int main() {
    for (int i = 0; i < 5; i++) {
        printf("Number: %d\n", i);
    }
    return 0;
}
```

**Why this matters**: The `for` loop excels at scenarios where you need to iterate over fixed ranges (e.g., array indices) or perform a known number of operations. It’s also the most readable loop type for beginners and experienced developers alike.

A common pitfall to avoid: **forgetting to update the loop variable**. If you omit the increment step (`i++`), the loop becomes an infinite execution. For example:

```c
// This loop runs infinitely!
for (int i = 0; i < 5; ) {
    printf("Infinite loop!\n");
    // Missing increment: i never increases
}
```

**Real-world application**: When processing elements in an array, the `for` loop is your go-to solution. For instance, summing all values in an integer array:

```c
int numbers[5] = {1, 2, 3, 4, 5};
int sum = 0;
for (int i = 0; i < 5; i++) {
    sum += numbers[i];
}
printf("Sum: %d\n", sum); // Output: 15
```

### While Loops

The `while` loop provides a more flexible alternative to the `for` loop by allowing you to define the loop condition *after* the initialization. It’s particularly useful when the number of iterations isn’t known in advance—such as reading user input until a sentinel value is encountered.

The syntax is straightforward:

```c
while (condition) {
    // loop body
}
```

**Key insight**: The condition is evaluated *before* each iteration. If the condition is false initially, the loop body never executes.

Here’s a practical example that reads integers from the user until `-1` is entered:

```c
#include <stdio.h>

int main() {
    int number;
    printf("Enter numbers (type -1 to stop): ");
    while (1) {
        scanf("%d", &number);
        if (number == -1) {
            break;
        }
        printf("You entered: %d\n", number);
    }
    printf("Input ended.\n");
    return 0;
}
```

**Why this matters**: The `while` loop shines in scenarios where you need to handle dynamic input or terminate based on external events (e.g., user actions, file end markers). It’s also the preferred choice for low-level operations where you control the loop’s state explicitly.

**Critical nuance**: Unlike the `for` loop, the `while` loop requires careful management of the loop variable to avoid infinite loops. Always ensure your condition eventually becomes false. For example:

```c
int i = 0;
while (i < 5) { // This loop terminates
    printf("i = %d\n", i);
    i++; // Increment ensures termination
}
```

**Real-world application**: File reading in C often uses `while` loops. Consider reading lines from a text file until the end-of-file (EOF) is reached:

```c
FILE *file = fopen("data.txt", "r");
char line[100];
while (fgets(line, sizeof(line), file) != NULL) {
    printf("Line: %s\n", line);
}
fclose(file);
```

### Do...While Loops

The `do...while` loop is the only loop structure in C that *guarantees* at least one execution of the loop body. This makes it ideal for scenarios where you need to run a block of code *once* before checking the condition—such as validating user input where you must accept at least one attempt.

Its structure is:

```c
do {
    // loop body
} while (condition);
```

**Key distinction**: The condition is evaluated *after* the first iteration. This ensures the body runs *at least once*.

Here’s a classic example for validating user input:

```c
#include <stdio.h>

int main() {
    int age;
    do {
        printf("Enter your age (1-100): ");
        scanf("%d", &age);
    } while (age < 1 || age > 100);
    printf("Valid age entered: %d\n", age);
    return 0;
}
```

**Why this matters**: The `do...while` loop is indispensable for input validation tasks where you must accept at least one valid response. It prevents situations where the user might enter invalid data *and* the program crashes due to an unhandled condition.

**Critical nuance**: The condition in a `do...while` loop *must* eventually become false to terminate the loop. Otherwise, the loop becomes infinite. For example:

```c
int i = 0;
do {
    printf("i = %d\n", i);
    i++; // This ensures termination
} while (i < 5); // Terminates after 5 iterations
```

**Real-world application**: Handling repeated user prompts where the first attempt is always valid (e.g., a password reset system that requires a minimum of one attempt):

```c
do {
    printf("Enter new password: ");
    scanf("%s", password);
    if (strlen(password) < 8) {
        printf("Password too short. Try again.\n");
    } else {
        break;
    }
} while (1);
```

### Loop Comparison Summary

| Feature              | `for` Loop                     | `while` Loop                   | `do...while` Loop              |
|----------------------|--------------------------------|--------------------------------|--------------------------------|
| **Execution Order**  | Initialization → Condition → Body → Increment | Condition → Body → Condition | Body → Condition              |
| **Minimum Iterations**| 0 (if condition fails initially) | 0 (if condition fails initially) | **1** (guaranteed)           |
| **Best Use Case**    | Counting, fixed ranges, arrays | Dynamic input, unknown iterations | Input validation, mandatory first attempt |
| **Common Pitfall**   | Missing increment (infinite loop) | Infinite loop without condition update | Condition never becomes false |

### Summary

In this section, we’ve explored the three core loop structures in C: `for`, `while`, and `do...while`. Each serves distinct purposes and is critical for real-world programming tasks:
- Use **`for` loops** for predictable counting and array traversal where the number of iterations is known.
- Opt for **`while` loops** when handling dynamic inputs or scenarios where the iteration count isn’t fixed.
- Choose **`do...while` loops** when you *must* guarantee at least one execution of the loop body—especially for input validation.

Mastering these loops enables you to write precise, efficient, and robust C programs. Remember: always validate your loop conditions to avoid infinite execution, and prioritize the loop type that aligns best with your problem’s constraints. 🔄