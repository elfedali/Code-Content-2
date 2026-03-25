## Designing APIs

### REST Principles

REST (Representational State Transfer) is a design philosophy that guides the creation of scalable, maintainable web services. It’s not a protocol but a set of constraints that define how resources interact over HTTP—making it ideal for building modern APIs. Understanding these principles ensures your API is predictable, efficient, and aligned with industry best practices.

The core REST principles are:

1. **Statelessness**: Each request contains all information needed to process it. Servers don’t store session data between requests. This enables horizontal scaling and simplifies caching.
2. **Client-Server Architecture**: Separation of concerns between clients and servers allows independent development, deployment, and scaling.
3. **Uniform Interface**: Consistent use of standard operations (`GET`, `POST`, `PUT`, `DELETE`) and resource identifiers (URIs) creates predictable interactions.
4. **Layered Systems**: Middleware (e.g., load balancers, gateways) can be added without changing client behavior.
5. **Cacheable Responses**: Servers can mark responses as cacheable (e.g., `200 OK` with `Cache-Control: max-age=3600`), reducing latency and bandwidth.

**Why these matter**: Statelessness enables your API to handle thousands of requests simultaneously without session management overhead. Uniform interfaces make your API intuitive for developers—like how `GET /users` returns a list of users while `POST /users` creates a new one. Here’s a concrete example:

```http
GET /v1/users HTTP/1.1
Host: api.example.com
```

The server responds with a `200 OK` and a JSON array of users. Crucially, the server doesn’t remember this request—it treats every `GET /v1/users` as a fresh request. This statelessness allows your API to scale horizontally during traffic spikes.

**Avoiding common pitfalls**: REST isn't just HTTP—it’s a *design pattern*. Don’t confuse REST with HTTP verbs (e.g., `POST` is a verb, but `users` is a resource). Your URLs should represent *resources*, not actions. For instance:
- ✅ `GET /users` (list resources)
- ❌ `GET /users/list` (verb in URL)

This distinction ensures your API follows REST’s resource-oriented model while leveraging HTTP’s built-in semantics.

🌐

### Endpoints Structure

A well-structured endpoint hierarchy is the backbone of a maintainable REST API. It should be intuitive, scalable, and follow consistent conventions. Here’s how to implement it:

#### 1. **Versioning**
Place API versions in the URL to manage backward compatibility:
```http
GET /v1/users HTTP/1.1
```
- **Why**: Prevents breaking changes from affecting existing clients (e.g., v1 clients won’t break when v2 launches).
- **Best practice**: Use `v1` for initial releases (avoid `api/v1` for simplicity).

#### 2. **Resource Hierarchy**
Group related resources under logical paths:
```http
/v1/users       → Collection of users
/v1/users/{id}  → Individual user
/v1/users/{id}/orders → User-specific orders
```
- **Plural vs. singular**: Use plurals for collections (`users`), singular for individual items (`user`).

#### 3. **HTTP Methods**
Map actions to HTTP verbs (not URLs):
| Action          | HTTP Method | Example URL                     |
|------------------|--------------|----------------------------------|
| List resources   | `GET`        | `/v1/users`                     |
| Create resource  | `POST`       | `/v1/users`                     |
| Update full      | `PUT`        | `/v1/users/{id}`                |
| Update partial   | `PATCH`     | `/v1/users/{id}`                |
| Delete resource  | `DELETE`    | `/v1/users/{id}`                |

#### 4. **Query Parameters**
Handle filtering/sorting via query strings (not URLs):
```http
GET /v1/users?page=1&limit=10&sort=name HTTP/1.1
```
- **Why**: Avoids URL bloat (e.g., `?page=1&limit=10` instead of `?page=1&limit=10&sort=name`).

#### 5. **Naming Conventions**
- **Avoid verbs**: Never use action verbs in URLs (e.g., `GET /users/create` is invalid; `POST /users` is correct).
- **Use snake_case**: For parameters (e.g., `user_id` not `userID`).

**Real-world example**: A user API with pagination and sorting:
```http
GET /v1/users?page=2&limit=50&sort=created_at&order=desc HTTP/1.1
```
The server returns:
```json
{
  "data": [
    { "id": 101, "name": "Alice" },
    { "id": 102, "name": "Bob" }
  ],
  "pagination": {
    "page": 2,
    "limit": 50,
    "total": 100
  }
}
```

**Why this works**: The URL clearly shows the resource (`users`), while query parameters handle dynamic behavior without altering the resource structure. This pattern scales cleanly as your API grows.

| Pattern              | Example URL                     | When to Use                          |
|----------------------|----------------------------------|---------------------------------------|
| Resource collection  | `/v1/users`                     | Listing all items                    |
| Resource detail      | `/v1/users/{id}`                | Getting a single item                |
| Resource creation    | `POST /v1/users`               | Adding new items                    |
| Resource update      | `PUT /v1/users/{id}`           | Full replacement                    |
| Resource update      | `PATCH /v1/users/{id}`         | Partial updates                     |
| Resource deletion    | `DELETE /v1/users/{id}`        | Removing items                      |

This structure ensures your API is self-documenting, predictable, and easy to extend—critical for long-term maintainability.

## Summary

In this section, we’ve explored the foundational REST principles and practical endpoint structuring techniques. By adhering to statelessness, uniform interfaces, and resource-oriented design, you create APIs that are scalable, secure, and intuitive. A clear endpoint hierarchy with versioning, consistent naming, and HTTP method mapping ensures your API remains maintainable even as it evolves. Remember: the goal isn’t just functionality—it’s building APIs that developers can use confidently. 🌟