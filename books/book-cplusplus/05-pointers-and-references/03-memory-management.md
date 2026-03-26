## Memory Management

In C++, managing memory is a fundamental skill that separates beginners from experts. This section dives deep into **dynamic memory allocation** and **automatic memory management** — two pillars of robust C++ code. We'll start with the basics of `new` and `delete`, then transition to the modern solution: **smart pointers**. 🧠

### Understanding Dynamic Memory Allocation

Before we dive into `new` and `delete`, let's clarify what dynamic memory allocation means. In C++, you can request memory from the heap (the free store) at runtime using the `new` operator. This memory persists until explicitly deallocated with `delete`. Unlike static memory (local variables on the stack), heap memory is **not automatically managed** by the compiler — you must manually handle it.

This manual control is powerful but error-prone. A single mistake can lead to memory leaks (unreleased memory) or dangling pointers (pointers that reference deallocated memory). That's why modern C++ provides smart pointers to automate this process.

### The `new` and `delete` Operators

The `new` and `delete` operators are the workhorses of manual memory management in C++. Let's break down how they work.

#### Allocating Memory with `new`

When you use `new`, the compiler allocates a block of memory on the heap and returns a pointer to it. The size of the block is determined by the type you specify.

For example, to allocate a `std::string`:

```cpp
std::string* strPtr = new std::string("Hello, World!");
```

This allocates enough memory for a `std::string` object and initializes it with the string "Hello, World!". The pointer `strPtr` now points to the newly allocated memory.

#### Deallocating Memory with `delete`

After you're done with a dynamically allocated object, you must call `delete` to free the memory. This is critical to prevent memory leaks.

```cpp
delete strPtr; // Release the memory
```

**Important**: Always match `new` with `delete`. If you forget to call `delete`, you create a **memory leak**. If you call `delete` on a pointer that no longer points to a valid object (e.g., a dangling pointer), you create a **double-free error**.

#### Common Pitfalls with `new` and `delete`

Here are real-world scenarios where manual memory management fails:

1. **Memory leaks** (forgotten `delete`):
   ```cpp
   std::string* leakyPtr = new std::string("Leak");
   // No delete here! Memory is leaked
   ```

2. **Double-free errors** (calling `delete` on a pointer that was already freed):
   ```cpp
   std::string* doubleFreePtr = new std::string("Double Free");
   delete doubleFreePtr;
   delete doubleFreePtr; // Error: double-free!
   ```

3. **Dangling pointers** (pointers that reference freed memory):
   ```cpp
   std::string* danglingPtr = new std::string("Dangling");
   delete danglingPtr;
   std::cout << *danglingPtr; // Undefined behavior!
   ```

#### Best Practices for `new` and `delete`

- **Always pair `new` with `delete`** (use `delete` when the object goes out of scope).
- **Use smart pointers** for heap-allocated objects to avoid manual cleanup.
- **Avoid raw pointers** for heap objects when possible (they increase error risk).
- **Validate pointers** before dereferencing (e.g., check if `ptr != nullptr`).

### Smart Pointers: Safeguarding Your Heap

Manual memory management is error-prone. That's why C++11 introduced **smart pointers** — objects that automatically manage the memory they point to. Smart pointers solve two critical problems:
1. **Memory leaks**: They automatically deallocate memory when they go out of scope.
2. **Dangling pointers**: They ensure pointers don't become invalid due to ownership changes.

#### Why Smart Pointers?

Smart pointers solve two main problems:
1. **Memory leaks**: They automatically deallocate memory when they go out of scope.
2. **Dangling pointers**: They ensure that a pointer doesn't become dangling because they track ownership.

Let's explore the most common smart pointers.

#### `std::unique_ptr`: Exclusive Ownership

`std::unique_ptr` is the most versatile smart pointer. It owns a single object and transfers ownership when moved. This means **only one `unique_ptr` can own an object at a time**.

```cpp
#include <memory>
#include <string>

int main() {
    // Create a unique_ptr that owns a string
    std::unique_ptr<std::string> uniqueStr = std::make_unique<std::string>("Unique Ownership");
    
    // uniqueStr is now the only owner of the string
    // When uniqueStr goes out of scope, the string is automatically deleted
}
```

**Key points**:
- `std::make_unique` is preferred over `new` (avoids raw `new` calls).
- `unique_ptr` is perfect for when you want **exclusive ownership** (e.g., in a class member).
- **Never** use `unique_ptr` with `shared_ptr` (ownership conflicts).

#### `std::shared_ptr`: Shared Ownership

`std::shared_ptr` allows multiple owners of the same object. It uses **reference counting** to track how many pointers are owning the object. When the last `shared_ptr` goes out of scope, the object is deallocated.

```cpp
#include <memory>
#include <string>

int main() {
    // Create a shared_ptr that shares ownership
    std::shared_ptr<std::string> sharedStr1 = std::make_shared<std::string>("Shared Ownership 1");
    std::shared_ptr<std::string> sharedStr2 = sharedStr1; // Now two owners

    // sharedStr1 and sharedStr2 both own the same string
    // When both go out of scope, the string is deallocated
}
```

**Key points**:
- `shared_ptr` is ideal for scenarios where you need to share ownership (e.g., in class hierarchies).
- **Avoid** long-lived objects (reference counting adds overhead).

#### `std::weak_ptr`: Avoiding Circular References

`std::weak_ptr` is a "weak" reference to an object that is managed by `shared_ptr`. It doesn't increment the reference count, so it doesn't cause a memory leak.

```cpp
#include <memory>
#include <string>

int main() {
    // Create a shared_ptr and a weak_ptr to it
    std::shared_ptr<std::string> shared = std::make_shared<std::string>("Weak Reference");
    std::weak_ptr<std::string> weak = shared;

    // weak does not increment the count, so it's safe to use
    // But we need to convert it back to a strong pointer when needed
    std::shared_ptr<std::string> strong = weak.lock(); // Returns shared_ptr if valid
}
```

**Key points**:
- `weak_ptr` breaks circular reference chains (e.g., `A` points to `B`, `B` points to `A`).
- `lock()` returns a `shared_ptr` if the object is still alive, otherwise `nullptr`.

### Smart Pointer Comparison

Here's a quick reference table for the most common smart pointers:

| Smart Pointer Type | Ownership | When to Use | Key Feature |
|---------------------|-----------|--------------|--------------|
| `std::unique_ptr` | Exclusive | When you want one owner | No reference counting, transfer ownership on move |
| `std::shared_ptr` | Shared | When multiple owners are needed | Reference counting, avoids double-free |
| `std::weak_ptr` | Weak | Breaking circular references | Doesn't increment reference count |

### When to Use Which Smart Pointer

- **Use `unique_ptr`** for:
  - Simple ownership (e.g., in a class member).
  - Avoiding shared ownership (e.g., when you don't need to share the object).
  - For performance (no reference counting overhead).

- **Use `shared_ptr`** for:
  - Objects that need to be shared (e.g., in a class hierarchy).
  - When you want to share ownership without manual cleanup.

- **Use `weak_ptr`** for:
  - Breaking circular references (e. g., in a `shared_ptr` chain).
  - When you need a reference that doesn't increment the count.

## Summary

Memory management is a critical skill in C++. While `new` and `delete` give you control, they come with significant risks (memory leaks, dangling pointers). **Smart pointers** — especially `unique_ptr`, `shared_ptr`, and `weak_ptr` — automate memory management and make your code safer and more maintainable. 💡