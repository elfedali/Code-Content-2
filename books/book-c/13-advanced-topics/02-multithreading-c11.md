## Advanced Topics
### Multithreading (C11)

Multithreading is a powerful technique that enables concurrent execution of multiple tasks within a single program. In C11, the POSIX threads (pthread) API provides a robust foundation for implementing threads and synchronization. This section dives deep into **practical multithreading patterns** using C11, with emphasis on real-world applicability and safety. Let’s start with the fundamentals.

#### Threads Basics

Threads are lightweight, independent units of execution that share memory and resources within a single process. Unlike processes, threads operate within the same address space, enabling faster communication and reduced overhead. In C11, threads are managed via the `pthread` library, which follows the POSIX standard for thread operations.

**Why threads matter**:  
Threads allow your program to handle multiple operations simultaneously—such as processing user input while downloading data, or running background tasks without freezing the UI. This is critical for responsive applications and high-performance systems.

##### Creating Threads
The core of thread management in C11 begins with `pthread_create`. This function launches a new thread that executes a specified function. Here’s the minimal setup:

```c
#include <pthread.h>
#include <stdio.h>

void* thread_function(void* arg) {
    printf("Thread started!\n");
    return NULL;
}

int main() {
    pthread_t thread_id;
    int result = pthread_create(&thread_id, NULL, thread_function, NULL);
    if (result != 0) {
        fprintf(stderr, "Thread creation failed: %d\n", result);
        return 1;
    }
    printf("Main thread continues...\n");
    // Wait for thread to finish (see Joining section)
    return 0;
}
```

**Key points**:
- `pthread_t thread_id`: A unique identifier for the new thread (type `pthread_t`).
- `NULL`: Specifies no attributes (we’ll cover attributes later).
- `thread_function`: The thread’s entry point (a function returning `void*`).
- `NULL`: Passes no arguments to the thread function (we’ll handle arguments later).

This example creates a thread that prints "Thread started!" and continues executing the main thread. **Note**: Without joining the thread (see below), the main thread exits immediately, terminating the child thread too.

##### Thread Identifiers and Joining
Each thread has a unique identifier (`pthread_t`). To ensure proper cleanup, we use `pthread_join` to wait for a thread to complete. This prevents resource leaks and ensures all threads finish before the program exits.

**Critical workflow**:
1. Create a thread with `pthread_create`.
2. Call `pthread_join` on the thread ID to block until it finishes.

Here’s a complete example with joining:

```c
#include <pthread.h>
#include <stdio.h>

void* thread_function(void* arg) {
    int count = 0;
    while (count < 5) {
        printf("Thread: %d\n", count);
        count++;
        // Simulate work with a short delay
        sleep(1);
    }
    return NULL;
}

int main() {
    pthread_t thread_id;
    int result = pthread_create(&thread_id, NULL, thread_function, NULL);
    if (result != 0) {
        fprintf(stderr, "Thread creation failed: %d\n", result);
        return 1;
    }

    // Wait for thread to finish
    void* result_ptr;
    pthread_join(thread_id, &result_ptr);
    printf("Main thread joined successfully.\n");
    return 0;
}
```

**Why joining matters**:  
Without `pthread_join`, the program exits before the child thread completes, causing undefined behavior. The `result_ptr` (here `NULL`) captures the thread’s return value, which we ignore in this example but use in production for error handling.

##### Thread Functions and Arguments
Threads can accept arguments via the `pthread_create` call. This allows passing data to the thread function. For example:

```c
void* thread_function(void* arg) {
    int value = *(int*)arg;
    printf("Thread received value: %d\n", value);
    return NULL;
}

int main() {
    int my_value = 42;
    pthread_t thread_id;
    pthread_create(&thread_id, NULL, thread_function, &my_value);
    pthread_join(thread_id, NULL);
    return 0;
}
```

**Important**: The argument `arg` is cast to `int*` to access the integer value. **Always** handle memory safety—passing large structures or dynamically allocated memory requires careful management (we’ll cover this in advanced patterns).

#### Synchronization

Without synchronization, concurrent threads can cause **race conditions** (e.g., corrupted data, deadlocks). C11 provides atomic primitives and synchronization objects to manage shared resources safely.

##### Why Synchronization Is Needed
Imagine two threads incrementing a shared counter:  
```c
int counter = 0;

void* increment(void* arg) {
    for (int i = 0; i < 1000; i++) {
        counter++;
    }
}
```
**Without synchronization**, the counter might end at 998 (due to overlapping increments). Synchronization ensures **mutual exclusion** and **ordered execution**.

##### Mutexes (Mutual Exclusion)
Mutexes are the most common synchronization tool. They lock a resource so only one thread can access it at a time.

**Example**: Protecting a shared counter with a mutex:

```c
#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock;
int counter = 0;

void* increment(void* arg) {
    for (int i = 0; i < 1000; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

int main() {
    pthread_t thread1, thread2;
    pthread_create(&thread1, NULL, increment, NULL);
    pthread_create(&thread2, NULL, increment, NULL);
    
    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
    printf("Final counter: %d\n", counter);
    return 0;
}
```

