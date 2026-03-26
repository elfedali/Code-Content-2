## Advanced Features

### Move Semantics

Move semantics is a game-changer in modern C++ that eliminates unnecessary resource copying by transferring ownership of resources from one object to another. Instead of creating a full copy of an object (which can be expensive for large data structures), move semantics **steals** the resources from the source object and leaves it in a "defunct" state—effectively zeroing out its ownership. This approach dramatically improves performance, especially for resource-heavy types like containers, file handles, and dynamically allocated memory.

The magic happens through **rvalue references** (which we'll explore next), but the practical impact is immediate. Consider a `std::vector` of `std::string` objects: without move semantics, each insertion would copy the entire string. With move semantics, the vector *moves* the string's internal buffer into the vector's storage—avoiding costly memory duplication.

Here's a concrete example demonstrating move semantics in action with a custom class:

```cpp
#include <iostream>

class Resource {
private:
    int* data;
public:
    // Constructor (takes ownership)
    Resource(int value) : data(new int(value)) {}
    
    // Move constructor (transfers ownership)
    Resource(Resource&& other) noexcept : data(std::move(other.data)) {
        other.data = nullptr; // Defunct state
    }
    
    // Destructor
    ~Resource() {
        delete data;
        std::cout << "Resource destroyed\n";
    }
};

int main() {
    Resource r1(42);
    Resource r2 = std::move(r1); // Move operation
    // r1 is now defunct (data = nullptr)
    return 0;
}
```

**Why this matters**: Move semantics reduces the overhead of copying large objects by 50–90% in many scenarios. It also enables efficient implementations of standard library containers (like `std::vector`), which internally use move operations to avoid deep copies during insertions and deletions.

### Rvalue References

Rvalue references (`T&&`) are the *mechanism* that powers move semantics. They provide a way to bind to temporary values (rvalues) and enable **zero-cost moves**—a critical optimization for modern C++. Unlike lvalue references (`T&`), which bind to named variables, rvalue references bind to temporary objects created during expressions (e.g., the result of `42 + 3`).

Here's how they work in practice:

1. **Rvalue vs. Lvalue**:  
   - Lvalues: Named objects (e.g., `x` in `int x = 10;`)  
   - Rvalues: Temporary values (e.g., `10 + 5`)

2. **The `std::move` utility**:  
   `std::move` is a *trivial* function that converts an lvalue to an rvalue reference. It’s used to *force* a move operation when you want to transfer ownership:

```cpp
#include <iostream>

class Widget {
    int value;
public:
    Widget(int v) : value(v) {}
    Widget(Widget&& other) noexcept : value(other.value) {
        std::cout << "Moved Widget: " << value << "\n";
        other.value = -1; // Defunct state
    }
};

int main() {
    Widget w1(10);
    Widget w2 = std::move(w1); // Forces move operation
    // w1 is now defunct (value = -1)
    return 0;
}
```

**Key insights**:  
- Rvalue references **do not copy**—they transfer ownership.  
- The `noexcept` specifier (used in move operations) ensures the move doesn’t throw exceptions, critical for performance.  
- Move operations are **always** preferred over copies when possible (e.g., in containers or resource-heavy types).

#### Why rvalue references matter
Without rvalue references, move semantics would be impossible. They solve a fundamental problem: *how do we distinguish between temporary objects and named objects when transferring resources?* By binding directly to rvalues, the compiler can optimize moves to be *zero-cost* (no memory allocation or copying).

### Constexpr

`constexpr` is a C++11 feature that lets you evaluate expressions and functions at **compile time** rather than runtime. This enables compile-time safety checks, optimized code generation, and reduced runtime overhead—especially valuable for generic programming, mathematical operations, and resource-constrained systems.

#### Core capabilities
| Feature              | Description                                                                 | Example                                      |
|----------------------|-----------------------------------------------------------------------------|-----------------------------------------------|
| Compile-time constants | Values computed at compile time (no runtime evaluation)                       | `constexpr int max = 100;`                   |
| Compile-time functions | Functions that run at compile time (must be pure)                            | `constexpr int square(int x) { return x * x; }` |
| Compile-time arrays  | Arrays with sizes determined at compile time                                 | `constexpr int size = 5; int arr[size];`     |

Here’s a practical example using `constexpr` for a mathematical operation:

```cpp
constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

int main() {
    // This is evaluated at compile time
    constexpr int result = factorial(5); // Result = 120
    std::cout << "Factorial(5) = " << result << "\n";
    return 0;
}
```

**Critical constraints**:  
- `constexpr` functions **must be pure** (no side effects).  
- Arguments must be **compile-time constants** (e.g., `int` literals, `constexpr` variables).  
- Cannot use dynamic memory (`new`/`delete`) or runtime libraries.

#### Real-world impact
- **Performance**: `constexpr` eliminates runtime overhead for simple operations (e.g., `factorial(10)` runs in milliseconds vs. microseconds for `std::vector`).  
- **Safety**: Compile-time checks prevent invalid states (e.g., `constexpr` ensures array sizes never exceed bounds).  
- **Generics**: Enables efficient templates (e.g., `std::array` uses `constexpr` for compile-time size validation).

### Summary

In this section, we explored three critical modern C++ features: **move semantics** (efficient resource transfer), **rvalue references** (the mechanism enabling zero-cost moves), and **constexpr** (compile-time evaluation). Together, they form the backbone of high-performance, safe, and scalable C++ code. Move semantics and rvalue references optimize resource handling—reducing copying overhead by up to 90% in real-world applications. Constexpr adds compile-time safety and efficiency, critical for generic programming and resource-constrained systems. Mastering these features lets you write C++ that’s not just fast, but *truly* robust. ✨