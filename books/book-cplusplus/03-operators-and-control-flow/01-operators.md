## Operators

Operators are the fundamental building blocks of C++ expressions, enabling you to manipulate data, perform calculations, and control program flow. Mastering these constructs is essential for writing efficient, readable, and maintainable code. This section dives deep into the five core operator categories—arithmetic, relational, logical, bitwise, and assignment—providing practical examples and clear explanations for each.

### Arithmetic Operators

Arithmetic operators perform mathematical calculations on operands. They are indispensable for numerical computations and data manipulation.

| Operator | Description                     | Example                     |
|----------|---------------------------------|-----------------------------|
| `+`      | Addition                        | `5 + 3` → `8`               |
| `-`      | Subtraction                     | `10 - 4` → `6`              |
| `*`      | Multiplication                  | `2 * 5` → `10`              |
| `/`      | Division                        | `15 / 3` → `5`              |
| `%`      | Modulus (remainder)             | `17 % 5` → `2`              |
| `++`     | Increment (prefix/suffix)       | `x++` → `x = x + 1`        |
| `--`     | Decrement (prefix/suffix)       | `y--` → `y = y - 1`        |

Here’s a practical demonstration of arithmetic operators in action:

```cpp
#include <iostream>
int main() {
    int a = 10, b = 4;
    std::cout << "Addition: " << a + b << "\n";
    std::cout << "Subtraction: " << a - b << "\n";
    std::cout << "Multiplication: " << a * b << "\n";
    std::cout << "Division: " << a / b << "\n";
    std::cout << "Modulus: " << a % b << "\n";
    int c = a++;
    std::cout << "Increment (postfix): c = " << c << ", a = " << a << "\n";
    return 0;
}
```

**Key Insight**: The modulus operator `%` is particularly useful for cycle detection (e.g., in game development for wrapping values). Prefix and suffix increment/decrement operators (`++a` vs. `a++`) change the order of operations—**prefix** evaluates the operand first, **suffix** evaluates after the assignment.

### Relational Operators

Relational operators compare values and return a boolean result (`true` or `false`). They are critical for conditional logic and decision-making in programs.

| Operator | Description                     | Example                     |
|----------|---------------------------------|-----------------------------|
| `<`      | Less than                       | `3 < 5` → `true`            |
| `<=`     | Less than or equal              | `5 <= 5` → `true`           |
| `>`      | Greater than                    | `7 > 4` → `true`            |
| `>=`     | Greater than or equal           | `9 >= 9` → `true`           |
| `==`     | Equal to                        | `5 == 5` → `true`           |
| `!=`     | Not equal to                    | `4 != 5` → `true`           |

Real-world application: A banking system might use relational operators to validate account balances.

```cpp
#include <iostream>
int main() {
    int balance = 1000;
    int withdrawal = 150;
    
    if (balance >= withdrawal) {
        std::cout << "Withdrawal approved: $" << withdrawal << "\n";
    } else {
        std::cout << "Insufficient funds\n";
    }
    return 0;
}
```

**Key Insight**: Relational operators **always return `bool`**. This makes them ideal for `if`/`switch` conditions. Remember: `==` checks for value equality (not pointer identity).

### Logical Operators

Logical operators combine boolean expressions to create complex conditions. They are the backbone of decision-making in C++.

| Operator | Description                     | Example                     |
|----------|---------------------------------|-----------------------------|
| `&&`     | Logical AND                     | `(a > 0) && (b < 10)`      |
| `||`     | Logical OR                      | `(a < 0) || (b > 10)`      |
| `!`      | Logical NOT                     | `!(x == 5)`                 |

Demonstrating logical operators in a real-world scenario:

```cpp
#include <iostream>
int main() {
    bool is_raining = true;
    bool has_umbrella = false;
    
    if (is_raining && !has_umbrella) {
        std::cout << "You need an umbrella!\n";
    } else {
        std::cout << "You're safe!\n";
    }
    return 0;
}
```

**Key Insight**: The `!` operator **negates** a boolean condition. Logical operators **short-circuit**—`||` stops evaluating once the first `true` is found, and `&&` stops once the first `false` is found. This improves performance.

### Bitwise Operators

Bitwise operators manipulate individual bits of integer values. They are essential for low-level programming, hardware interaction, and optimizing memory usage.

| Operator | Description                     | Example                     |
|----------|---------------------------------|-----------------------------|
| `&`      | Bitwise AND                     | `5 & 3` → `1` (binary: `101 & 011`) |
| `|`      | Bitwise OR                      | `5 | 3` → `7` (binary: `101 | 011`) |
| `^`      | Bitwise XOR                     | `5 ^ 3` → `6` (binary: `101 ^ 011`) |
| `~`      | Bitwise NOT                      | `~5` → `-6` (two's complement) |
| `<<`     | Left shift                      | `5 << 1` → `10`             |
| `>>`     | Right shift                     | `10 >> 1` → `5`             |

Practical use case: Setting a specific bit in a register.

```cpp
#include <iostream>
int main() {
    int flags = 0;
    // Set bit 2 (4) using bitwise OR
    flags |= (1 << 2);
    std::cout << "Flags (binary): " << std::hex << flags << "\n";
    return 0;
}
```

**Key Insight**: Bitwise shifts (`<<`/`>>`) are **efficient** for multiplying/dividing by powers of two. The `~` operator inverts all bits—use with caution as it may cause overflow.

### Assignment Operators

Assignment operators store values into variables. They form the basis of data manipulation and state management in C++.

| Operator | Description                     | Example                     |
|----------|---------------------------------|-----------------------------|
| `=`      | Simple assignment              | `x = 5` → `x` holds `5`    |
| `+=`     | Add and assign                  | `x += 3` → `x = x + 3`     |
| `-=`     | Subtract and assign             | `x -= 2` → `x = x - 2`     |
| `*=`     | Multiply and assign             | `x *= 4` → `x = x * 4`     |
| `/=`     | Divide and assign               | `x /= 2` → `x = x / 2`     |
| `%=`     | Modulus and assign              | `x %= 3` → `x = x % 3`     |
| `&=`     | Bitwise AND and assign          | `x &= 5` → `x = x & 5`     |
| `|=`     | Bitwise OR and assign           | `x |= 3` → `x = x | 3`     |
| `^=`     | Bitwise XOR and assign          | `x ^= 2` → `x = x ^ 2`     |
| `<<=`    | Left shift and assign           | `x <<= 1` → `x = x << 1`   |
| `>>=`    | Right shift and assign          | `x >>= 1` → `x = x >> 1`   |

A concise example showing chained assignments:

```cpp
#include <iostream>
int main() {
    int x = 10;
    x += 3;  // x = 13
    x *= 2;  // x = 26
    x >>= 1; // x = 13
    std::cout << "Final value: " << x << "\n";
    return 0;
}
```

**Key Insight**: Chainable operators (`+=`, `*=`, etc.) **reduce code verbosity** while maintaining clarity. They are especially valuable in loops and iterative logic.

## Summary

This section explored the five critical operator categories in C++: **arithmetic**, **relational**, **logical**, **bitwise**, and **assignment**. Each category serves distinct purposes—from basic math operations to low-level bit manipulation and conditional logic. By mastering these operators, you gain the ability to write precise, efficient, and readable code that handles everything from simple calculations to complex system interactions. Remember: **operators define how data flows and decisions are made** in your programs. 💡