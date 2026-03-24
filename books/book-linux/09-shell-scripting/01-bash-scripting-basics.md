## Bash Scripting Basics

Welcome to the world of Bash scripting—where you turn simple commands into powerful automation engines. In this section, we'll build your foundation with three essential pillars: **variables**, **conditions**, and **loops**. By the end, you'll be able to create robust scripts that solve real-world problems with minimal effort. Let's dive in!

### Variables

Variables are the backbone of scripting—they store data for your scripts to manipulate. In Bash, variables start with a dollar sign (`$`) and can hold strings, numbers, or complex data types. Here’s how to work with them effectively:

**Key concepts to remember**:
- Variables are **case-sensitive** (e.g., `USER` ≠ `user`)
- Values are **not** enclosed in quotes unless you need special handling
- Environment variables (e.g., `PATH`) are accessible without `$` prefix in most contexts
- Use **quoting** to prevent word splitting and path expansion

#### Creating and Using Variables
```bash
# Create a string variable
name="Alice"

# Create an integer variable
age=30

# Create a variable with spaces (requires quotes)
full_name="John Doe"

# Access variable value
echo "Hello, $name! You are $age years old."
# Output: Hello, Alice! You are 30 years old.
```

#### Special Variables
Bash has built-in variables that provide system context:
- `$0`: Script name
- `$1` to `$9`: Positional arguments (e.g., `$1` = first command-line argument)
- `$?`: Exit status of last command (0 = success, non-zero = failure)

#### Environment Variables
These persist across shell sessions and affect system behavior:
```bash
# Set environment variable (visible to all processes)
export PATH=$PATH:/usr/local/bin

# Check current PATH
echo "Current PATH: $PATH"
```

#### Quoting and Escaping
Use quotes to handle special characters safely:
```bash
# Without quotes: space in variable causes splitting
user="John Doe"
echo "User: $user"  # Output: User: John Doe (correct)

# With quotes: handles spaces safely
user="John Doe"
echo "User: $user"  # Output: User: John Doe (correct)

# Escape special characters (e.g., $ in variable)
user="John $Dollar"
echo "User: $user"  # Output: User: John $Dollar
```

### Conditions

Conditions let your scripts make decisions based on runtime data. Bash uses `if` statements with logical tests—typically via the `test` command (`[ ]` syntax) or the `[[ ]]` construct for advanced cases.

#### Basic `if` Statements
```bash
# Test if a variable is set
if [ -n "$name" ]; then
  echo "Name is set: $name"
else
  echo "Name is empty!"
fi
```

#### Common Tests
| Test Type          | Example                          | Description                                  |
|---------------------|-----------------------------------|----------------------------------------------|
| String non-empty    | `[ -n "$var" ]`                  | Checks if string has length > 0              |
| Integer equality    | `[ $num1 -eq $num2 ]`            | Tests if two numbers are equal               |
| File existence      | `[ -f "file.txt" ]`              | Checks if file exists and is a regular file  |
| Directory existence | `[ -d "dir" ]`                   | Checks if path is a directory                |

#### Nested Conditions
```bash
# Check if file exists AND is readable
if [ -f "report.txt" ] && [ -r "report.txt" ]; then
  echo "Report is readable!"
else
  echo "File not readable or doesn't exist"
fi
```

#### `elif` and `else` Chains
```bash
# Example: Check user age for eligibility
if [ $age -lt 18 ]; then
  echo "You're too young to vote."
elif [ $age -ge 18 ] && [ $age -lt 25 ]; then
  echo "You're eligible for early voting!"
else
  echo "You're eligible to vote."
fi
```

### Loops

Loops automate repetitive tasks by iterating through data or commands. Bash supports three primary loop types: `for`, `while`, and `until`.

#### `for` Loops
Ideal for iterating over fixed sets of items (e.g., files, arrays, or ranges):
```bash
# Iterate over file names in current directory
for file in *.txt; do
  echo "Processing $file"
  cat "$file"  # Process each file
done

# Iterate over numbers 1 to 5
for i in {1..5}; do
  echo "Iteration $i"
done
```

#### `while` Loops
Use when you need to run a loop until a condition is met:
```bash
# Count down from 5 to 1
count=5
while [ $count -gt 0 ]; do
  echo "$count"
  count=$((count - 1))
done
```

#### `until` Loops
Similar to `while` but checks for *failure* (opposite of `while`):
```bash
# Read input until valid number is given
while true; do
  read -p "Enter a number: " num
  if [ $num -gt 0 ]; then
    echo "Valid input! $num"
    break
  else
    echo "Please enter a positive number."
  fi
done
```

#### Advanced Loop Control
- `break`: Exit loop immediately
- `continue`: Skip to next iteration
- `read`: Capture user input during loop

**Example with `read` and `break`**:
```bash
while true; do
  read -p "Enter a number: " num
  if [ $num -gt 0 ]; then
    echo "Valid input! $num"
    break
  else
    echo "Invalid input. Try again."
  fi
done
```

## Summary

You now have the core tools to craft powerful Bash scripts: **variables** for data storage, **conditions** for decision-making, and **loops** for automation. Start small—create a script that checks file existence and prints a message, then expand it with loops and conditions. Remember: **test everything**, **use quotes for safety**, and **break problems into small steps**. With practice, you’ll turn complex tasks into simple, reliable automation. ✅