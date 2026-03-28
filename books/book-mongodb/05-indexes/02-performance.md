## Performance

### Query Optimization

When you design MongoDB applications, **query performance** becomes your most critical success factor. Without proper indexing, even simple queries can become bottlenecks as your data grows. In this section, we’ll dive deep into how to optimize queries using indexes—because the right index strategy transforms slow queries into near-instant responses.

MongoDB’s core strength lies in its ability to use **indexes** as efficient navigation paths. Without an index, MongoDB performs a **collection scan**—reading every document in the collection. For a collection with 10 million documents, this means scanning 10 million documents per query. Imagine a user login query that scans the entire collection to find a single user by email. This is computationally expensive and scales poorly.

#### Why Indexes Matter
Indexes work like a physical index in a book. Instead of flipping through every page (full scan), MongoDB can jump directly to the relevant section. For example, consider a `users` collection with 50 million documents:

```javascript
// Slow query without index (scans 50M documents)
db.users.find({ email: "user@example.com" })
```

With a targeted index, MongoDB executes the query in **sub-millisecond** time. Let’s create an index on the `email` field:

```javascript
// Create index for email lookups (1 = ascending order)
db.users.createIndex({ email: 1 })
```

Now the same query uses the index:

```javascript
// Uses index: 1 document examined (vs. 50M without index)
db.users.find({ email: "user@example.com" })
```

This is the power of indexes: they reduce document scans from **O(n)** to **O(log n)**. The trade-off? Writes become slightly slower (as indexes must be updated), but for most applications, the read performance gain outweighs this cost.

#### Compound Indexes for Complex Queries
Real-world queries often filter on multiple fields. Compound indexes solve this by creating a multi-field path. For example, if you frequently query users by `category` and `price`:

```javascript
// Create compound index (category first for best results)
db.products.createIndex({ category: 1, price: 1 })
```

This index enables efficient queries like:

```javascript
// Uses index: scans only relevant documents
db.products.find({ 
  category: "electronics", 
  price: { $gt: 100 } 
})
```

**Key Rule for Compound Indexes**: Place the **most selective field** (the one that filters the most documents) first. For example, if `category` has 100 distinct values but `price` has 10,000 distinct values, `category` should come first.

#### When to Avoid Indexes
Not all queries need indexes. Avoid over-indexing:
- **Write-heavy applications** (e.g., real-time analytics): Indexes add write overhead.
- **Simple queries** that don’t filter large datasets (e.g., `find({ age: 25 })` on a small collection).
- **Queries with ` $unwind` or `$group`** (indexes can’t optimize aggregation stages).

Use `db.collection.getIndexes()` to inspect existing indexes and identify underused ones.

#### Pro Tip: Index Analysis
Always validate your index strategy with **query profiling**. Run:
```javascript
// Check index usage for a query
db.users.find({ email: "user@example.com" }).explain("executionStats")
```
This reveals if the query uses the index (e.g., `documentsExamined` is low).

### Explain

The **`explain()` method** is your diagnostic superpower for understanding how MongoDB executes queries. It provides a detailed breakdown of the query plan—showing exactly how indexes are used, the cost of operations, and where bottlenecks occur. Without `explain`, you’re guessing at performance issues.

#### How to Use Explain
Call `explain()` on your query to get a JSON report. The two most useful modes are:

1. **`executionStats`**: Shows performance metrics (time, documents scanned)
2. **`executionPlan`**: Shows the step-by-step execution path

Here’s a practical example:

```javascript
// Run explain in "executionStats" mode
db.users.find({ email: "user@example.com" }).explain("executionStats")
```

**Sample Output Snippet**:
```json
{
  "executionStats": {
    "executionTimeMillis": 12,
    "documentsExamined": 1,
    "totalHits": 1
  }
}
```

This tells us:
- ✅ `documentsExamined` = 1 (uses index)
- ✅ `executionTimeMillis` = 12ms (fast)

Now, let’s test a query that **doesn’t use an index**:

```javascript
// Query without index (scans many documents)
db.users.find({ email: "user@example.com" }).explain("executionStats")
```

**Sample Output Snippet**:
```json
{
  "executionStats": {
    "executionTimeMillis": 1200,
    "documentsExamined": 5000000,
    "totalHits": 1
  }
}
```

Here, `documentsExamined` = 5,000,000 (slow full scan). This is why we create indexes!

#### Interpreting the Execution Plan
The `executionPlan` mode gives deeper insights. For a compound index scenario:

```javascript
// Full execution plan for a compound query
db.products.find({ 
  category: "electronics", 
  price: { $gt: 100 } 
}).explain("executionPlan")
```

**Sample Output Snippet**:
```json
{
  "stage": "IXSCAN",
  "indexName": "products_category_1_price_1",
  "keyPattern": { "category": 1, "price": 1 }
}
```

This shows:
- ✅ Uses the compound index `products_category_1_price_1`
- ✅ Index pattern matches the query fields

#### Critical Insights from Explain
| Metric                     | What It Means                                  | When to Act                                  |
|----------------------------|-----------------------------------------------|---------------------------------------------|
| `documentsExamined`        | Total docs scanned (high = slow query)        | Create index for this field                |
| `executionTimeMillis`     | Time taken (ms)                              | Optimize query or indexes                 |
| `indexUsed`                | True/False (if index was used)               | Verify index strategy                     |
| `stage`                    | "IXSCAN" = index scan, "COLLSCAN" = full scan | Fix full scans with indexes               |

#### Real-World Fix Workflow
1. **Identify slow query**: `db.users.find({ email: "user@example.com" })`
2. **Run explain**: `explain("executionStats")` shows `documentsExamined` = 5M
3. **Create index**: `db.users.createIndex({ email: 1 })`
4. **Verify**: New `explain` shows `documentsExamined` = 1

This 5,000,000-to-1 scan improvement is why indexes matter.

## Summary

By mastering **query optimization** and the **`explain`** method, you transform MongoDB from a slow database into a high-performance engine. Start with targeted indexes for your most critical queries, then validate everything with `explain`. Remember: **indexes are your most powerful tool—but only when designed and monitored correctly**. This combination ensures your applications scale smoothly while keeping users engaged. 🔍