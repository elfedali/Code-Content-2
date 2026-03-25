## REST API Development: CRUD Operations

In the world of web applications, **RESTful APIs** serve as the backbone for seamless data exchange between clients and servers. When building scalable Node.js applications, mastering the **CRUD operations** (Create, Read, Update, Delete) is essential. These four operations form the foundation of any data-driven service, and implementing them correctly ensures your API is robust, maintainable, and ready for production. In this section, we’ll walk through each operation with concrete examples using Express.js and SQLite—your go-to stack for rapid development. Let’s dive in!

### Create

Creating a new resource is the first step in building a data-driven application. When a client sends a `POST` request to your API endpoint, you must:  
1. Parse incoming JSON data  
2. Validate required fields  
3. Save data to your database  
4. Return a confirmation with the new resource  

Here’s a runnable example using SQLite (a lightweight, serverless database ideal for learning):

```javascript
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Initialize SQLite database
const db = new sqlite3.Database('users.db');

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
)`);

// Middleware to parse JSON
app.use(express.json());

// POST endpoint to create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Name and email are required' 
    });
  }

  // Save to database
  db.run(
    `INSERT INTO users (name, email) VALUES (?, ?)`,
    [name, email],
    (err) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Database error: ' + err.message 
        });
      }
      // Return created resource with generated ID
      res.status(201).json({
        id: db.lastInsertRowid,
        name,
        email
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

**Key takeaways**:  
- Always validate input before database operations (prevents invalid data)  
- Use `201 Created` status for successful creates (per REST conventions)  
- `db.lastInsertRowid` gives the auto-generated ID from your database  
- Error handling ensures clean failure states without crashing the server  

### Read

Reading data involves two common patterns:  
1. **List all resources** (`GET /users`)  
2. **Retrieve a single resource** (`GET /users/:id`)  

Here’s how to implement both with Express and SQLite:

```javascript
// GET endpoint to list all users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(users);
  });
});

// GET endpoint to retrieve a single user by ID
app.get('/users/:id', (req,, res) => {
  const userId = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});
```

**Critical patterns**:  
- `db.all()` handles multiple results (for listing)  
- `db.get()` returns a single result (for lookup)  
- Always check for `404` when resources don’t exist  
- Error handling ensures database failures don’t break the entire API  

### Update

Updating a resource requires:  
1. Validating the update request  
2. Checking for resource existence  
3. Performing the update safely  

Here’s a production-ready implementation:

```javascript
// PUT endpoint to update a user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  
  // Validate update fields
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Name and email are required for updates' 
    });
  }

  // Check if user exists
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user with transaction (critical for safety)
    db.run(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, userId],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Update failed' });
        }
        res.json({ 
          id: userId,
          message: 'User updated successfully'
        });
      }
    );
  });
});
```

**Why this works**:  
- Transactions ensure atomic updates (no partial writes)  
- `404` responses prevent "user not found" errors from breaking workflows  
- `400` handles missing update fields early  
- Always return updated data (not just confirmation)  

### Delete

Deleting a resource follows a strict pattern:  
1. Verify resource existence  
2. Perform safe deletion  
3. Return confirmation  

Here’s the implementation:

```javascript
// DELETE endpoint to remove a user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  
  // Check if user exists
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Perform deletion
    db.run('DELETE FROM users WHERE id = ?', [userId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Deletion failed' });
      }
      res.json({ 
        id: userId,
        message: 'User deleted successfully'
      });
    });
  });
});
```

**Critical safeguards**:  
- `404` responses prevent accidental deletions of non-existent resources  
- `500` errors isolate database issues without exposing stack traces  
- Always return a confirmation message (not just a status code)  

| HTTP Method | Endpoint      | Description                     | Status Code | Key Use Case                     |
|--------------|----------------|----------------------------------|--------------|-----------------------------------|
| POST          | /users         | Create new user                 | 201 Created  | Adding new resources             |
| GET            | /users         | List all users                  | 200 OK       | Retrieving collections           |
| GET            | /users/:id     | Get single user by ID           | 200 OK       | Resource lookup                 |
| PUT            | /users/:id     | Update user details             | 200 OK       | Modifying existing resources     |
| DELETE         | /users/:id     | Remove user                     | 200 OK       | Permanent resource deletion     |

### Summary

We’ve covered the complete CRUD workflow with **real-world examples** using Express and SQLite:  
- **Create**: Validate input, return `201` with new resource  
- **Read**: Handle both listings and single-resource lookups with error checks  
- **Update**: Ensure data integrity via existence checks and atomic transactions  
- **Delete**: Safeguard against accidental deletions with explicit validation  

These patterns form the bedrock of reliable REST APIs. Remember: **always validate input**, **handle errors explicitly**, and **use appropriate HTTP status codes**. With these principles, you’ll build APIs that scale from simple prototypes to production-grade systems. Keep building! 🚀