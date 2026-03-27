## Authentication

🔑 **Authentication is the cornerstone of secure distributed systems**, ensuring that users and services can be trusted to access resources without compromising security. In this section, we dive deep into two foundational protocols: **OAuth** and **JWT**—the workhorses of modern distributed authentication. Let’s build confidence through practical examples and clear comparisons.

### OAuth

OAuth is an **open-standard authorization framework** designed to enable applications to securely delegate authorization to third-party services without sharing credentials. It solves the critical problem of *how* a client (e.g., your web app) can access user resources on an authorization server (e.g., Google, GitHub) while keeping user passwords confidential.

In distributed systems, OAuth 2.0 (the current standard) operates via a **client-server architecture** with three key components:
- **Client**: Your application requesting access (e.g., a web app)
- **Authorization server**: Validates credentials and issues tokens (e.g., Google’s servers)
- **Resource server**: Protects user data (e.g., your backend API)

Here’s a concrete example using the **Authorization Code Flow** (ideal for web applications):

1. The client redirects users to the authorization server with a `redirect_uri` and `client_id`.
2. Users log in and grant permission.
3. The authorization server redirects back with an **authorization code**.
4. The client exchanges the code for an **access token** (which grants limited access).

```javascript
// Step 1: Redirect user to Google's OAuth 2.0 endpoint
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&response_type=code&scope=profile`;

// Step 2: Handle redirect response (e.g., in your web app)
const code = request.query.code; // Authorization code from Google

// Step 3: Exchange code for access token
const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  body: `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&grant_type=authorization_code`,
});
```

**Why OAuth shines in distributed systems**:
- **Decouples authentication from application logic**: Your backend doesn’t store passwords—only tokens are shared.
- **Fine-grained permissions**: You can request *only* profile access (not email, contacts, etc.).
- **Stateless validation**: Tokens are self-contained, so services can validate them independently without database lookups.

> 💡 **Pro tip**: Use OAuth 2.0 with **PKCE** (Proof Key for Code Exchange) for mobile/desktop apps to prevent code interception attacks. This adds a `code_verifier` and `code_challenge` to the flow.

### JWT

JSON Web Tokens (JWT) are **self-contained, stateless tokens** that encode claims (user data) in a compact, URL-safe format. They’re ideal for distributed systems because they allow services to independently verify identity without relying on a centralized session store.

A JWT consists of three parts (separated by `.`):
1. **Header**: Specifies the signing algorithm (e.g., `HS256`).
2. **Payload**: Contains user claims (e.g., `userId`, `role`).
3. **Signature**: Ensures integrity via a secret key.

Here’s a real-world example using Node.js and the `jsonwebtoken` library:

```javascript
// Generate a JWT token (e.g., in your API gateway)
const token = jwt.sign(
  { 
    userId: '12345',
    role: 'admin'
  },
  'super-secure-secret-key', // Never hardcode this in production!
  { expiresIn: '1h' }
);

// Validate the token (e.g., in your microservice)
const decodedToken = jwt.verify(token, 'super-secure-secret-key');
console.log(decodedToken); // { userId: '12345', role: 'admin' }
```

**Why JWT is indispensable in distributed systems**:
- **Stateless validation**: Each service validates the token independently—no database queries needed.
- **Tiny size**: JWTs are ~500 bytes (vs. 10+ KB for session cookies).
- **Flexible claims**: Add custom fields like `device_id` or `ip_address` without changing the token structure.

**Real-world workflow in a microservice architecture**:
1. User logs in via OAuth 2.0 → gets an access token from Google.
2. Frontend sends the token to your API gateway.
3. API gateway validates the token → forwards request to the relevant microservice.
4. Microservice checks `role` claim → grants access to admin-only endpoints.

#### JWT vs. OAuth: Key Differences

| Feature                | OAuth 2.0                          | JWT                                  |
|------------------------|------------------------------------|--------------------------------------|
| **Primary role**       | Authorization framework            | Token format for claims              |
| **State**              | Stateful (uses tokens)            | Stateless (token self-contained)    |
| **Flow complexity**    | Requires redirect steps            | Direct token exchange               |
| **Use case**           | Web/mobile apps (user consent)     | Microservices, API gateways         |
| **Security focus**     | Preventing credential leaks       | Preventing token tampering          |

> 💡 **Critical insight**: OAuth 2.0 *can use* JWT tokens as access tokens (e.g., in the Authorization Code Flow). JWT is a *token format* that OAuth 2.0 *implements*—they work together seamlessly.

## Summary

🔑 **Authentication in distributed systems is about trust without sharing secrets**. OAuth 2.0 provides a standardized way to delegate authorization across services, while JWT offers a lightweight, stateless token for verifying user identity. Together, they enable secure, scalable architectures where services can independently validate credentials without centralized state. ✅