## Efficient Coding

When building high-performance C++ applications, **efficient coding** isn’t just about writing correct code—it’s about writing code that *works well under pressure*. This section dives into two critical pillars of performance: **Memory Optimization** and **Algorithm Efficiency**. We’ll explore practical techniques, concrete examples, and real-world trade-offs to help you craft applications that scale without sacrificing speed or stability.

---

### Memory Optimization

Memory optimization is where C++ shines—its low-level control lets you manage resources with precision. Poor memory habits can cause leaks, excessive allocations, and performance bottlenecks. Here’s how to avoid them:

#### Avoid Unnecessary Copies
C++’s copy semantics can be expensive. For example, copying a `std::vector` or a large object creates a full copy in O(n) time. Use **move semantics** to transfer ownership without copying:

```cpp
#include <vector>
#include <iostream>

class HeavyObject {
    int data[1000000]; // Simulate large data
public:
    HeavyObject() { std::fill(data, data + 1000000, 42); }
    HeavyObject(HeavyObject&& other) noexcept { // Move constructor
        std::copy(other.data, other.data + 1000000, data);
        other.data[0] = -1; // Mark moved
    }
};

int main() {
    HeavyObject obj1;
    HeavyObject obj2 = std::move(obj1); // O(1) transfer, not O(n) copy
    std::cout << "obj2 data[0]: " << obj2.data[0] << std::endl; // -1 (moved)
}
```

**Key Insight**: Always prefer `std::move` in functions that return large objects. This avoids deep copies and reduces memory pressure.

#### Use Smart Pointers Strategically
Raw pointers cause memory leaks and dangling references. Smart pointers (`unique_ptr`, `shared_ptr`, `weak_ptr`) automate cleanup but require careful design:

```cpp
#include <memory>
#include <iostream>

struct Resource {
    int id;
    Resource(int id) : id(id) { std::cout << "Resource created: " << id << std::endl; }
    ~Resource() { std::cout << "Resource destroyed: " << id << std::endl; }
};

int main() {
    // Unique pointer: single owner, automatic cleanup
    std::unique_ptr<Resource> res1 = std::make_unique<Resource>(1);
    
    // Shared pointer: multiple owners, reference-counted cleanup
    std::shared_ptr<Resource> res2 = std::make_shared<Resource>(2);
    std::shared_ptr<Resource> res3 = res2; // Now two owners

    // Weak pointer: prevents cycles in shared_ptr
    std::weak_ptr<Resource> res4 = res2;
    std::shared_ptr<Resource> res5 = res4.lock(); // Resolves cycle

    // Cleanup happens automatically when owners leave scope
}
```

**Trade-offs to Consider**:
- `unique_ptr`: Best for single-ownership scenarios (e.g., owning a file handle).
- `shared_ptr`: Ideal for shared ownership (e.g., thread-safe data structures).
- Avoid `shared_ptr` for large objects—use `unique_ptr` with `std::move` for efficiency.

#### Choose Data Structures Wisely
Small data structures have big impacts. For example, `std::array` is more efficient than `std::vector` for fixed-size data:

```cpp
#include <array>
#include <iostream>

int main() {
    // Fixed-size array (O(1) access, no dynamic allocation)
    std::array<int, 10> smallData = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Vector (dynamic, O(n) for resize)
    std::vector<int> largeData;
    largeData.reserve(1000000); // Pre-allocate to avoid reallocations
    
    std::cout << "smallData size: " << smallData.size() << " (fixed)" << std::endl;
    std::cout << "largeData size: " << largeData.size() << " (dynamic)" << std::endl;
}
```

**When to Use What**:
| **Scenario**                     | **Best Choice**      | **Why**                                  |
|----------------------------------|----------------------|-------------------------------------------|
| Fixed-size, frequent access     | `std::array`         | No dynamic memory, O(1) overhead         |
| Variable-size, frequent resizing | `std::vector`        | Efficient reallocation strategy          |
| Small, temporary data           | `std::unique_ptr`    | Avoids copy costs, no manual cleanup     |

#### Minimize Global State
Global variables and static variables can bloat memory and cause thread conflicts. Localize state to functions:

