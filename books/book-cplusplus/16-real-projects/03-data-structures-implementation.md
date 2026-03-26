## Real Projects: Data Structures Implementation

In the world of software development, data structures are the backbone of efficient and scalable applications. While many tutorials focus on abstract theory, real projects demand practical implementations. This section demonstrates how to build three essential data structures — **linked lists**, **stacks**, and **queues** — with concrete examples that you can integrate into your next project.

### Linked List

In real-world applications, linked lists are often used for dynamic collections where the size is unknown or changes frequently. For instance, a **task management system** might use a linked list to handle to-do items that can be added or removed at any time.

Here’s a minimal implementation of a linked list that supports adding tasks and printing the list:

```cpp
#include <iostream>
#include <string>

class TaskList {
private:
    struct Node {
        std::string task;
        Node* next;
    };
    Node* head;

public:
    TaskList() : head(nullptr) {}

    void addTask(const std::string& task) {
        Node* newNode = new Node{task, nullptr};
        if (head == nullptr) {
            head = newNode;
        } else {
            Node* current = head;
            while (current->next != nullptr) {
                current = current->next;
            }
            current->next = newNode;
        }
    }

    void printTasks() const {
        Node* current = head;
        while (current != nullptr) {
            std::cout << "Task: " << current->task << std::endl;
            current = current->next;
        }
    }
};

int main() {
    TaskList todoList;
    todoList.addTask("Write report");
    todoList.addTask("Fix bugs");
    todoList.printTasks();
    return 0;
}
```

This implementation efficiently handles dynamic task lists. The linked list structure allows for O(1) addition at the end and O(n) traversal, making it ideal for applications where items are frequently added but rarely removed.

### Stack

Stacks are critical for operations requiring **LIFO (Last-In-First-Out)** behavior. A common real-world application is **undo functionality** in text editors, where each action (e.g., typing) is pushed onto the stack, and the previous state can be popped when undoing.

Here’s a stack implementation using a linked list that supports undo operations:

```cpp
#include <iostream>
#include <string>

class UndoStack {
private:
    struct Node {
        std::string state;
        Node* next;
    };
    Node* top;

public:
    UndoStack() : top(nullptr) {}

    void pushState(const std::string& state) {
        Node* newNode = new Node{state, top};
        top = newNode;
    }

    std::string popState() {
        if (top == nullptr) {
            throw std::runtime_error("Stack is empty");
        }
        Node* temp = top;
        top = top->next;
        return temp->state;
    }
};

int main() {
    UndoStack undoStack;
    undoStack.pushState("Initial state");
    undoStack.pushState("After typing");
    std::cout << "Undoing: " << undoStack.popState() << std::endl;
    return 0;
}
```

This implementation efficiently manages undo operations. The linked list ensures O(1) push/pop operations, critical for real-time applications like text editors where undo operations must be fast and reliable.

### Queue

Queues are fundamental for **processing tasks in FIFO (First-In-First-Out)** order. A practical example is a **print spooler**, where print jobs are added to the queue and processed one by one.

Here’s a queue implementation using a linked list:

```cpp
#include <iostream>
#include <string>

class PrintQueue {
private:
    struct Node {
        std::string job;
        Node* next;
    };
    Node* front;
    Node* back;

public:
    PrintQueue() : front(nullptr), back(nullptr) {}

    void addJob(const std::string& job) {
        Node* newNode = new Node{job, nullptr};
        if (front == nullptr) {
            front = newNode;
            back = newNode;
        } else {
            back->next = newNode;
            back = newNode;
        }
    }

    std::string nextJob() {
        if (front == nullptr) {
            throw std::runtime_error("Queue is empty");
        }
        Node* temp = front;
        front = front->next;
        if (front == nullptr) {
            back = nullptr;
        }
        return temp->job;
    }
};

int main() {
    PrintQueue printQueue;
    printQueue.addJob("Report.pdf");
    printQueue.addJob("Invoice.pdf");
    std::cout << "Printing: " << printQueue.nextJob() << std::endl;
    return 0;
}
```

This implementation handles print job processing with O(1) add and O(1) removal operations. The queue structure ensures that the oldest job is processed first, critical for systems where task order must be preserved.

### Summary

In this section, we've built three foundational data structures with real-world applications:
- **Linked lists** for dynamic task management
- **Stacks** for undo functionality
- **Queues** for print job processing

Each implementation is designed to be immediately usable in production code. Remember to handle edge cases (like empty queues) and memory management in real-world applications. These patterns form the backbone of efficient and scalable software systems.

🌟 **Key Takeaway**: Start with these core data structures and gradually add optimizations (e.g., circular buffers for queues, memory pooling for stacks) as your application grows. Always prioritize correctness and performance over complexity.