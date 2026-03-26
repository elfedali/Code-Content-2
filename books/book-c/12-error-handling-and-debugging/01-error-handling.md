## Error Handling

In the world of C programming, **error handling** isn't just about catching failures—it's your safety net when things go sideways. This section dives into three foundational tools that empower you to navigate errors gracefully: `errno`, `perror`, and `assert`. We'll explore each with concrete examples, clear explanations, and practical usage patterns—so you can build robust systems without getting lost in the weeds.

---

### errno: The System-Wide Error Identifier

`errno` is a global variable (of type `int`) that **holds the error code** returned by system calls or library functions. Think of it as your system's "error report card"—it tells you *what* went wrong without needing to re-read documentation. Crucially, `errno` is **not** thread-safe (it’s shared across the entire process), so always check it *after* a function call to avoid race conditions.

Here’s how it works in practice:

1. **How to use it**: After a function that might fail (like `open` or `fread`), check `errno` to see the specific error code.
2. **Why it matters**: Unlike return values (which can be `NULL` or negative), `errno` gives you a standardized numeric code that maps to human-readable strings via `perror`.

#### Practical Example: Checking File Open Errors
```c
#include <stdio.h>
#include <fcntl.h>
#include <errno.h>

int main() {
    int fd = open("nonexistent.txt", O_RDONLY);
    if (fd == -1) {
        printf("Failed to open file: ");
        // Print the error code using errno
        printf("Error %d: ", errno);
        // Convert errno to human-readable string (see perror below)
        perror("File open");
    } else {
        printf("File opened successfully!\n");
    }
    return 0;
}
```

**Key Takeaway**: `errno` is your silent partner in error diagnosis. It’s *always* set by system calls, but **never** reset automatically—so you must check it *after* a potential failure. For instance, `open` returns `-1` on failure, and `errno` holds the reason (e.g., `ENOENT` for "file not found").

> 💡 **Pro Tip**: Always pair `errno` checks with a conditional to avoid silent failures. Never assume `errno` is `0` after a function call—**it’s set by the system**.

---

### perror: The Error Message Translator

`perror` is a **convenience function** that takes an error message string and prints it to `stderr` along with the current `errno` value. It’s your go-to tool for quickly converting numeric error codes into human-readable text—**no manual translation needed**.

#### How It Works
- **Input**: A string (optional) that describes the error context.
- **Output**: `stderr` shows: `"[message]: error code"` (e.g., `File open: No such file or directory`).
- **Critical**: `perror` **always** uses the *current* `errno` value from the system.

#### Practical Example: Using perror with File Operations
```c
#include <stdio.h>
#include <errno.h>

int main() {
    FILE *fp = fopen("secret.txt", "r");
    if (fp == NULL) {
        // Print error with context
        perror("Failed to open secret.txt");
        return 1;
    }
    // ... rest of file processing ...
    fclose(fp);
    return 0;
}
```

**Why This Works**: When `fopen` fails, `fp` becomes `NULL`. We then call `perror` with a descriptive message ("Failed to open secret.txt"). The output becomes:
```
Failed to open secret.txt: No such file or directory
```

> ✅ **When to use it**: Always when you need a *quick*, readable error message without writing your own error translation logic. It’s especially useful in debugging and logging.

---

### assert: Your Debugging Shield

`assert` is a **debugging tool** that checks for conditions at runtime. If the condition fails (e.g., `x > 0`), it prints an error message and terminates the program. It’s *not* for production error handling—it’s a **safeguard for developers**.

#### How It Works
- **Condition**: A boolean expression (e.g., `x > 0`).
- **Behavior**: If false, prints `assertion failed: [condition]` + stack trace (if enabled) and exits.
- **Critical**: `assert` is **disabled in production** (via `-DNDEBUG` flag). Only use it in development!

#### Practical Example: Guarding Against Negative Values
```c
#include <assert.h>

int main() {
    int value = -5;
    // Check for valid input (debugging check)
    assert(value >= 0);
    // ... rest of program ...
    return 0;
}
```

**What Happens**: When run with debug symbols (e.g., `gcc -g`), this prints:
```
assertion failed: value >= 0
```
and exits immediately. In production, this check is *ignored* (no output).

> 🔍 **Why it matters**: `assert` helps catch **logical errors early** during development. It’s not for handling runtime exceptions—it’s for *ensuring your logic is sound* before you ship code.

---

### When to Use Which Tool

| Tool       | Purpose                                  | When to Use                                                                 | Production? |
|------------|-------------------------------------------|-----------------------------------------------------------------------------|--------------|
| `errno`    | Get numeric error code                   | After system calls (e.g., `open`, `read`) to diagnose failures               | ✅ Yes       |
| `perror`   | Convert `errno` to human-readable text   | Printing error context quickly (debugging, logs)                            | ✅ Yes       |
| `assert`   | Check logical conditions at runtime       | Development-only: validating assumptions in code                            | ❌ No        |

**Key Insight**: `errno` and `perror` work *together* for **runtime error diagnosis**. `assert` is a **developer-only safety net**—use it to catch bugs early, not to handle user errors.

---

## Summary

- **`errno`** is the system’s numeric error code—always check it *after* potential failures to understand *why* something went wrong.
- **`perror`** translates `errno` into human-readable messages, making debugging faster and more intuitive.
- **`assert`** is a development tool that validates assumptions and terminates early if logic fails—**never** for production error handling.

Master these three tools, and you’ll turn error handling from a headache into a confidence booster. Remember: **errors are your friends** when you know how to listen to them. 🛡️