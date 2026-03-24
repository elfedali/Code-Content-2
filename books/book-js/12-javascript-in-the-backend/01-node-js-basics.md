## Node.js Basics

Node.js transforms JavaScript from a browser-only language into a powerful backend solution by running JavaScript on your server. This section dives into the foundational concepts that make Node.js work—modules, file systems, and event-driven architecture. Let’s build your confidence step by step.

### Modules

Node.js uses **modules** to organize code into reusable, isolated units—like building blocks for your application. This avoids global namespace pollution and enables clean code structure.

You have two primary module systems in Node.js:
- **CommonJS** (traditional Node.js): Uses `require()` and `module.exports`
- **ES6 Modules** (modern): Uses `import` and `export` (with `type: "module"`)

Here’s how to create and use a module in practice:

```javascript
// utils.js (module file)
module.exports = {
  multiply: (a, b) => a * b,
  add: (a, b) => a + b
};
```

```javascript
// app.js (main file)
const utils = require('./utils'); // CommonJS

console.log(utils.multiply(3, 4)); // 12
console.log(utils.add(5, 7));     // 12
```

For ES6 modules (requires `"type": "module"` in `package.json`):

```javascript
// utils.js
export const multiply = (a, b) => a * b;
export const add = (a, b) => a + b;
```

```javascript
// app.js
import { multiply, add } from './utils.js';

console.log(multiply(3, 4)); // 12
console.log(add(5, 7));     // 12
```

**Why modules matter**: They enable code reuse, reduce complexity, and make your backend scalable. You’ll never have to rewrite the same logic across multiple files again.

### File System

Node.js provides the `fs` (File System) module to interact with the file system—reading, writing, and manipulating files without blocking your application. This is critical for server-side operations.

The `fs` module has **asynchronous** and **synchronous** methods. We’ll focus on asynchronous operations (non-blocking) since they’re essential for responsive servers.

Here’s a practical example of reading a file:

```javascript
const fs = require('fs');

// Asynchronous file read
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File content:', data);
});
```

**Key methods**:
- `fs.readFile(path, [encoding], callback)`: Reads a file asynchronously
- `fs.writeFile(path, data, [encoding], callback)`: Writes data to a file asynchronously
- `fs.stat(path, callback)`: Checks file metadata (size, type, etc.)

**Critical note**: Always handle errors with callbacks (or promises) to avoid crashes. Here’s a safer write example with error handling:

```javascript
fs.writeFile('output.txt', 'Hello, Node.js!', 'utf8', (err) => {
  if (err) {
    console.error('Write failed:', err.message);
    return;
  }
  console.log('File written successfully!');
});
```

**Why this matters**: Without asynchronous file operations, your server would freeze while waiting for disk I/O—making it unusable for real-world applications. Node.js solves this with non-blocking I/O.

### Event-driven Architecture

Node.js’s **event-driven architecture** is its superpower. Instead of waiting for operations to complete (like traditional servers), it uses events to trigger actions when things happen. This creates highly responsive, non-blocking applications.

The core idea:
1. **Event emitter** creates a "hub" for events
2. **Listeners** register to handle specific events
3. **Event loop** processes events as they occur

Here’s a minimal example using Node.js’s built-in `events` module:

```javascript
const EventEmitter = require('events');

// Create an event emitter instance
const myEmitter = new EventEmitter();

// Register a listener for 'data' event
myEmitter.on('data', (message) => {
  console.log(`Received: ${message}`);
});

// Trigger the event
myEmitter.emit('data', 'Hello from event loop!');
```

**Real-world application**: When a user sends a request to your server:
1. The request arrives → triggers an `http` event
2. Your code processes it → emits a `response` event
3. The client receives the response → completes the interaction

**Why this is revolutionary**: Unlike traditional server models that block threads, Node.js handles thousands of concurrent connections with a single thread. This makes it ideal for real-time apps (chat, gaming, IoT).

| **Concept**          | **Traditional Server**       | **Node.js (Event-Driven)**     |
|-----------------------|------------------------------|--------------------------------|
| Thread management     | Multiple threads per request | Single thread, event loop     |
| Scalability            | Limited by CPU cores         | Handles thousands of connections |
| I/O operations        | Blocks until complete        | Non-blocking (async)          |

This architecture lets your server handle high traffic without crashing—perfect for modern web applications.

## Summary

Node.js basics form the bedrock of server-side JavaScript: **modules** enable clean code reuse, **file system** operations are non-blocking by default, and **event-driven architecture** powers responsive, high-throughput applications. Together, they turn JavaScript into a full-stack language—running seamlessly from browser to server. 🚀