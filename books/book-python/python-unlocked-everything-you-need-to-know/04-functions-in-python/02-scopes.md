## Scopes

Ever wonder where Python looks for your variables? Like, when you define a variable inside a function, does it magically appear everywhere? 😊 Scopes are the invisible boundaries that tell Python *where* to find your variables — and they’re the secret sauce for avoiding messy code. Let’s dive into how scopes work in Python, with clear examples and zero fluff.

### What Are Scopes?

Think of a scope as a **region** where a variable is defined and accessible. Python has four main scopes, but we’ll focus on the ones that matter most for functions: **local**, **enclosing**, **global**, and **built-in**. These scopes determine *where* Python searches for a variable when you reference it.

### Global vs Local Scopes

Variables defined *outside* functions live in the **global scope**. Variables defined *inside* functions live in the **local scope**. This distinction is critical — it’s how Python prevents accidental overwrites and keeps your code clean.

Here’s a simple example to illustrate:

```python
global_var = 10  # Global scope

def my_function():
    local_var = 20  # Local scope
    print(f"Local variable: {local_var}")
    print(f"Global variable: {global_var}")
```

**Output**:
```
Local variable: 20
Global variable: 10
```

Notice how `local_var` is only accessible inside `my_function`, while `global_var` is accessible everywhere. This separation is why Python avoids "variable leakage" — your code stays tidy!

### Nested Scopes and the `nonlocal` Keyword

Now, what happens when a function *nested* inside another function needs access to a variable from its outer function? That’s where **nonlocal** comes in. The `nonlocal` keyword lets you modify variables in the *enclosing scope* (the outer function’s local scope), not the global scope.

Let’s break it down with a concrete example:

```python
def outer():
    x = 10
    def inner():
        nonlocal x  # This modifies x from outer's scope
        x = 20
    inner()
    print(f"Outer x after inner: {x}")
```

**Output**:
```
Outer x after inner: 20
```

Here’s why it works: `nonlocal` tells Python to look *up* one scope (the outer function) for `x`, not the global scope. Without `nonlocal`, Python would treat `x` as a *new* local variable (which is why we need it here).

**What if we forget `nonlocal`?** Let’s see what happens:

```python
def outer():
    x = 10
    def inner():
        x = 20  # This creates a new local variable!
    inner()
    print(f"Outer x: {x}")
```

**Output**:
```
Outer x: 10
```

Without `nonlocal`, Python creates a *new* local variable `x` inside `inner`, leaving `outer`’s `x` unchanged. Always use `nonlocal` when you want to modify an enclosing variable!

### The `global` Keyword

The `global` keyword is for modifying *global* variables from within a function. It’s less common than `nonlocal` but essential for certain patterns (like sharing state across functions).

Here’s how it works:

```python
x = 10  # Global scope

def modify_global():
    global x  # Tells Python: "x is global!"
    x = 20
    print(f"Global x after modification: {x}")
```

**Output**:
```
Global x after modification: 20
```

**Important**: Using `global` *changes* the global variable. If you skip it, Python treats `x` as a local variable (which would cause an error). This is why `global` is a double-edged sword — it’s powerful but requires careful use.

### Scope Resolution Order (LEGB)

Python follows a strict rule for finding variables: **L**ocal → **E**nclosing → **G**lobal → **B**uilt-in (LEGB). This order is the backbone of Python’s scoping system.

Let’s see it in action with a real example:

```python
def outer():
    x = 10  # Local to outer
    
    def inner():
        y = 20  # Local to inner
        print(f"y (inner): {y}")
        print(f"x (outer): {x}")
        print(f"z (global): {z}")
    
    inner()
```

**Output**:
```
y (inner): 20
x (outer): 10
z (global): 20
```

Here’s what happens:
1. `y` is found in the *inner* function’s local scope.
2. `x` is found in the *outer* function’s local scope (enclosing scope).
3. `z` is found in the *global* scope (since it’s defined outside all functions).

This order ensures Python knows *exactly* where to look for a variable — no guessing!

### Summary

Scopes are the invisible guardians of your variables in Python. They define where your variables live and how Python finds them — from local functions to global variables. By understanding **local** vs **global** scopes, using the `nonlocal` keyword for nested functions, and respecting the **LEGB rule**, you’ll write cleaner, more predictable code. Remember: scopes aren’t just technical details — they’re the reason your functions work together without chaos. 🤔