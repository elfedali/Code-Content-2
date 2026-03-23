## Object-Oriented Programming

### Class Coding Basics

In Python, classes are the foundation of object-oriented programming (OOP). They let you model real-world objects as code—like creating a `Player` class for a game or a `Car` class for vehicles. Each class defines its own rules, properties, and behaviors.

Let’s start with the simplest class: a class definition. Here’s how you create a class:

```python
class MyClass:
    pass
```

This creates a class named `MyClass`. The `pass` statement is a placeholder (it does nothing) but makes the code syntactically valid. You’ll replace it with actual logic later.

Now, the real magic happens in the `__init__` method. This special method runs automatically when you create a new object (instance) of the class. It initializes the object’s state:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
```

Here:
- `x` and `y` are **parameters** you pass when creating the object.
- `self.x` and `self.y` are **instance variables**—data specific to each object instance.

Create an instance and access its properties:

```python
p1 = Point(3, 4)
print(p1.x)  # Output: 3
print(p1.y)  # Output: 4
```

To add functionality, define methods (functions inside a class). For example, a method that calculates the distance from the origin:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def distance_from_origin(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5
```

Use it with an instance:

```python
p1 = Point(3, 4)
print(p1.distance_from_origin())  # Output: 5.0
```

Every method needs `self` as the first parameter—it refers to the object itself. This lets methods access and modify the object’s state.

**Key Takeaways**:
- Classes define reusable blueprints for objects.
- `__init__` initializes instance variables when an object is created.
- Instance variables store object-specific data.
- Methods add functionality to objects, using `self` to access internal state.

Classes are the building blocks of object-oriented programming in Python. They let you create reusable objects with instance variables and methods, starting with the `__init__` method for initialization. 😄