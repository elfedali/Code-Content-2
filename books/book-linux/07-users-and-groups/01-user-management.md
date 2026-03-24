## User Management

Welcome to the world of user management in Linux! 👩‍💻 As the backbone of system security and functionality, understanding how to create, modify, and delete users is essential for any Linux administrator or developer. In this section, we'll dive deep into the three core commands that form the foundation of user administration: `useradd`, `usermod`, and `userdel`. By the end, you'll be confident in managing users with precision and control.

### Creating Users: `useradd`

The `useradd` command is your go-to tool for adding new users to the system. It’s straightforward but powerful, allowing you to specify attributes like the user’s home directory, shell, and group memberships.

#### Basic Usage
The simplest form of `useradd` creates a user with a home directory in `/home` and the default shell (`/bin/bash`). For example:

```bash
useradd alice
```

This command adds a user named `alice` with the following defaults:
- Home directory: `/home/alice`
- Shell: `/bin/bash`
- Primary group: `users` (the default group for new users)

#### Customizing User Creation
You can customize the user with options:

1. **Specify a home directory**: Use `-d` or `--home`
   ```bash
   useradd -d /custom/path bob
   ```
   This creates a home directory at `/custom/path` instead of the default `/home/bob`.

2. **Set the user’s shell**: Use `-s` or `--shell`
   ```bash
   useradd -s /bin/zsh carol
   ```
   This assigns `zsh` as the user’s login shell.

3. **Add to a specific group**: Use `-g` or `--group` (for primary group) and `-G` or `--groups` (for supplementary groups)
   ```bash
   useradd -g developers -G managers john
   ```
   This sets `john`’s primary group as `developers` and adds `managers` as a supplementary group.

4. **Set a password**: Note that `useradd` does *not* set passwords by default. Use `passwd` for this purpose. However, you can use `-p` to set a password (requires a hashed password):
   ```bash
   useradd -p $(openssl passwd -crypt "secure_password") eve
   ```

#### Common Pitfalls
- **User name conflicts**: If the username already exists, `useradd` will fail. Check with `id` first.
- **Home directory permissions**: The home directory is created with 700 permissions by default. Ensure your scripts handle this appropriately.

#### Example Workflow
Let’s create a user named `eve` with a custom shell and group:

```bash
useradd -s /bin/zsh -g security_team eve
```

This creates `eve` with:
- Home directory: `/home/eve`
- Shell: `/bin/zsh`
- Primary group: `security_team`

### Modifying Users: `usermod`

The `usermod` command allows you to modify existing users. It’s incredibly versatile, supporting changes to the user’s home directory, shell, group memberships, and even the user’s password.

#### Key Options
Here’s a quick reference of the most common `usermod` options:

| Option | Description | Example |
|--------|-------------|---------|
| `-l` or `--login` | Change the username | `usermod -l newname oldname` |
| `-d` or `--home` | Change the home directory | `usermod -d /new/path alice` |
| `-s` or `--shell` | Change the shell | `usermod -s /bin/bash carol` |
| `-g` or `--group` | Change primary group | `usermod -g developers alice` |
| `-G` or `--groups` | Add to supplementary groups | `usermod -G managers alice` |
| `-u` or `--uid` | Change user ID | `usermod -u 1001 alice` |
| `-a` or `--append` | Append to supplementary groups | `usermod -aG admins alice` |

#### Real-World Example
Suppose we want to add the user `eve` to the `developers` group and change their home directory:

```bash
usermod -g developers -d /new/home eve
```

This command:
- Changes `eve`’s primary group to `developers`
- Moves `eve`’s home directory to `/new/home`

#### Advanced Use: Changing Passwords
To change a user’s password without prompting for a new password (for automation), use `usermod` with `-p`:

```bash
usermod -p $(openssl passwd -crypt "new_password") eve
```

> **Note**: This requires a hashed password. For interactive password changes, use `passwd` instead.

### Deleting Users: `userdel`

The `userdel` command removes a user from the system. It’s critical to understand that `userdel` does *not* just delete the user account—it also removes the user’s home directory and mail spool files.

#### Basic Usage
The simplest form:

```bash
userdel alice
```

This deletes the user `alice` and removes their home directory (`/home/alice`).

#### Options for Safety
To avoid accidental data loss, `userdel` offers an option to remove the user’s home directory *without* deleting the user’s files (if you want to keep the home directory for later):

```bash
userdel -r alice
```

This removes `alice` and their home directory.

#### Important Note
Before deleting a user, ensure there are no processes running as that user and that the user’s home directory is clean. Check with:

```bash
ps -u alice
```

#### Example Workflow
Let’s delete the user `eve` and keep their home directory (for archival purposes):

```bash
userdel -r eve
```

This command removes `eve` and their home directory.

## Summary

In this section, we’ve explored the three essential commands for user management in Linux: `useradd`, `usermod`, and `userdel`. Mastering these commands allows you to create, modify, and delete users with precision, ensuring your system remains secure and well-organized. Remember: **always** verify user existence and permissions before making changes to avoid unintended consequences. 💡