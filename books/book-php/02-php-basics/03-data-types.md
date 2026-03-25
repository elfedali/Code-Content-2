## Data Types

PHP's dynamic typing system allows developers to work with a diverse range of data structures while maintaining flexibility and readability. In this section, we'll explore the seven core data types that form the foundation of PHP programming—essential knowledge for building robust applications. Let's dive in!

### Strings

Strings represent sequences of characters and are the most common data type for handling text in PHP. They can be enclosed in single quotes (`'`), double quotes (`"`), or heredoc syntax for multi-line strings.

**Key features**:
- Single quotes are faster and avoid escaping special characters
- Double quotes enable variable interpolation and string concatenation
- Heredoc supports multi-line templates without newline escaping

Here's how to create strings with practical examples:

```php
$greeting = 'Hello, world!'; // Single-quoted string
$name = "John"; // Double-quoted string
$multiline = "This is a\nmulti-line\nstring"; // Newlines via \n
$template = <<<HTML
<h1>Welcome</h1>
<p>to PHP!</p>
HTML; // Heredoc template
```

**Pro Tip**: Use single quotes for simple strings to avoid escaping characters like `"` or `\`. Double quotes are ideal when you need to embed variables or expressions.

### Integers

Integers represent whole numbers without fractional components. PHP supports base 10 (default), base 8 (octal), and base 16 (hexadecimal) representations.

**Key features**:
- Range: -2^31 to 2^31 - 1 (32-bit) or -9.2e18 to 9.2e18 (64-bit)
- Prefixes: `0` for octal (`012` = 10 in decimal), `0x` for hexadecimal (`0x1A` = 26 in decimal)

Real-world examples:

```php
$age = 25; // Base 10
$octal = 012; // Octal (10 in decimal)
$hex = 0x1A; // Hexadecimal (26 in decimal)
$price = 1999; // Positive integer
$negative = -42; // Negative integer
```

**Why it matters**: Integers are crucial for counting, indexing, and mathematical operations where precision is critical.

### Floats

Floats (floating-point numbers) represent decimal values and are used for calculations requiring fractional precision.

**Key features**:
- Scientific notation: `1.23e4` = 12300
- IEEE 754 standard for precision
- Can handle very large/small numbers (with potential precision loss)

Practical usage examples:

```php
$price = 19.99; // Decimal value
$pi = 3.14159; // Mathematical constant
$scientific = 1.23e4; // Scientific notation (12300)
$very_small = 0.0000001; // Very small number
```

**Important note**: Floats may exhibit precision issues in financial calculations. Always use `number_format()` or specialized libraries for monetary values.

### Booleans

Booleans represent true/false values and are fundamental for logical operations and conditional logic.

**Key features**:
- Two values: `true` and `false`
- **Truthy/falsy** concept: `0`, `0.0`, `null`, `false`, `''`, `[]` evaluate as `false`
- All other values evaluate as `true`

Real-world examples:

```php
$is_active = true;
$is_valid = false;
$user_submitted = true; // Non-zero value
$empty_string = ''; // Falsy
$empty_array = []; // Falsy
```

**Pro tip**: Always use `===` for strict comparisons with booleans to avoid type coercion issues.

### Arrays

Arrays store collections of values and can be indexed numerically or associatively. They are PHP's most versatile data structure.

**Key features**:
- Indexed arrays: Numerical keys (0, 1, 2...)
- Associative arrays: String keys with values
- Multidimensional arrays: Nested structures
- Dynamic resizing: Automatically expands as needed

Practical examples:

```php
// Indexed array
$colors = ['red', 'green', 'blue'];

// Associative array
$user = [
    'name' => 'Alice',
    'age' => 30,
    'is_active' => true
];

// Multidimensional array
$matrix = [
    [1, 2, 3],
    [4, 5, 6]
];
```

**Why arrays matter**: They enable complex data modeling, iteration, and processing—essential for everything from form handling to database interactions.

### Objects

Objects represent instances of classes and encapsulate data and behavior through methods.

**Key features**:
- Defined via classes
- Contain properties (variables) and methods (functions)
- Support inheritance and polymorphism

Real-world examples:

```php
class Product {
    public $name;
    public $price;
    
    public function calculateDiscount(float $discountRate): float {
        return $this->price * (1 - $discountRate);
    }
}

$product = new Product();
$product->name = 'Laptop';
$product->price = 999.99;
echo $product->calculateDiscount(0.15); // 849.99
```

**Critical insight**: Objects enable complex application logic while maintaining clean, maintainable code structures.

### NULL

The `NULL` type represents an intentionally undefined value and is crucial for handling missing data.

**Key features**:
- Single value: `null`
- Indicates "no value" or "undefined"
- Used for optional parameters and empty states

Practical examples:

```php
$user = null; // Undefined variable

// Check for null
if ($user === null) {
    echo "User not set";
}

// Assign null safely
$optionalField = null;
```

**Why it matters**: Proper use of `null` prevents undefined variable errors and enables graceful error handling in complex systems.

## Summary

In this section, we've explored PHP's seven core data types: strings, integers, floats, booleans, arrays, objects, and `null`. Each serves distinct purposes in application development:
- **Strings** for text processing
- **Integers** for counting and discrete values
- **Floats** for fractional calculations
- **Booleans** for logical operations
- **Arrays** for structured data collections
- **Objects** for complex application logic
- **NULL** for undefined states

Understanding these fundamentals is critical for writing efficient, maintainable PHP applications. Remember: **mastering data types is your first step toward advanced PHP proficiency**. Keep exploring! 🌱