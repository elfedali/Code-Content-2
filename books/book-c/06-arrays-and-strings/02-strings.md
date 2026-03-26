## Strings

In C, **strings** are a fundamental data type that we use extensively in programming. Unlike higher-level languages, C doesn’t have a built-in `string` type. Instead, strings are represented as **character arrays** — sequences of characters terminated by a null character (`'\0'`). This design choice gives C flexibility and control, but requires careful handling. Let’s dive into the world of strings with practical, real-world usage.

### Character Arrays

Before we talk about strings, we must understand the building block: **character arrays**. In C, a character array is simply an array of `char` (typically 1 byte). When we use a character array to represent a string, we **must** remember to end it with a null terminator (`'\0'`). This null character is critical because it signals the end of the string to functions and the runtime.

Let’s create a simple example:

```c
#include <stdio.h>

int main() {
    // Declare a character array for a string
    char name[10] = "Alice";
    
    // Print the string
    printf("Hello, %s!\n", name);
    
    return 0;
}
```

**Why is the null terminator important?**  
Without it, the string would be ambiguous. For instance, if we had `char name[5] = "Alice";`, the compiler would actually store `A l i c e` (5 characters) but the null terminator is missing. The program would crash when trying to read beyond the array. The null terminator ensures that the string length is known (so we don’t overflow).

**Key points to remember:**
- A string is a character array with a null terminator.
- The null terminator (`'\0'`) is **not** part of the string content but marks the end.
- The size of the array must be at least the length of the string plus one (for the null terminator).

Let’s try a safer example that explicitly shows the null terminator:

```c
#include <stdio.h>

int main() {
    char greeting[10] = "Hello\0"; // Note: \0 is the null terminator
    
    printf("The string is: %s\n", greeting);
    // This prints "Hello" and stops at the null terminator
    
    return 0;
}
```

**Important note**: When we write `"Hello"`, the compiler automatically adds the null terminator. So `char greeting[6] = "Hello";` is safe (because "Hello" is 5 characters + 1 null = 6).

### String Functions

Once we have a string, we can leverage the standard library’s **string functions** to manipulate and work with them. These functions are declared in the `<string.h>` header and are essential for any C program dealing with text.

#### Common String Functions

Here’s a table of the most frequently used string functions:

| Function | Purpose | Example |
|----------|---------|---------|
| `strlen` | Returns the length of a string (in characters) | `strlen("Hello")` → `5` |
| `strcpy` | Copies a string from one location to another | `strcpy(dest, src)` |
| `strcat` | Appends one string to the end of another | `strcat(dest, src)` |
| `strcmp` | Compares two strings lexicographically | `strcmp(str1, str2)` → `0` if equal |
| `strtok` | Splits a string into tokens | `strtok(text, " ")` |

Let’s walk through each with practical examples.

**1. `strlen` – Getting string length**  
This function returns the number of characters in a string (excluding the null terminator).

```c
#include <stdio.h>
#include <string.h>

int main() {
    char text[] = "Hello, World!";
    int length = strlen(text);
    
    printf("Length of string: %d\n", length); // Output: 13
    return 0;
}
```

**2. `strcpy` – Copying strings**  
This function copies a string from one location to another.

```c
#include <stdio.h>
#include <string.h>

int main() {
    char source[20] = "Hello";
    char destination[20];
    
    strcpy(destination, source);
    
    printf("Copied string: %s\n", destination); // Output: Hello
    return 0;
}
```

**3. `strcat` – Concatenating strings**  
This function appends one string to the end of another.

```c
#include <stdio.h>
#include <string.h>

int main() {
    char first[20] = "Hello";
    char second[20] = " World";
    
    strcat(first, second);
    
    printf("Concatenated string: %s\n", first); // Output: Hello World
    return 0;
}
```

**4. `strcmp` – Comparing strings**  
This function compares two strings lexicographically.

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "apple";
    char str2[] = "banana";
    
    int result = strcmp(str1, str2);
    
    if (result < 0) {
        printf("str1 is less than str2\n");
    } else if (result > 0) {
        printf("str1 is greater than str2\n");
    } else {
        printf("str1 equals str2\n");
    }
    
    return 0;
}
```

**5. `strtok` – Splitting strings**  
This function splits a string into tokens using a delimiter.

```c
#include <stdio.h>
#include <string.h>

