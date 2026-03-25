## REST API Development: Validation

When building REST APIs with Node.js, **input validation** isn't just a technical requirement—it's your first line of defense against security vulnerabilities, data corruption, and unexpected failures. Skipping this step can lead to malicious requests, malformed data, and ultimately, broken systems. In this section, we'll explore both foundational validation techniques and modern library solutions to ensure your APIs are robust, maintainable, and resilient.

### Input Validation

At its core, input validation means checking that incoming data meets your application's requirements *before* processing it. This happens at the request layer (e.g., in Express middleware) and is critical for three reasons:

1. **Security**: Prevents injection attacks, SQL injection, and other exploits
2. **Data integrity**: Ensures only valid data enters your database or business logic
3. **User experience**: Provides clear error messages instead of cryptic server errors

Here’s how to implement basic validation using vanilla JavaScript (no libraries) for a `POST /users` endpoint:

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// Simple validation middleware
const validateUser = (req, res, next) => {
  const { name, age } = req.body;
  
  // Required fields check
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }
  
  // Age validation (number >= 18)
  if (typeof age !== 'number' || age < 18) {
    return res.status(400).json({ error: 'Age must be a number >= 18' });
  }
  
  // Pass validation to next middleware
  next();
};

app.post('/users', validateUser, (req, res) => {
  // Business logic here
  res.json({ message: 'User created successfully' });
});

app.listen(3000);
```

This example demonstrates three key validation patterns:
- **Required fields**: Check for presence and type
- **Type validation**: Ensure data matches expected types (string, number, etc.)
- **Range constraints**: Validate values fall within acceptable bounds

**Pro tip**: Always return *specific* error messages that help users fix issues (e.g., `"Age must be a number >= 18"` instead of `"Invalid input"`). Generic errors create poor user experiences and security risks.

For more complex scenarios—like validating email formats, phone numbers, or custom business rules—consider these patterns:

1. **Regular expressions**: For strict format checks
2. **Custom validators**: Functions that implement domain-specific rules
3. **Null checks**: Handling optional fields

Here’s a practical example using regex for email validation:

```javascript
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Usage in middleware
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  next();
};
```

### Using Libraries

While vanilla validation works for simple cases, real-world APIs need **scalable, maintainable, and standardized** validation. That’s where libraries come in. They handle complex schemas, error formatting, and integration with your framework with minimal boilerplate.

#### Express-Validator: The Go-to for Express.js

For Express.js applications, **express-validator** is the most popular choice. It provides:
- Schema-based validation
- Built-in error formatting
- Integration with Express middleware
- Support for both request bodies and query parameters

Here’s how to implement the same `POST /users` endpoint with express-validator:

```javascript
const express = require('express');
const validate = require('express-validator');
const app = express();
app.use(express.json());

// Define validation rules
const userSchema = [
  validate.body('name').trim().not().isEmpty().withMessage('Name is required'),
  validate.body('age').isNumeric().custom((value) => {
    return value >= 18;
  }).withMessage('Age must be a number >= 18')
];

// Validation middleware
app.post('/users', 
  validate(userSchema).run((err) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    // Business logic here
    res.json({ message: 'User created successfully' });
  })
);

app.listen(3000);
```

**Key features of express-validator**:
- ✅ **Automatic error formatting**: Converts validation errors into structured JSON responses
- ✅ **Custom validators**: Write custom rules using `custom` callbacks
- ✅ **Field-level validation**: Validate individual request fields independently
- ✅ **Built-in message templates**: Customize error messages without regex

#### AJV: The JSON Schema Powerhouse

For more complex validation—like validating entire JSON structures against schemas—**ajv** (the JSON Schema validator) is indispensable. It works with any Node.js project but integrates seamlessly with Express.

Here’s a minimal example using ajv:

```javascript
const express = require('express');
const app = express();
const ajv = new (require('ajv'))();

// Define schema (JSON schema for user)
const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 2 },
    age: { type: 'number', minimum: 18 }
  },
  required: ['name', 'age']
};

// Register schema with ajv
ajv.addSchema('userSchema', userSchema);

app.post('/users', (req, res) => {
  try {
    const valid = ajv.validate('userSchema', req.body);
    if (valid) {
      // Process valid data
      res.json({ message: 'User created successfully' });
    } else {
      res.status(400).json({ errors: valid.errors });
    }
  } catch (err) {
    res.status(500).json({ error: 'Validation failed' });
  }
});

app.listen(3000);
```

**Why ajv stands out**:
- 🛠️ **Schema-first approach**: Define validation rules in JSON (e.g., `type`, `minLength`, `format`)
- 🌐 **Full JSON schema support**: Handles complex structures like nested objects
- 🔒 **Real-time validation**: Runs validation *before* data hits your business logic

#### Comparison of Validation Approaches

| Approach                | Best For                          | Complexity | Error Handling | Express Integration |
|-------------------------|------------------------------------|-------------|-----------------|---------------------|
| **Vanilla JS**          | Simple endpoints                  | Low         | Manual          | Manual              |
| **express-validator**   | Express apps with complex rules   | Medium      | Built-in        | Native              |
| **ajv**                 | JSON schema validation            | High        | Customizable    | Requires middleware |

## Summary

Input validation is non-negotiable in REST API development—**it’s your first line of defense against security flaws and data corruption**. Start with basic validation patterns (required fields, type checks, range constraints) using vanilla JavaScript to build foundational safety. Once your API scales, leverage libraries like **express-validator** for Express.js apps or **ajv** for JSON schema validation to handle complex rules with minimal code. Remember: always return *specific*, actionable error messages instead of generic failures. With these practices, you’ll create APIs that are secure, maintainable, and user-friendly from day one. 🛡️