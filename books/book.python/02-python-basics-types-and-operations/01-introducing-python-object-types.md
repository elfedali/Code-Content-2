## Introducing Python Object Types

Welcome to Python’s kitchen! 🐍 In this chapter, we’ll explore the building blocks of your Python journey—**object types**. Think of them as the ingredients in your code recipes. Why? Because understanding these core types lets you build powerful, clean, and *fun* programs without getting tangled in unnecessary complexity. Let’s dive in.

### Why Use Built-in Types?

You might wonder: *Why not just make everything from scratch?* Well, Python’s built-in types are like pre-made, tested kitchen tools. They save you time, reduce bugs, and let you focus on solving problems instead of reinventing the wheel. For example:

- **Numbers** handle math without messy conversions.
- **Strings** let you work with text effortlessly.
- **Lists** and **dictionaries** organize data with minimal overhead.

Using built-in types means your code runs faster, is more readable, and works across all Python versions. It’s the *smart* way to write Python.

### Python’s Core Data Types

Python’s core data types are the foundation of everything. Let’s meet them:

1. **Numbers** (`int`, `float`, `complex`): For math operations.
2. **Strings** (`str`): For text manipulation.
3. **Sequences** (`list`, `tuple`, `str`, `bytes`): Ordered collections of items.
4. **Mappings** (`dict`): Key-value pairs.
5. **Booleans** (`bool`): For true/false logic.

These types are *immutable* by default (meaning you can’t change them after creation), which makes them predictable and safe for most use cases.

#### Numbers

Numbers are your go-to for calculations. Here’s how they work:

```python
# Integers (whole numbers)
age = 30
print(f"Age: {age} years")

# Floats (decimals)
height = 5.7
print(f"Height: {height} meters")

# Complex numbers (for advanced math)
complex_num = 2 + 3j
print(f"Complex: {complex_num}")
```

#### Strings

Strings are sequences of characters. They’re *immutable*—once created, you can’t change them. This is crucial for avoiding bugs!

```python
# Basic string
name = "Alice"
print(f"Hello, {name}!")

# String concatenation
greeting = "Hello" + " " + "Bob"
print(greeting)

# String slicing (like cutting a cake!)
s = "Python"
print(s[0:2])  # Output: "Py"
```

#### Sequence Operations

Sequences (like lists and strings) let you work with ordered data. Common operations include:

- **Indexing**: Accessing items by position (`s[0]`).
- **Slicing**: Extracting sub-sequences (`s[1:3]`).
- **Length check**: `len(s)`.

```python
# List example
fruits = ["apple", "banana", "cherry"]
print(f"First fruit: {fruits[0]}")

# Slicing a string
s = "Hello"
print(s[0:2])  # Output: "He"
```

#### Immutability

Immutability means a type *can’t be changed* after creation. For example:
- Strings are immutable: You can’t change a string once created.
- Tuples are immutable: Once created, their contents can’t be altered.

Why does this matter? It prevents accidental changes and makes code safer. For instance:

```python
# Immutable string (can’t change after creation)
text = "Hello"
text[0] = "h"  # This will throw an error!
```

#### Type-Specific Methods

Each type has unique methods. Here’s a quick peek:

- **Strings**: `.lower()`, `.split()`, `.replace()`.
- **Lists**: `.append()`, `.sort()`, `.remove()`.
- **Dictionaries**: `.keys()`, `.values()`, `.get()`.

```python
# String method: convert to lowercase
text = "WORLD"
print(text.lower())  # Output: "world"

# List method: add an item
numbers = [1, 2, 3]
numbers.append(4)
print(numbers)  # Output: [1, 2, 3, 4]
```

#### Getting Help

Need a quick refresher? Python’s `help()` and `dir()` functions are your best friends.

```python
# Get documentation for a type
help(str)  # Opens detailed docs in your shell

# List all methods for a type
print(dir(str))  # Shows available methods like 'lower', 'split', etc.
```

#### Other Ways to Code Strings

Beyond basic strings, Python offers flexible string tools:

- **f-strings** (Python 3.6+): For dynamic text insertion.
- **raw strings**: Ignore escape characters (e.g., `r"this\israw"`).

```python
# f-string example
name = "Bob"
age = 25
print(f"{name} is {age} years old")

# Raw string example
path = r"C:\Users\Bob\Documents"
print(path)  # Output: C:\Users\Bob\Documents (no backslash escaping)
```

#### Pattern Matching

Pattern matching (introduced in Python 3.10) lets you match complex structures. It’s great for data validation and clean code.

```python
# Match a string against a pattern
name = "Alice"
match name:
    case "Alice":
        print("Hello, Alice!")
    case _:
        print("Unknown name")
```

