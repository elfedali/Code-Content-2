## Arrays

📊

### Single-dimensional Arrays

A **single-dimensional array** is a contiguous block of memory that stores elements of the same type in a linear sequence. It’s the simplest form of array in C and serves as the foundation for more complex data structures. Each element is accessed using a single index starting from `0`.

**Declaration and Initialization**  
Single-dimensional arrays are declared with a specified size and can be initialized in multiple ways:

```c
int numbers[3] = {1, 2, 3}; // Explicit size
int numbers[] = {1, 2, 3};   // Implicit size (determined by initializers)
int numbers[3] = {1};        // Partial initialization (remaining elements = 0)
```

**Key Characteristics**  
- **Indexing**: Elements are accessed via `array[index]` (e.g., `numbers[0]` = `1`)
- **Bounds Safety**: Accessing beyond the defined size causes **buffer overflow** (a critical security risk)
- **Iteration**: Use loops to traverse elements efficiently

**Practical Example**  
This program demonstrates array iteration and bounds safety:

```c
#include <stdio.h>

int main() {
    int numbers[3] = {1, 2, 3};
    for (int i = 0; i < 3; i++) {
        printf("numbers[%d] = %d\n", i, numbers[i]);
    }
    // Safe access: numbers[2] (last index)
    printf("numbers[3] = %d\n", numbers[3]); // Buffer overflow! (uninitialized)
    return 0;
}
```

**Initialization Comparison Table**  
| Method                  | Example                     | Size | Notes                                  |
|-------------------------|------------------------------|------|----------------------------------------|
| Explicit size           | `int arr[5] = {1, 2}`       | 5    | Elements 2-4 = 0                      |
| Implicit size           | `int arr[] = {1, 2}`        | 2    | Size auto-determined by initializers  |
| Partial initialization  | `int arr[5] = {1}`          | 5    | Elements 1-4 = 0                      |

### Multi-dimensional Arrays

**Multi-dimensional arrays** extend single-dimensional arrays to represent data in multiple directions (e.g., 2D matrices, 3D cubes). C treats them as arrays of arrays, with the innermost dimension being the most basic unit.

#### Two-dimensional Arrays
A 2D array is a matrix with `rows × columns`. Elements are accessed using two indices: `[row][column]`.

**Declaration and Initialization**  
```c
int matrix[3][4] = {
    {1, 2, 3, 4},  // Row 0
    {5, 6, 7, 8},  // Row 1
    {9, 10, 11, 12} // Row 2
};
```

**Practical Example**  
This program iterates through a 3x4 matrix:

```c
#include <stdio.h>

int main() {
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            printf("matrix[%d][%d] = %d\n", i, j, matrix[i][j]);
        }
    }
    return 0;
}
```

#### Three-dimensional Arrays
A 3D array is an array of 2D arrays (e.g., `layers × rows × columns`). Elements are accessed via `[layer][row][column]`.

**Declaration and Initialization**  
```c
int cube[2][3][4] = {
    {
        {1, 2, 3, 4},  // Layer 0, Row 0
        {5, 6, 7, 8},  // Layer 0, Row 1
        {9, 10, 11, 12} // Layer 0, Row 2
    },
    {
        {13, 14, 15, 16}, // Layer 1, Row 0
        {17, 18, 19, 20}, // Layer 1, Row 1
        {21, 22, 23, 24}  // Layer 1, Row 2
    }
};
```

**Practical Example**  
Accessing a specific element in a 3D array:

```c
#include <stdio.h>

int main() {
    int cube[2][3][4] = {
        {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12}
        },
        {
            {13, 14, 15, 16},
            {17, 18, 19, 20},
            {21, 22, 23, 24}
        }
    };
    
    printf("cube[0][1][2] = %d\n", cube[0][1][2]); // Output: 11
    return 0;
}
```

**Critical Notes**  
1. **Memory Layout**: C stores multi-dimensional arrays in **row-major order** (all elements of the first dimension are contiguous).
2. **Bounds Safety**: Always verify indices to prevent buffer overflows (e.g., `matrix[3][0]` for a 3-row array).
3. **Use Cases**: Essential for graphics, scientific computing, and grid-based systems.

## Summary

Single-dimensional arrays provide the fundamental building block for linear data storage in C, while multi-dimensional arrays (2D and 3D) enable efficient representation of structured data like matrices and 3D grids. **Critical best practices include strict index validation to avoid buffer overflows**—the most common cause of security vulnerabilities and program crashes. Always prioritize bounds checking when working with arrays to ensure robust and safe applications. 

🌟