## Update

In this section, we dive into the powerful update operations that let you modify data in MongoDB. As part of the CRUD (Create, Read, Update, Delete) cycle, updates are essential for keeping your data in sync with your application's needs. We'll cover two primary update methods: `updateOne` and `updateMany`, followed by two key update operators: `$set` and `$inc`. These tools give you precise control over how and when to update your documents.

### updateOne

The `updateOne` method updates a single document that matches the specified query. This is ideal when you want to change one document without affecting others. The method takes three parameters: a query (to find the document), an update operator (to define the changes), and optional options.

Here’s a practical example using a `users` collection:

```javascript
// Update the user with email 'john@example.com' to set their role to 'admin'
await collection.updateOne(
  { email: "john@example.com" },
  { $set: { role: "admin" } }
);
```

This operation updates the first document that matches the `email` query. Notice how we use the `$set` operator (which we'll cover next) to set the `role` field.

**Key points about `updateOne`**:
- It updates **only one document** (the first one that matches).
- If no document matches, it returns a `Document` object with `matchedCount: 0`.
- The method is non-destructive by default (it doesn't remove documents).

Let's see how we might update a document with multiple fields:

```javascript
// Update the user with email 'jane@example.com' to set their role and status
await collection.updateOne(
  { email: "jane@example.com" },
  { $set: { role: "editor", status: "active" } }
);
```

This updates the `role` and `status` fields for the matching document.

### updateMany

The `updateMany` method updates multiple documents that match the specified query. This is useful when you need to change several documents at once. The structure is similar to `updateOne`, but with the `updateMany` method name.

Here’s an example updating multiple users:

```javascript
// Update all users with role 'guest' to set their role to 'member'
await collection.updateMany(
  { role: "guest" },
  { $set: { role: "member" } }
);
```

This operation updates every document that has `role: "guest"`.

**Key differences from `updateOne`**:
- `updateMany` affects **multiple documents** (all that match).
- It returns an object with `modifiedCount` (number of documents updated) and `upsertedId` (if applicable).

Let's see a more complex update:

```javascript
// Update all users with status 'inactive' to set their status to 'active' and increment their points
await collection.updateMany(
  { status: "inactive" },
  { $set: "status": "active", $inc: { points: 10 } }
);
```

This updates the `status` and increments the `points` field for each matching document.

### $set

The `$set` operator is one of the most commonly used update operators. It allows you to **set** one or more fields in a document to specified values. This is useful for replacing existing fields or adding new ones.

**How it works**:
- If a field doesn't exist, `$set` creates it.
- If a field exists, it replaces its value.

Here’s a concrete example:

```javascript
// Update the user with email 'alice@example.com' to set their name and age
await collection.updateOne(
  { email: "alice@example.com" },
  { $set: { name: "Alice Smith", age: 30 } }
);
```

This operation sets the `name` and `age` fields for the matching document.

**Important note**: `$set` does not modify the document in place; it's an operator that you use within the update operation. You can combine it with other operators (like `$inc`).

Let's try a complex scenario with multiple fields and a conditional:

```javascript
// Update the user with email 'bob@example.com' to set their name and age, but only if they are under 25
await collection.updateOne(
  { email: "bob@example.com", age: { $lt: 25 } },
  { $set: { name: "Bob Johnson", age: 24 } }
);
```

This updates the document only if the `age` field is less than 25.

### $inc

The `$inc` operator increments a numeric field by a specified value. This is particularly useful for counters, like tracking the number of views on a page or likes on a post.

**How it works**:
- It **adds** a value to a numeric field.
- If the field doesn't exist, it creates it with the value of the increment (e.g., `$inc: { views: 1 }` creates `views: 1` if it doesn't exist).

Example:

```javascript
// Increment the 'views' field for the user with email 'charlie@example.com' by 1
await collection.updateOne(
  { email: "charlie@example.com" },
  { $inc: { views: 1 } }
);
```

This operation adds 1 to the `views` field of the matching document.

**Real-world use case**: Let's say we have a document for a blog post. We want to increment the `readCount` every time a user views the post.

```javascript
// Increment the read count for a blog post with id 'post-123'
await collection.updateOne(
  { _id: "post-123" },
  { $inc: { readCount: 1 } }
);
```

**Important note**: `$inc` is an operator that can be used in both `updateOne` and `updateMany` operations.

## Summary

You've now covered the core update operations in MongoDB. 🚀