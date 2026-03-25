## Numeric Types

Welcome to the world of numbers! 😊 In Python, numbers are more than just digits—they're the building blocks for everything from simple calculations to mind-bending algorithms. Let's dive deep into how Python handles numbers, why they matter, and how to work with them like a pro.

### Numeric Type Basics

Python has several numeric types that handle numbers in distinct ways. The core types you'll encounter daily are **integers** (whole numbers), **floats** (decimal numbers), and **complex numbers** (numbers with real and imaginary parts). These types each have unique behaviors and use cases, so understanding them is key to writing clean, efficient code.

### Numeric Literals

Numeric literals are the raw numbers you write directly in code. Python supports multiple formats for expressing numbers:

- **Integers**: `42`, `-17`, `0`
- **Floats**: `3.14`, `-0.001`, `2e10` (exponential notation)
- **Complex numbers**: `3 + 4j` (real part + imaginary part)

Here’s how you can create literals in practice:

```python
# Integers
integer_literal = 42
negative_integer = -17
zero = 0

# Floats
float_literal = 3.14
small_float = -0.001
exponential_float = 2e10

# Complex numbers
complex_literal = 3 + 4j
```

### Built-in Numeric Tools

Python provides powerful built-in tools to work with numbers. These include functions like `abs()`, `round()`, `int()`, and `float()`, which help convert between types or perform calculations.

```python
# Absolute value
print(abs(-17))  # Output: 17

# Rounding
print(round(3.14159, 2))  # Output: 3.14

# Type conversion
print(int(3.14))  # Output: 3
print(float(42))  # Output: 42.0
```

### Python Expression Operators

Python’s numeric operators let you manipulate numbers in expressions. Here’s what you need to know:

| Operator | Description                     | Example                     |
|----------|---------------------------------|-----------------------------|
| `+`      | Addition                        | `2 + 3` → `5`               |
| `-`      | Subtraction                     | `5 - 2` → `3`               |
| `*`      | Multiplication                  | `4 * 2` → `8`               |
| `/`      | Division (classic)              | `10 / 3` → `3.333...`      |
| `//`     | Floor division                  | `10 // 3` → `3`             |
| `%`      | Modulus                         | `10 % 3` → `1`              |
| `**`     | Exponentiation                  | `2 ** 3` → `8`              |

```python
# Basic arithmetic
print(2 + 3)  # 5
print(5 - 2)  # 3
print(4 * 2)  # 8
print(10 / 3)  # 3.333...
print(10 // 3)  # 3 (floor division)
print(10 % 3)  # 1 (remainder)
```

### Numbers in Action

Let’s see numbers in action with a real-world example: calculating the area of a circle.

```python
# Calculate circle area with radius 5
radius = 5
pi = 3.14159
area = pi * radius ** 2
print(f"Area of circle with radius {radius}: {area:.2f}")
# Output: Area of circle with radius 5: 78.54
```

### Variables and Basic Expressions

Variables store numeric values for reuse. This is essential for writing dynamic code.

```python
# Storing values in variables
price = 19.99
discount = 0.2
final_price = price * (1 - discount)
print(f"Final price after discount: {final_price:.2f}")
# Output: Final price after discount: 15.99
```

### Numeric Display Formats

Format numbers to make them readable or precise. Python’s `format()` and `f-strings` let you control decimals, commas, and more.

```python
# Format integers with commas
print(f"{1_000_000:,}")  # Output: 1,000,000

# Format floats with 2 decimals
print(f"{3.14159:.2f}")  # Output: 3.14

# Scientific notation
print(f"{1e-3:.2e}")  # Output: 0.0010
```

### Comparisons: Normal and Chained

Compare numbers using relational operators. Chained comparisons let you check multiple conditions in one line.

```python
# Normal comparisons
print(5 > 3)  # True
print(5 < 3)  # False
print(5 == 5)  # True

# Chained comparisons (check if 3 < 5 < 10)
print(3 < 5 < 10)  # True
print(3 < 5 > 10)  # False
```

