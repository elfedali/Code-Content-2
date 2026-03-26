## Input and Output

Welcome to the world of C++ input and output! In this section, we’ll demystify how to interact with users and the outside world through the standard input/output streams. You’ll learn to build programs that read data from users and display meaningful results—essential skills for any C++ developer. Let’s dive in.

### cin and cout

`cin` and `cout` are the workhorses of C++ input and output. They’re part of the **standard input/output stream library** (`<iostream>`) and provide a simple, powerful way to communicate with users and the system. Think of `cout` as your "output channel" (writing to the console) and `cin` as your "input channel" (reading from the console).

Here’s how they work in practice:

1. **Basic Output with `cout`**  
   To display text, use `cout` with the `<<` insertion operator. This sends data to the console. For example:

   ```cpp
   #include <iostream>
   using namespace std;
   
   int main() {
       cout << "Hello, C++!";
       return 0;
   }
   ```
   *This program prints `Hello, C++!` to the console.*

2. **Basic Input with `cin`**  
   To read user input, use `cin` with the `>>` extraction operator. This reads data from the console and stores it in variables. For example:

   ```cpp
   #include <iostream>
   using namespace std;
   
   int main() {
       int age;
       cout << "Enter your age: ";
       cin >> age;
       cout << "You are " << age << " years old." << endl;
       return 0;
   }
   ```
   *This program prompts the user for their age and displays it.*

3. **Reading Multiple Values**  
   `cin` can read multiple values in a single statement. For example, to read two integers:

   ```cpp
   #include <iostream>
   using namespace std;
   
   int main() {
       int a, b;
       cout << "Enter two numbers: ";
       cin >> a >> b;
       cout << "Sum: " << a + b << endl;
       return 0;
   }
   ```

4. **Reading Strings**  
   For strings, use `string` (from `<string>`) with `cin`:

   ```cpp
   #include <iostream>
   #include <string>
   using namespace std;
   
   int main() {
       string name;
       cout << "Enter your name: ";
       cin >> name;
       cout << "Hello, " << name << "!" << endl;
       return 0;
   }
   ```

**Key Notes**:
- `cin` stops reading at whitespace (spaces, tabs, newlines). This means it reads *one* token per `>>` operator.
- Always include `<iostream>` for `cout` and `cin`.
- Use `endl` to flush output (adds a newline and clears the buffer).

### Formatting Output

Formatting output lets you control how data appears—precision, alignment, padding, and more. This is crucial for creating clean, readable console outputs. We’ll cover three key techniques:

1. **Precision Control with `setprecision`**  
   Use `setprecision` from `<iomanip>` to specify decimal places for floating-point numbers. For example:

   ```cpp
   #include <iostream>
   #include <iomanip>
   using namespace std;
   
   int main() {
       double pi = 3.1415926535;
       cout << fixed << setprecision(4) << pi; // Output: 3.1416
       return 0;
   }
   ```
   *Here, `fixed` ensures decimal notation, and `setprecision(4)` shows 4 decimal places.*

2. **Field Width with `setw`**  
   The `setw` function pads output with spaces to a specified width. This aligns text neatly:

   ```cpp
   #include <iostream>
   #include <iomanip>
   using namespace std;
   
   int main() {
       cout << setw(10) << "Name" << setw(10) << "Age" << endl;
       cout << setw(10) << "Alice" << setw(10) << 25 << endl;
       return 0;
   }
   ```
   *Output:*
   ```
   Name       Age
   Alice      25
   ```

3. **Custom Padding with `setfill`**  
   Combine `setw` and `setfill` to control padding characters (e.g., spaces, `*`):

   ```cpp
   #include <iostream>
   #include <iomanip>
   using namespace std;
   
   int main() {
       cout << setfill('*') << setw(10) << "Hello";
       cout << endl;
       return 0;
   }
   ```
   *Output: `Hello******`*

**Formatting Comparison Table**

| Feature                | Function             | Example                          | Use Case                                  |
|------------------------|----------------------|-----------------------------------|--------------------------------------------|
| Decimal Precision      | `setprecision`       | `setprecision(2)`                | Showing 2 decimal places for money        |
| Field Width            | `setw(n)`            | `setw(5)`                        | Aligning text in columns                 |
| Padding Character      | `setfill(char)`      | `setfill(' ')`                   | Adding spaces for alignment              |
| Scientific Notation    | `scientific`         | `cout << scientific;`            | Displaying very large/small numbers      |

**Pro Tips for Formatting**:
- Always include `<iomanip>` for formatting functions.
- Use `fixed` with `setprecision` for decimal numbers (avoids scientific notation).
- Combine `setw` and `setfill` for clean tables or reports.

### Putting It All Together

Here’s a real-world example combining input, output, and formatting:

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double radius;
    cout << "Enter a circle's radius: ";
    cin >> radius;
    
    const double PI = 3.14159;
    double area = PI * radius * radius;
    
    cout << fixed << setprecision(2);
    cout << "Radius: " << setw(10) << radius;
    cout << "Area: " << setw(10) << area << endl;
    
    return 0;
}
```
*This program asks for a radius, calculates the area, and displays both values with 2 decimal places and aligned columns.*

---

## Summary

In this section, you’ve mastered the fundamentals of C++ input and output. You now understand how to use `cin` and `cout` for basic user interaction and formatting techniques like precision control, field width, and padding. These skills let you build programs that communicate clearly with users and produce well-structured console outputs. Remember: **always include `<iostream>` for basic I/O**, and **use `<iomanip>` for advanced formatting**. With practice, you’ll create polished outputs that enhance user experience and program readability. 🚀