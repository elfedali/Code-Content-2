## Variables and Data Types

This section covers the fundamental building blocks of your C++ programs: variables and data types. Understanding these concepts is crucial for writing efficient and correct code. Let's explore them step by step!

### int

The `int` data type stores integer values (whole numbers). It typically occupies 4 bytes (32 bits) of memory, allowing values in the range of approximately -2,147,483,648 to 2,147,483,647.

**Example**:
```cpp
int age = 30;
std::cout << "Age: " << age << std::endl;
```

### float

The `float` data type stores single-precision floating-point numbers (values with decimal points). It occupies 4 bytes (32 bits) and provides about 7 decimal digits of precision.

**Example**:
```cpp
float price = 19.99f;
std::cout << "Price: " << price << std::endl;
```

### double

The `double` data type stores double-precision floating-point numbers. It occupies 8 bytes (64 bits) and provides higher precision than `float` (about 15 decimal digits).

**Example**:
```cpp
double pi = 3.14159265358979323846;
std::cout << "Pi: " << pi << std::endl;
```

### char

The `char` data type stores a single character. It occupies 1 byte (8 bits) of memory.

**Example**:
```cpp
char initial = 'A';
std::cout << "Initial: " << initial << std::endl;
```

### bool

The `bool` data type represents boolean values (`true` or `false`). It occupies 1 byte of memory and is essential for conditional logic.

**Example**:
```cpp
bool isStudent = true;
std::cout << "Is student: " << isStudent << std::endl;
```

### auto Keyword

The `auto` keyword allows the compiler to deduce variable types from initializers, reducing boilerplate code. The compiler infers the type based on the initializer expression.

**Examples**:
```cpp
auto num = 10;           // Deduced as int
auto price = 19.99f;     // Deduced as float
auto name = "Alice";     // Deduced as std::string
auto vec = std::vector<int>(); // Deduced as std::vector<int>
```

**Important Notes**:
- `auto` requires an initializer
- Cannot be used for non-deducible types (e.g., function parameters)
- Does not work with `const` variables without explicit type

### Constants

Use `const` to declare variables that cannot be changed after initialization. For compile-time constants, use `constexpr`.

**Examples**:
```cpp
const int MAX_SIZE = 100;  // Compile-time constant
constexpr int MAX_SIZE = 100; // Compile-time constant with higher optimization
```

**Key Differences**:
| Feature          | `const` Variable | `constexpr` Variable |
|------------------|-------------------|------------------------|
| Memory Location  | Runtime           | Compile-time           |
| Optimization     | Limited            | Full                   |
| Use Case         | Runtime constants | Compile-time constants |

**Comparison Table of Data Types**:

| Type     | Size (bytes) | Range (approx)                | Use Case                     |
|----------|---------------|-------------------------------|-------------------------------|
| `int`    | 4             | -2,147,483,648 to 2,147,483,647 | General integers             |
| `float`  | 4             | ~1.2e-38 to 3.4e+38           | Single-precision floats      |
| `double` | 8             | ~2.2e-308 to 3.4e+308         | Double-precision floats      |
| `char`   | 1             | 0 to 255                      | Single characters            |
| `bool`   | 1             | `false`, `true`               | Boolean logic                |

## Summary 💡

In this section, we've covered the essential data types and variables in C++. Remember:

- **`int`** is for integers (whole numbers)
- **`float`** and **`double`** are for floating-point numbers (with `double` providing higher precision)
- **`char`** stores single characters
- **`bool`** represents boolean values (`true` or `false`)
- **`auto`** helps the compiler deduce types from initializers
- **`const`** and **`constexpr`** are used to declare constants that cannot be changed

Mastering these fundamentals is the first step toward writing robust C++ programs. Keep exploring!