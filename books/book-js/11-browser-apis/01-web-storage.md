## Browser APIs: Web Storage

Web Storage is a fundamental browser API that enables web applications to store data on the client side. This capability is essential for building responsive, stateful applications without constantly communicating with servers. In this section, we'll explore two critical implementations: `localStorage` and `sessionStorage`. These APIs allow you to manage data that persists across sessions or operates within the current session—both vital for modern web development.

### localStorage

`localStorage` provides persistent storage for client-side data that remains available **even after the browser is closed and reopened**. This makes it ideal for long-term user preferences, caching, and offline data.

#### Key Characteristics
- **Persistence**: Data remains until explicitly cleared by your application or manually by the user
- **Storage Limit**: Typically 5–10 MB per domain (varies by browser)
- **Data Type**: Only strings; objects must be converted to JSON strings
- **Access**: Accessed via the global `localStorage` object

#### Basic Usage
Here's how to store and retrieve data:

```javascript
// Store a string value
localStorage.setItem('username', 'JohnDoe');

// Retrieve a string value
const username = localStorage.getItem('username');
console.log(username); // Output: "JohnDoe"

// Update a value
localStorage.setItem('username', 'JaneDoe');

// Remove a value
localStorage.removeItem('username');

// Clear all storage
localStorage.clear();
```

#### Storing Objects
Since `localStorage` only supports strings, objects must be serialized using `JSON.stringify()`:

```javascript
// Store an object
const user = { name: 'Alice', age: 30 };
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse the object
const storedUser = localStorage.getItem('user');
const parsedUser = JSON.parse(storedUser);
console.log(parsedUser); // Output: { name: "Alice", age: 30 }
```

#### Real-World Example: User Preferences
Imagine a web app that lets users save their preferred theme (light/dark). Here's how `localStorage` handles it:

```javascript
// Save user preference
function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

// Get user preference (defaults to "light")
function getTheme() {
  return localStorage.getItem('theme') || 'light';
}

// Usage
saveTheme('dark');
console.log(getTheme()); // Output: "dark"
```

This pattern enables persistent user preferences without server roundtrips.

#### Important Notes
- **Keys must be strings**: Non-string keys cause errors
- **Avoid overwriting**: Always check if a key exists before updating
- **Security**: Sensitive data should never be stored here; use HTTPS and server-side validation

### sessionStorage

`sessionStorage` provides temporary storage that **automatically clears when the browser tab is closed**. This makes it ideal for session-specific data like authentication tokens.

#### Key Characteristics
- **Session Duration**: Data persists only until the browser tab is closed
- **Storage Limit**: Typically 5–10 MB per domain (same as `localStorage`)
- **Data Type**: Strings (objects require JSON serialization)
- **Access**: Accessed via the global `sessionStorage` object

#### Basic Usage
Here's how to store and retrieve session data:

```javascript
// Store a string value
sessionStorage.setItem('token', 'abc123');

// Retrieve a string value
const token = sessionStorage.getItem('token');
console.log(token); // Output: "abc123"

// Update a value
sessionStorage.setItem('token', 'def456');

// Remove a value
sessionStorage.removeItem('token');

// Clear all storage
sessionStorage.clear();
```

#### Real-World Example: Session Tokens
In an authentication flow, store tokens securely within the session:

```javascript
// Save session token after login
function saveSessionToken(token) {
  sessionStorage.setItem('authToken', token);
}

// Check authentication status
function isAuthenticated() {
  return sessionStorage.getItem('authToken') !== null;
}

// Usage
saveSessionToken('xyz789');
console.log(isAuthenticated()); // Output: true
```

This ensures tokens are discarded when the tab closes, enhancing security.

#### Important Notes
- **Session-bound**: Data disappears when the tab closes (no persistence)
- **Use cases**: Authentication tokens, form data, temporary state

### localStorage vs sessionStorage: Key Differences

| Feature                | `localStorage`                          | `sessionStorage`                       |
|------------------------|------------------------------------------|-----------------------------------------|
| **Persistence**        | Persists until cleared by user/app       | Persists until tab closes              |
| **Data Scope**         | Entire browser (domain-wide)             | Current tab only                       |
| **Storage Limit**      | 5–10 MB per domain (varies)              | 5–10 MB per domain (varies)            |
| **Use Case**           | User preferences, offline caching        | Session tokens, temporary state        |
| **Clearing Data**      | `localStorage.clear()`                  | `sessionStorage.clear()`               |

## Summary

We've explored two critical browser APIs for client-side data storage: `localStorage` and `sessionStorage`. `localStorage` is perfect for persisting user preferences or data across sessions, while `sessionStorage` handles temporary data that should be discarded when the browser tab closes. Both are essential for building robust web applications without overloading the server. 🛠️