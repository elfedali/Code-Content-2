## Read Operations

📚 In MongoDB, **read operations** are the foundation for retrieving data efficiently. Understanding these operations is crucial for building high-performance applications.

### Find
The `find` method retrieves documents from a collection. It supports basic filtering and projection.

**Example:**
```javascript
// Retrieve all users
db.users.find()

// Retrieve users with specific fields
db.users.find({}, { name: 1, city: 1 })
```

### Projection
Projection controls which fields are returned in query results. Use an object where:
- `1` = include field
- `0` = exclude field

**Key Rules:**
- `_id` is always included unless explicitly set to `0`
- Fields not specified are excluded by default

**Examples:**
```javascript
// Return only name and city
db.users.find({}, { name: 1, city: 1 })

// Exclude age field
db.users.find({}, { age: 0 })

// Find users in New York without age
db.users.find({ city: "New York" }, { age: 0 })
```

### Query Operators
Query operators build complex filters within `find()` conditions:

| Operator       | Example                          | Use Case                          |
|----------------|-----------------------------------|------------------------------------|
| `$eq`          | `age: 30`                        | Equality (default)                |
| `$ne`          | `age: { $ne: 30 }`               | Not equal                         |
| `$gt`          | `age: { $gt: 25 }`               | Greater than                      |
| `$gte`         | `age: { $gte: 25 }`              | Greater than or equal             |
| `$in`          | `city: { $in: ["NY", "LA"] }`    | Multiple values                   |
| `$nin`         | `city: { $nin: ["NY", "LA"] }`   | Values not in list                |
| `$regex`       | `name: { $regex: "^A" }`         | Text patterns                     |
| `$and`         | `{ $and: [{ age: 30 }, { city: "NY" }] }` | Multiple conditions |

**Real-world Example:**
```javascript
// Find users older than 25 from New York
db.users.find({
  $and: [
    { age: { $gt: 25 } },
    { city: "New York" }
  ]
})
```

## Summary
You've now mastered the core read operations in MongoDB: **find**, **projection**, and **query operators**. These are essential for building efficient data retrieval in your applications.

🌟