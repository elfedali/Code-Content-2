## Best Practices

### Access Control

MongoDB’s access control system is the foundation of your database security posture. By default, MongoDB **does not allow unauthenticated connections**, but it’s critical to implement robust authentication and authorization to protect your data from unauthorized access.

The best practice is to follow the **principle of least privilege**—create users with the minimal permissions necessary for their tasks. For example, a read-only user should never have write permissions. MongoDB uses **role-based access control (RBAC)**, allowing you to assign specific roles to users within a database.

Here are concrete examples:

1. **Read-only user for production databases**:
   ```javascript
   use admin
   db.createUser({
     user: "readonly_user",
     pwd: "secure_password_123",
     roles: [{ role: "read", db: "mydatabase" }]
   })
   ```

2. **Full access user for development environments** (use cautiously):
   ```javascript
   use admin
   db.createUser({
     user: "dev_user",
     pwd: "secure_password_456",
     roles: [{ role: "readWrite", db: "mydatabase" }]
   })
   ```

**Critical security practices**:
- Always store passwords securely (use environment variables or secret management services)
- Regularly review user permissions
- Disable users when no longer needed
- Never share credentials across applications

🔐

### Encryption

Encryption is essential for protecting data both at rest and in transit. MongoDB supports:
- **Encryption in transit** (via TLS)
- **Encryption at rest** (using AWS KMS, Azure Key Vault, or other key management services)

For **encryption in transit**, configure your MongoDB server to use TLS. This ensures data is encrypted during transmission between your application and the database:

```yaml
security:
  tls:
    enabled: true
    certificateFile: "/path/to/cert.pem"
    keyFile: "/path/to/key.pem"
```

For **encryption at rest**, integrate with a key management service (e.g., AWS KMS). Once configured, MongoDB automatically handles encrypted data without affecting your application logic. Always use strong encryption standards and rotate keys regularly.

🛡️

## Summary

In this section, we’ve covered two critical security best practices: **access control** and **encryption**. By implementing role-based access control with the principle of least privilege and enabling encryption in transit and at rest, you can significantly reduce the risk of data breaches and unauthorized access. Remember: **security is a continuous process**—regularly audit and update your practices to stay ahead of emerging threats.