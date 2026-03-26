## Arrays

In C++, arrays are fundamental data structures that allow you to store multiple elements of the same type in contiguous memory. They form the building blocks for efficient data handling and are essential for understanding memory management in the language. This section dives deep into two critical array types: **static arrays** (fixed-size, compile-time allocated) and **dynamic arrays** (runtime-sized, heap-allocated). We'll cover their mechanics, use cases, and best practices with concrete examples.

### Static Arrays

Static arrays are arrays with a fixed size determined at compile time. They are allocated directly on the stack and provide fast access with minimal overhead. This makes them ideal for small, predictable data structures where memory safety is non-negotiable.

**Key characteristics**:
- Fixed size (determined during compilation)
- Contiguous stack memory allocation
- Constant time access (`O(1)`)
- No runtime memory management overhead

**Example of declaration and initialization**:

```cpp
int fixedArray[4] = {10, 20, 30, 40};
```

Here, `fixedArray` is a static array of 4 integers. The size `4` is fixed and cannot be changed after declaration.

**When to use static arrays**:
- When size is known at compile time (e.g., configuration constants)
- For small datasets that fit within stack limits
- When maximum performance is critical

**Critical considerations**:
- **Always validate bounds** to avoid undefined behavior (buffer overflow)
- Cannot be resized after declaration
- Stack size limits may cause issues for large arrays (typically < 100 elements)

**Example of buffer overflow** (undefined behavior):

```cpp
int smallArray[3] = {1, 2, 3};
smallArray[3] = 4; // Causes buffer overflow! Memory corruption risk
```

This example demonstrates why **bound checking** is non-negotiable with static arrays. The compiler won't catch this error, but it will crash your program or cause subtle bugs.

**Best practice**: Use static arrays for small, fixed-size data where you can guarantee bounds safety through careful design. For larger or variable-sized data, move to dynamic arrays.

### Dynamic Arrays

Dynamic arrays have a size determined at runtime. They are allocated on the heap using `new` and require manual deallocation with `delete[]`. This flexibility enables handling data structures that change size during program execution.

**Key characteristics**:
- Runtime-determined size
- Contiguous heap memory allocation
- Requires explicit memory management
- Higher runtime overhead than static arrays

**Example of allocation and deallocation**:

```cpp
// Allocate 5 integers on the heap
int* dynamicArray = new int[5];

// Initialize values
for (int i = 0; i < 5; i++) {
    dynamicArray[i] = i * 2;
}

// Use the array
for (int i = 0; i < 5; i++) {
    std::cout << "Element " << i << ": " << dynamicArray[i] << std::endl;
}

// Deallocate memory to prevent leaks
delete[] dynamicArray;
```

This example shows how dynamic arrays work with explicit memory management. Note the critical pairing of `new[]` with `delete[]`.

**When to use dynamic arrays**:
- When size is unknown until runtime (e.g., user input)
- For large datasets exceeding stack limits
- When you need to resize the array (though resizing is complex)

**Critical considerations**:
- **Always pair `new[]` with `delete[]`** to avoid memory leaks
- **Always check bounds** to prevent buffer overflows
- Heap memory can be fragmented over time
- Requires careful error handling (e.g., `std::exception` for allocation failures)

**Example of manual resizing** (advanced):

```cpp
// Initial allocation
int* baseArray = new int[3];
baseArray[0] = 1;
baseArray[1] = 2;
baseArray[2] = 3;

// Resize to double the size
int* newBaseArray = new int[6];
for (int i = 0; i < 3; i++) {
    newBaseArray[i] = baseArray[i];
}
delete[] baseArray; // Free old memory
baseArray = newBaseArray; // Use new array
```

**Warning**: Manual resizing is error-prone and often leads to bugs. For production code, prefer **`std::vector`** (an STL container) for dynamic arrays that require resizing. It handles memory management automatically and provides bounds safety.

**Memory management comparison**:

| Feature                | Static Arrays           | Dynamic Arrays          |
|------------------------|--------------------------|--------------------------|
| Allocation             | Stack (compile-time)     | Heap (runtime)           |
| Size Flexibility        | Fixed                    | Runtime-determined       |
| Memory Management      | Automatic (no deallocation) | Manual (`new[]`/`delete[]`) |
| Bounds Safety          | Critical (no runtime checks) | Critical (requires checks) |
| Common Use Cases       | Small fixed data         | Large/variable data      |

### Summary

This section covered **static arrays** (fixed-size, stack-allocated) and **dynamic arrays** (runtime-sized, heap-allocated). Static arrays excel for small, predictable data with strict bounds safety requirements. Dynamic arrays provide runtime flexibility but demand careful memory management—always pair `new[]` with `delete[]` and validate bounds. For most modern applications, **`std::vector`** (an STL container) is the preferred choice for dynamic arrays due to its safety, convenience, and built-in resizing capabilities. 🚀