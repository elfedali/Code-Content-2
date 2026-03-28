## Create

In this section, we dive into the creation of documents in MongoDB. As the foundation of data storage, **insert operations** allow us to add new records to our collections. We'll explore two key methods: `insertOne` for adding a single document and `insertMany` for adding multiple documents.

### Inserting a Single Document (insertOne)

The `insertOne` method is used to add a single document to a collection. This is the most common operation for adding a new record when you have a complete document object.

**Example**: Let's say we have a `users` collection and we want to add a new user.

```javascript
// Insert a single user document
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "admin"
};
const result = await usersCollection.insertOne(user);
```

The `insertOne` method returns a `InsertOneResult` object that contains the `insertedId` (the `_id` of the newly inserted document) and other metadata.

**Key points to remember**:
- The `_id` field is automatically generated if not provided (using MongoDB's `ObjectId` for documents)
- The `insertOne` method is asynchronous and typically used with `await` in an async function
- This operation is idempotent in the sense that if the document already exists (by `_id`), it will fail (but note: MongoDB does not allow duplicate `_id` by default)

Let's try a practical example with a real database connection (using the MongoDB Node.js Driver):

```javascript
const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function insertSingleUser() {
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = db.collection("users");

    const user = {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "developer"
    };

    const result = await users.insertOne(user);
    console.log(`1 document inserted with id: ${result.insertedId}`);
  } catch (error) {
    console.error(error);
  }
  finally {
    await client.close();
  }
}
insertSingleUser();
```

This example runs in a MongoDB instance (with the `mydb` database and `users` collection). Note: You'll need to have the MongoDB server running and the driver installed.

### Inserting Multiple Documents (insertMany)

The `insertMany` method allows you to insert multiple documents in a single operation. This is efficient for bulk data insertion and is especially useful when you have a batch of documents to add.

**Example**: Inserting multiple users at once.

```javascript
const users = [
  {
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "admin"
  },
  {
    name: "Bob Williams",
    email: "bob.w@example.com",
    role: "user"
  }
];
const result = await usersCollection.insertMany(users);
```

The `insertMany` method returns an `InsertManyResult` object that contains:
- `insertedCount`: Number of documents inserted
- `insertedIds`: Array of `_id` values for each inserted document

**Important considerations**:
- If the documents have duplicate `_id` values, the operation fails (but note: MongoDB will generate unique `_id` if not provided)
- The `insertMany` method can handle up to 1000 documents per operation (exact limit varies by driver and server version)
- It's efficient to use `insertMany` for bulk inserts because it reduces the number of round-trips to the database

Let's run a practical example with bulk insertion:

```javascript
async function insertMultipleUsers() {
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = db.collection("users");

    const usersToInsert = [
      { name: "Charlie Brown", email: "charlie.b@example.com", role: "admin" },
      { name: "Diana Prince", email: "diana.p@example.com", role: "user" }
    ];

    const result = await users.insertMany(usersToInsert);
    console.log(`Inserted ${result.insertedCount} documents with ids: ${result.insertedIds}`);
  } catch (error) {
    console.error(error);
  }
  finally {
    await client.close();
  }
}
insertMultipleUsers();
```

This example inserts two users at once. Note: The `insertedIds` field in the result is an array of the `_id` values for each inserted document.

## Summary

In this section, we've covered the two primary methods for creating documents in MongoDB:

- **Use `insertOne`** for adding a single document when you have a complete document object
- **Use `insertMany`** for efficient bulk insertion of multiple documents

Both methods are essential for building applications that require data to be added from the start. Remember to handle the asynchronous nature of these operations and to validate your documents before insertion to avoid errors. 🚀