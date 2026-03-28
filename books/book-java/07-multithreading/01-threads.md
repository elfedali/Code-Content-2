## Threads

In the world of Java concurrency, threads are the building blocks that enable applications to perform multiple tasks simultaneously. Understanding how to create and manage threads is fundamental to developing responsive, scalable enterprise applications. This section dives deep into the core concepts of thread creation and synchronization—two pillars of reliable concurrent programming.

### The Runnable Interface: Your Thread's Workhorse

The `Runnable` interface is Java's most flexible and recommended approach to creating threads. Unlike extending the `Thread` class (which we'll cover in a later section), `Runnable` decouples thread logic from thread management, promoting cleaner code and better scalability. By implementing `Runnable`, you define a *task* that can be executed in a thread without tying the task to a specific thread object.

Why prefer `Runnable`?  
- Avoids the "single inheritance" problem (Java only allows one parent class per class)  
- Enables shared tasks across multiple threads (e.g., thread pools)  
- Encourages testability and separation of concerns  

Here's a concrete example demonstrating a `Runnable` that prints a message in a new thread:

```java
public class SimpleRunnableExample {
    public static void main(String[] args) {
        // Create a Runnable task (using lambda for brevity)
        Runnable task = () -> System.out.println("Hello from a new thread!");
        
        // Create and start the thread
        Thread thread = new Thread(task);
        thread.start();
        
        // Wait for the thread to complete (for demonstration)
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

**Output**  
`Hello from a new thread!`

This example shows how `Runnable` allows you to focus purely on the task logic (`task`), while the `Thread` class handles thread lifecycle. For enterprise applications, we often use `Runnable` with `ExecutorService` to manage thread pools—this pattern scales efficiently across thousands of requests.

#### Key Takeaway for Runnable
> **Use `Runnable` when you need to define a reusable task that can run in multiple threads**. It’s the industry standard for production code because it avoids thread inheritance pitfalls and enables scalable task execution.

### Synchronization: Guarding Shared State

Synchronization is the mechanism that prevents race conditions when multiple threads access shared resources. Without proper synchronization, concurrent operations can corrupt data or produce unpredictable results. In Java, we use `synchronized` blocks and methods to create mutual exclusion around critical sections of code.

**Why synchronization matters**:  
Imagine two threads incrementing a shared counter. If they run without synchronization, the counter might end up less than expected because they read the same value and write back without coordination. Synchronization ensures only one thread modifies the shared state at a time.

Here’s a classic race condition example without synchronization:

```java
public class RaceConditionExample {
    private int count = 0;

    public void increment() {
        count++; // Problematic without synchronization
    }

    public static void main(String[] args) {
        RaceConditionExample counter = new RaceConditionExample();
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        t1.start();
        t2.start();
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Final count: " + counter.count);
    }
}
```

**Output** (likely less than 2000)  
`Final count: 1998`

This output demonstrates a race condition—threads interfere with each other’s access to `count`. Now, let’s fix it with synchronization:

```java
public class SynchronizedExample {
    private int count = 0;

    public synchronized void increment() {
        count++; // Synchronized method
    }

    public static void main(String[] args) {
        SynchronizedExample counter = new SynchronizedExample();
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        t1.start();
        t2.start();
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Final count: " + counter.count);
    }
}
```

**Output**  
`Final count: 2000`

This works because `synchronized` ensures only one thread enters `increment()` at a time. For finer-grained control (e.g., locking specific resources), we use `synchronized` blocks:

```java
public class SynchronizedBlockExample {
    private int count = 0;
    private final Object lock = new Object();

    public void increment() {
        synchronized (lock) {
            count++; // Critical section protected by lock
        }
    }

    public static void main(String[] args) {
        SynchronizedBlockExample counter = new SynchronizedBlockExample();
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        t1.start();
        t2.start();
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Final count: " + counter.count);
    }
}
```

**Why blocks are better**:  
Using `synchronized` blocks (instead of methods) gives you more control. You can lock *only* the critical section without affecting the entire method. This is crucial for large applications where you don’t want to block non-critical operations.

#### Synchronization Tradeoffs
| Approach              | When to Use                          | Pros                          | Cons                          |
|------------------------|---------------------------------------|--------------------------------|--------------------------------|
| `synchronized` methods | Simple shared state                  | Less boilerplate              | Locks entire method            |
| `synchronized` blocks  | Fine-grained control                 | More precise locking          | Requires careful object handling |
| `ReentrantLock`        | Advanced scenarios (e.g., timeouts)  | More flexible                 | Higher learning curve         |

**Pro Tip**: Always prefer `synchronized` blocks over methods for production code. They minimize contention and prevent thread starvation.

### Summary

- **`Runnable`** is the industry-standard way to define thread tasks—it decouples logic from thread management and enables scalable task execution (e.g., via thread pools).
- **Synchronization** prevents race conditions by ensuring only one thread accesses shared resources at a time. Use `synchronized` blocks for fine-grained control and `synchronized` methods for simpler cases.
- Always prioritize *mutual exclusion* over speed in concurrent systems—corrupted data costs far more than minor performance overhead.

Mastering these concepts lets you build threads that are both **reliable** and **scalable**—the foundation of enterprise-grade Java applications. 🌟