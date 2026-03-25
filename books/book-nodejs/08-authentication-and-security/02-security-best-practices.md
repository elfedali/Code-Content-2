## Security Best Practices

When building secure Node.js applications, security isn’t just a feature—it’s the foundation of trust. In this section, we’ll dive into four critical security practices that protect your applications from common threats while keeping your development process smooth. We’ll cover **hashing passwords**, **rate limiting**, **CORS configuration**, and **Helmet middleware**—each with practical examples you can implement immediately. Let’s build security into your code from day one.

### Hashing Passwords

Never store passwords in plaintext—this is a fundamental security violation that attackers can exploit with minimal effort. Instead, use **cryptographic hashing with salts** to transform passwords into irreversible strings. This ensures even if your database is compromised, attackers can’t reverse-engineer passwords. For Node.js, **bcrypt** is the industry-standard library for this purpose—it automatically handles salting, slow hashing, and resistance to brute-force attacks.

Here’s how to implement it in your Express app:

```javascript
const bcrypt = require('bcrypt');

// Hash a password (with salt)
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Compare a password against a hash
const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Usage example
const userPassword = 'SecureP@ss123!';
const hashedPassword = await hashPassword(userPassword);
console.log('Hashed Password:', hashedPassword); // $2b$10$... (irreversible string)
```

**Key takeaways**:  
- Always use a **slow hash algorithm** (bcrypt, Argon2) instead of fast algorithms like MD5.  
- **Never store plain text passwords**—this is non-negotiable.  
- Use **salt rounds** (e.g., 10–12) to slow down brute-force attacks.  
- Always **compare hashes** on login (never compare plaintext passwords).

> 💡 *Pro tip: Add password complexity checks (e.g., minimum length, special characters) using libraries like `password-validator` for stronger security.*

### Rate Limiting

Rate limiting prevents abuse by restricting the number of requests a client can make within a specific timeframe. This protects against **brute-force attacks**, **DDoS attacks**, and **overloading your server**. Without rate limiting, attackers can flood your API with requests to crash your application or exhaust your database.

In Node.js, the **express-rate-limit** middleware is the go-to solution. It’s lightweight, configurable, and works seamlessly with Express. Here’s how to set up request rate limits:

```javascript
const rateLimit = require('express-rate-limit');

// Apply rate limiting to all routes (e.g., 100 requests per minute per IP)
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,                 // Limit to 100 requests per window
  keyGenerator: (req) => req.ip, // Track by IP address
  standardHeaders: true,     // Enable standard headers
  skipEmpties: true,         // Skip empty requests
});

// Use in your route handler
const express = require('express');
const app = express();

app.use('/api/auth', loginLimiter); // Apply to authentication routes

app.post('/api/auth/login', (req, res) => {
  // Your login logic here
  res.json({ success: true });
});
```

**Key takeaways**:  
1. **`windowMs`**: Time window for rate limiting (e.g., 60 seconds = `60 * 1000`).  
2. **`max`**: Maximum requests allowed in the window (e.g., 100 requests per minute).  
3. **`keyGenerator`**: Defines how to identify users (IP address is common for basic security).  
4. **Standard headers**: Automatically adds `X-RateLimit-Limit`, `X-RateLimit-Remaining`, etc. for client-side monitoring.

> ⚠️ *Critical note: Always combine rate limiting with authentication*—otherwise, attackers can bypass it by using a single IP address across multiple sessions.

### CORS Configuration

**Cross-Origin Resource Sharing (CORS)** is a security mechanism that controls how web applications interact with resources from different domains. By default, browsers block requests from different origins (e.g., `https://yourapp.com` vs. `https://client-app.com`), which prevents malicious sites from stealing data. Misconfigured CORS can lead to **cross-site scripting (XSS)** attacks.

In Node.js, **express-cors** is the simplest way to configure CORS securely. Here’s a safe implementation that avoids common pitfalls:

```javascript
const cors = require('cors');

// Configure CORS with strict security settings
const corsConfig = {
  origin: ['https://yourapp.com', 'https://client-app.com'], // Only allow specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Enable cookies/authorization headers
  exposedHeaders: ['X-Auth-Token'], // Control which headers are exposed
  optionsSuccessStatus: 204, // Standard for preflight requests
};

const app = express();
app.use(cors(corsConfig));

// Example route with CORS
app.get('/api/data', (req, res) => {
  res.json({ data: 'Secure data' });
});
```

**Key takeaways**:  
- **`origin`**: List allowed domains (never use `*` for production—this exposes your app to all origins).  
- **`credentials`**: Set to `true` only if you’re sending cookies/authentication tokens.  
- **`optionsSuccessStatus`**: Ensures preflight requests (for CORS) return `204` (no content) instead of `403`.  
- **Always validate origins**—this is where most breaches happen.

> 🔒 *Security tip: Use the `credentials` option only when you need to send cookies (e.g., for authentication sessions).*

### Helmet

**Helmet** is a middleware that sets critical security headers to harden your Express app against common attacks like **XSS**, **clickjacking**, and **insecure HTTP headers**. It’s like a "security shield" for your server—automatically applying headers that browsers and servers use to enforce security.

Here’s how to implement Helmet with Express:

```javascript
const helmet = require('helmet');
const express = require('express');
const app = express();

// Apply Helmet (no configuration needed for most cases)
app.use(helmet());

// Optional: Customize specific headers (e.g., disable X-Frame-Options)
app.use(helmet.frameOptions({
  sameOrigin: true // Prevents clickjacking
}));

// Example route
app.get('/api/secure', (req, res) => {
  res.set('X-Content-Type-Options', 'nosniff'); // Prevents MIME sniffing
  res.json({ secure: true });
});
```

**Key takeaways**:  
- **Automatic headers**: Helmet adds headers like `Content-Security-Policy`, `X-Frame-Options`, and `X-XSS-Protection` by default.  
- **Customization**: Use Helmet’s options to fine-tune headers (e.g., `helmet.frameOptions` for clickjacking protection).  
- **Critical headers**:  
  - `Content-Security-Policy`: Blocks malicious scripts.  
  - `X-Frame-Options`: Prevents your site from being embedded in iframes.  
  - `X-XSS-Protection`: Enables browser-level XSS filtering.

> 🛡️ *Pro tip: Always run Helmet in production—never skip it. It’s one of the few middleware that adds more security than it removes.*

## Summary

In this section, we’ve covered four essential security practices for Node.js applications:  
1. **Hashing passwords** with bcrypt ensures passwords are never stored in plaintext.  
2. **Rate limiting** with `express-rate-limit` protects against brute-force and DDoS attacks.  
3. **CORS configuration** with `express-cors` securely controls cross-origin requests.  
4. **Helmet** adds critical security headers to harden your app against common vulnerabilities.  

Implementing these practices isn’t just about avoiding breaches—it’s about building applications users can trust. Start small: hash passwords today, and add rate limiting and Helmet before your next deployment. Security is a journey, not a destination. 🔒