```cpp
// BAD: Global state causes memory bloat and thread issues
int globalCount = 0; // Memory leak risk in multithreaded contexts

// GOOD: Local state per function
void increment() {
    static int localCount = 0; // Only initialized once
    localCount++;
}
```

**Why This Matters**: Global variables live in the data segment and can’t be optimized by the compiler. Local variables live on the stack and get reclaimed immediately.

---

### Algorithm Efficiency

Algorithm efficiency is where theoretical time/space complexity meets real-world performance. Choosing the right algorithm can transform your code from slow to blazing fast.

#### Time Complexity Matters More Than You Think
An O(n²) algorithm can be 100x slower than O(n log n) for large `n`. Here’s a real-world comparison:

```cpp
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    std::vector<int> data(1000000);
    // Fill with random values
    for (int i = 0; i < 1000000; i++) {
        data[i] = i;
    }

    // O(n²) algorithm: Nested loops
    auto start = std::clock();
    for (int i = 0; i < data.size(); i++) {
        for (int j = i + 1; j < data.size(); j++) {
            // Do something expensive (e.g., comparison)
        }
    }
    auto end = std::clock();
    std::cout << "O(n²) time: " << (end - start) << " ms" << std::endl;

    // O(n log n) algorithm: Merge sort
    start = std::clock();
    std::vector<int> sortedData = data;
    std::sort(sortedData.begin(), sortedData.end()); // O(n log n)
    end = std::clock();
    std::cout << "O(n log n) time: " << (end - start) << " ms" << std::endl;
}
```

**Key Takeaway**: For large datasets, **O(n log n)** algorithms (like merge sort) outperform **O(n²)** (like bubble sort) by orders of magnitude.

#### Leverage Hash Tables for O(1) Lookups
Hash tables (e.g., `std::unordered_map`) provide average O(1) lookups versus O(log n) for trees. This is critical for frequent queries:

```cpp
#include <unordered_map>
#include <iostream>

int main() {
    // Hash table: O(1) average lookup
    std::unordered_map<int, std::string> nameMap;
    nameMap[1] = "Alice";
    nameMap[2] = "Bob";
    
    // Lookup: O(1) average
    auto it = nameMap.find(1);
    if (it != nameMap.end()) {
        std::cout << "Name for 1: " << it->second << std::endl; // "Alice"
    }
}
```

**When to Avoid Hash Tables**:
- Collisions: Use a good hash function (e.g., `std::hash<int>` for integers).
- Memory: Hash tables use extra space for buckets. For tiny datasets, `std::map` (tree-based) might be better.

#### Dynamic Programming for Overlapping Subproblems
Dynamic programming (DP) solves problems by caching intermediate results. This avoids redundant computations:

```cpp
#include <vector>
#include <iostream>

int fibonacci(int n) {
    if (n <= 1) return n;
    
    // DP: Cache results to avoid recalculating
    static std::vector<int> cache(100, -1);
    if (cache[n] != -1) return cache[n];
    
    cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return cache[n];
}

int main() {
    std::cout << "Fibonacci(40): " << fibonacci(40) << std::endl; // 102334155
}
```

**Why This Works**: Without caching, `fibonacci(40)` would compute 40 recursive calls (exponential time). With caching, it runs in O(n) time.

#### Avoid Deep Recursion
Recursion can cause stack overflow and is inefficient. Use iterative solutions where possible:

```cpp
// BAD: Deep recursion (stack overflow risk)
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

// GOOD: Iterative solution (O(n) time, no stack)
int factorial_iterative(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

**Rule of Thumb**: For problems with `n > 1000`, **always** use iterative solutions in C++.

---

## Summary

💡 Memory optimization in C++ starts with **avoiding unnecessary copies** (via move semantics), **using smart pointers** strategically, and **choosing data structures** that match your use case (e.g., `std::array` for fixed-size data). Algorithm efficiency hinges on **prioritizing time complexity** (e.g., O(n log n) over O(n²)), **leveraging hash tables** for O(1) lookups, and **caching results** to avoid redundant computations. By mastering these patterns, you’ll build applications that scale efficiently—without sacrificing correctness or maintainability. Remember: **small, consistent optimizations compound into massive performance gains**. 🚀