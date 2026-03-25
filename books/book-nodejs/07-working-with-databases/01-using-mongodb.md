## Using MongoDB

MongoDB is a powerful, flexible NoSQL database that integrates seamlessly with Node.js applications. Its document-oriented structure and scalability make it ideal for modern web applications. In this section, we'll cover the fundamentals of working with MongoDB in Node.js—starting from basic connections to implementing full CRUD operations and then exploring Mongoose as a higher-level abstraction. Let's dive in!

### Connecting to Database

Before we interact with MongoDB, we need to set up a database instance and establish a connection. This section covers the bare essentials using MongoDB's native Node.js driver.

First, ensure you have MongoDB installed locally (v4.0+ recommended). If you don't have it, download it from [mongodb.com](https://www.mongodb.com/download-center/community) and start the MongoDB service:

```bash
mongod --dbpath /data/db
```

Now, in your Node.js project, install the official MongoDB driver:

```bash
npm install mongodb
```

To connect to a local database named `myappdb`, create a connection file (`db.js`):

```javascript
// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    return client.db('myappdb');
  } catch (error) {
    console.error('Connection error:', error);
    throw error;
  }
}

module.exports = { connectToDB };
```

This file handles the connection logic and returns a database instance. When your application needs to interact with MongoDB, simply import it:

```javascript
const { connectToDB } = require('./db');
const db = await connectToDB();
```

**Pro tip**: Always handle connection errors explicitly—network issues or database shutdowns are common in production environments. Use connection pooling for performance in production deployments.

---

### CRUD Operations

Now that we're connected, let's implement core database operations using MongoDB's native driver. These examples assume you've created a `users` collection with documents like `{ name: "John", age: 30 }`.

#### Creating Records (Insert)

Insert a new document into the `users` collection:

```javascript
// Create a new user document
const newUser = { name: "Alice", age: 25 };

// Insert the document
const result = await db.collection('users').insertOne(newUser);
console.log(`Inserted 1 document with ID: ${result.insertedId}`);
```

#### Reading Records (Query)

Retrieve documents using flexible query syntax. Here’s how to find all users:

```javascript
// Find all users
const users = await db.collection('users').find().toArray();
console.log(`Found ${users.length} users`);
```

For more specific queries (e.g., users aged 20–30):

```javascript
// Find users aged between 20 and 30
const youngUsers = await db.collection('users').find({ age: { $gte: 20, $lte: 30 } }).toArray();
```

#### Updating Records (Update)

Update an existing document by ID:

```javascript
// Update a user's age
const updateResult = await db.collection('users').updateOne(
  { name: "Alice" },
  { $set: { age: 26 } }
);
console.log(`Updated 1 document: ${updateResult.modifiedCount}`);
```

#### Deleting Records (Remove)

Remove a document by name:

```javascript
// Delete a user
const deleteResult = await db.collection('users').deleteOne({ name: "Alice" });
console.log(`Deleted ${deleteResult.deletedCount} document(s)`);
```

**Key insight**: MongoDB's query language is highly expressive. Use `$match`, `$sort`, and `$group` for advanced operations—these are covered in the [official MongoDB documentation](https://www.mongodb.com/docs/manual/).

---

### Mongoose ODM

Mongoose is the most popular Object Data Modeling (ODM) library for MongoDB in Node.js. It provides a clean interface for working with MongoDB documents by mapping JavaScript objects to database collections. Let’s see how it simplifies CRUD operations.

#### Introduction to Mongoose

Mongoose abstracts MongoDB's complexity with schemas, models, and queries. It handles data validation, relationships, and conversions between JavaScript objects and MongoDB documents. Here’s why you’ll love it:

- **Type safety**: Define schemas to validate data structure
- **Schema-driven**: Enforce consistent data formats
- **Built-in middleware**: Handle pre/post hooks for operations
- **Rich query API**: More intuitive than native driver queries

#### Defining Schemas

Start by creating a schema for `User` documents:

```javascript
// user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18, max: 100 }
});

// Create a model
const User = mongoose.model('User', userSchema);

module.exports = User;
```

**Why this matters**: The `required` and `min/max` fields enforce data integrity at the schema level—preventing invalid data from entering the database.

#### Working with Models and Queries

Now, implement CRUD operations using Mongoose:

**Create (Insert)**
```javascript
const newUser = new User({ name: "Bob", age: 28 });
await newUser.save();
console.log(`Created user with ID: ${newUser._id}`);
```

**Read (Query)**
```javascript
// Find all users
const allUsers = await User.find();
console.log(`Found ${allUsers.length} users`);

// Find users aged 25-30
const users = await User.find({ age: { $gte: 25, $lte: 30 } });
```

**Update**
```javascript
// Update Bob's age
const updatedUser = await User.updateOne(
  { name: "Bob" },
  { $set: { age: 29 } }
);
console.log(`Updated user: ${updatedUser.modifiedCount} documents`);
```

**Delete**
```javascript
// Delete Bob
const deleteUser = await User.deleteOne({ name: "Bob" });
console.log(`Deleted ${deleteUser.deletedCount} user(s)`);
```

**Real-world advantage**: Mongoose automatically handles the conversion between JavaScript objects and MongoDB documents. No more manual `toString()` or JSON parsing!

---

## Summary

In this section, we’ve covered the full workflow for working with MongoDB in Node.js:  
1. **Connecting to Database** using MongoDB’s native driver (the foundation for all operations)  
2. **CRUD Operations** with raw MongoDB queries (providing deep understanding of the database)  
3. **Mongoose ODM** (the industry-standard abstraction layer that simplifies development while maintaining flexibility)  

You now have the tools to build robust, scalable applications using MongoDB. Remember: Start with the native driver to understand the underlying mechanics, then transition to Mongoose for production-ready applications. The key is to leverage MongoDB’s strengths—flexibility and scalability—while maintaining clean, maintainable code. 💡