### Lists, Sequence Operations, and Type-Specific Operations

Lists are *mutable* sequences (you can change them). Here’s how they work:

```python
# List creation and modification
my_list = [1, 2, 3]
my_list.append(4)  # Adds an item
my_list[0] = 10    # Changes an item (allowed because mutable)
print(my_list)  # Output: [10, 2, 3, 4]
```

#### Bounds Checking

Python checks if you’re accessing valid indices. If you go out of bounds, it throws an `IndexError`.

```python
# Bounds check example
fruits = ["apple", "banana"]
print(fruits[2])  # Throws IndexError: list index out of range
```

#### Nesting

Nesting lets you create complex structures. For example:

```python
# Nested list
grid = [
    [1, 2],
    [3, 4],
    [5, 6]
]
print(grid[1][0])  # Output: 3 (second row, first column)
```

#### Comprehensions

Comprehensions create new lists/dicts in one line. They’re concise and powerful.

```python
# List comprehension
squares = [x**2 for x in range(5)]
print(squares)  # Output: [0, 1, 4, 9, 16]

# Dictionary comprehension
user_data = {name: len(name) for name in ["Alice", "Bob"]}
print(user_data)  # Output: {'Alice': 5, 'Bob': 3}
```

### Dictionaries, Mapping Operations, and Nesting Revisited

Dictionaries store key-value pairs. They’re *mutable* and perfect for lookups.

```python
# Dictionary creation
user = {"name": "Charlie", "age": 28}
print(user["name"])  # Output: "Charlie"

# Mapping operations
print(user.keys())  # Output: dict_keys(['name', 'age'])
print(user.values()) # Output: dict_values(['Charlie', 28])
```

#### Nesting Revisited

Dictionaries can nest other dictionaries or lists:

```python
# Nested dictionary
profile = {
    "name": "Diana",
    "age": 30,
    "hobbies": ["reading", "hiking"]
}
print(profile["hobbies"][0])  # Output: "reading"
```

### Sorting Keys: For Loops, Iteration and Optimization

When working with data, you often need to sort or iterate. Here’s how:

```python
# Sorting a list
numbers = [5, 2, 9, 1]
sorted_numbers = sorted(numbers)
print(sorted_numbers)  # Output: [1, 2, 5, 9]

# Iterating with a for loop
for num in sorted_numbers:
    print(num)
```

#### Iteration and Optimization

Use `for` loops to iterate through sequences efficiently. For large datasets, avoid nested loops where possible.

```python
# Optimized iteration
squares = [x*x for x in range(10000)]  # One-liner, efficient
```

### Missing Keys: If Tests

When accessing dictionary keys, use `if` tests to avoid errors.

```python
# Check for missing keys
user = {"name": "Eve"}
if "age" in user:
    print(user["age"])
else:
    print("Age not found")
```

### Tuples: Why Tuples?

Tuples are *immutable* sequences. They’re great for:
- Preventing accidental changes (e.g., function return values).
- Acting as keys in dictionaries.

```python
# Tuple example
coordinates = (10, 20)
print(coordinates[0])  # Output: 10
```

### Files and Other File-Like Tools

Python handles files with `open()`. For non-file data, use `io` tools like `StringIO`.

```python
# Read a file
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# File-like string (StringIO)
from io import StringIO
buffer = StringIO("Hello, world!")
print(buffer.read())  # Output: "Hello, world!"
```

### Other Core Types

Beyond the basics, Python has:
- `None`: Represents absence of value.
- `bool`: True/false values.
- `bytes`: Binary data.

```python
# None example
result = None
print(result)  # Output: None
```

### How to Break Your Code’s Flexibility

Overusing dynamic typing or ignoring type hints can make code fragile. For example:

```python
# Problem: No type hints
def add(a, b):
    return a + b

# Works for numbers, but breaks for strings
print(add("2", "3"))  # Throws TypeError: can only concatenate str (not "int") to str
```

**Solution**: Use type hints for clarity and safety.

```python
# Fixed with type hints
def add(a: int, b: int) -> int:
    return a + b
```

### User-Defined Classes

You can create your own types. Start simple:

```python
class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, {self.name}!"

# Usage
person = Person("Alex")
print(person.greet())  # Output: Hello, Alex!
```

### And Everything Else

Python’s ecosystem is vast, but these core types give you the flexibility to build anything—from simple scripts to complex applications. Remember: **immutability** prevents bugs, **comprehensions** save time, and **type hints** make code self-documenting.

You now have the toolkit to understand Python’s core types and operations. Keep experimenting—your next cool project starts here!

💡