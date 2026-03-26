## Algorithms

The Standard Template Library (STL) provides a powerful set of algorithms that operate on containers without requiring you to write custom iteration logic. These algorithms are **fundamental building blocks** for efficient, readable, and maintainable C++ code. In this section, we dive into three essential algorithms: `sort`, `find`, and `count`. Each algorithm solves a common problem with minimal boilerplate, leveraging the STL's abstraction power.

### Sort

The `sort` algorithm provides **in-place** sorting of elements within a range. It uses a highly optimized comparison-based strategy (typically introsort) for maximum efficiency in practice. This algorithm is critical for transforming unsorted data into ordered sequences—whether for searching, processing, or visualization.

#### Key Features
- **In-place operation**: Modifies the container directly (no extra memory allocation)
- **Stable by default**: Preserves relative order of equal elements (when using `std::stable_sort` for stability)
- **Custom comparators**: Accepts a comparison function to define ordering rules
- **Time complexity**: O(n log n) for average cases (optimal for most real-world data)

#### Practical Implementation
Here's a concrete example sorting a vector of integers:

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numbers = {5, 2, 9, 1, 5};
    std::sort(numbers.begin(), numbers.end());
    
    std::cout << "Sorted: ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

**Output**:
```
Sorted: 1 2 5 5 9 
```

#### Advanced Usage
For custom ordering (e.g., sorting strings by length), use a comparator function:

```cpp
#include <algorithm>
#include <vector>
#include <string>
#include <iostream>

bool by_length(const std::string& a, const std::string& b) {
    return a.length() < b.length();
}

int main() {
    std::vector<std::string> words = {"apple", "banana", "cherry", "date"};
    std::sort(words.begin(), words.end(), by_length);
    
    std::cout << "Sorted by length: ";
    for (const auto& word : words) {
        std::cout << word << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

**Output**:
```
Sorted by length: date apple cherry banana 
```

#### Critical Notes
- **Avoid sorting large datasets** when stability is unnecessary—use `std::partial_sort` for partial ordering.
- **Never sort custom objects** without defining `operator<` or a comparator (this is a common pitfall).
- **Use `std::is_sorted`** to verify sorting before further processing.

### Find

The `find` algorithm locates the **first occurrence** of a value within a range. It returns an iterator to the element if found, or the end iterator (`range.end()`) if not found. This is ideal for quick existence checks without manual iteration.

#### Key Features
- **Linear time complexity**: O(n) in worst case (optimal for existence checks)
- **Works with any iterable range** (vectors, lists, arrays, etc.)
- **No side effects**: Does not modify the container

#### Practical Implementation
Here's a concrete example searching for a value in a vector:

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numbers = {1, 3, 5, 7, 9};
    int target = 5;
    
    auto it = std::find(numbers.begin(), numbers.end(), target);
    
    if (it != numbers.end()) {
        std::cout << "Found " << *it << " at position " << (it - numbers.begin()) << std::endl;
    } else {
        std::cout << "Not found" << std::endl;
    }
    
    return 0;
}
```

**Output**:
```
Found 5 at position 2
```

#### Advanced Usage
For custom object matching, use a predicate function:

```cpp
#include <algorithm>
#include <vector>
#include <string>
#include <iostream>

bool is_even(int n) {
    return n % 2 == 0;
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    auto it = std::find_if(numbers.begin(), numbers.end(), is_even);
    
    if (it != numbers.end()) {
        std::cout << "First even number: " << *it << std::endl;
    } else {
        std::cout << "No even numbers" << std::endl;
    }
    
    return 0;
}
```

**Output**:
```
First even number: 2
```

#### Critical Notes
- **Use `find_if`** for complex matching conditions (e.g., string patterns, custom logic)
- **Avoid `find` on huge datasets** when you need to stop early—use `find_if` with early termination.
- **Remember**: `find` returns an iterator, so you must check against `end()` to avoid undefined behavior.

### Count

The `count` algorithm counts how many times a specific value appears within a range. It returns an integer count, making it perfect for frequency analysis or statistical operations.

#### Key Features
- **Linear time complexity**: O(n) (efficient for single-value counts)
- **Works with any container** (vectors, arrays, etc.)
- **No side effects**: Does not modify the container

#### Practical Implementation
Here's a concrete example counting occurrences in a vector:

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numbers = {1, 2, 2, 3, 2, 4};
    int target = 2;
    
    size_t count = std::count(numbers.begin(), numbers.end(), target);
    
    std::cout << "Count of " << target << ": " << count << std::endl;
    
    return 0;
}
```

**Output**:
```
Count of 2: 3
```

#### Advanced Usage
For counting with custom predicates:

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    size_t even_count = std::count_if(numbers.begin(), numbers.end(), [](int n) { return n % 2 == 0; });
    
    std::cout << "Even count: " << even_count << std::endl;
    
    return 0;
}
```

**Output**:
```
Even count: 2
```

#### Critical Notes
- **Use `count_if`** for counting based on complex conditions (e.g., ranges, patterns)
- **Avoid counting large datasets** when you need to stop early—combine with `find_if` for early termination.
- **Remember**: `count` counts all occurrences, so use with care for performance-critical applications.

### Comparison Summary

| Algorithm | Purpose                          | Time Complexity | Key Use Case                     | Return Type       |
|-----------|-----------------------------------|------------------|----------------------------------|--------------------|
| `sort`    | Sort elements in range            | O(n log n)       | Ordered data processing          | `iterator`         |
| `find`    | Locate first occurrence           | O(n)             | Existence checks                 | `iterator`         |
| `count`   | Count occurrences of value       | O(n)             | Frequency analysis               | `size_t`           |

This table highlights how these algorithms solve distinct problems with minimal overhead—each designed for maximum clarity and efficiency.

## Summary

In this section, we've explored three foundational STL algorithms that empower you to manipulate data with precision and elegance:  
- `sort` transforms unsorted data into ordered sequences with minimal code  
- `find` efficiently checks for existence in linear time  
- `count` provides quick frequency analysis without side effects  

These algorithms exemplify the STL's philosophy: **solve complex problems through abstraction**, not boilerplate. By mastering them, you gain immediate control over data processing while adhering to C++'s core principles of efficiency and readability. 🌟