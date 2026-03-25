## Code Quality

### Error Handling
Robust error handling prevents crashes and enables graceful recovery in production applications. Always use `try`/`catch` with `async`/`await` for async operations and implement global error handlers to centralize logging and recovery.

**Best Practice Example**:
```javascript
// Clean error handling with context
async function processPayment(paymentData) {
  try {
    const payment = await paymentService.create(paymentData);
    return payment;
  } catch (error) {
    // Log with contextual data (user ID, transaction ID)
    logger.error(
      { 
        userId: paymentData.userId, 
        transactionId: paymentData.transactionId,
        error: error.message 
      },
      "Payment processing failed"
    );
    throw error; // Re-throw for upper layers to handle
  }
}
```

**Key Principles**:
- Never swallow errors (always re-throw)
- Include contextual data in logs (user IDs, transaction IDs)
- Use structured logging for traceability
- Implement circuit breakers for external services

💡 **Remember**: Always log errors with **context** (like user ID, request ID) to make debugging easier.

---

### Logging
Structured logging is critical for debugging, monitoring, and observability. Avoid unstructured logs (e.g., `console.log` with strings) and use libraries designed for Node.js.

**Best Practice Example** (using pino):
```javascript
// Initialize structured logger
const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

// Log with contextual data
logger.info(
  { 
    userId: 'user_123', 
    action: 'login', 
    ip: '192.168.1.1' 
  },
  'User successfully logged in'
);
```

**Key Principles**:
- Use JSON-formatted logs for machine readability
- Include request IDs for distributed tracing
- Never log sensitive data (use environment variables)
- Rotate logs and set retention policies

---

### Clean Code
Clean code ensures maintainability and scalability. Focus on readability, minimal complexity, and explicit intent.

**Best Practice Example**:
```javascript
// Clean module with clear contracts
const { User } = require('./models');

/**
 * Creates a new user with validation
 * @param {Object} userData - Required fields: email, password
 * @returns {Promise<User>}
 * @throws {Error} If validation fails or database error
 */
async function createUser(userData) {
  // Validate input early
  if (!userData.email || !userData.password) {
    throw new Error('Email and password are required');
  }

  // Create user in database
  const user = new User(userData);
  await user.save();

  return user;
}

module.exports = { createUser };
```

**Key Principles**:
- Meaningful names (e.g., `createUser` not `calc`)
- Early returns for simplicity
- Clear docstrings for parameters and return types
- Single responsibility per function
- Avoid global variables

💡 **Remember**: Clean code is a continuous process—refactor regularly and write tests first.

---

## Summary
In this section, we've covered three pillars of code quality in Node.js:

- **Error Handling**: Use `try`/`catch` with contextual logging to prevent crashes
- **Logging**: Adopt structured logging (like pino) with request IDs for traceability
- **Clean Code**: Prioritize meaningful names, early returns, and explicit contracts

By mastering these practices, you'll build applications that are **robust**, **traceable**, and **easy to scale**.  

✅