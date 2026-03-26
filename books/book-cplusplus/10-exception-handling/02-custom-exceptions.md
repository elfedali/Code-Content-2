## Custom Exceptions

Custom exceptions are a powerful tool in C++ for creating meaningful, expressive error messages that help developers understand *why* an error occurred rather than just the generic exception type. Instead of relying on the standard exceptions (like `std::exception`), custom exceptions let you build domain-specific error contexts that improve debugging, maintainability, and user experience. This section dives deep into how to design, implement, and use custom exceptions effectively.

### Why Custom Exceptions Matter

Before we dive into implementation, let's address the *why*. Standard exceptions (like `std::runtime_error`) are useful but often lack context. Imagine a file operation failing: `std::runtime_error("File not found")` tells you *what* happened but not *why* the file wasn't found (e.g., permission denied, path invalid). Custom exceptions solve this by adding **specific error codes**, **contextual messages**, and **domain logic** to errors. They also enable:

- Precise error handling in your application logic
- Clearer error messages for end-users
- Better debugging with stack traces that include meaningful context
- Avoiding the "catch-all" trap of generic exceptions

> 💡 **Pro Tip**: Custom exceptions aren't about *over-engineering*—they're about *communicating intent*. A well-designed custom exception makes your code more self-documenting.

### Creating a Custom Exception Class

Here's the step-by-step process to build a custom exception:

1. **Inherit from `std::exception`** (or `std::runtime_error` for more specific use cases)
2. **Define a constructor** that takes a descriptive error message
3. **Override `what()`** to return the error message (required by `std::exception`)
4. **Add optional error codes** (e.g., `int code`) for programmatic error handling

```cpp
#include <stdexcept>
#include <string>

class FileIOException : public std::runtime_error {
public:
    explicit FileIOException(const std::string& message) 
        : std::runtime_error(message) {}
};
```

**Why this works**:  
- `std::runtime_error` is a more specific base class than `std::exception` (useful for error contexts where you want to distinguish from other exceptions)
- The constructor takes a `std::string` to build context-rich messages
- `what()` is automatically handled via inheritance (no need to override it)

### Throwing Custom Exceptions

Now that we have our class, let's see how to throw it:

```cpp
#include <fstream>
#include <stdexcept>

void openFile(const std::string& path) {
    std::ifstream file(path);
    if (!file.is_open()) {
        throw FileIOException("Failed to open file: " + path);
    }
}
```

**Key observations**:
- We use `std::ifstream` to check if a file opens
- When failure occurs, we **throw** `FileIOException` with a message containing the file path
- The exception message is *specific* and includes actionable context (the path)

> ⚠️ **Critical**: Always throw *after* validating conditions. Throwing before checks leads to "why did this happen?" confusion.

### Catching Custom Exceptions

Catching custom exceptions requires matching the exception type explicitly:

```cpp
try {
    openFile("non_existent.txt");
} catch (const FileIOException& e) {
    std::cerr << "File error: " << e.what() << '\n';
} catch (const std::exception& e) {
    std::cerr << "Unexpected error: " << e.what() << '\n';
}
```

**Why explicit catching matters**:
- Without this, you'd only catch `std::exception` (too broad)
- Explicit catches let you handle *only* file errors without suppressing other exceptions
- The `e.what()` method gives the raw message (the `std::string` we built)

### Rethrowing and Exception Hierarchy

Custom exceptions can be part of a larger exception hierarchy. Here's how to rethrow with context:

```cpp
void processFile(const std::string& path) {
    try {
        openFile(path);
        // ... process file ...
    } catch (const FileIOException& e) {
        // Log error with extra context
        std::cerr << "File processing failed: " << e.what() << '\n';
        throw; // Rethrow to propagate the error up
    }
}
```

**Hierarchical patterns**:
1. **Base exception**: `std::exception` (universal)
2. **Domain-specific**: `FileIOException` (for file errors)
3. **Subtype**: `PermissionDeniedException` (for file errors with permission issues)

```cpp
class PermissionDeniedException : public FileIOException {
public:
    explicit PermissionDeniedException(const std::string& path)
        : FileIOException("Permission denied for: " + path) {}
};
```

This creates a clear error chain:
`PermissionDeniedException` → `FileIOException` → `std::runtime_error` → `std::exception`

### Best Practices for Custom Exceptions

Follow these guidelines to avoid common pitfalls:

1. **Keep messages actionable**:  
   ❌ `"File not found"`  
   ✅ `"Failed to open file: /path/to/file (Permission denied)"`

2. **Use consistent error codes**:  
   Add `int code` to exceptions for programmatic handling (e.g., `FileIOException::PERMISSION_DENIED = 403`)

3. **Avoid exception chaining without context**:  
   Don't do `throw e;` without adding context. Instead:
   ```cpp
   throw FileIOException("File read failed: " + path + " (error code: " + std::to_string(code) + ")");
   ```

4. **Use `std::exception` for inheritance**:  
   Never inherit from `std::exception` directly without `std::runtime_error` (prevents accidental misuse).

5. **Document everything**:  
   Include a comment like: `// Throws FileIOException if file cannot be opened`

6. **Minimize overhead**:  
   Don't store large data in exceptions (e.g., avoid `std::vector` in exception objects).

### Summary

Custom exceptions are your bridge between raw error states and human-readable context. By creating domain-specific exceptions with clear messages and structured hierarchies, you transform vague errors into actionable insights. Remember: **quality exceptions communicate intent**—they tell *why* something failed, not just *that* it failed. Start small (one custom exception per major error type), prioritize actionable messages, and always chain exceptions with context. When done right, custom exceptions make your code more resilient and easier to debug—turning error handling from a chore into a strength.

> ✨ With custom exceptions, you don't just handle errors—you *understand* them.