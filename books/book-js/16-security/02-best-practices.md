## Best Practices for JavaScript Security 🛡️

### Input Validation and Sanitization

When handling user input, **always validate and sanitize** to prevent cross-site scripting (XSS) and injection attacks. Never trust user-supplied data.

#### Basic Validation
For simple cases, validate data types and ranges:

```javascript
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

#### HTML Sanitization
Prevent XSS by sanitizing content before rendering:

```javascript
// Using DOMPurify (browser environment)
const sanitized = DOMPurify.sanitize(userInput);

// Using he (non-browser environments)
const sanitized = he.encode(userInput);
```

### Secure Handling of Secrets

**Never hardcode secrets** in your code. Use environment variables or secure vaults.

```javascript
// Bad: Hardcoded in code
const API_KEY = 'your_secret_key_here'; // This is dangerous!

// Good: Use environment variables
const API_KEY = process.env.API_KEY; // In Node.js
```

In browser applications, avoid storing secrets in `localStorage` or `sessionStorage`. Use HTTP-only cookies for tokens with `secure` and `httpOnly` flags.

### Avoiding Common Vulnerabilities

#### Cross-Site Scripting (XSS)
Prevent attacks through:
1. Input sanitization
2. Content Security Policy (CSP) headers
3. Proper `Content-Type` headers for API responses

**Example CSP header**:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted.cdn.com;
```

#### Cross-Site Request Forgery (CSRF)
Use tokens to prevent CSRF attacks:

```javascript
// Generate session token
const csrfToken = Math.random().toString(36).substr(2, 10);

// Store in secure cookie
document.cookie = `csrfToken=${csrfToken}; path=/; secure; httpOnly`;

// Include in form submissions
const form = document.createElement('form');
form.action = '/submit';
form.method = 'POST';
form.appendChild(document.createElement('input')).setAttribute('name', 'csrfToken');
form.appendChild(document.createElement('input')).setAttribute('name', 'csrfToken', csrfToken);
```

### Secure Communication

Always use HTTPS for data in transit. Avoid plain HTTP.

For tokens, implement short expiration times and secure signing:

```javascript
// JWT with 5-minute expiration (Node.js example)
const jwt = jwtEncode({
  payload: { user: 'john' },
  expiresIn: '5m'
});
```

*Note: Use trusted libraries like `jsonwebtoken` for production environments.*

### Error Handling and Logging

Avoid logging sensitive data in errors. Use try/catch to prevent stack traces from leaking information:

```javascript
try {
  // ...code that might throw
} catch (error) {
  // Log only non-sensitive information
  console.error(`Error occurred: ${error.message}`);
  // Never log stack traces in production
}
```

### Dependency Security

Regularly update dependencies to fix known vulnerabilities:

```bash
npm audit  # Check for vulnerabilities
npm audit fix  # Apply fixes
```

For comprehensive scanning, use tools like `snyk` or `dependabot`.

### Secure API and Web Applications

Implement the principle of least privilege and rate limiting:

```javascript
// Least privilege check (Node.js)
function canViewUser(userId) {
  const user = getUser(userId);
  return user && user.role === 'admin'; // Only admins can view
}

// Rate limiting (Express.js)
const rateLimit = require('express-rate-limit');
const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per IP per window
});
app.use('/api', apiRateLimit);
```

## Summary 🔒

In this section, we've covered critical security best practices for JavaScript applications. Remember to **always validate and sanitize inputs**, **never hardcode secrets**, **use HTTPS**, **implement proper error handling**, and **keep dependencies updated**. By following these practices, you can significantly reduce the risk of security breaches in your JavaScript applications.