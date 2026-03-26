## Structures

In C, **structures** are a fundamental way to group related data into a single unit. They allow you to create custom data types that can hold multiple values of different kinds — perfect for modeling real-world objects. Think of a structure as a **blueprint** for a data object you can reuse throughout your program. 🏗️

### Defining Structures

A structure is defined using the `struct` keyword. Here's the basic syntax:

```c
struct tag_name {
    // member declarations
};
```

The `tag_name` is an optional name for the structure. If you omit it, you can still use the structure by its tag (though it's less common). The members inside the structure can be of any valid C type (int, float, char, etc.), and they can be nested (though we'll keep it simple for this section).

Let's create a simple structure for a **point** in 2D space:

```c
struct Point {
    int x;
    int y;
};
```

This structure defines a type called `Point` that has two integer members: `x` and `y`. You can now create variables of this type:

```c
struct Point p1 = { .x = 10, .y = 20 };
```

Note: The use of designated initializers (`x = 10`, `y = 20`) is optional but very useful for clarity. It allows you to initialize specific members without having to set all members.

Another example: a structure for a **rectangle** with width and height:

```c
struct Rectangle {
    int width;
    int height;
};
```

You can also define structures without a tag name (though it's less common in practice):

```c
struct {
    int x;
    int y;
} point1;
```

**Key points to remember**:
- Structures are user-defined data types.
- Members can be of any valid C type (including other structures, but we'll skip that for now).
- Using a tag name is **highly recommended** for readability and maintainability.

### Accessing Members

Once you've defined a structure, you can access its members using the **dot operator (`.`)**. This is the primary way to interact with the data stored in a structure.

For example, if we have a `Point` structure variable `p1`, we access its `x` member like this:

```c
int x_value = p1.x;
```

Here's a concrete example that demonstrates this:

```c
#include <stdio.h>

int main() {
    struct Point {
        int x;
        int y;
    };

    struct Point p1 = {10, 20};

    printf("x = %d, y = %d\n", p1.x, p1.y);

    return 0;
}
```

This program outputs: `x = 10, y = 20`

**Important**: The dot operator is **case-sensitive**. So `p1.x` is correct, but `p1.X` would be an error.

Also, you can use **designated initializers** when creating a structure variable to set specific members:

```c
struct Point p2 = { .x = 30, .y = 40 };
```

This is especially useful when you want to initialize only some members and leave others to default values.

**Common mistakes to avoid**:
- Forgetting the dot operator (e.g., `p1x` instead of `p1.x`)
- Using the wrong structure variable name (e.g., `p1` vs `p2`)

Let's show a more complex example with a `Person` structure:

```c
#include <stdio.h>
#include <string.h>

int main() {
    struct Person {
        char name[50];
        int age;
    };

    struct Person p3 = { "Alice", 30 };

    printf("Name: %s, Age: %d\n", p3.name, p3.age);

    return 0;
}
```

This program prints: `Name: Alice, Age: 30`

**Why use structures?**
Structures are powerful because they let you:
- Group related data together
- Create complex data types that represent real-world objects
- Pass complex data to functions without using pointers (though pointers are also important)

## Summary

In this section, we've covered the essentials of **structures** in C: how to define them and how to access their members. Structures are a cornerstone of C programming, enabling you to model complex data in a clean and organized way. By defining structures with meaningful names and using the dot operator to access members, you can write robust and maintainable code. 🚀