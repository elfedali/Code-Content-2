## History of C++

### Bjarne Stroustrup

The story of C++ begins with **Bjarne Stroustrup**, a computer scientist at Bell Labs in the early 1980s. Stroustrup initially developed C++ as an extension to the C programming language while working on a project to manage complex systems at AT&T. He aimed to solve practical problems with C—like memory management and code reuse—by creating a language that combined the efficiency of C with higher-level abstractions. Stroustrup's vision was to build a language that could handle both low-level system programming and high-level application development without sacrificing performance. His work began in 1983, and by 1985, he had released the first version of C++ (initially called "C with Classes"). Stroustrup's background in systems programming and his deep understanding of language design principles made him uniquely suited to bridge the gap between practical engineering and theoretical computer science. Today, he remains a prominent figure in the C++ community, having co-founded the C++ Foundation and continuing to guide the language's evolution through the C++ Standards Committee.

### Evolution from C

C++ emerged directly from **C**, the influential systems programming language developed by Dennis Ritchie in the late 1960s. Stroustrup's initial goal was to create a language that retained C's strengths—like speed, low-level memory access, and portability—while adding features to address C's limitations. The key evolution points include:

- **Object-oriented programming**: C lacked native support for objects and classes. C++ introduced these as fundamental building blocks.
- **Memory management**: C used manual memory allocation (`malloc`/`free`), which was error-prone. C++ added automatic memory management via constructors and destructors.
- **Templates**: C had no generic programming capabilities. C++ introduced templates for reusable code structures.
- **Standard library**: C had a minimal library. C++ expanded this with robust components like the STL (Standard Template Library).

Stroustrup deliberately kept C++ backward-compatible with C for most syntax, allowing developers to transition smoothly. This design choice ensured that existing C code could often be used with minimal changes in C++. For example, a simple `int` declaration in C remains valid in C++:

```cpp
int x = 42; // Valid in both C and C++
```

This evolutionary path made C++ accessible to C programmers while providing significant new capabilities for modern software development.

### C++ Standards

The C++ language has matured through a series of **official standards** established by the International Organization for Standardization (ISO). Each standard refined the language, added critical features, and addressed real-world challenges faced by developers. Below is a detailed breakdown of the major standards in chronological order.

#### C++98

The **C++98 standard** (ISO/IEC 14882:1998) was the first official standard for C++ after its initial release. It formalized the language into a production-ready specification, resolving ambiguities from earlier versions and establishing a foundation for future growth. Key features introduced in C++98 include:

- **Complete class system**: Full support for inheritance, polymorphism, and virtual functions.
- **Standard Template Library (STL)**: Containers (e.g., `vector`, `map`), algorithms, and iterators.
- **Exception handling**: `try`/`catch` blocks for error recovery.
- **Name resolution**: Clearer rules for resolving function and variable names.

This standard was pivotal for enterprise applications, enabling robust software development in large-scale projects. Here’s a runnable example demonstrating a simple class with inheritance:

```cpp
#include <iostream>

class Base {
public:
    void print() { std::cout << "Base class\n"; }
};

class Derived : public Base {
public:
    void print() override { std::cout << "Derived class\n"; }
};

int main() {
    Derived d;
    d.print(); // Outputs: "Derived class"
    return 0;
}
```

#### C++11

**C++11** (ISO/IEC 14882:2011) marked a major leap forward with features focused on **modern C++ practices**, **concurrency**, and **efficiency**. It addressed the growing need for scalable applications by introducing:

- **Move semantics**: Eliminated unnecessary copies of objects (e.g., `std::move`).
- **Smart pointers**: `std::unique_ptr` and `std::shared_ptr` for safe memory management.
- **Lambdas**: Anonymous functions for concise code.
- **Type inference**: `auto` keyword to reduce boilerplate.
- **Concurrency**: Thread support via `<thread>` and `<atomic>`.

These features made C++ more expressive and less error-prone. Here’s a practical example using `std::unique_ptr` and lambdas:

```cpp
#include <memory>
#include <iostream>

int main() {
    auto handler = [x = 42]() mutable {
        x = 100;
        std::cout << "Lambda value: " << x << "\n";
    };
    handler();
    return 0;
}
```

#### C++17

**C++17** (ISO/IEC 14882:2017) further refined the language with **performance improvements** and **convenience features**. Notable additions include:

- **Structured bindings**: Deconstructing tuples and arrays into variables.
- **File system library**: Native support for file operations (`<filesystem>`).
- **Parallel algorithms**: Enhanced `std::parallel_for` and `std::sort`.
- **`constexpr`**: Compile-time evaluation of expressions.

This standard made C++ more versatile for systems programming and data-intensive applications. A concise example using structured bindings:

```cpp
#include <iostream>
#include <array>

int main() {
    std::array<int, 3> arr = {1, 2, 3};
    auto [a, b, c] = arr;
    std::cout << "a = " << a << ", b = " << b << ", c = " << c << "\n";
    return 0;
}
```

#### C++20

The most recent standard, **C++20** (ISO/IEC 14882:2020), introduces **modularity**, **concurrency enhancements**, and **modern language features**. Key highlights:

- **Modules**: Replace header files with self-contained, compile-time modules (`module`).
- **Concepts**: Type constraints for templates (e.g., `concept` checks).
- **Ranges**: Streamlined iteration with `ranges::view` and `ranges::for_each`.
- **Coroutines**: Asynchronous control flow (e.g., `co_yield`).

This standard positions C++ for next-generation applications. Here’s a module example:

```cpp
// module my_module
export module my_module;

export int add(int a, int b) {
    return a + b;
}
```

### Summary of Key Standards

| Standard | Year | Key Features | Primary Focus |
|----------|------|---------------|----------------|
| C++98    | 1998 | Classes, STL, Exceptions | Foundation |
| C++11    | 2011 | Move Semantics, Smart Pointers, Lambdas | Modernization |
| C++17    | 2017 | Structured Bindings, Filesystem, Concurrency | Performance |
| C++20    | 2020 | Modules, Concepts, Ranges, Coroutines | Future-Proofing |

This evolution reflects C++'s commitment to balancing **practicality** with **innovation**, ensuring it remains a powerful tool for developers across diverse domains—from embedded systems to high-performance computing. The language continues to evolve through active community collaboration and rigorous standardization, guaranteeing its relevance for decades to come.

🚀