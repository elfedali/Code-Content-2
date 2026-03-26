## Mini Projects

In this section, we dive into **real-world projects** that help you apply your C programming skills. These mini projects are designed to be **runnable, self-contained**, and focused on **core concepts**. They're perfect for reinforcing your understanding and building confidence. 🧮

### Calculator

Building a calculator is a classic exercise that teaches you about input handling, arithmetic operations, and basic program flow. Let's create a simple command-line calculator that supports addition, subtraction, multiplication, and division.

Here's a minimal implementation that prompts the user for two numbers and an operator:

```c
#include <stdio.h>

int main() {
    double num1, num2;
    char op;

    printf("Enter first number: ");
    scanf("%lf", &num1);

    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &op);

    printf("Enter second number: ");
    scanf("%lf", &num2);

    switch (op) {
        case '+':
            printf("%.2f + %.2f = %.2f\n", num1, num2, num1 + num2);
            break;
        case '-':
            printf("%.2f - %.2f = %.2f\n", num1, num2, num1 - num2);
            break;
        case '*':
            printf("%.2f * %.2f = %.2f\n", num1, num2, num1 * num2);
            break;
        case '/':
            if (num2 == 0) {
                printf("Error: Division by zero.\n");
            } else {
                printf("%.2f / %.2f = %.2f\n", num1, num2, num1 / num2);
            }
            break;
        default:
            printf("Error: Invalid operator.\n");
    }

    return 0;
}
```

**Key concepts covered**:
- Input handling with `scanf`
- Type conversion and floating-point arithmetic
- `switch` statement for operator selection
- Basic error handling (division by zero)

This calculator is **runnable** and **immediately useful** for practicing input and control flow. Try it out with your own numbers!

### Data Structures Implementation

Now, let's move to a more advanced topic: **implementing a stack using a linked list**. Stacks are fundamental data structures that follow the LIFO (Last-In-First-Out) principle. By building a stack from scratch, you'll gain deep insight into memory management and linked lists.

Here's the implementation:

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

typedef struct {
    Node *top;
} Stack;

void initialize(Stack *s) {
    s->top = NULL;
}

void push(Stack *s, int value) {
    Node *new_node = (Node *)malloc(sizeof(Node));
    new_node->data = value;
    new_node->next = s->top;
    s->top = new_node;
}

int pop(Stack *s) {
    if (s->top == NULL) {
        printf("Stack is empty\n");
        return -1;
    }
    int value = s->top->data;
    Node *temp = s->top;
    s->top = s->top->next;
    free(temp);
    return value;
}

int top(Stack *s) {
    if (s->top == NULL) {
        printf("Stack is empty\n");
        return -1;
    }
    return s->top->data;
}

int isEmpty(Stack *s) {
    return (s->top == NULL);
}

int main() {
    Stack stack;
    initialize(&stack);

    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);

    printf("Top element: %d\n", top(&stack));
    printf("Popped element: %d\n", pop(&stack));
    printf("Popped element: %d\n", pop(&stack));
    printf("Popped element: %d\n", pop(&stack));

    return 0;
}
```

**Why this matters**:
- **Memory management**: We're using dynamic memory allocation (`malloc`) to create nodes.
- **Linked list operations**: Understanding how to add and remove nodes.
- **Error handling**: Checking for empty stacks to avoid crashes.

This stack implementation is **robust** and **scalable**. You can extend it to handle more operations or integrate with other data structures.

## Summary

In this section, we've built two foundational projects that will help you solidify your C programming skills. **Start small, build confidence, and then scale up**. These mini projects are your stepping stones to more complex applications. 🚀