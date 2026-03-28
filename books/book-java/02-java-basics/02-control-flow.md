## Control Flow: The Engine of Your Java Applications

Control flow is the backbone of any program — it dictates the order in which statements are executed. Without it, your code would be a static collection of instructions, unable to respond to changing conditions or user input. 🚀

In this section, we'll dive into the two most fundamental control flow structures in Java: **if/else statements** and **loops**. By the end, you'll be able to write conditional logic and repetitive operations with confidence.

### If/Else Statements

**If/else statements** allow your program to make decisions based on conditions. They are the building blocks of logical reasoning in code.

Here’s a simple example:

```java
int age = 20;
if (age >= 18) {
    System.out.println("You are an adult.");
} else {
    System.out.println("You are a minor.");
}
```

In this example, the program checks if the `age` variable is at least 18. If true, it prints "You are an adult."; otherwise, it prints "You are a minor.".

You can also chain multiple conditions using `else if`:

```java
int score = 85;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}
```

This example categorizes a student's score into letter grades.

Remember: **only one branch** will execute in an if/else chain. Once a condition is met, the rest are skipped.

### Loops

Loops are essential for repeating actions. Java offers three primary loop structures:

1. `for` loops
2. `while` loops
3. `do-while` loops

We’ll compare them in the table below and then dive into each.

| Loop Type | Syntax Example | When to Use | Key Notes |
|------------|----------------|--------------|------------|
| `for` | `for (int i = 0; i < 10; i++)` | When you know the number of iterations in advance | Ideal for counting from start to end |
| `while` | `while (condition)` | When iterations are unknown | Condition checked before each iteration |
| `do-while` | `do { ... } while (condition)` | When you need to run at least once | Condition checked after the body |

**For Loop**  
The `for` loop is perfect when you know **exactly how many times** you want to run the loop. It combines initialization, condition, and update in one line.

Example:
```java
for (int i = 0; i < 5; i++) {
    System.out.println("Iteration " + i);
}
```
This loop prints numbers from `0` to `4`.

**While Loop**  
The `while` loop runs as long as a condition is **true**. It’s ideal when the number of iterations isn’t fixed.

Example:
```java
int count = 0;
while (count < 3) {
    System.out.println("Count: " + count);
    count++;
}
```
This loop prints "Count: 0", "Count: 1", and "Count: 2".

**Do-While Loop**  
The `do-while` loop is similar to the `while` loop, but it **runs at least once** before checking the condition.

Example:
```java
int num = 5;
do {
    System.out.println("Number: " + num);
    num--;
} while (num > 0);
```
This loop prints numbers from `5` down to `1`.

**Break and Continue**  
In loops, you can use `break` and `continue` to control flow:

- `break`: Exits the loop immediately.
- `continue`: Skips the rest of the current iteration.

Example of `break`:
```java
for (int i = 0; i < 5; i++) {
    if (i == 3) {
        break; // exits the loop when i is 3
    }
    System.out.println("Current index: " + i);
}
```
This loop prints "Current index: 0", "Current index: 1", and "Current index: 2".

Example of `continue`:
```java
for (int i = 0; i < 5; i++) {
    if (i == 2) {
        continue; // skips index 2
    }
    System.out.println("Current index: " + i);
}
```
This loop prints "Current index: 0", "Current index: 1", and "Current index: 3", "Current index: 4".

### Summary

In this section, we explored the two most fundamental control flow structures in Java: **if/else statements** and **loops**. You now understand:

- How to use **if/else** to make decisions based on conditions.
- How to use **loops** (for, while, do-while) to repeat actions, along with **break** and **continue** to control flow.

Mastering these concepts is essential for building responsive and efficient Java applications. 🚀