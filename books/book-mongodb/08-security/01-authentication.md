## Authentication

In MongoDB, authentication is the cornerstone of securing your database. This section dives into the two critical components that form the backbone of MongoDB's authentication system: **Users** and **Roles**. By mastering these concepts, you'll be able to implement robust access control that protects your data while ensuring your application runs smoothly.

### Users

At the heart of MongoDB's authentication model lies the concept of **Users**. Each user is a unique entity with a username, password, and associated privileges (defined by roles). Users are created within a specific database, and they are the primary way to authenticate connections to MongoDB.

To create a user, you use the `createUser` command. This command is typically run in the `admin` database (the system database) to create users that can be used across your MongoDB deployment. Here's a step-by-step example:

1. Connect to your MongoDB instance using the MongoDB shell.
2. Switch to the `admin` database.
3. Execute the `createUser` command with the necessary parameters.

```javascript
use admin;
db.createUser({
  user: "appUser",
  pwd: "securePassword123!",
  roles: ["readWrite"]
});
```

This command creates a user named `appUser` with a password of `securePassword123!` and grants them the `readWrite` role. The `readWrite` role allows the user to read and write to all collections in the database they are associated with.

**Important Notes**:
- **Database Context**: The `user` field specifies the username, and the `pwd` field is the password. The `roles` field is an array of role names (e.g., `"read"`, `"readWrite"`, `"dbAdmin"`).
- **Security Best Practices**: Always use strong passwords (at least 12 characters) and avoid storing passwords in plain text in your application code. Instead, use environment variables or secure credential stores.
- **Role Inheritance**: By default, users inherit the roles of any database they are associated with (if they have `read` or `readWrite` roles, they can access collections). However, for fine-grained control, we'll explore custom roles in the next section.

Let's create a user with a more specific role set for demonstration:

```javascript
use admin;
db.createUser({
  user: "adminUser",
  pwd: "verySecurePassword123!",
  roles: [
    { role: "root", db: "admin" },
    { role: "readWrite", db: "myAppDB" }
  ]
});
```

This user has two roles: `root` in the `admin` database (for administrative tasks) and `readWrite` in the `myAppDB` database (for application data).

### Roles

Roles define what a user can do within MongoDB. MongoDB provides a set of **built-in roles** that you can use directly, and also allows you to create **custom roles** for more granular control.

#### Built-in Roles

MongoDB has several built-in roles that are pre-defined and available for use. Here's a table of the most common built-in roles:

| Role Name      | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| `read`         | Allows read operations on all collections in the database.                    |
| `readWrite`    | Allows read and write operations on all collections in the database.          |
| `dbAdmin`      | Allows administrative operations on the database (e.g., creating users).      |
| `userAdmin`    | Allows managing other users (e.g., creating, updating, deleting users).      |
| `clusterAdmin` | Allows administrative operations across the entire MongoDB cluster.          |
| `root`         | The highest-level role with full administrative privileges (use with caution).|

The `root` role is typically reserved for the `admin` database and is the most powerful role. It's important to use this role sparingly and only for system-level administration.

#### Custom Roles

For more complex security requirements, you can create custom roles. Custom roles allow you to define specific privileges for a set of operations on specific databases and collections.

Here's how to create a custom role:

```javascript
use admin;
db.createRole({
  role: "dataAnalyst",
  privileges: [
    { privilege: "read", resource: { db: "analyticsDB" } },
    { privilege: "read", resource: { db: "analyticsDB", collection: "sales" } }
  ],
  roles: [] // No inheritance for this custom role
});
```

This custom role grants a user the ability to read from the `analyticsDB` database, and specifically from the `sales` collection. Note that the `resource` field is used to specify the database and collection.

After creating a custom role, you can assign it to a user:

```javascript
use admin;
db.createUser({
  user: "dataAnalystUser",
  pwd: "analystPassword123!",
  roles: [ { role: "dataAnalyst", db: "analyticsDB" } ]
});
```

This user now has the permissions defined by the `dataAnalyst` role, limited to the `analyticsDB` database.

**Why Custom Roles Matter**:
- **Least Privilege Principle**: Custom roles help you enforce the principle of least privilege by giving users exactly the permissions they need.
- **Scalability**: As your application grows, custom roles allow you to manage permissions without affecting the entire database.

### Best Practices for Authentication

To ensure your MongoDB authentication setup is secure and effective, follow these best practices:

1. **Use Strong Passwords**: Always use complex passwords that are at least 12 characters long and include a mix of uppercase, lowercase, numbers, and special characters.
2. **Limit User Permissions**: Create users with the minimum permissions required for their tasks (e.g., a data analyst should not have `root` privileges).
3. **Use the `admin` Database**: For system-level users, always create users in the `admin` database.
4. **Rotate Passwords**: Regularly update passwords and implement a password rotation policy.
5. **Enable Authentication**: Always enable authentication in your MongoDB deployment (via `security.auth` in the `mongod` configuration).

## Summary

In this section, we've explored the fundamentals of MongoDB authentication, focusing on **Users** and **Roles**. By creating users with specific roles and leveraging both built-in and custom roles, you can build a secure authentication system that meets your application's needs. Remember: **less privilege, more security**. 🔒