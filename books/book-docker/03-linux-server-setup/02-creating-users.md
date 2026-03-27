## Creating Users

In this section, we'll cover how to create users and grant them administrative privileges on your Linux server. This is a critical step in setting up a secure and efficient server environment. 👨‍💻

### Using `adduser` to Create a New User

The `adduser` command is the standard way to create a new user on a Linux system. It's interactive and provides a user-friendly interface for setting up the user account.

To create a new user, run:

```bash
sudo adduser <username>
```

You'll be prompted for details such as a user password, full name, and other information. For a minimal example, let's create a user named `appuser`:

```bash
sudo adduser appuser
```

This command will ask for:
- User password: (you'll enter a password)
- Full name: (you can type, e.g., "Application User")
- Room number: (optional, press Enter to skip)
- Work phone: (optional, press Enter to skip)
- Home phone: (optional, press Enter to skip)

After entering the required information, the user account is created. The user will have a home directory and standard permissions.

**Important security note**: Always use strong passwords for user accounts. Avoid reusing passwords from other systems.

For non-interactive use cases (e.g., scripts), you can create users without prompts using `--quiet`:

```bash
sudo adduser --quiet appuser
```

This creates the user without displaying prompts, though it still requires a password.

### Granting `sudo` Privileges

Once you have a user account, you need to grant it sudo privileges so it can run administrative commands without logging in as root.

There are two common approaches:

1. **Add the user to the `sudo` group** (recommended for most use cases)  
   This is the simplest and most secure method for Ubuntu/Debian systems:
   ```bash
   sudo usermod -aG sudo appuser
   ```
   This grants the user `appuser` full sudo access without requiring a password for most commands.

2. **Edit the sudoers file** (for fine-grained control)  
   Use `visudo` to safely modify privileges:
   ```bash
   sudo visudo
   ```
   Add a line for the user (e.g., `appuser ALL=(ALL) NOPASSWD: ALL`), then save.  
   **Critical security note**: Never edit sudoers directly with `nano` or `vim`—always use `visudo` to prevent syntax errors that could break sudo.

**Method Comparison**:

| Method | Command Example | When to Use | Security Note |
|--------|-----------------|--------------|----------------|
| Add to `sudo` group | `sudo usermod -aG sudo appuser` | Most common for Ubuntu/Debian | Simpler and safer for most use cases |
| Edit sudoers file | `sudo visudo` | When you need fine-grained control | Requires caution to avoid syntax errors |

🔑 The `sudo` group method is the preferred approach for most users because it's simpler, less error-prone, and aligns with standard security practices.

## Summary

Creating users and granting sudo privileges are foundational steps in Linux server administration. By using `adduser` to create a user and adding them to the `sudo` group, you achieve secure, efficient server management with minimal risk. Always prioritize strong passwords and the `sudo` group method for production environments.