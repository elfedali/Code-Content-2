## HTTP Module

The `http` module in Node.js is the foundational tool for building HTTP servers and clients. It provides the core capabilities for creating network servers that handle HTTP requests and responses. In this section, we'll dive deep into how to use the `http` module to build a basic HTTP server, handle incoming requests, and send responses. By the end, you'll have a solid understanding of Node.js HTTP server fundamentals.

### Creating Server

Creating an HTTP server in Node.js is straightforward. The `http` module provides the `createServer` method, which we use to define our server instance. Here's the basic structure:

```javascript
const http = require('http');

// Create a server instance
const server = http.createServer((req, res) => {
  // Request handling logic goes here
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

This code creates a server that listens for HTTP requests on port `3000`. The `req` object contains request details, and the `res` object is used to send responses (which we'll cover next). The `server.listen()` method starts the server and calls the callback when the server is ready to accept connections.

**Key points to remember**:
- The `createServer` function takes a **request listener** (a function that handles incoming requests)
- `server.listen()` starts the server and accepts connections
- Port `3000` is used here for simplicity; you can change this to any available port
- Always include an error handler for production servers (we'll cover this in a later section)

For a minimal production-ready server, you might want to add error handling:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Request handling logic
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

🌐

### Handling Requests

Once your server is running, it needs to handle incoming HTTP requests. The request listener function receives two key objects:
- `req`: The HTTP request object
- `res`: The HTTP response object (we'll cover sending responses next)

Here's what you can access in the `req` object:

| Property | Description | Example |
|----------|-------------|---------|
| `req.method` | HTTP request method | `'GET'`, `'POST'` |
| `req.url` | Requested URL path | `'/api/data'` |
| `req.headers` | Request headers | `{ 'Content-Type': 'application/json' }` |
| `req.connection` | Network connection details | `{ remoteAddress: '127.0.0.1' }` |

**Practical request handling examples**:

1. **Basic request handling** (responds to all methods):
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Get request method and URL
  const method = req.method;
  const url = req.url;
  
  // Respond with a simple message
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`You requested: ${method} ${url}`);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

2. **Route-based handling** (example for `/api/data`):
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Check for specific route
  if (req.url === '/api/data' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data: 'Sample API response' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

3. **Handling request bodies** (for POST requests):
```javascript
const http = require('http');
const bodyParser = require('body-parser'); // Note: For production, use middleware

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit') {
    const body = bodyParser.text(req).trim();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Received: ${body}`);
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Invalid request');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 300 0');
});
```

**Critical best practices**:
- Always call `res.writeHead()` before `res.end()` to set proper status codes and headers
- Handle errors explicitly (e.g., `try/catch` blocks)
- Validate input data to prevent security issues
- Use route-specific handlers for better organization

### Sending Responses

Sending HTTP responses is the final step in the request-response cycle. The `res` object provides methods to control the response:

1. **Set response headers** with `res.writeHead(statusCode, headers)`
2. **Send response body** with `res.end(body)`
3. **Handle errors** with `res.status` and error messages

**Response examples**:

1. **Basic HTML response**:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <body>
        <h1>Hello, World!</h1>
      </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

2. **JSON response**:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Success', data: { id: 1 } }));
});
```

3. **Error response**:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  try {
    // ... business logic
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Success');
  } catch (err) {
    console.error('Server error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Key response principles**:
- Always set a status code before sending the body (e.g., `200` for success, `404` for not found)
- Use appropriate content types (e.g., `text/html`, `application/json`)
- Close the connection with `res.end()` - never omit this!
- Handle errors at the response level to prevent unhandled exceptions

✅