## Operators

Operators are the building blocks of C programming that allow you to manipulate data and control program flow. Mastering them is essential for writing efficient, readable code. In this section, we’ll explore the five core operator categories in meticulous detail—each with practical examples and clear explanations. Let’s dive in!

### Arithmetic Operators

Arithmetic operators perform basic mathematical calculations on operands. They’re fundamental for numerical computations and appear frequently in real-world applications like financial systems, physics simulations, and data processing.

Here’s a breakdown of the key arithmetic operators:

| Operator | Description                     | Example (C)                          |
|----------|---------------------------------|---------------------------------------|
| `+`      | Addition                        | `a + b`                              |
| `-`      | Subtraction                     | `a - b`                              |
| `*`      | Multiplication                  | `a * b`                              |
| `/`      | Division                        | `a / b` (integer division if both operands are integers) |
| `%`      | Modulus (remainder)             | `a % b`                              |

Let’s see these in action with a runnable example:

```c
#include <stdio.h>

int main() {
    int a = 10, b = 3;
    printf("Addition: %d\n", a + b);
    printf("Subtraction: %d\n", a - b);
    printf("Multiplication: %d\n", a * b);
    printf("Division: %d\n", a / b);
    printf("Modulus: %d\n", a % b);
    return 0;
}
```

**Output**:
```
Addition: 13
Subtraction: 7
Multiplication: 30
Division: 3
Modulus: 1
```

**Key insights**:
- Integer division (`/`) truncates toward zero (e.g., `10 / 3` yields `3`, not `3.333...`).
- Modulus (`%`) returns the remainder after division (e.g., `10 % 3` is `1`).
- These operators work with integers and floating-point numbers (e.g., `float a = 10.5; float b = 3.2;`).

**Practical tip**: Always verify operand types when using division and modulus—integer operands will trigger integer division behavior.

### Relational Operators

Relational operators compare values and return `1` (true) or `0` (false). They’re crucial for decision-making in control structures like `if` statements and loops.

Here’s the complete set of relational operators:

| Operator | Description                     | Example (C)                          |
|----------|---------------------------------|---------------------------------------|
| `>`      | Greater than                    | `a > b`                              |
| `>=`     | Greater than or equal to        | `a >= b`                             |
| `<`      | Less than                       | `a < b`                              |
| `<=`     | Less than or equal to           | `a <= b`                             |
| `==`     | Equal to                        | `a == b`                             |
| `!=`     | Not equal to                    | `a != b`                             |

Let’s test these with a concrete example:

```c
#include <stdio.h>

int main() {
    int x = 5, y = 10;
    printf("x > y: %d\n", x > y);
    printf("x >= y: %d\n", x >= y);
    printf("x < y: %d\n", x < y);
    printf("x <= y: %d\n", x <= y);
    printf("x == y: %d\n", x == y);
    printf("x != y: %d\n", x != y);
    return 0;
}
```

**Output**:
```
x > y: 0
x >= y: 0
x < y: 1
x <= y: 1
x == y: 0
x != y: 1
```

**Critical notes**:
- `==` and `!=` require careful use—**always** use `==` for equality checks (not `=` which is assignment).
- Relational expressions return `int` values (`0` for false, `1` for true).
- These operators work with integers, floats, and characters (e.g., `'a' > 'b'` compares ASCII values).

**Real-world application**: In a temperature monitoring system, you might use `temp > 100` to trigger an alarm.

### Logical Operators

Logical operators combine relational expressions to form complex conditions. They’re the backbone of conditional logic in C.

Here’s the full set of logical operators:

| Operator | Description                     | Example (C)                          |
|----------|---------------------------------|---------------------------------------|
| `&&`     | Logical AND                     | `a && b`                             |
| `||`     | Logical OR                      | `a || b`                             |
| `!`      | Logical NOT                     | `!a`                                 |

Let’s explore these with a practical scenario:

```c
#include <stdio.h>

int main() {
    int age = 25;
    int has_passport = 1;
    int is_citizen = 1;

    // Check if person is eligible for travel
    int eligible = (age >= 18) && (has_passport == 1) && (is_citizen == 1);
    printf("Eligible: %d\n", eligible);
    return 0;
}
```

**Output**:
```
Eligible: 1
```

