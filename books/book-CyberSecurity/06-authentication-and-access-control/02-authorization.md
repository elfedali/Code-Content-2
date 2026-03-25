## Authorization

### Role-Based Access Control (RBAC)

Imagine you're managing a team of developers. You don't want to give every developer full access to the codebase. Instead, you create roles: `Developer`, `Manager`, and `QA`. Each role has specific permissions. This is the essence of **Role-Based Access Control (RBAC)**.

RBAC is a security model where permissions are assigned to roles, and users are assigned to roles. This creates a hierarchical structure that simplifies permission management. For example:

1. **User** `alice` is assigned the `Developer` role.
2. **Role** `Developer` has permissions: `read_code`, `write_code`.
3. **User** `bob` is assigned the `QA` role.
4. **Role** `QA` has permissions: `read_code`, `execute_tests`.

This model ensures users only have necessary permissions, reducing accidental or malicious data exposure.

Here's a concrete Python implementation:

```python
class RBAC:
    def __init__(self):
        self.users = {}
        self.roles = {}
        self.role_permissions = {}  # role -> list of permissions

    def add_user_to_role(self, user, role):
        if user not in self.users:
            self.users[user] = []
        self.users[user].append(role)

    def add_role_permissions(self, role, permissions):
        self.role_permissions[role] = permissions

    def check_permission(self, user, permission):
        for role in self.users.get(user, []):
            if permission in self.role_permissions.get(role, []):
                return True
        return False

# Initialize RBAC system
rbac = RBAC()

# Add roles and permissions
rbac.add_role_permissions("Developer", ["read_code", "write_code"])
rbac.add_role_permissions("QA", ["read_code", "execute_tests"])

# Assign users to roles
rbac.add_user_to_role("alice", "Developer")
rbac.add_user_to_role("bob", "QA")

# Check permissions
print(rbac.check_permission("alice", "read_code"))  # Output: True
print(rbac.check_permission("bob", "execute_tests"))  # Output: True
```

The `RBAC` class demonstrates role-based permission management. The `check_permission` method verifies user permissions by checking assigned roles and their permissions.

### Access Control Lists (ACLs)

Now, let's shift focus to **Access Control Lists (ACLs)**. Unlike RBAC, which groups permissions by roles, ACLs are explicit lists of permissions attached to a specific resource. Think of them as a "bill of rights" for a resource: who can do what on it.

ACLs are commonly used in file systems (like Linux) and network devices (like firewalls). For example, in a Linux file system, an ACL for a file might look like this:

```
user: alice -> read, write
user: bob -> read
group: developers -> read
```

This means:
- User `alice` has read and write permissions.
- User `bob` has read permissions.
- All users in the `developers` group have read permissions.

ACLs offer fine-grained control, enabling specific permissions for users/groups without creating new roles.

Here's a runnable Python example:

```python
# Simulate an ACL for a file
file_acl = {
    "report.txt": [
        {"user": "alice", "permissions": ["read", "write"]},
        {"user": "bob", "permissions": ["read"]},
        {"group": "developers", "permissions": ["read"]}
    ]
}

# Check if a user has permission for a file
def has_permission(file_name, user, permission):
    acl = file_acl.get(file_name)
    if not acl:
        return False
    for entry in acl:
        if entry.get("user") == user and permission in entry["permissions"]:
            return True
    return False

# Example usage
print(has_permission("report.txt", "alice", "read"))  # Output: True
print(has_permission("report:report.txt", "bob", "write"))  # Output: False
```

This example shows ACLs working at the resource level. Each file has its own ACL, and permissions are checked per entry.

**Key difference**: In RBAC, permissions are managed at the role level and applied to users. In ACLs, permissions are explicitly listed for each resource.

| **Feature**                     | **Role-Based Access Control (RBAC)**                          | **Access Control Lists (ACLs)**                             |
|---------------------------------|--------------------------------------------------------------|-------------------------------------------------------------|
| **Permission Management**      | Roles define permissions; users assigned to roles             | Explicit permissions listed per resource for users/groups    |
| **Scalability**                | High (roles can be grouped and permissions inherited)          | Moderate (complexity increases with many resources)           |
| **Use Case**                   | Enterprise applications, teams with defined roles              | File systems, network devices requiring fine-grained control |
| **Example**                    | Developer role: `read_code`, `write_code`                     | File `report.txt`: `alice` has `read`, `write`; `bob` has `read` |

## Summary

In this section, we explored two foundational authorization models: **Role-Based Access Control (RBAC)** and **Access Control Lists (ACLs)**. 

RBAC provides a hierarchical structure for managing permissions through roles, making it ideal for enterprise environments. ACLs offer granular control by explicitly listing permissions for specific resources, crucial for file systems and network devices. Both models are essential tools in cybersecurity, and understanding their differences helps choose the right approach for your security needs.

By mastering these concepts, you'll be better equipped to design robust access control systems that balance security and usability. 🔒