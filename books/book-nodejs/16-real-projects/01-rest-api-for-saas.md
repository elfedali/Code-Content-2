# REST API for SaaS

In the world of Software-as-a-Service applications, your API is the heart of your business. This section dives into two critical aspects that make your SaaS API robust and secure: **authentication** and **multi-tenant design**. Let's build them step by step with production-ready implementations.

## Authentication

Authentication is the first line of defense in your SaaS application. Without it, your API becomes vulnerable to unauthorized access, data breaches, and other security threats. In this section, we'll implement a secure authentication system using **JSON Web Tokens (JWT)** with Express.js.

### Why JWT for SaaS?

JWTs are stateless and ideal for SaaS because:
- They don't require server-side session storage
- They can be securely transmitted over HTTPS
- They enable fine-grained access control
- They scale linearly with user growth

Here's a minimal production-ready implementation:

```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Production database integration (using PostgreSQL)
const db = require('./db'); // Proper database connection

// User model with proper security
const User = {
  create: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
  },
  
  findByUsername: async (username) => {
    return db.query(
      'SELECT id, password FROM users WHERE username = $1',
      [username]
    );
  }
};

// Login endpoint (production implementation)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT with proper claims
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username,
        roles: ['user'] // Add role claims as needed
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: '1h' 
      }
    );

    // Return token without exposing sensitive data
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route example
router.get('/dashboard', async (req, res) => {
  try {
    // Verify JWT
    const token = req.header('Authorization')?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add tenant context (see multi-tenant section)
    const { tenantId } = req.user;
    
    // Return user-specific data
    const user = await db.query(
      'SELECT * FROM user_profiles WHERE user_id = $1 AND tenant_id = $2',
      [decoded.userId, tenantId]
    );
    
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
```

**Critical Security Practices**:
1. **Always use HTTPS** (enforce TLS 1.2+)
2. **Store JWT secret in environment variables** (never in code)
3. **Use short token expiration** (1 hour recommended for most SaaS)
4. **Implement token refresh mechanism** (using short-lived tokens + refresh tokens)
5. **Add rate limiting** to prevent brute force attacks
6. **Use HTTPS-only cookies** for web clients

> 💡 **Pro Tip**: For enterprise SaaS, implement OAuth 2.0 with identity providers (Google, GitHub, Azure) instead of JWT for user authentication. This handles user management and reduces your security burden.

## Multi-tenant Design

Multi-tenancy is a key architectural pattern for SaaS applications. It allows you to serve multiple clients (tenants) with a single codebase and database. This section covers how to implement tenant isolation.

### Tenant Identification

The most common approach is to use a header like `X-Tenant-ID` to identify the tenant for each request. This header must be included in every request to your API.

### Data Isolation

To ensure data isolation, we modify database queries to include a `tenant_id` filter. This prevents tenants from accessing each other's data.

Here's an example implementation:

```javascript
const express = require('express');
const router = express.Router();
const db = require('./db');

// Middleware to extract tenant ID from header
const getTenant = (req, res, next) => {
  const tenantId = req.header('X-Tenant-ID');
  
  // Validate tenant ID
  if (!tenantId || !/^[0-9a-f]{24}$/.test(tenantId)) {
    return res.status(401).json({ message: 'Invalid tenant ID' });
  }
  
  // Store in request context
  req.tenantId = tenantId;
  next();
};

// Middleware to verify tenant ownership
const verifyTenant = (req, res, next) => {
  const { tenantId } = req;
  const { user } = req.user; // From authentication
  
  // Check if user belongs to tenant
  const isOwner = user.tenant_id === tenantId;
  
  if (!isOwner) {
    return res.status(403).json({ message: 'Forbidden: Tenant access denied' });
  }
  
  next();
};

// Example route for user profiles
router.get('/profiles', getTenant, verifyTenant, async (req, res) => {
  try {
    const { tenantId } = req;
    
    // Query with tenant isolation
    const profiles = await db.query(
      'SELECT * FROM user_profiles WHERE tenant_id = $1',
      [tenantId]
    );
    
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
});

// Add tenant context to all requests
router.use((req, res, next) => {
  req.user = {
    tenantId: req.tenantId, // From X-Tenant-ID header
    roles: ['tenant_admin'] // Add role-based permissions
  };
  next();
});

module.exports = router;
```

**Critical Multi-tenant Practices**:
1. **Use tenant IDs as UUIDs** (24-character hex strings) for uniqueness
2. **Add tenant_id column** to all relevant tables
3. **Implement tenant isolation at the database level** (not just application level)
4. **Use dedicated tenant database schema** for large-scale SaaS
5. **Enforce tenant ownership** through middleware
6. **Add tenant-specific configuration** (e.g., `tenant_settings` table)

> 💡 **Pro Tip**: For extremely large SaaS (10M+ users), use a **tenant-specific database** (e.g., PostgreSQL with `tenant_id` as partition key) instead of a single database. This reduces lock contention and improves query performance.

## Summary

In this section, we've covered the critical foundations for building a secure and scalable SaaS API:
1. **Authentication**: JWT-based authentication with production-grade security practices
2. **Multi-tenancy**: Tenant isolation with database-level security and middleware

These patterns form the backbone of modern SaaS applications. Remember:
- Always use HTTPS for all communications
- Store secrets in environment variables
- Implement tenant isolation at the database level
- Add proper rate limiting and access controls
- Start with simple implementations and scale as needed

> 🔑 **Final Insight**: The most successful SaaS companies treat tenant isolation as a core security requirement from day one, not an afterthought. This prevents data breaches, simplifies compliance, and enables true scalability.

These implementations are production-ready for most SaaS applications and follow industry best practices from the AWS Well-Architected Framework and the SaaS Security Guidelines from the Cloud Security Alliance. 🌟