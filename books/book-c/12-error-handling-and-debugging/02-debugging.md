## Debugging

Debugging is an essential skill for any C programmer, involving the process of identifying and resolving issues in code that cause unexpected behavior or crashes. This section covers two key approaches: **using `gdb`** for interactive debugging and **practical techniques** to systematically isolate problems.

### Using `gdb`

`gdb` (GNU Debugger) is a powerful command-line tool for inspecting and controlling program execution. Here's how to use it:

1. **Compile with debugging symbols**:
   ```bash
   gcc -g my_program.c -o my_program
   ```

2. **Start `gdb`**:
   ```bash
   gdb my_program
   ```

3. **Common commands**:
   - **Run**: `run` (or `r`) to execute the program
   - **Breakpoints**: `break [function]` to pause at a specific function
   - **Step through code**: `step` (execute next line) or `next` (skip function calls)
   - **Inspect variables**: `print [variable]` to view variable values
   - **View call stack**: `backtrace` to see the execution flow

**Example workflow**:
1. Compile factorial program with debug symbols
2. Start `gdb` and set breakpoint at `factorial()`
3. Run program → pause at breakpoint
4. Step through code to observe variable changes
5. Use `print n` to check values during execution

**Pro Tip**: Use `info locals` to see all local variables in the current function—critical for complex debugging scenarios.

| Command | Purpose |
|---------|---------|
| `run` | Execute program |
| `break [function]` | Set breakpoint |
| `step` | Step into next line |
| `next` | Step to next line (skip function calls) |
| `print [variable]` | View variable value |
| `backtrace` | Show call stack |

### Practical Debugging Techniques

1. **Reproduce the bug**  
   *Always* create a minimal test case that consistently reproduces the issue. Example: If a program crashes with large input files, test with progressively smaller files.

2. **Use print statements**  
   Add targeted `printf` statements to track variable values and execution flow.  
   *Example factorial output*:
   ```
   Entering factorial(5)
   Entering factorial(4)
   Entering factorial(3)
   Entering factorial(2)
   Entering factorial(1)
   Returning 1
   Returning 2
   Returning 6
   Returning 24
   Returning 120
   ```

3. **Check memory leaks**  
   Use `valgrind` to detect memory issues:
   ```bash
   valgrind --leak-check=full --show-leak-kinds=definite your_program
   ```

4. **Use conditional breakpoints**  
   Pause execution only when specific conditions are met:
   ```gdb
   break if n < 0
   ```

5. **Isolate problems**  
   Test functions in isolation. Example: Create a dedicated `test_factorial()` function to verify logic without dependencies.

## Summary

This section covered **using `gdb`** for interactive debugging and **practical techniques** to efficiently identify and resolve issues in C code. Remember: debugging is a skill that improves with practice.

💡 Always start with a minimal reproducible test case. This saves hours of debugging time and helps isolate root causes faster.