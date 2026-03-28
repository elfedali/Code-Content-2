## Advanced Aggregation

### Joins with $lookup

In modern data processing, combining information from multiple collections is essential. MongoDB's aggregation framework provides the `$lookup` stage as a powerful tool for performing left outer joins between collections—eliminating the need for application-level joins while maintaining scalability. This stage is particularly valuable for scenarios like user-order relationships, where you need to enrich user data with associated transaction details.

**Why use $lookup?**  
Unlike traditional SQL joins, `$lookup` operates within the aggregation pipeline, allowing you to:
- Join collections without increasing database load (via index optimization)
- Handle complex relationships through pipeline stages
- Avoid N+1 query patterns in your application code

#### Basic $lookup Implementation
Let's create sample data to demonstrate `$lookup` in action. We'll use two collections: `users` (with user profiles) and `orders` (with transaction records).

```javascript
// Create sample data (run in MongoDB shell)
db.users.insertMany([
  { _id: 1, name: "Alice", user_id: "u1001" },
  { _id: 2, name: "Bob", user_id: "u1002" }
]);

db.orders.insertMany([
  { _id: 1, user_id: "u1001", order_date: new Date("2023-10-01") },
  { _id: 2, user_id: "u1002", order_date: new Date("2023-10-02") }
]);
```

Now, join users with their orders:

```javascript
db.users.aggregate([
  {
    $lookup: {
      from: "orders", // Target collection
      localField: "user_id", // Field in current document
      foreignField: "user_id", // Field in target collection
      as: "orders" // Alias for result array
    }
  }
])
```

This returns each user document with an `orders` array containing matching order documents. The key here is that `$lookup` performs a **left outer join**—all user documents appear, even if no orders exist.

#### $lookup with Pipeline Transformations
Real-world scenarios often require transforming data *before* joining. `$lookup` supports a pipeline to process target collection documents. Here's an example that finds users with *only* recent orders (last 7 days):

```javascript
db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "user_id",
      foreignField: "user_id",
      as: "recent_orders",
      pipeline: [
        {
          $match: {
            order_date: { $gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $sort: { order_date: -1 }
        },
        {
          $limit: 1 // Get most recent order
        }
      ]
    }
  }
])
```

This pipeline:
1. Filters orders from the last 7 days
2. Sorts by date descending
3. Takes only the most recent order per user

**Key considerations for $lookup**:
- Always use `preserveNulls: true` when dealing with optional relationships (default is `false`)
- Create indexes on `localField` and `foreignField` for performance
- Combine with `$unwind` when working with array results to avoid "array of documents" issues

---

### Sorting and Filtering in Aggregation

After joining collections, you'll often need to sort results by relevance or filter to specific subsets. MongoDB's aggregation pipeline provides two critical stages for this: `$sort` and `$match`. These stages work together to transform raw data into meaningful outputs—essential for user-facing applications and analytics.

#### Basic Sorting with $sort
The `$sort` stage orders documents by one or more fields. The first argument is the field name, and the second is the sort order (`1` for ascending, `-1` for descending).

```javascript
// Sort orders by date (most recent first)
db.orders.aggregate([
  {
    $sort: {
      order_date: -1 // Descending order
    }
  }
])
```

**Real-world use case**: Displaying users with their *most recent* order first in a dashboard.

#### Advanced Filtering with $match
The `$match` stage applies conditional filters to documents. It's equivalent to a `WHERE` clause in SQL and handles complex conditions through MongoDB's query syntax.

```javascript
// Filter orders from last 30 days
db.orders.aggregate([
  {
    $match: {
      order_date: {
        $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    }
  }
])
```

**Key filtering patterns**:
| Pattern | Example | Purpose |
|---------|---------|---------|
| Date range | `$gt`/`$lt` | Time-bound queries |
| Nested fields | `address.city` | Complex object filtering |
| Logical operators | `$and`/`$or` | Combining multiple conditions |

#### Combining $lookup with Sorting/Filtering
This is where real power emerges. Here's a complete pipeline that:
1. Joins users with their recent orders
2. Filters orders from last 30 days
3. Sorts by most recent order

```javascript
db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "user_id",
      foreignField: "user_id",
      as: "recent_orders"
    }
  },
  {
    $unwind: { path: "recent_orders", preserveNulls: false }
  },
  {
    $match: {
      "recent_orders.order_date": {
        $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    }
  },
  {
    $sort: {
      "recent_orders.order_date": -1
    }
  }
])
```

**Critical workflow notes**:
1. Always `unwind` arrays after `$lookup` (unless you want array results)
2. Apply `$match` *before* `$sort` for optimal performance
3. Use `$project` to clean up results when needed
4. For large datasets, add indexes on `order_date` and `user_id`

#### Common Pitfalls to Avoid
| Issue | Solution |
|-------|----------|
| "Array of documents" errors | Always use `$unwind` after `$lookup` |
| Performance bottlenecks | Create indexes on `localField` and `foreignField` |
| Incorrect sort order | Verify field names and sort direction (`-1` = descending) |
| Missing data | Use `preserveNulls: true` for optional relationships |

---

## Summary

The `$lookup` stage enables efficient cross-collection joins without application-level complexity, while `$sort` and `$match` provide precise control over result ordering and filtering. Together, they form the backbone of scalable data processing pipelines—critical for applications requiring real-time user insights, transaction analytics, and personalized experiences. Mastering these stages allows you to transform raw data into actionable intelligence while maintaining optimal performance. 🌟