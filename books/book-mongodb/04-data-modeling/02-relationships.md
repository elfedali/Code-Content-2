## Relationships

In modern applications, data often requires relationships between documents. MongoDB, being a NoSQL document database, offers flexible ways to model these relationships without the rigid constraints of relational databases. In this section, we'll dive into two common relationship patterns: **one-to-one** and **one-to-many**. These patterns are foundational for building scalable and efficient applications.

### One-to-One Relationships

A one-to-one relationship means that **one document in a collection is associated with exactly one document in another collection** (or embedded document). This pattern is useful when the relationship is simple and the related data is small.

#### Embedding Approach

The most straightforward way to model a one-to-one relationship in MongoDB is by **embedding** the related document directly within the main document. This approach is ideal when the related document is small and you want to minimize the number of queries.

**Example**: Consider a `User` document that has a `Profile` document. Since each user has exactly one profile, we can embed the profile inside the user document.

```javascript
{
  _id: ObjectId("5f8b4a7c9d3e4b0c0e0f1a2b"),
  name: "John Doe",
  email: "john@example.com",
  profile: {
    bio: "Software engineer",
    avatar: "https://example.com/avatar.jpg"
  }
}
```

Here, the `profile` field is a nested document. This structure allows you to query the user and their profile in a single operation.

#### Referencing Approach

Alternatively, you can model a one-to-one relationship using **referencing**. This involves having two separate collections, where one collection (the `Profile`) has a reference to the `User` via a `userId` field. This approach is useful when the related document is large, or when you need to share the same profile across multiple applications.

**Example**: In this model, we have two collections: `users` and `profiles`.

```javascript
// users collection
{
  _id: ObjectId("5f8b4a7c9d3e4b0c0e0f1a2c"),
  name: "John Doe",
  email: "john@example.com"
}
```

```javascript
// profiles collection
{
  _id: ObjectId("5f8b4a7c9d3e4b0c0e0f1a2d"),
  userId: ObjectId("5f8b4a7c9d3e4b0c0e0f1a2c"),
  bio: "Software engineer",
  avatar: "https://example.com/avatar.jpg"
}
```

To ensure that each user has only one profile, we add a unique index on `userId` in the `profiles` collection:

```javascript
db.profiles.createIndex({ userId: 1 }, { unique: true })
```

#### When to Use Which

| Approach          | When to Use                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| Embedding          | When the related document is small and you want to minimize network roundtrips |
| Referencing        | When the related document is large, or when you need to share across multiple documents |

**Pro Tip**: Always consider the **read/write patterns** of your application. If you frequently need to query the related document, embedding might be better. If you need to share the related data across multiple documents, referencing is more appropriate.

### One-to-Many Relationships

A one-to-many relationship means that **one document in a collection is associated with multiple documents in another collection**. This is the most common relationship pattern in applications (e.g., a user has many posts).

#### Embedding Approach

In MongoDB, you can embed multiple related documents within a single document. This is efficient for small collections and when you need to query the related documents quickly.

**Example**: A `User` document with multiple `Post` documents embedded.

```javascript
{
  _id: ObjectId("5f8b4a7c9d3e4b0c0e0f1a2e"),
  name: "John Doe",
  posts: [
    {
      title: "First Post",
      content: "Hello, world!"
    },
    {
      title: "Second Post",
      content: "This is a second post."
    }
  ]
}
```

Here, the `posts` field is an array of documents. This structure allows you to get all posts for a user in a single query.

#### Referencing Approach

For larger datasets or when you need to scale, the referencing approach is preferred. In this model, you have a `posts` collection that references the `User` via a `userId` field.

**Example**: Two collections: `users` and `posts`.

```javascript
// users collection
{
  _id: ObjectId("5f8b4a7c9d3e4b0c0e0f1a2f"),
  name: "John Doe"
}
```

```javascript
// posts collection
{
  _id: ObjectId("5f8b4a7c9d3e4b0c0e0f1a30"),
  title: "First Post",
  content: "Hello, world!",
  userId: ObjectId("5f8b4a7c9d3e4b0c0e0f1a2f")
}
```

#### When to Use Which

| Approach          | When to Use                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| Embedding          | When the related documents are small and you want to minimize network roundtrips |
| Referencing        | When the related documents are large, or when you need to share across multiple documents |

**Pro Tip**: For one-to-many relationships, **referencing** is generally recommended for scalability. However, if the number of related documents per parent is small (e.g., 10-20), embedding can be efficient. Always consider your application's query patterns and data size.

## Summary

In this section, we've explored two fundamental relationship patterns in MongoDB: **one-to-one** and **one-to-many**. 

- For **one-to-one** relationships, we can either **embed** the related document (for simplicity and small data) or use **referencing** (for scalability and sharing).
- For **one-to-many** relationships, we typically use **referencing** for larger datasets, though embedding is viable for small numbers of related documents.

Understanding these patterns helps you design efficient and scalable MongoDB applications. Remember: **the right model depends on your data and queries**. ✅