int main() {
    char text[] = "Hello, World! How are you?";
    char delimiter[] = " ,!";
    char *token;
    
    token = strtok(text, delimiter);
    printf("Token 1: %s\n", token);
    
    token = strtok(NULL, delimiter);
    printf("Token 2: %s\n", token);
    
    // Output: Token 1: Hello, Token 2: World
    return 0;
}
```

**Important notes on `strtok`**:  
- It modifies the original string by replacing delimiters with `\0`.  
- Use `strtok` in a loop to get all tokens.  
- Delimiters can be a string of characters (e.g., `" ,!"`).

### String Manipulation

Now that we know how to represent strings and use the basic functions, let’s move to **string manipulation**. This is where we combine character arrays and string functions to build more complex string operations.

#### Common String Manipulation Tasks

Here are some practical string manipulation tasks we can perform:

1. **Reversing a string**  
   We can reverse a string using a loop and swapping characters.

2. **Finding a substring**  
   Using `strstr` to find a substring.

3. **Converting to uppercase/lowercase**  
   Using `toupper` and `tolower` from `<ctype.h>`.

Let’s walk through each with examples.

**1. Reversing a string**

```c
#include <stdio.h>
#include <string.h>

void reverse_string(char *str) {
    int len = strlen(str);
    char temp;
    for (int i = 0; i < len / 2; i++) {
        temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

int main() {
    char str[50] = "Hello";
    reverse_string(str);
    printf("Reversed string: %s\n", str); // Output: "olleH"
    return 0;
}
```

**2. Finding a substring**

The `strstr` function returns a pointer to the first occurrence of the substring in the string.

```c
#include <stdio.h>
#include <string.h>

int main() {
    char text[] = "Hello, world!";
    char substr[] = "world";
    
    char *result = strstr(text, substr);
    
    if (result != NULL) {
        printf("Substring found: %s\n", substr);
    } else {
        printf("Substring not found.\n");
    }
    
    return 0;
}
```

**3. Case conversion**

We can convert a string to uppercase or lowercase using `toupper` and `tolower`.

```c
#include <stdio.h>
#include <ctype.h>

int main() {
    char str[] = "Hello";
    
    for (int i = 0; str[i] != '\0'; i++) {
        str[i] = toupper(str[i]);
    }
    
    printf("Uppercase: %s\n", str); // Output: "HELLO"
    
    // To convert back to lowercase
    for (int i = 0; str[i] != '\0'; i++) {
        str[i] = tolower(str[i]);
    }
    
    printf("Lowercase: %s\n", str); // Output: "hello"
    
    return 0;
}
```

#### Advanced String Manipulation: Custom Functions

Sometimes, the standard library functions aren’t enough. Let’s create a custom function to count the number of vowels in a string.

```c
#include <stdio.h>
#include <ctype.h>

int count_vowels(char *str) {
    int count = 0;
    while (*str != '\0') {
        char c = tolower(*str);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            count++;
        }
        str++;
    }
    return count;
}

int main() {
    char text[] = "Hello, World!";
    int vowels = count_vowels(text);
    printf("Number of vowels: %d\n", vowels); // Output: 3 (e, o, o)
    return 0;
}
```

### Summary

In this section, we’ve covered the essentials of strings in C:

- **Character Arrays**: The foundation of strings in C — arrays of `char` that must end with `'\0'`.
- **String Functions**: Key functions from `<string.h>` for string manipulation, including `strlen`, `strcpy`, `strcat`, `strcmp`, and `strtok`.
- **String Manipulation**: Practical techniques for reversing strings, finding substrings, and case conversion, along with examples of custom string operations.

Strings are a powerful tool in C, and with practice, you’ll become adept at handling text data safely and efficiently. Remember: always include the null terminator and validate string lengths to avoid common pitfalls like buffer overflows. 🐘