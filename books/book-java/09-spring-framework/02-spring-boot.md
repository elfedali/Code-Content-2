## Spring Boot: Building REST APIs

Spring Boot simplifies the creation of robust, production-ready REST APIs with minimal configuration. As a modern Java framework, it eliminates boilerplate code and provides built-in support for dependency injection, auto-configuration, and embedded servers—making it the industry standard for enterprise-grade API development. Let’s build a practical REST API from scratch.

### Why Spring Boot Excels for REST APIs
Spring Boot’s **zero-configuration approach** accelerates API development while ensuring scalability and maintainability. Unlike traditional Spring MVC setups, Spring Boot auto-configures beans for HTTP clients, database connections, and security without explicit XML declarations. This allows developers to focus on business logic rather than infrastructure. For example, adding `spring-boot-starter-web` to your `pom.xml` instantly enables REST endpoints without manual setup.

### Creating Your First REST API
Start with a minimal project using Spring Initializr. Select **Spring Web** and **Lombok** to generate boilerplate-free code. Here’s a runnable example:

```java
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final List<User> users = new ArrayList<>();

    @GetMapping
    public List<User> getAllUsers() {
        return users;
    }

    @PostMapping
    public User createUser(@RequestBody User newUser) {
        users.add(newUser);
        return newUser;
    }

    // Helper class (omitted for brevity)
    static class User {
        private String name;
        private int age;
        // Lombok @Data generates getters/setters
    }
}
```

This endpoint exposes two critical operations:
- `GET /api/users` → Returns all users
- `POST /api/users` → Creates a new user

**Key insight**: Spring Boot automatically maps `@RestController` and `@RequestMapping` annotations to HTTP endpoints. The `@RequestBody` annotation binds JSON payloads to Java objects—no manual JSON parsing required.

### Handling HTTP Methods and Request Mapping
Spring Boot supports all standard HTTP methods with intuitive annotations:

| Method | Annotation          | Purpose                          |
|--------|----------------------|-----------------------------------|
| GET    | `@GetMapping`       | Retrieve resources                |
| POST   | `@PostMapping`      | Create new resources              |
| PUT    | `@PutMapping`       | Update existing resources         |
| DELETE | `@DeleteMapping`    | Remove resources                  |

**Practical example**: Update a user via `PUT`:

```java
@PutMapping("/{id}")
public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
    // Logic to update user by ID
    return updatedUser;
}
```

**Pro tip**: Use `@PathVariable` for route parameters (e.g., `id`) and `@RequestBody` for complex payloads. Spring Boot validates these automatically—no extra parsing logic needed.

### Request and Response Mapping
Spring Boot handles JSON serialization and deserialization seamlessly using Jackson. Here’s how it works:

1. **Request mapping**: JSON payloads are automatically converted to Java objects via `@RequestBody`.
2. **Response mapping**: Java objects are converted to JSON responses by default.

**Real-world example**: A `POST` request with JSON payload:
```json
{
  "name": "Alice",
  25
}
```
Becomes a `User` object in Java. Spring Boot returns a `201 Created` response with the same JSON structure.

**Customization**: Override default serialization with `@JsonFormat`:
```java
@JsonFormat(pattern = "yyyy-MM-dd")
private Date birthDate;
```

### Monitoring with Spring Boot Actuator
Spring Boot Actuator provides built-in endpoints for API health checks, metrics, and configuration. Enable it with `spring.actuator.enabled=true` in `application.properties`:

```yaml
# application.properties
management.endpoints.web.exposure.include=health,metrics,beans
```

**Critical endpoints**:
- `GET /actuator/health` → Returns system health status (`UP`/`DOWN`)
- `GET /actuator/metrics` → Shows response times, error rates, and throughput
- `GET /actuator/beans` → Lists all Spring beans (useful for debugging)

**Why this matters**: Actuator helps you monitor API performance without external tools—critical for production environments.

### Error Handling
Spring Boot includes automatic error handling via `@ControllerAdvice`. Handle exceptions globally:

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(404).body(new ErrorResponse("Resource not found", ex.getMessage()));
    }
}
```

**Key patterns**:
- Create custom exceptions (e.g., `ResourceNotFoundException`)
- Return consistent `4xx`/`5xx` responses with descriptive messages
- Use `@ExceptionHandler` for specific exception types

**Example response**:
```json
{
  "error": "Resource not found",
  "message": "User with ID 123 does not exist"
}
```

### Security for REST APIs
While beyond the scope of this section, Spring Boot integrates with **Spring Security** for API protection. A minimal setup:

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/api/users/**").hasRole("ADMIN")
                .anyRequest().permitAll()
            .and()
            .addFilterBefore(new JwtTokenFilter(), BasicFilterChain.class);
    }
}
```

This enforces role-based access control (RBAC) for `/api/users` endpoints—essential for enterprise applications.

## Summary
Spring Boot streamlines REST API development with zero-configuration HTTP endpoints, automatic JSON serialization, and built-in monitoring via Actuator. By leveraging annotations like `@RestController` and `@PostMapping`, you create production-ready APIs that scale effortlessly. Remember: **start small**, use `Spring Initializr` for boilerplate-free setup, and always prioritize error handling and monitoring for robust enterprise applications. 🚀