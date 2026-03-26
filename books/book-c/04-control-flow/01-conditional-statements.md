## Conditional Statements

In C, conditional statements are the backbone of decision-making in your programs. They allow you to control the flow of execution based on specific conditions. This section dives deep into two essential conditional structures: **if / else** and **switch**. By mastering these, you'll be able to build programs that respond intelligently to varying inputs and scenarios.

---

### If / Else Statements

The `if / else` statement is the simplest and most fundamental conditional structure in C. It lets you execute a block of code if a condition is `true`, and an alternative block if the condition is `false`. This construct is your go-to for basic decision logic.

#### Syntax and Structure

The basic syntax is:

```c
if (condition) {
    // Code to run if condition is true
} else {
    // Code to run if condition is false
}
```

You can also chain multiple conditions using `else if`:

```c
if (condition1) {
    // Code block 1
} else if (condition2) {
    // Code block 2
} else {
    // Code block 3 (if none of the above conditions are true)
}
```

#### Practical Examples

**Example 1: Checking for Even or Odd Numbers**

```c
#include <stdio.h>

int main() {
    int number = 7;
    if (number % 2 == 0) {
        printf("The number is even.\n");
    } else {
        printf("The number is odd.\n");
    }
    return 0;
}
```

*Output when `number = 7`*: `The number is odd.`

**Example 2: Grade Determination**

```c
#include <stdio.h>

int main() {
    int score = 85;
    if (score >= 90) {
        printf("Grade: A\n");
    } else if (score >= 80) {
        printf("Grade: B\n");
    } else if (score >= 70) {
        printf("Grade: C\n");
    } else {
        printf("Grade: F\n");
    }
    return 0;
}
```

*Output when `score = 85`*: `Grade: B`

**Example 3: Simple User Input Validation**

```c
#include <stdio.h>

int main() {
    int age;
    printf("Enter your age: ");
    scanf("%d", &age);

    if (age < 0) {
        printf("Error: Age cannot be negative.\n");
    } else {
        printf("Your age is: %d\n", age);
    }
    return 0;
}
```

This program validates user input for age, ensuring it's non-negative.

#### Key Points to Remember
- **Always use braces `{}`** for code blocks to avoid ambiguity (especially when adding more conditions later).
- **Condition expressions must evaluate to `true`/`false`**. In C, non-zero values are `true`, and zero is `false`.
- **The `else` block is optional** if you don't need to handle the `false` case (though it's common practice to include it for clarity).

---

### Switch Statements

The `switch` statement provides a more readable alternative to multiple `if / else` statements when dealing with multiple discrete values. It's particularly useful for handling integer or character-based options efficiently.

#### Syntax and Structure

The syntax for a `switch` statement is:

```c
switch (expression) {
    case constant1:
        // Code block for constant1
        break;
    case constant2:
        // Code block for constant2
        break;
    ...
    default:
        // Code block for unmatched values
}
```

- The `expression` is evaluated once.
- The value is compared to each `case` label.
- When a match is found, the corresponding block executes, and `break` exits the `switch` (preventing "fall-through" to subsequent cases).

#### Practical Examples

**Example 1: Simple Menu Selection**

```c
#include <stdio.h>

int main() {
    int choice;
    printf("Choose a number (1-3): ");
    scanf("%d", &choice);

    switch (choice) {
        case 1:
            printf("You chose 1.\n");
            break;
        case 2:
            printf("You chose 2.\n");
            break;
        case 3:
            printf("You chose 3.\n");
            break;
        default:
            printf("Invalid choice.\n");
    }
    return 0;
}
```

*Output when `choice = 2`*: `You chose 2.`

**Example 2: Handling Character Grades**

```c
#include <stdio.h>

int main() {
    char grade = 'B';
    switch (grade) {
        case 'A':
            printf("Grade: A\n");
            break;
        case 'B':
            printf("Grade: B\n");
            break;
        case 'C':
            printf("Grade: C\n");
            break;
        default:
            printf("Unknown grade.\n");
    }
    return 0;
}
```

*Output when `grade = 'B'`*: `Grade: B`

**Example 3: Using `switch` with Integers**

```c
#include <stdio.h>

int main() {
    int day = 3;
    switch (day) {
        case 1:
            printf("Monday\n");
            break;
        case 2:
            printf("Tuesday\n");
            break;
        case 3:
            printf("Wednesday\n");
            break;
        default:
            printf("Invalid day.\n");
    }
    return 0;
}
```

*Output when `day = 3`*: `Wednesday`

#### Key Points to Remember
- **Each `case` must have a `break` statement** (or `return`) to prevent "fall-through" (i.e., the program continuing to execute the next `case`).
- **The `default` case is optional** and executes when no `case` matches the expression.
- **Use `switch` for discrete values** (e.g., integers, characters) but avoid it for ranges or complex conditions.

---

### When to Use Switch vs If-Else

Here's a comparison table to help you decide:

| **Scenario**                     | **Use `if-else`**                          | **Use `switch`**                          |
|----------------------------------|---------------------------------------------|--------------------------------------------|
| Multiple discrete integer values | ❌ (less readable)                         | ✅ (more readable and concise)            |
| Range checks (e.g., `x > 5`)    | ✅ (natural)                               | ❌ (not suitable)                         |
| Character or string comparisons  | ✅ (with `strcmp` for strings)             | ✅ (for single characters)                |
| Complex conditions               | ✅ (e.g., nested conditions)               | ❌ (not designed for this)                |

*Note: For strings, `switch` is not directly supported (use `if` with `strcmp` or `strcmp` in the condition).*

---

## Summary

In this section, we've covered two essential conditional structures in C: **if / else** and **switch**.

- The `if / else` statements are your go-to for simple and compound conditions, allowing precise control over program flow based on boolean expressions.
- The `switch` statement excels at handling multiple discrete values efficiently, making your code more readable when dealing with a set of fixed options.

Both constructs are foundational for writing robust and maintainable C programs. Remember to:
1. Use braces `{}` for code blocks.
2. Always include `break` in `switch` cases to avoid fall-through.
3. Choose `if / else` for complex logic and `switch` for discrete value handling.

By mastering these concepts, you'll be able to build decision-driven logic that responds confidently to your program's needs. 💡