## List, Set, Map

The Java Collections Framework offers a robust set of interfaces and classes for handling collections of objects. Within this framework, the **List**, **Set**, and **Map** interfaces are fundamental building blocks. In this section, we'll focus on two critical implementations: **ArrayList** (a dynamic array-based list) and **HashMap** (a key-value map). These structures are indispensable in enterprise applications for data storage and manipulation.

### ArrayList

An **ArrayList** is a resizable array implementation of the `List` interface. It provides a dynamic array that can grow and shrink as needed, making it ideal for scenarios where you need to maintain order and perform random access efficiently. Unlike a traditional array, an `ArrayList` can dynamically adjust its size, which means you don't have to pre-allocate memory.

Here's how you create and use an `ArrayList`:

```java
import java.util.ArrayList;

public class ArrayListExample {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        
        System.out.println("First fruit: " + fruits.get(0));
        System.out.println("All fruits: " + fruits);
    }
}
```

This example demonstrates:
- Creating an empty `ArrayList` of strings.
- Adding elements using the `add()` method.
- Accessing elements by index with `get()`.

**Key Characteristics of ArrayList**:
- **Order**: Maintains insertion order.
- **Duplicates**: Allows duplicate elements.
- **Performance**:
  - Random access: O(1) time complexity.
  - Adding an element at the end: O(1) amortized.
  - Adding an element in the middle: O(n) time complexity (due to shifting elements).
- **Nulls**: Allows `null` values.

**Common Operations**:
- `add(E e)`: Adds an element to the end.
- `get(int index)`: Retrieves an element by index.
- `remove(int index)`: Removes an element at a specific index.
- `size()`: Returns the number of elements.

For instance, to iterate over an `ArrayList` using a `for-each` loop:

```java
for (String fruit : fruits) {
    System.out.println(fruit);
}
```

In enterprise applications, `ArrayList` is often used for:
- Storing ordered lists of items (e.g., a list of orders, a queue of requests).
- When you need fast random access to elements.

### HashMap

A **HashMap** is a hash table-based implementation of the `Map` interface. It stores key-value pairs, where each key maps to a single value. The keys in a `HashMap` must be unique, but the values can be duplicated. `HashMap` provides constant-time complexity for basic operations (e.g., `get` and `put`) on average, making it a preferred choice for fast lookups.

Here's a practical example:

```java
import java.util.HashMap;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<String, Integer> phoneBook = new HashMap<>();
        phoneBook.put("Alice", 1234567890);
        phoneBook.put("Bob", 9876543210);
        
        // Retrieve a value by key
        int aliceNumber = phoneBook.get("Alice");
        
        // Iterate over keys
        for (String name : phoneBook.keySet()) {
            System.out.println(name + " -> " + phoneBook.get(name));
        }
    }
}
```

This example shows:
- Creating a `HashMap` with string keys and integer values.
- Using `put()` to add key-value pairs.
- Using `get()` to retrieve a value by key.
- Iterating over the keys with a `for-each` loop.

**Key Characteristics of HashMap**:
- **Uniqueness**: Keys must be unique (duplicates are not allowed).
- **Performance**:
  - `get()` and `put()` operations: O(1) average time complexity.
  - `containsKey()`, `containsValue()`: O(1) average.
  - `size()`: O(1) (in most implementations).
- **Nulls**:
  - Keys: Can be `null` (but typically not used in enterprise apps to avoid confusion).
  - Values: Can be `null`.
- **Order**: Does not maintain insertion order (as of Java 8, the order is arbitrary). For insertion order, use `LinkedHashMap`.

**Common Operations**:
- `put(K key, V value)`: Adds a key-value pair.
- `get(K key)`: Retrieves the value for a key.
- `remove(K key)`: Removes a key-value pair.
- `keySet()`: Returns a set of keys for iteration.

In enterprise applications, `HashMap` is widely used for:
- Caching (e.g., in Spring's `ConcurrentHashMap`).
- Storing configuration data (e.g., key-value pairs for environment variables).
- Indexing data for fast lookups.

### Comparison of ArrayList and HashMap

To quickly understand when to use each, here's a comparison table:

| Feature                | ArrayList                                  | HashMap                                      |
|------------------------|---------------------------------------------|-----------------------------------------------|
| **Order**              | Maintains insertion order                  | No order (arbitrary)                         |
| **Duplicates**         | Allows duplicates                          | Keys: no duplicates; Values: allows duplicates |
| **Access Time**        | O(1) for index; O(n) for search            | O(1) average for get; O(n) for search        |
| **Insertion**          | O(1) amortized at end; O(n) in middle      | O(1) average                                |
| **Use Case**           | Ordered lists with random access           | Fast lookups by key                          |

This table highlights the core differences and helps in selecting the right data structure for your application.

## Summary

In this section, we explored **ArrayList** and **HashMap**—two foundational structures in the Java Collections Framework. **ArrayList** excels in scenarios requiring ordered data and fast random access, while **HashMap** shines in applications needing efficient key-based lookups. Understanding these structures empowers you to build scalable and performant enterprise solutions. 🚀