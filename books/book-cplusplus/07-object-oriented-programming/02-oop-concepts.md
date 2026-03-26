## OOP Concepts

Object-oriented programming (OOP) forms the bedrock of modern C++ development. By modeling real-world systems as interacting objects, OOP enables clean, maintainable, and scalable code. This section dives deep into the four pillars of OOP—**encapsulation**, **inheritance**, **polymorphism**, and **abstraction**—with practical examples you can run immediately. Let’s build your understanding step by step.

---

### Encapsulation

Encapsulation is the practice of bundling data (attributes) and methods that operate on that data into a single unit (a class), while controlling access to the internal state through **public interfaces**. This shields implementation details from external interference and enforces data integrity.

Think of it as a secure vault: you can interact with the vault via its lock (public methods), but the contents (private data) remain hidden. In C++, we achieve this using `private` and `protected` access specifiers.

**Why it matters**: Prevents unintended side effects, enables safer code reuse, and simplifies maintenance.

Here’s a concrete example of a `BankAccount` class demonstrating encapsulation:

```cpp
#include <iostream>

class BankAccount {
private:
    double balance; // Private: accessible only within the class

public:
    // Public interface for interaction
    BankAccount(double initial_balance) : balance(initial_balance) {}
    
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
    
    double get_balance() const { // Const method to avoid modifying state
        return balance;
    }
};
```

**Key observations**:
- `balance` is `private` → Only accessible via `get_balance()`
- `deposit()` and `withdraw()` enforce valid transactions
- `get_balance()` is `const` to prevent accidental modification

This pattern ensures your account balance is always valid and protected from external tampering.

---

### Inheritance

Inheritance allows a class (the **derived class**) to inherit properties and behaviors from another class (the **base class**). It promotes code reuse and establishes hierarchical relationships between classes.

**Why it matters**: Avoids code duplication, enables polymorphism, and models "is-a" relationships (e.g., `Car` *is a* `Vehicle`).

Here’s a practical example of a vehicle hierarchy:

```cpp
#include <iostream>

// Base class
class Vehicle {
public:
    virtual void start_engine() { // Virtual function for polymorphism
        std::cout << "Engine started.\n";
    }
    
    void drive() {
        std::cout << "Vehicle moving.\n";
    }
};

// Derived class
class Car : public Vehicle {
public:
    void honk() {
        std::cout << "Beep! Honk!\n";
    }
};

// Another derived class
class Bicycle : public Vehicle {
public:
    void pedal() {
        std::cout << "Pedaling.\n";
    }
};
```

**How it works**:
1. `Car` and `Bicycle` inherit from `Vehicle`
2. They gain `start_engine()` and `drive()` from the base class
3. Each adds unique behavior (`honk()` and `pedal()`)

**Critical detail**: The `public` inheritance here means derived classes retain the same access level as the base class. For deeper hierarchies, you’d use `protected` or `private` inheritance.

---

### Polymorphism

Polymorphism enables objects of different classes to be treated as objects of a common base class. It allows one interface to represent different underlying forms (e.g., `Vehicle` objects can be handled uniformly via `start_engine()`).

**Why it matters**: Creates flexible, extensible systems where new types can be added without modifying existing code.

Here’s a demonstration using virtual functions (the classic C++ polymorphism mechanism):

```cpp
int main() {
    // Create a vehicle hierarchy
    Vehicle* my_vehicle = new Car();
    Vehicle* my_bike = new Bicycle();
    
    // Polymorphic behavior
    my_vehicle->start_engine(); // Calls Car::start_engine()
    my_vehicle->drive();        // Calls Car::drive()
    
    my_bike->start_engine();    // Calls Bicycle::start_engine()
    my_bike->drive();           // Calls Bicycle::drive()
    
    // Cleanup
    delete my_vehicle;
    delete my_bike;
    
    return 0;
}
```

**Output**:
```
Engine started.
Vehicle moving.
Engine started.
Vehicle moving.
Pedaling.
```

**Key insight**: The `start_engine()` call uses **dynamic dispatch** (via the virtual function table) to select the correct implementation based on the actual object type at runtime. This is how polymorphism works in C++.

**Real-world application**: Imagine a game where you have `Enemy`, `Player`, and `Boss` classes—all inheriting from `Character`. You can handle all with a single `update()` function without knowing their specific types.

---

### Abstraction

Abstraction hides complex implementation details behind a simplified interface. It focuses on *what* an object does rather than *how* it does it. In C++, this is achieved through **abstract classes** and **interfaces**.

**Why it matters**: Reduces cognitive load, enables modularity, and allows systems to evolve without breaking existing code.

Here’s a practical example using an abstract base class:

```cpp
#include <iostream>

// Abstract base class (cannot be instantiated)
class PaymentProcessor {
public:
    virtual ~PaymentProcessor() = default; // Virtual destructor
    virtual void process_payment(double amount) = 0; // Pure virtual function
};

// Concrete implementation 1
class CreditCard : public PaymentProcessor {
public:
    void process_payment(double amount) override {
        std::cout << "Processing $" << amount << " via Credit Card\n";
    }
};

// Concrete implementation 2
class PayPal : public PaymentProcessor {
public:
    void process_payment(double amount) override {
        std::cout << "Processing $" << amount << " via PayPal\n";
    }
};

int main() {
    // Abstract class used as a base for polymorphism
    PaymentProcessor* payment = new CreditCard();
    payment->process_payment(100.0);
    
    delete payment;
    
    return 0;
}
```

**Output**:
```
Processing $100 via Credit Card
```

**Critical concepts**:
- `PaymentProcessor` is **abstract** (has a pure virtual function)
- `CreditCard` and `PayPal` are concrete implementations
- The `process_payment()` interface is uniform across all implementations

This pattern lets you swap payment methods without changing the calling code—a hallmark of robust abstraction.

---

## Summary

| Concept          | Core Idea                                                                 | C++ Implementation                     |
|------------------|----------------------------------------------------------------------------|----------------------------------------|
| **Encapsulation** | Bundle data and methods; control access via private/public interfaces        | `private`/`public` access specifiers  |
| **Inheritance**   | Derive classes from base classes to share properties and behaviors          | `class Derived : public Base`         |
| **Polymorphism**  | One interface for multiple implementations via virtual functions            | Virtual functions + dynamic dispatch  |
| **Abstraction**   | Hide complexity behind a simplified interface; use abstract classes         | Pure virtual functions + abstract classes |

These four pillars work together to create C++ systems that are **maintainable**, **scalable**, and **resilient**. Master them, and you’ll build software that evolves gracefully with changing requirements—without sacrificing clarity or performance. 🚀