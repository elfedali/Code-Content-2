## Authorization

In the realm of backend systems, **authorization** is the critical process that determines *who* can access *what* within your application. After authentication (verifying a user's identity), authorization ensures that the user's privileges align with their role, responsibilities, and the security policies of your system. This section dives deep into the foundational concepts of **roles and permissions** and how they are implemented through **Role-Based Access Control (RBAC)**.

### Roles and Permissions

At its core, **roles and permissions** form the building blocks of access control. A *role* is a logical grouping of permissions that defines a user's capabilities within your system. Meanwhile, *permissions* are the specific actions a user can perform (e.g., `read`, `write`, `delete`). 

For instance, in a typical e-commerce application:
- A `customer` role might have permissions: `view_product`, `add_to_cart`.
- An `admin` role might have permissions: `view_product`, `edit_product`, `delete_product`.

The power of roles and permissions lies in their ability to enforce the **principle of least privilege**—ensuring users have only the permissions they absolutely need. This minimizes the attack surface and reduces the risk of accidental or malicious data exposure.

Let's illustrate with a concrete example. Imagine a simple user management system where we track roles and permissions:

```javascript
// In-memory representation of roles and permissions
const roles = {
  customer: {
    permissions: ['view_product', 'add_to_cart']
  },
  admin: {
    permissions: ['view_product', 'edit_product', 'delete_product']
  }
};
```

Here, each role is defined with a set of permissions. When a user is assigned a role (e.g., `customer`), they inherit all the permissions associated with that role.

### Role-Based Access Control (RBAC)

**Role-Based Access Control (RBAC)** is a widely adopted authorization model that structures permissions around roles. In RBAC, permissions are assigned to roles, and roles are assigned to users. This creates a hierarchical and scalable system where authorization decisions are made by checking the user's role against the permissions defined for that role.

#### How RBAC Works

The RBAC model operates through three key layers:
1. **Users**: Individuals or services that need access.
2. **Roles**: Logical groupings of permissions (e.g., `admin`, `viewer`).
3. **Permissions**: Specific actions (e.g., `create`, `read`, `update`, `delete`).

When a user attempts to perform an action, the system checks:
- Does the user belong to a role?
- Does that role have the required permission?

This check is typically done at the **decision point** (e.g., in a route handler or middleware).

#### RBAC Implementation Example

Let's build a minimal RBAC system in a Node.js backend using Express. We'll create a simple middleware that checks if a user has a specific permission.

```javascript
const express = require('express');
const app = express();

// In-memory storage for roles and permissions
const permissions = {
  admin: ['create_user', 'delete_user'],
  user: ['view_profile', 'update_profile']
};

// User data (for demonstration)
const users = {
  user1: { id: 1, role: 'user' },
  user2: { id: 2, role: 'admin' }
};

// Middleware to check if a user has a permission
const hasPermission = (requiredPermission) => {
  return (req, res, next) => {
    const { user } = req; // Assuming user is set in the request
    const role = user.role;
    const permission = permissions[role].includes(requiredPermission);
    
    if (permission) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  };
};

// Example route that requires 'delete_user' permission
app.get('/delete-user', hasPermission('delete_user'), (req, res) => {
  res.json({ message: 'User deleted' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

In this example:
- The `hasPermission` middleware checks if the current user's role has the specified permission.
- The `/delete-user` route is protected by requiring the `delete_user` permission, which is only available to users with the `admin` role.

#### Advantages of RBAC

RBAC offers several key advantages over simpler models:
- **Scalability**: As your system grows, you can add new roles and permissions without changing every user's access.
- **Enforceability**: Permissions are centralized, making it easier to audit and enforce security policies.
- **Flexibility**: Roles can be dynamically assigned, allowing for complex access scenarios (e.g., temporary roles for specific tasks).

#### RBAC vs. Other Models

| Model          | Description                                      | Best For                                  |
|----------------|--------------------------------------------------|--------------------------------------------|
| RBAC            | Permissions assigned to roles, roles to users     | Large systems with stable user roles      |
| ABAC            | Permissions based on attributes (e.g., user, time)| Dynamic, complex access scenarios         |
| ACL             | Permissions directly assigned to users            | Small systems with simple access needs    |

RBAC is particularly well-suited for enterprise applications where roles are stable and well-defined.

## Summary

In this section, we explored the critical concepts of **roles and permissions** and **Role-Based Access Control (RBAC)**. Roles provide a structured way to group permissions, while RBAC leverages these roles to enforce granular access control. By implementing RBAC, you can build systems that are both secure and scalable, ensuring that users have only the permissions they need. 🔑✅