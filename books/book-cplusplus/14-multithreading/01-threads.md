## Threads

🔄 In the world of modern C++, threads are the fundamental units of concurrency that let us execute multiple tasks simultaneously. This section dives into the practical implementation of threads using the standard library's `std::thread` class and how to manage their lifetimes through joining and detaching—essential skills for building responsive applications.

### std::thread

The `std::thread` class is C++'s primary mechanism for creating and managing threads. It's part of the `<thread>` header and provides a straightforward way to start a new thread of execution. To create a thread, you construct a `std::thread` object by passing a callable (a function, lambda, or function object) and any required arguments. The thread starts running immediately, and the main thread continues executing until the `std::thread` object is destroyed (if we don't join or detach).

Here's a simple example demonstrating thread creation:

```cpp
#include <iostream>
#include <thread>

void print_hello() {
    std::cout << "Hello from a thread!" << std::endl;
}

int main() {
    std::thread t(print_hello);
    return 0;
}
```

**Key observations**:
- The `print_hello` function runs in a separate thread.
- The main thread continues executing immediately after `std::thread` construction.
- **Critical note**: Without joining or detaching, the thread runs until it exits, but the program won't know when it's done—this can lead to undefined behavior if the thread isn't properly managed.

**Why this matters**: Proper thread management prevents resource leaks and ensures predictable program behavior. Always join or detach threads—never leave them dangling.

### Joining and Detaching

When a thread is created, it runs independently. The main thread needs to know how to interact with it, which is where joining and detaching come in.

#### Joining

**Joining** a thread means waiting for it to finish before continuing. This is done using the `join()` member function. After joining, the thread object is destroyed and its resources are cleaned up.

Here's an example demonstrating joining:

```cpp
#include <iostream>
#include <thread>

void print_hello() {
    std::cout << "Hello from a thread!" << std::endl;
}

int main() {
    std::thread t(print_hello);
    t.join(); // Wait for thread to finish
    std::cout << "Main thread continues." << std::endl;
    return 0;
}
```

**Why join?** Use joining when you need the main thread to wait for the thread's work to complete. For instance, if the thread performs critical computation or I/O, you must ensure it finishes before proceeding.

#### Detaching

**Detaching** a thread means allowing it to run independently without the main thread waiting for it to finish. This is done using the `detach()` member function.

Here's an example demonstrating detaching:

```cpp
#include <iostream>
#include <thread>

void print_hello() {
    std::cout << "Hello from a thread!" << std::endl;
}

int main() {
    std::thread t(print_hello);
    t.detach(); // Thread runs independently
    std::cout << "Main thread continues." << std::endl;
    return 0;
}
```

**Why detach?** Use detaching for background tasks that don't require the main thread to wait (e.g., logging, monitoring, or resource-intensive operations). However, detached threads are **not safe to join**—attempting to join a detached thread causes a runtime error.

#### Key Differences Summary

| Feature          | Joining                          | Detaching                        |
|-------------------|-----------------------------------|-----------------------------------|
| **Effect on main thread** | Blocks until thread finishes | Does not block main thread       |
| **Thread lifetime** | Thread destroyed after join | Thread runs independently       |
| **Use case**      | Critical operations requiring completion | Background tasks              |
| **Safety**        | Safe to join                     | Cannot join after detaching     |

### Best Practices

1. **Always join or detach**: Never leave threads unmanaged—this causes resource leaks and undefined behavior.
2. **Join before returning**: If a thread performs critical work, join it before the program ends.
3. **Avoid joining detached threads**: Detached threads are unsafe to join (will crash your program).
4. **Use `std::thread` judiciously**: Start with simple cases (like lambdas) before complex scenarios.

Understanding these fundamentals lets you build responsive concurrent applications without compromising safety or performance. Remember: **thread management is the foundation of reliable concurrency**.

✅