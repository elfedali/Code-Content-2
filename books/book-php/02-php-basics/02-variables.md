## PHP Basics: Variables

Variables are the lifeblood of PHP programming—without them, your scripts can't store, manipulate, or share data. In this section, we’ll dive deep into how PHP handles variables from the ground up, covering declaration, scope, and superglobals. By the end, you’ll have a rock-solid foundation to build complex applications.

---

### Declaring Variables

In PHP, variables start with a dollar sign (`$`) followed by a **snake_case**-formatted identifier. This convention ensures readability and consistency across your codebase. Unlike some languages, PHP variables don’t require explicit type declarations—this flexibility lets you handle data dynamically.

Here’s how to declare a variable:

```php
$name = "Alex";
$age = 28;
$price = 19.99;
$isActive = true;
```

**Key rules to remember**:
- Variable names **must begin with a letter or underscore** (`_`)
- Only **letters, digits, and underscores** are allowed after the first character
- **Avoid** reserved keywords (e.g., `class`, `function`)
- **No spaces** in variable names (use underscores for multi-word names)

Let’s test these rules with a concrete example:

```php
// Valid variable names
$_user_id = "123";       // Starts with underscore
$first_name = "John";    // Snake case
$price_per_unit = 4.99; // Multi-word

// Invalid variable names
// $ 123 = 100; // Starts with digit
// $user name = "Bob"; // Space in name
```

> 💡 **Pro Tip**: Always use descriptive names! `user_id` is clearer than `uid` or `id`. PHP’s dynamic typing means you don’t need to declare types (e.g., `int`, `string`), but good naming prevents future confusion.

---

### Variable Scope

Scope defines *where* a variable can be accessed in your code. PHP has three primary scopes: **local**, **global**, and **static**. Understanding these is critical for avoiding bugs and writing maintainable code.

#### Local Scope
Variables declared within a function or block (e.g., `if`, `for`) are **local** to that context. They’re invisible outside.

```php
function greetUser() {
    $username = "Taylor"; // Local variable
    echo "Hello, $username!";
}
greetUser(); // Output: Hello, Taylor!
```

> ⚠️ **Critical**: If you try to use `$username` outside `greetUser()`, PHP will throw a **Notice**: `Undefined variable: username`.

#### Global Scope
Variables declared *outside* any function (at the top of a script) have **global scope**. They’re accessible throughout the entire script.

```php
$globalVar = "World";

function printGlobal() {
    echo "Hello, $globalVar!"; // Works because $globalVar is global
}
printGlobal(); // Output: Hello, World!
```

#### Static Scope
`static` variables retain their value between function calls. They’re initialized once and persist across subsequent invocations.

```php
function countVisits() {
    static $counter = 0;
    $counter++;
    echo "Visit # $counter";
}
countVisits(); // Output: Visit # 1
countVisits(); // Output: Visit # 2
```

#### Scope Comparison Table

| Scope Type      | Where Defined         | Visibility             | Example Use Case                     |
|-----------------|------------------------|------------------------|--------------------------------------|
| **Local**       | Inside a function     | Only within that function | Loop counters, temporary data       |
| **Global**      | Script level          | Entire script          | Configuration values, shared state |
| **Static**      | Inside a function     | Only within that function | Persistent counters, cache        |

> 💡 **Pro Tip**: Always use `global` or `static` explicitly when you need to extend scope—never assume variables are global. PHP’s scoping rules prevent accidental overwrites and make your code safer.

---

### Superglobals

Superglobals are **predefined variables** that exist in *every* scope of your PHP script. They’re automatically available without needing to declare them—this makes them perfect for handling HTTP requests, sessions, and server data.

#### The 7 Core Superglobals
Here’s the full list with practical examples:

| Superglobal | Purpose                              | Example Usage                                  |
|-------------|---------------------------------------|------------------------------------------------|
| `$_GET`     | Query string parameters              | `$_GET['name']` for `?name=Alex`               |
| `$_POST`    | Form data (HTTP POST)                | `$_POST['email']` for email inputs             |
| `$_SESSION` | User sessions                       | `$_SESSION['user_id']` for authenticated users |
| `$_SERVER`  | Server and environment info          | `$_SERVER['HTTP_HOST']` for current domain     |
| `$_FILES`   | Uploaded files                      | `$_FILES['file']['tmp_name']` for file uploads |
| `$_COOKIE` | HTTP cookies                        | `$_COOKIE['theme']` for user preferences       |
| `$_REQUEST` | Combined `$_GET` + `$_POST`         | `$_REQUEST['search']` for search queries       |

#### Real-World Example: Handling Form Submissions
Let’s see how superglobals work in a practical scenario:

```php
// Form submission handler
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email']; // From form input
    $theme = $_COOKIE['theme']; // User preference
    
    // Validate and process...
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email validated: $email";
    }
}
```

> 💡 **Pro Tip**: Always validate superglobals! For example, `$_GET` and `$_POST` can be manipulated via URL parameters or forms—use `filter_var()` or `htmlspecialchars()` to prevent XSS attacks.

#### Why Superglobals Matter
Superglobals bridge PHP’s server-side nature with user interaction. They let you:
- Handle user sessions securely (`$_SESSION`)
- Access server environment details (`$_SERVER`)
- Process form data without complex logic
- Build dynamic web applications with minimal overhead

> 🔑 **Key Insight**: Superglobals are *not* magic—they’re powerful tools that require careful use. Always sanitize and validate data before processing to avoid security risks.

---

## Summary

In this section, we’ve covered the essentials of PHP variables:  
- **Declaring variables** starts with `$` and follows snake_case conventions.  
- **Variable scope** (local, global, static) determines where variables can be accessed—critical for avoiding conflicts.  
- **Superglobals** (`$_GET`, `$_POST`, `$_SESSION`, etc.) are predefined variables that simplify handling HTTP requests, sessions, and server data.  

Mastering these concepts gives you the foundation to build robust PHP applications. Remember: **always validate data**, **use descriptive names**, and **understand scope** to write clean, secure code.  

You’ve got this! 💫