## Index Basics

Indexes are the backbone of efficient data retrieval in MongoDB. They act as a roadmap for your database, allowing MongoDB to quickly locate documents without scanning the entire collection. In this section, we'll dive into the two foundational types of indexes: **single field** and **compound indexes**. Understanding these concepts is critical for building high-performance applications.

### Single Field Index

A single field index is the simplest form of index in MongoDB. It creates an index on one specific field within a collection. This type of index is ideal when you frequently query or sort by a single field.

For example, imagine a `users` collection where you often search for users by their email address. Without an index, MongoDB would scan every document in the collection to find the matching email. With a single field index on `email`, MongoDB can locate documents in a single step.

Here's how to create a single field index on the `email` field in the `users` collection:

```javascript
db.users.createIndex({ email: 1 })
```

The `1` indicates ascending order (the default). You can also specify descending order with `-1`.

Let's see the benefit in action. Suppose we have 100,000 users in the collection. Without an index, a query like:

```javascript
db.users.find({ email: "user@example.com" })
```

would scan all 100,000 documents. With the index, MongoDB finds the document in a single operation.

**Pro Tip**: Always consider your query patterns when choosing fields for indexing. If you frequently filter by `email`, a single field index on `email` is an excellent choice.

Now, let's run a quick example to illustrate:

```javascript
// Create a sample users collection
db.users.insertMany([
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" }
]);

// Create index
db.users.createIndex({ email: 1 });

// Query with index
db.users.find({ email: "alice@example.com" }).count()
```

This query returns 1 document in a single operation (without the index, it would scan both documents).

### Compound Index

A compound index extends the concept of a single field index by indexing multiple fields simultaneously. This is particularly useful when your queries filter on multiple fields or require sorting across several fields.

For instance, consider an `orders` collection where you often want to find orders for a specific customer from a specific date range. A compound index on `customer_id` and `order_date` can significantly speed up these queries.

Here's how to create a compound index on `customer_id` and `order_date`:

```javascript
db.orders.createIndex({ customer_id: 1, order_date: -1 })
```

Note the **order of fields** and **direction** (ascending or descending). The order matters because it affects how MongoDB uses the index for queries.

Let's break down the benefits:

- **Query Efficiency**: When you query with both `customer_id` and `order_date`, MongoDB uses the compound index to locate documents without scanning the entire collection.
- **Sorting**: If you sort by `order_date` in descending order (as shown above), the index is optimized for this pattern.

Example with a real-world scenario:

```javascript
// Create sample orders collection
db.orders.insertMany([
  { customer_id: 101, order_date: new Date("2023-01-01"), amount: 100 },
  { customer_id: 102, order_date: new Date("2023-01-02"), amount: 200 }
]);

// Create compound index
db.orders.createIndex({ customer_id: 1, order_date: -1 });

// Query using the compound index
db.orders.find({ customer_id: 101, order_date: { $gt: new Date("2023-01-01") } })
```

This query returns the document with `customer_id: 101` and `order_date` after January 1, 2023. Without the index, it would scan both documents.

**Key Insight**: The order of fields in a compound index is critical. If your query uses the fields in a different order, the index might not be used. Always align the index structure with your query patterns.

Here's a quick reference table for the two index types:

| Index Type       | Fields | When to Use                          | Example Query Pattern                     |
|------------------|--------|---------------------------------------|--------------------------------------------|
| Single Field     | 1      | Filtering by one field               | `find({ email: "..." })`                 |
| Compound Index   | 2+     | Filtering by multiple fields or sorting | `find({ customer_id: ..., order_date: ... })` |

## Summary

In this section, we explored the fundamentals of indexes in MongoDB. **Single field indexes** provide fast lookups for one specific field, while **compound indexes** enable efficient querying and sorting across multiple fields. Both are essential for building responsive applications. Remember: choose indexes based on your query patterns to maximize performance. 🔍🚀