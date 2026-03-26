## REST API Principles

When designing a backend API, you're essentially creating the interface through which your system communicates with clients (like web browsers, mobile apps, or other services). The **REST (Representational State Transfer)** architectural style provides a robust foundation for building scalable, reliable systems. By adhering to consistent patterns across endpoints, HTTP methods, and response semantics, you ensure your API remains intuitive, maintainable, and resilient. Let’s break down the three pillars of effective REST API design.

### Endpoints
Endpoints define the specific URLs where clients interact with your API. They should follow a clear, predictable structure to minimize confusion and enable efficient client-side processing.  

**Key principles**:  
- Use resource-based paths (e.g., `/users`, `/users/{id}`)  
- Avoid verb-based paths (e.g., `/create-user` is discouraged)  
- Include meaningful parameters in paths (e.g., `{id}` for resource identifiers)  

**Example**:  
```text
/users
/users/{id}
/users/{id}/orders
```

*Why this matters*: Consistent endpoint patterns allow clients to predict behavior without documentation. For instance, `/users/{id}/orders` explicitly signals that a user’s order history is a nested resource—reducing cognitive load and enabling intuitive client-side logic.

---

### HTTP Methods
HTTP methods dictate the action a client wants to perform on a resource. Using the correct method ensures your API aligns with REST constraints (e.g., idempotency, statelessness) and avoids unintended side effects.

**Critical rules**:  
- **`GET`** = Read existing resources (no side effects)  
- **`POST`** = Create new resources (no side effects)  
- **`PUT`** = Replace entire resources (side effects possible)  
- **`PATCH`** = Partially update resources (minimal side effects)  
- **`DELETE`** = Remove resources (side effects possible)  

**Real-world example**:  
In a banking API:  
- `POST /transfers` initiates a new transfer (creates a resource)  
- `DELETE /transfers/{id}` cancels a pending transfer (removes a resource)  

*Why this matters*: Misusing methods causes bugs. For instance, using `GET` to create a resource would violate REST’s principle that `GET` should *only* return existing data. Always return `201 Created` for successful `POST` operations to signal new resource creation.

---

### Status Codes
Status codes provide immediate feedback about request outcomes. Returning the right code enables clients to handle errors gracefully and avoid unnecessary retries.

**Common status codes and usage**:  
| Code | Meaning          | When to Use                                                                 |
|------|-------------------|-----------------------------------------------------------------------------|
| `200` | OK                | Request succeeded (e.g., `GET /users` returns user data)                    |
| `201` | Created           | Resource was created (e.g., `POST /users` returns new user)                 |
| `400` | Bad Request       | Client error (e.g., invalid JSON payload)                                   |
| `401` | Unauthorized      | Missing/invalid authentication token                                        |
| `403` | Forbidden         | Client authenticated but lacks permissions                                  |
| `404` | Not Found         | Resource doesn’t exist (e.g., user ID not found)                             |
| `500` | Internal Server Error | Server-side failure (e.g., database timeout)                              |

**Real-world example**:  
When a user tries to register with a duplicate username:  
```json
{
  "error": {
    "code": "409",
    "message": "Username already exists"
  }
}
```
Here, `409 Conflict` signals a client-side conflict (not a server error), so the client can retry with a unique username.

*Why this matters*: Returning `409` instead of `200` prevents clients from assuming the operation succeeded when it actually failed. This reduces retry loops and improves system resilience.

---

## Summary

REST API design is the cornerstone of scalable and reliable backend systems. By following **clear endpoint conventions**, **precise HTTP methods**, and **meaningful status codes**, you ensure your API is intuitive, robust, and maintainable. Remember: the right design choices today prevent cascading issues tomorrow.  

✅