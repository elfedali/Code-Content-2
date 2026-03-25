## Routing Basics

Welcome to the world of routing in Node.js HTTP servers! 🚀 Routing is the foundation that allows your server to respond to different HTTP requests based on the URL path and request method. In this section, we'll demystify how to handle URLs and HTTP methods—your first step toward building powerful, scalable applications. Let's dive in.

### URL Handling

When building an HTTP server, **URLs are the primary way clients communicate with your server**. In Node.js (especially with frameworks like Express), URLs are parsed into three key components:
1. **Path** (e.g., `/users`)
2. **Query string** (e.g., `?name=John&age=30`)
3. **HTTP method** (e.g., `GET`, `POST`)

Express simplifies this by automatically parsing URLs for you. Here’s how it works in practice:

```javascript
const express = require('express');
const app = express();

// Handle GET requests to /users
app.get('/users', (req, res) => {
  console.log('Path:', req.path); // '/users'
  console.log('Query parameters:', req.query); // {}
  res.send('Users list');
});

// Handle GET requests with query parameters
app.get('/users/:id', (req, res) => {
  console.log('Path parameter:', req.params.id); // '123'
  console.log('Full URL:', req.url); // '/users/123'
  res.send(`User ID: ${req.params.id}`);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Key concepts to remember**:
- `req.path` gives the URL path **without** query strings (e.g., `/users`)
- `req.query` is an object containing **query string parameters** (e.g., `{ name: 'John' }`)
- `req.params` captures **path parameters** (e.g., `:id` in `/users/:id`)

> 💡 **Pro tip**: Use `req.url` for the full URL string (path + query), but prefer `req.path` and `req.query` for cleaner code.

Let’s see a real-world example with query parameters:

```javascript
// Example: /search?q=coffee&page=2
app.get('/search', (req, res) => {
  console.log('Search term:', req.query.q); // 'coffee'
  console.log('Page number:', req.query.page); // '2'
  res.send(`Searching for ${req.query.q} on page ${req.query.page}`);
});
```

### Methods (GET, POST, PUT, DELETE)

HTTP methods define **how** clients interact with your server. Express provides dedicated route handlers for each method:

| Method | Description | Route Handler | Example Use Case |
|--------|-------------|----------------|------------------|
| `GET` | Retrieve data | `app.get()` | Fetching user profiles |
| `POST` | Create data | `app.post()` | Submitting login forms |
| `PUT` | Update data | `app.put()` | Modifying user profiles |
| `DELETE` | Remove data | `app.delete()` | Deleting user accounts |

Here’s how to implement each method:

```javascript
// GET: Fetch user by ID
app.get('/users/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// POST: Create a new user
app.post('/users', (req,, res) => {
  const newUser = { id: Date.now(), name: req.body.name };
  res.status(201).json(newUser);
});

// PUT: Update user details
app.put('/users/:id', (req, res) => {
  res.send(`Updated user ID: ${req.params.id}`);
});

// DELETE: Remove a user
app.delete('/users/:id', (req, res) => {
  res.send(`User ${req.params.id} deleted`);
});
```

**Critical notes**:
- Always use `req.body` for **JSON payloads** in POST/PUT requests
- `res.status(201)` indicates a **successful creation** (for POST)
- `res.status(204)` is used for **no-content responses** (e.g., DELETE)

> ✅ **Real-world practice**: For a login endpoint, you’d use `POST /login` to validate credentials and return a session token.

### Summary

Routing is where your server "decides" what to do for each incoming request. By mastering URL handling and HTTP methods:
1. You split requests into **path parameters** (`req.params`) and **query strings** (`req.query`)
2. You handle **four core methods** (`GET`, `POST`, `PUT`, `DELETE`) with dedicated Express handlers
3. You build **real-world applications** that respond to client interactions

This foundation lets you scale from simple APIs to enterprise-grade systems—starting with just a few lines of code. Ready to build your first route? 🌟