**Key mechanics**:
- `pthread_mutex_init(&lock, NULL)`: Initialize the mutex (we skip initialization here for brevity; always call this in production).
- `pthread_mutex_lock(&lock)`: Acquire the lock (blocks until available).
- `pthread_mutex_unlock(&lock)`: Release the lock.

**Why this works**: The mutex ensures only one thread increments `counter` at a time, preventing race conditions.

##### Condition Variables
Condition variables enable threads to wait for specific events (e.g., "data is ready"). They work with mutexes to avoid busy-waiting.

**Example**: A producer-consumer pattern:

```c
#include <pthread.h>
#include <stdio.h>

pthread_mutex_t mutex;
pthread_cond_t cond;
int buffer = 0;
int max = 10;

void* producer(void* arg) {
    for (int i = 0; i < 10; i++) {
        pthread_mutex_lock(&mutex);
        while (buffer == max) {
            pthread_cond_wait(&cond, &mutex);
        }
        buffer++;
        printf("Producer added: %d\n", buffer);
        pthread_mutex_unlock(&mutex);
        // Simulate work
        sleep(1);
    }
    return NULL;
}

void* consumer(void* arg) {
    for (int i = 0; i < 10; i++) {
        pthread_mutex_lock(&mutex);
        while (buffer == 0) {
            pthread_cond_wait(&cond, &mutex);
        }
        buffer--;
        printf("Consumer removed: %d\n", buffer);
        pthread_mutex_unlock(&mutex);
        sleep(1);
    }
    return NULL;
}

int main() {
    pthread_mutex_init(&mutex, NULL);
    pthread_cond_init(&cond, NULL);
    
    pthread_t prod, cons;
    pthread_create(&prod, NULL, producer, NULL);
    pthread_create(&cons, NULL, consumer, NULL);
    
    pthread_join(prod, NULL);
    pthread_join(cons, NULL);
    
    pthread_mutex_destroy(&mutex);
    pthread_cond_destroy(&cond);
    return 0;
}
```

**How condition variables work**:
1. **Wait**: `pthread_cond_wait` blocks the thread until a signal occurs (while holding the mutex).
2. **Signal**: Another thread calls `pthread_cond_signal` to wake one waiting thread.
3. **Broadcast**: `pthread_cond_broadcast` wakes all waiting threads.

**Critical note**: Always pair condition variables with mutexes—**never** use them alone.

##### Semaphores
Semaphores are counters that control access to a resource. They’re simpler than mutexes but less flexible.

**Example**: A semaphore for thread-safe access to a limited resource:

```c
#include <pthread.h>
#include <stdio.h>

sem_t sem;

void* resource_access(void* arg) {
    sem_wait(&sem); // Acquire semaphore
    printf("Thread %d: using resource\n", (int)arg);
    sem_post(&sem); // Release semaphore
    return NULL;
}

int main() {
    sem_init(&sem, 0, 3); // Initialize to 3
    
    pthread_t threads[4];
    for (int i = 0; i < 4; i++) {
        pthread_create(&threads[i], NULL, resource_access, (void*)i);
    }
    
    for (int i = 0; i < 4; i++) {
        pthread_join(threads[i], NULL);
    }
    
    sem_destroy(&sem);
    return 0;
}
```

**Key differences from mutexes**:
- Semaphores can be used for **counting** (e.g., limiting concurrent threads).
- Mutexes are for **mutual exclusion** (only one thread at a time).

##### Barriers
Barriers synchronize threads to a common point (e.g., "all threads must finish before proceeding").

**Example**: A simple barrier with 3 threads:

```c
#include <pthread.h>
#include <stdio.h>

pthread_barrier_t barrier;

void* barrier_example(void* arg) {
    pthread_barrier_wait(&barrier);
    printf("Thread %d reached barrier\n", (int)arg);
    return NULL;
}

int main() {
    pthread_barrier_init(&barrier, NULL, 3);
    
    pthread_t threads[3];
    for (int i = 0; i < 3; i++) {
        pthread_create(&threads[i], NULL, barrier_example, (void*)i);
    }
    
    for (int i = 0; i < 3; i++) {
        pthread_join(threads[i], NULL);
    }
    
    pthread_barrier_destroy(&barrier);
    return 0;
}
```

**Use case**: Ensuring all threads complete a phase before moving to the next (e.g., in parallel processing pipelines).

#### Summary

Multithreading in C11 unlocks concurrency without sacrificing safety. **Threads** are the building blocks of parallel execution—created via `pthread_create` and joined via `pthread_join` to ensure clean resource management. **Synchronization** (mutexes, condition variables, semaphores, and barriers) prevents race conditions and deadlocks, enabling robust concurrent systems. By mastering these patterns, you can build responsive, scalable applications that handle real-world complexity with confidence. 🌟