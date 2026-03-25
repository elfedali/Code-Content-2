## Handling Requests and Responses

In Express.js, handling requests and responses forms the foundation of your web applications. This section dives deep into the core objects that power your API interactions—`req` (request) and `res` (response)—and covers essential techniques for sending JSON data and managing HTTP status codes. These concepts are critical for building reliable, production-ready applications.

### req and res Objects

The `req` object contains all information about the incoming HTTP request, while the `res` object handles the HTTP response you send back to the client. Understanding these objects is non-negotiable for effective Express.js development.

**Key properties and methods**:
- `req` holds request details: URL, method, headers, query parameters, body, cookies, etc.
- `res` controls responses: status codes, headers, body content, and streaming capabilities.

Here's a practical example demonstrating core usage:

```javascript
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  // Log request details (e.g., URL, method, query parameters)
  console.log(`Received request: ${req.method} ${req.url}`);
  console.log(`Query parameters: ${JSON.stringify(req.query)}`);
  
  // Send a simple response
  res.send('User data retrieved successfully!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Why this matters**:  
This example shows how to:
1. Access request metadata via `req`
2. Send plain text responses via `res.send()`
3. Handle query parameters (`req.query`)
4. Maintain clean server logic without complex middleware

**Pro tip**: Always use `res` for responses—never directly manipulate the HTTP response stream. Express handles all the HTTP protocol details for you.

### Sending JSON

JSON responses are the standard for modern web APIs. Express provides the `res.json()` method to send structured data with automatic JSON serialization.

**Real-world implementation**:

```javascript
app.get('/api/users', (req, res) => {
  // Simulate user data retrieval
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  // Send JSON response with 200 status
  res.json(users);
});
```

**Key behaviors**:
- Automatically sets `Content-Type: application/json` header
- Handles JavaScript → JSON conversion
- Returns HTTP `200 OK` by default
- Accepts optional status code chaining: `res.status(201).json(...)`

**Advanced use cases**:
1. **Error handling**: Send structured errors with specific status codes:
```javascript
res.status(400).json({ 
  error: 'Invalid email format', 
  details: { email: 'missing@domain' }
});
```

2. **Custom headers**: Add headers to JSON responses:
```javascript
res.setHeader('X-Request-ID', 'req-12345');
res.json(users);
```

3. **Streaming responses**: For large datasets:
```javascript
const stream = users.map(user => `{"id":${user.id},"name":"${user.name}"}\n`);
res.setHeader('Content-Type', 'application/json');
res.write(stream);
res.end();
```

**Why JSON matters**: It’s the industry standard for API communication due to its lightweight, human-readable format and seamless integration with most frontend frameworks.

### Status Codes

HTTP status codes define the outcome of your request. Express allows explicit status code control via `res.status()` to provide meaningful client feedback.

**Critical status codes and use cases**:

| Code | Meaning                     | Example Use Case                                  |
|------|------------------------------|--------------------------------------------------|
| 200  | OK                           | Successful request                               |
| 201  | Created                       | Resource created (e.g., new user)                 |
| 400  | Bad Request                   | Invalid input (e.g., malformed JSON)              |
| 401  | Unauthorized                  | Missing/invalid authentication token              |
| 403  | Forbidden                     | Permission denied                                |
| 404  | Not Found                     | Resource doesn't exist                           |
| 500  | Internal Server Error         | Server-side failure (e.g., database connection)   |

**Practical implementation**:

```javascript
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simulate authentication check
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  if (email === 'admin' && password === 'secret') {
    res.status(201).json({ token: 'abc123' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
```

**Key patterns**:
1. **Always return status codes explicitly** for non-200 responses
2. **Use descriptive error messages** in JSON responses
3. **Chain status codes** with `res.status()` before sending data:
```javascript
res.status(404).json({ error: 'User not found' });
```

**Critical insight**: Status codes are *not* optional—they provide crucial context for clients to handle responses correctly. Ignoring them can lead to unpredictable client behavior.

💡 Remember: The `req` and `res` objects are your communication bridge between your application and the client. Master them to build APIs that are both robust and user-friendly.

## Summary

This section covered:
- The fundamental `req` (request) and `res` (response) objects that power Express.js interactions
- Practical JSON response handling with `res.json()`, including error scenarios
- Essential HTTP status codes and their implementation patterns for meaningful client feedback

These concepts form the bedrock of Express.js application development. By mastering request/response handling, you'll build APIs that are both technically sound and user-centric. Practice these patterns with real-world scenarios to solidify your understanding. 🚀