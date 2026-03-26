## Memory Concepts

### Stack vs Heap

In C, understanding the distinction between the **stack** and **heap** is foundational to writing efficient, safe, and maintainable code. These two memory regions serve fundamentally different purposes and require distinct management strategies—misunderstanding them is a common source of bugs in C programs.

#### The Stack: Fast, Automatic, and Limited

The stack is a **fixed-size, automatic memory region** managed by the compiler and operating system. It handles:
- Local variables (e.g., `int`, `float`)
- Function parameters
- Return addresses
- Temporary data during function execution

*Key characteristics*:
- **Speed**: Operations are near-instantaneous (O(1) time) due to stack pointer manipulation.
- **Size**: Typically 1–10 MB (platform-dependent). Exceeding this causes *stack overflow* (a classic runtime error).
- **Automatic deallocation**: Memory is released when the function exits—no manual cleanup needed.

**Real-world example**:  
When you declare a local variable inside a function, it lives on the stack:

```c
#include <stdio.h>

void process_data() {
    int small_buffer[10]; // 10 integers on stack (40 bytes)
    printf("Stack usage: %lu bytes\n", sizeof(small_buffer));
}
```

This code safely uses stack memory because:
1. The array is small (40 bytes)
2. The stack automatically deallocates it when `process_data` exits
3. No `free()` is required

⚠️ **Critical note**: Stack overflow occurs when you try to allocate too much memory here (e.g., large arrays or recursive functions). This is why you’ll see stack overflow errors when processing large datasets.

#### The Heap: Flexible, Manual, and Complex

The heap (also called **free store**) is a **dynamic memory region** where you explicitly allocate and deallocate memory using functions like `malloc`, `calloc`, `realloc`, and `free`. It handles:
- Large data structures (e.g., >100 KB)
- Long-lived resources (e.g., persistent data across function calls)
- Objects that need to outlive their scope

*Key characteristics*:
- **Size**: Unbounded (limited by system RAM)
- **Speed**: Slower than stack (O(log n) for allocation/deallocation)
- **Manual management**: You must track allocations and deallocate them—*failure causes memory leaks* (see next section)

**Real-world example**:  
Allocating a large buffer on the heap:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate 1MB buffer on heap (1,048,576 bytes)
    char *large_buffer = (char *)malloc(1024 * 1024);
    
    if (large_buffer == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        return 1;
    }
    
    // Use the buffer (e.g., for file I/O)
    printf("Heap buffer allocated: %zu bytes\n", sizeof(large_buffer));
    
    // Critical: Free when done!
    free(large_buffer);
    
    return 0;
}
```

This example demonstrates:
- Heap allocation via `malloc`
- Safety check for `NULL`
- Explicit deallocation via `free`

#### Stack vs Heap: Key Differences

| Feature                | Stack                                  | Heap                                      |
|------------------------|----------------------------------------|-------------------------------------------|
| **Purpose**            | Local variables, function calls       | Dynamic memory (large data, long-lived)  |
| **Size**               | Fixed (1–10 MB)                      | Unbounded (system RAM)                  |
| **Speed**              | Very fast (O(1))                     | Slower (O(log n))                      |
| **Management**         | Automatic (compiler)                 | Manual (programmer)                    |
| **Lifetime**           | Function scope                       | Until `free()` is called               |
| **Fragmentation**      | None                                 | Possible (if not managed)              |
| **Use Case**           | Small, short-lived data              | Large, long-lived data                 |

#### Why This Matters in Practice

1. **Performance**: Stack operations are 10–100× faster than heap operations. Use the stack for small data (e.g., 10–100 elements) to avoid overhead.
2. **Safety**: Stack overflows crash programs immediately, while heap leaks cause gradual failures. Always prioritize stack for small data.
3. **Debugging**: Heap leaks are harder to detect than stack errors (see next section).

> 💡 **Pro tip**: In embedded systems or performance-critical applications, prefer stack for small buffers (e.g., `< 100 bytes`) to avoid fragmentation and improve speed.

### Memory Leaks

A **memory leak** occurs when a program allocates memory on the heap but fails to release it when no longer needed. This causes the program to consume increasing amounts of memory over time, eventually leading to crashes or degraded performance.

#### How Memory Leaks Happen

Memory leaks arise from:
1. **Unreleased allocations**: Forgetting to call `free()` after `malloc()`
2. **Dangling pointers**: Pointers that reference deallocated memory
3. **Inefficient resource handling**: Failing to manage memory in complex data structures

**Real-world example**:  
A classic leak scenario:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate 10 integers on heap
    int *ptr = (int *)malloc(10 * sizeof(int));
    
    if (ptr == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        return 1;
    }
    
    // Use the memory (e.g., fill with values)
    for (int i = 0; i < 10; i++) {
        ptr[i] = i;
    }
    
    // CRITICAL: No free() call → memory leak!
    // Program continues using ptr (e.g., in another function)
    
    // ... more code that uses ptr ...
    
    return 0;
}
```

This code leaks memory because:
- `ptr` is never freed
- The memory stays allocated indefinitely
- The leak grows with each program run

#### Detecting and Fixing Memory Leaks

**Common tools**:
- `Valgrind` (for Linux)
- `Visual Studio Debugger` (for Windows)
- `AddressSanitizer` (compile-time check)

**Fix strategy**:
1. **Track allocations**: Use `malloc`/`calloc` with a safety check
2. **Ensure deallocation**: Call `free()` for every `malloc` (or `calloc`/`realloc`)
3. **Validate pointers**: Check if pointers are valid before use

**Corrected example**:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(10 * sizeof(int));
    if (ptr == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        return 1;
    }
    
    for (int i = 0; i < 10; i++) {
        ptr[i] = i;
    }
    
    // Free memory when done (critical fix!)
    free(ptr);
    
    return 0;
}
```

#### Why Memory Leaks Are Dangerous

| Consequence                | Impact Example                          |
|----------------------------|------------------------------------------|
| **Slow performance**       | Web server runs out of memory after 1 hour |
| **Crashes**                | `Segmentation fault` on heap exhaustion  |
| **Security risks**         | Memory corruption leads to exploits     |
| **Resource exhaustion**    | Servers crash under sustained load      |

> ⚠️ **Real-world impact**: In 2019, a memory leak in a popular web server caused 300+ servers to crash globally. The leak was a single forgotten `free()` call.

#### Prevention Best Practices

1. **Always pair `malloc` with `free`** (no exceptions)
2. **Use smart pointers** (e.g., `std::unique_ptr` in C++ for automatic deallocation)
3. **Validate memory usage** with tools like `Valgrind`
4. **Limit heap usage** for small data (use stack instead)

### Summary

In this section, we’ve covered the critical concepts of **stack** and **heap** memory in C and the dangers of **memory leaks**. Remember: **Use the stack for small, short-lived data** and **the heap for larger, long-lived data**, and **always pair `malloc` with `free`** to avoid leaks. 🧱💀