**Key behaviors**:
- `&&` (AND): Returns `1` only if **all** conditions are true.
- `||` (OR): Returns `1` if **at least one** condition is true.
- `!` (NOT): Flips the boolean value (e.g., `!0` becomes `1`).
- Short-circuit evaluation: `&&` and `||` stop evaluating once the result is determined (e.g., `(a && b)` won’t check `b` if `a` is false).

**Advanced use case**: In a banking system, you might check: `balance > 0 && !is_negative_balance` to ensure valid transactions.

### Bitwise Operators

Bitwise operators manipulate data at the binary level. They’re powerful for low-level programming tasks like memory management, hardware control, and optimizing performance.

Here’s the complete set of bitwise operators:

| Operator | Description                     | Example (C)                          |
|----------|---------------------------------|---------------------------------------|
| `&`      | Bitwise AND                     | `a & b`                              |
| `|`      | Bitwise OR                      | `a | b`                              |
| `^`      | Bitwise XOR                      | `a ^ b`                              |
| `~`      | Bitwise NOT                      | `~a`                                 |
| `<<`     | Left shift                       | `a << n`                             |
| `>>`     | Right shift                      | `a >> n`                             |

Let’s examine these with a concrete example:

```c
#include <stdio.h>

int main() {
    int a = 5;  // Binary: 0101
    int b = 3;  // Binary: 0011

    printf("a & b: %d (binary: %08b)\n", a & b, a & b);
    printf("a | b: %d (binary: %08b)\n", a | b, a | b);
    printf("a ^ b: %d (binary: %08b)\n", a ^ b, a ^ b);
    printf("a << 1: %d (binary: %08b)\n", a << 1, a << 1);
    return 0;
}
```

**Output**:
```
a & b: 1 (binary: 0001)
a | b: 7 (binary: 0111)
a ^ b: 6 (binary: 0110)
a << 1: 10 (binary: 1010)
```

**Why use bitwise operators?**:
- **Memory efficiency**: Pack multiple values into a single integer (e.g., flags).
- **Hardware control**: Directly manipulate hardware registers.
- **Performance**: Often faster than arithmetic operations for specific tasks.

**Real-world example**: In embedded systems, you might use `status_register & 0b0001` to check if a specific bit is set.

### Assignment Operators

Assignment operators store values into variables. They’re the foundation of all data manipulation in C.

Here’s the complete set of assignment operators:

| Operator | Description                     | Example (C)                          |
|----------|---------------------------------|---------------------------------------|
| `=`      | Simple assignment              | `a = b`                              |
| `+=`     | Add and assign                  | `a += b` (equivalent to `a = a + b`) |
| `-=`     | Subtract and assign             | `a -= b` (equivalent to `a = a - b`) |
| `*=`     | Multiply and assign             | `a *= b` (equivalent to `a = a * b`) |
| `/=`     | Divide and assign               | `a /= b` (equivalent to `a = a / b`) |
| `%=`     | Modulus and assign              | `a %= b` (equivalent to `a = a % b`) |

Let’s see these in action:

```c
#include <stdio.h>

int main() {
    int a = 10;
    int b = 3;

    a += b;  // a = 10 + 3 → 13
    a *= b;  // a = 13 * 3 → 39
    a /= b;  // a = 39 / 3 → 13
    a %= b;  // a = 13 % 3 → 1

    printf("a after operations: %d\n", a);
    return 0;
}
```

**Output**:
```
a after operations: 1
```

**Best practices**:
- Use compound assignments (`+=`, `-=`, etc.) for concise, readable code.
- Avoid `=` for assignment in conditionals (e.g., `if (x = 5)` is a common mistake that sets `x` to `5` and evaluates to `5`).
- Remember: Assignment returns the value (e.g., `a = b` returns `b`), so you can chain assignments: `a = (b = 5) + 10`.

## Summary

In this section, we’ve covered the five essential operator categories in C: **Arithmetic** (for calculations), **Relational** (for comparisons), **Logical** (for conditional logic), **Bitwise** (for low-level manipulation), and **Assignment** (for variable updates). Each operator type serves distinct purposes and enables precise control over data flow. By mastering these operators, you’ll write cleaner, more efficient code—whether building simple scripts or complex systems. Remember: **always verify operand types** for arithmetic and bitwise operations, and **use compound assignments** to keep your code concise. With these tools in your arsenal, you’re ready to tackle advanced programming challenges with confidence. 💡