### Division: Classic, Floor, and True

Division in Python has three flavors:

1. **Classic division (`/`)**: Returns a float.
2. **Floor division (`//`)**: Returns the floor of the division (integer).
3. **True division (`/`)**: Same as classic division (but note: in Python 3, `//` is floor division).

```python
# Classic division (float)
print(10 / 3)  # 3.333...

# Floor division (integer)
print(10 // 3)  # 3

# True division (same as classic)
print(10 / 3)  # 3.333... (same as classic)
```

### Integer Precision

Integers in Python have **unlimited precision** (theoretically). This means you can work with numbers as large as your system allows without losing precision.

```python
# Extremely large integers (no precision loss)
print(10**1000000)  # Valid! Python handles huge integers natively
```

### Complex Numbers

Complex numbers have a real part and an imaginary part (denoted with `j`). They’re useful in engineering and physics.

```python
# Creating a complex number
complex_num = 2 + 3j
print(f"Real part: {complex_num.real}, Imaginary part: {complex_num.imag}")
# Output: Real part: 2.0, Imaginary part: 3.0
```

### Hexadecimal, Octal, and Binary Notation

Python supports base-2 (binary), base-8 (octal), and base-16 (hexadecimal) numbers using prefixes:

| Prefix | Base | Example         | Meaning        |
|--------|------|-----------------|----------------|
| `0b`   | 2    | `0b101`         | 5 in decimal   |
| `0o`   | 8    | `0o12`          | 10 in decimal  |
| `0x`   | 16   | `0x1F`          | 31 in decimal  |

```python
# Convert binary to decimal
print(int("0b101", 2))  # 5

# Convert octal to decimal
print(int("0o12", 8))  # 10

# Convert hex to decimal
print(int("0x1F", 16))  # 31
```

### Bitwise Operations

Bitwise operations manipulate numbers at the binary level. Key operators:

- `&` (AND)
- `|` (OR)
- `^` (XOR)
- `~` (NOT)
- `<<` (left shift)
- `>>` (right shift)

```python
# Bitwise AND
print(5 & 3)  # 1 (binary: 101 & 011 → 001)

# Left shift (multiply by 2)
print(2 << 1)  # 4 (binary: 10 → 100)
```

### Other Built-in Numeric Tools

Additional tools include `pow()`, `max()`, `min()`, and `math` module functions for advanced math.

```python
# Using math module for square root
import math
print(math.sqrt(16))  # 4.0

# Power operation
print(pow(2, 3))  # 8
```

### Other Numeric Types

Beyond the basics, Python offers specialized numeric types for precision:

1. **Decimal**: For fixed-point arithmetic (avoiding floating-point errors).
2. **Fraction**: For exact rational numbers (e.g., `3/4`).

### Decimal Type

The `decimal` module handles precise decimal arithmetic (critical for financial calculations).

```python
from decimal import Decimal
print(Decimal('0.1') + Decimal('0.2'))  # 0.3 (no floating-point errors)
```

### Fraction Type

The `fractions` module represents numbers as exact fractions (e.g., `3/4`).

```python
from fractions import Fraction
print(Fraction(1, 2) + Fraction(1, 4))  # 3/4
```

### Sets

While not numeric types, sets are often used with numbers (e.g., for unique values). They’re collections of unique items.

```python
# Using sets with numbers
numbers = {1, 2, 3, 4, 5}
print(numbers)  # {1, 2, 3, 4, 5}
```

### Booleans

Booleans (`True`/`False`) are numeric types (integers 1/0) and used in comparisons.

```python
is_active = True
print(int(is_active))  # 1
```

### Summary

Numbers are the backbone of programming. By understanding literals, operators, precision, and specialized types, you can write robust code that handles real-world calculations accurately. From simple arithmetic to complex financial computations, Python’s numeric tools give you the flexibility to solve any problem.

**Remember**: Precision matters—use `decimal` for money, `fraction` for exact ratios, and always validate inputs to avoid errors. 🌟