## Constants

In PHP, **constants** are values that are defined once and never change during script execution. They provide immutability, improve code readability, and help avoid magic numbers or strings that could lead to errors. By using constants, you create a consistent foundation for your application that’s easier to maintain and debug.

### Using `define()` to Create Constants

The `define()` function is PHP’s primary mechanism for creating constants at runtime. It’s particularly useful when you need conditional definitions (e.g., based on environment) or when you want to define constants dynamically across multiple scripts.

Here’s the core syntax:

```php
define(string $name, mixed $value, bool $autoload = false);
```

- `$name`: The constant name (a string, **must be unique**)
- `$value`: The value to assign (can be any valid PHP type)
- `$autoload`: Optional flag (default `false`). If `true`, the constant is loaded during script initialization (useful for class constants).

**Example 1**: Defining a constant for π (pi) with a numeric value.

```php
define('PI', 3.14159);
```

**Example 2**: Creating a string constant for an API endpoint.

```php
define('API_ENDPOINT', 'https://api.example.com/v1');
```

**Example 3**: Conditional constant definition (e.g., for environment-specific values).

```php
// Define DB_HOST based on environment
if (getenv('ENV') === 'production') {
    define('DB_HOST', 'prod-db.example.com');
} else {
    define('DB_HOST', 'dev-db.example.com');
}
```

**Key behavior**: `define()` returns `true` on success and `false` on failure (e.g., if a constant with the same name already exists). Always check the return value to handle errors gracefully:

```php
if (!define('MAX_USERS', 100)) {
    die('Failed to define MAX_USERS constant');
}
```

### Using the `const` Keyword to Define Constants

The `const` keyword is a language construct for defining constants at the **top level** of a script or **within classes**. Unlike `define()`, it’s evaluated at compile time and cannot be used inside functions—making it ideal for static, reusable values.

**Example 1**: Top-level constant definition.

```php
const PI = 3.14159;
```

**Example 2**: Class-scoped constants (common pattern for reusable values).

```php
class MathUtils {
    const PI = 3.14159;
    const E = 2.71828;
    
    public static function calculateArea($radius) {
        return self::PI * $radius ** 2;
    }
}
```

**Critical rules for `const`**:
- Cannot be used inside functions (only at script top level or within classes)
- Values must be known at compile time (no runtime expressions)
- Cannot be redefined (PHP will throw a fatal error if you try)

### Key Differences Between `define()` and `const`

| Feature                | `define()` (Function)                     | `const` (Keyword)                        |
|------------------------|-------------------------------------------|-------------------------------------------|
| **Scope**              | Global (entire script)                   | Global (top-level) or Class-scoped       |
| **Runtime**            | Defined at runtime (can be called later)  | Defined at compile time (must be at top) |
| **Function Support**   | Yes (can be used inside functions)       | No (cannot be used inside functions)     |
| **Conditional Usage**  | Yes (e.g., `if` statements)              | No (must be defined upfront)             |
| **Autoloading**        | Supported via `$autoload` parameter      | Not supported                           |
| **Best Use Case**      | Environment-specific values, dynamic constants | Simple top-level or class constants     |

### Why Choose One Over the Other?

- **Use `define()` when**:
  - You need conditional definitions (e.g., `DEV` vs `PROD` environments)
  - You want to define constants in functions
  - You need to handle dynamic values (e.g., via `getenv()`)

- **Use `const` when**:
  - You want clean, readable top-level constants
  - You’re defining class constants (e.g., for reusable math values)
  - You need compile-time validation (e.g., constants used in `static` methods)

### Best Practices

1. **Use descriptive names**: Always name constants to clearly express their purpose (e.g., `MAX_REQUESTS_PER_SECOND` instead of `MAX`).
2. **Place constants at the top**: Define them early in your files to avoid scoping issues.
3. **Avoid magic strings**: Replace hardcoded strings with constants (e.g., `'user'` → `USER_ROLE`).
4. **Never redefine constants**: PHP will throw a fatal error if you try to redefine a constant (use `if (!defined('...'))` checks).
5. **Use `const` for class constants**: This keeps your class structure clean and avoids runtime overhead.

## Summary

Constants are fundamental to writing robust PHP code—they ensure immutability, readability, and maintainability. **`define()`** excels for runtime-defined values and environment-specific configurations, while **`const`** is ideal for top-level or class constants that need compile-time resolution. By strategically choosing between these approaches, you’ll create code that’s both efficient and easy to evolve. Remember: always prioritize clear naming and early definitions to maximize the benefits of constants in your applications. ✅