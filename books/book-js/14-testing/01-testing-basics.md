## Testing Basics

🧪 Testing is the backbone of reliable software. Without it, your JavaScript applications can be prone to bugs and inconsistencies. In this section, we'll explore the two foundational testing approaches: **unit testing** and **integration testing**.

### Unit Testing

Unit testing focuses on verifying individual units of code (like functions or methods) in isolation. This approach ensures each component works correctly before moving to more complex interactions.

**Why unit testing?**  
- **Isolation**: Each test runs in a controlled environment without dependencies  
- **Speed**: Tests execute quickly and can be run individually  
- **Early bug detection**: Issues are caught early in the development cycle  

Here's a concrete example using **Jest** to test a simple addition function:

```javascript
// add.test.js
const add = (a, b) => a + b;

describe('add', () => {
  it('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

This test checks that `add(2, 3)` returns `5`. For edge cases, we can add additional tests:

```javascript
describe('add', () => {
  it('handles negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});
```

**Key takeaway**: Unit tests are small, focused, and run quickly. They help catch bugs early and serve as living documentation for your code.

### Integration Testing

Integration testing goes beyond individual units to verify how different components work together. This approach ensures the system functions as expected when components interact.

**Why integration testing?**  
- **Component interaction**: Validates end-to-end workflows  
- **Real-world scenarios**: Tests data flow between components  
- **Dependency management**: Checks external dependencies (like APIs) are handled correctly  

Here's a practical example using two functions to process a user:

```javascript
// userService.js
const fetchUser = (userId) => {
  // In real apps, this would call an API
  return { id: userId, name: `User ${userId}` };
};

const processUser = (user) => {
  return user.name.toUpperCase();
};
```

Now, an integration test that validates the entire flow:

```javascript
// userFlow.test.js
describe('User processing', () => {
  it('processes a user from fetch to processed name', () => {
    const processedName = processUser(fetchUser(123));
    expect(processedName).toBe('USER 123');
  });
});
```

**Important**: In real-world applications, integration tests often use **mocks** for external dependencies (like APIs) to avoid network calls and make tests faster/reliable. For example, we might mock `fetchUser` to return a predefined value.

**Key takeaway**: Integration tests ensure the system works as a whole, but they're more complex than unit tests. They're critical for catching integration issues that unit tests alone can't reveal.

## Summary

In this section, we've explored the fundamentals of testing in JavaScript. **Unit testing** helps verify individual functions work correctly in isolation, while **integration testing** ensures components interact as expected. Both approaches are critical for building robust applications.