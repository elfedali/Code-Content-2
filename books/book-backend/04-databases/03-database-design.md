## Database Design

Welcome to the Database Design chapter! This section dives into two critical pillars of building scalable and reliable backend systems: **normalization** and **indexes**. These concepts are foundational yet often misunderstood. By mastering them, you'll design databases that are both efficient and resilient. Let's get started!

### Normalization

Normalization is the systematic process of structuring a database to minimize redundancy and dependency. It ensures data integrity by organizing related data into separate tables with well-defined relationships. The goal? **Consistency** and **predictable behavior** across your system.

The most widely adopted normalization forms are:

1. **First Normal Form (1NF)**: Each column contains atomic (non-repeating) values. Each row must be uniquely identifiable via a primary key.
2. **Second Normal Form (2NF)**: All non-key columns must be fully dependent on the primary key (no partial dependencies).
3. **Third Normal Form (3NF)**: All non-key columns must be independent of each other (no transitive dependencies).

Let’s illustrate with a real-world example. Imagine an `orders` table that stores customer orders without normalization:

```sql
-- Non-normalized orders table (violates 1NF and 2NF)
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    product_name VARCHAR(100),
    quantity INT,
    price DECIMAL(10, 2)
);
```

**Why is this problematic?**  
This design creates **data redundancy** and **anomalies**:
- If a product’s price changes, you must update *every* row for that product across all orders.
- If a customer’s name changes, you must update *every* row for that customer across all orders.
- Adding a new product requires updating *all* existing orders.

Here’s how we normalize this table into three tables that adhere to 3NF:

```sql
-- Normalized tables (adhering to 3NF)
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

**Key benefits of this normalization**:
- ✅ **Atomic updates**: Changing a product price affects *only* the `products` table.
- ✅ **Scalability**: Adding new customers/products doesn’t require rewriting existing orders.
- ✅ **Data integrity**: Foreign keys enforce referential constraints, preventing invalid relationships.

> 💡 **Pro Tip**: Start with 1NF and 2NF for most applications. 3NF is sufficient for 90% of use cases—reserve higher normal forms (like 4NF) for complex scenarios like multi-valued attributes.

### Indexes

Indexes are data structures that enable databases to **rapidly locate records** without scanning the entire table. Think of them as *book indices*—they help you find information faster without reading every page.

#### Why Use Indexes?

Without indexes, databases perform **full table scans** (reading every row). This becomes impractical for large datasets. Indexes reduce query time from *O(n)* (linear) to *O(log n)* (logarithmic) for most operations.

**Real-world example**:  
Suppose we have a `users` table with 1 million rows. A query like `SELECT * FROM users WHERE email = 'user@example.com'` would take **~100ms** without an index but **~0.5ms** with a good index.

#### Creating and Using Indexes

Here’s how to create an index on the `users` table for the `email` column:

```sql
-- Create a B-tree index on the email column
CREATE INDEX idx_users_email ON users(email);
```

Now, the query becomes fast:

```sql
-- Query using the index
SELECT * FROM users WHERE email = 'user@example.com';
```

#### When to Index?

Not all columns need indexes—over-indexing harms write performance. Here’s a decision framework:

| Scenario                          | Recommended Index          | Why?                                      |
|------------------------------------|-----------------------------|--------------------------------------------|
| `WHERE` clause on large columns   | `WHERE column = value`      | Speeds up filtering (e.g., email lookups) |
| `JOIN` between tables             | Columns in `JOIN` condition | Reduces join scan size                    |
| `ORDER BY` on a column            | `ORDER BY column`           | Enables sorted index scans                |
| `GROUP BY` on a column            | `GROUP BY column`           | Optimizes aggregation operations          |

> ⚠️ **Critical Note**: Avoid over-indexing. Too many indexes slow down writes by 20–50%. Use `EXPLAIN` to analyze query plans and identify optimal indexes.

#### Real-World Example

Let’s simulate a scenario with an unindexed vs indexed query:

**Without Index** (slow):
```sql
-- Full table scan (O(n) time)
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';
```

**With Index** (fast):
```sql
-- Uses B-tree index (O(log n) time)
EXPLAIN SELECT * FROM users USING INDEX idx_users_email WHERE email = 'user@example.com';
```

**Key takeaway**: Indexes are powerful tools—but they must be used strategically. Start with the most frequently queried columns and monitor performance metrics like `query_time` and `writes_per_second`.

## Summary

This chapter has covered the essentials of database design: **normalization** and **indexes**. By understanding normalization, you’ve learned to structure data to avoid redundancy and ensure consistency. With indexes, you’ve gained the ability to optimize queries for speed without sacrificing data integrity. Together, these principles form the backbone of scalable and reliable backend systems. 🚀