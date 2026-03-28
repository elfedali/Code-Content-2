## Java Basics: Syntax and Structure

### Variables

In Java, **variables** act as named containers for storing data values that can change during program execution. They are the foundational building blocks for any Java application, allowing you to manipulate and track information dynamically. Before using a variable, you must declare it by specifying its data type and name.

#### Declaring Variables
To declare a variable, use the following syntax:
```java
dataType variableName;
```
For example:
```java
int age;        // Integer variable
double price;   // Double-precision floating-point variable
boolean isActive; // Boolean variable
String username; // String reference variable
```

#### Variable Naming Rules
Variables follow specific naming conventions to ensure clarity and prevent errors:
- Must start with a letter, underscore (`_`), or dollar sign (`$`)
- Subsequent characters can be letters, digits, underscores, or dollar signs
- Cannot be a reserved keyword (e.g., `int`, `if`, `while`)
- Case-sensitive (e.g., `userAge` ≠ `UserAge`)
- Example: `userAge = 25` is valid, but `2userAge` is invalid

#### Variable Initialization
You can initialize variables at declaration time:
```java
int count = 0;        // Initialized to 0
double pi = 3.14159;  // Initialized to 3.14159
String greeting = "Hello"; // Initialized to "Hello"
```

**Practical Example**: Calculate a user's age from their birth year
```java
int birthYear = 1990;
int currentYear = 2023;
int age = currentYear - birthYear;
System.out.println("Age: " + age); // Output: Age: 33
```

### Data Types

Java defines two primary categories of data types: **primitive types** (built-in values) and **reference types** (objects).

#### Primitive Data Types
Primitive types store raw values directly in memory. They include:

| Type        | Size (Bytes) | Range/Description                     | Example Usage                     |
|-------------|---------------|----------------------------------------|-----------------------------------|
| `int`       | 4             | -2,147,483,648 to 2,147,483,647      | `int age = 30;`                  |
| `double`    | 8             | ~±1.7e308 (floating-point)            | `double pi = 3.14159;`           |
| `boolean`   | 1             | `true` or `false`                    | `boolean isStudent = true;`      |
| `char`      | 2             | Unicode character (e.g., `'A'`)       | `char letter = 'A';`            |
| `float`     | 4             | ~±3.4e38 (floating-point)             | `float price = 19.99f;`         |
| `long`      | 8             | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 | `long population = 1000000000L;` |

**Key Notes**:
- Use `L` suffix for `long` (e.g., `1000000000L`)
- Use `f` suffix for `float` (e.g., `19.99f`)
- `double` offers higher precision than `float` for fractional values

#### Reference Data Types
Reference types store memory addresses pointing to objects. All classes and interfaces are reference types:
```java
String name = "Alice"; // String is a reference type
Person user = new Person(); // Person is a reference type
```
- `String` is a special reference type for text
- Objects are created via `new` keyword
- Example: `name` holds a reference to a `String` object

**Practical Example**: Using `double` for precise calculations
```java
double radius = 3.0;
double area = 3.14159 * radius * radius;
System.out.println("Area: " + area); // Output: Area: 28.27433
```

### Operators

Operators manipulate variables and values to perform computations. Java supports multiple operator categories:

#### Arithmetic Operators
Perform basic math operations:
```java
int a = 10;
int b = 3;
int sum = a + b;   // 13
int diff = a - b;  // 7
int product = a * b; // 30
int quotient = a / b; // 3 (integer division)
int remainder = a % b; // 1
```

#### Assignment Operators
Assign values to variables:
```java
int count = 0;
count += 1; // Equivalent to count = count + 1
count *= 2; // Equivalent to count = count * 2
```

#### Comparison Operators
Compare values and return `boolean` results:
```java
int x = 5;
boolean isEven = (x % 2 == 0); // true
boolean greaterThanZero = (x > 0); // true
boolean lessThanTen = (x < 10); // true
```

#### Logical Operators
Combine boolean expressions:
```java
boolean hasAccess = true;
boolean isAuthorized = hasAccess && (x > 0); // true
boolean isUserValid = hasAccess || (x < 0); // true
boolean isNotActive = !(x > 0); // false
```

#### Ternary Operator
Conditional expression for single-line conditionals:
```java
int result = (x > 0) ? x : -x; // Returns x if positive, else -x
```

**Practical Example**: Determine if a number is even using modulus
```java
int number = 12;
boolean isEven = (number % 2 == 0);
System.out.println("Is " + number + " even? " + isEven); // Output: Is 12 even? true
```

Operators are the building blocks of logic. 🔢