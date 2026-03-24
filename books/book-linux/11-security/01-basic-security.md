## Basic Security 🔒

Welcome to the world of Linux security! In this section, we'll dive into two foundational areas: **firewalls** and **user permissions**. These concepts are the bedrock of securing your Linux system, and mastering them will give you confidence in protecting your environment. Let's get started.

### Firewall

A firewall acts as a gatekeeper between your system and the outside world. It controls incoming and outgoing network traffic based on predetermined security rules. In Linux, we have two popular tools for managing firewalls: **ufw** (Uncomplicated Firewall) and **iptables** (the traditional, powerful firewall utility).

**ufw (Uncomplicated Firewall)** is designed to be user-friendly and is the recommended choice for most users. Let's set up a basic ufw firewall.

First, ensure ufw is installed (it's usually installed by default on many distributions):

```bash
sudo apt update
sudo apt install ufw
```

Now, enable the firewall and set a default policy:

```bash
sudo ufw default deny
sudo ufw enable
```

This configuration blocks all incoming traffic by default and only allows traffic that you explicitly permit.

To allow SSH access (port 22), run:

```bash
sudo ufw allow 22
```

To allow HTTP (port 80), run:

```bash
sudo ufw allow 80
```

You can list your rules with:

```bash
sudo ufw status
```

This will show you the active rules. If you want to remove a rule, for example, to block SSH:

```bash
sudo ufw deny 22
```

**iptables** is more complex but offers granular control. For a basic example, let's allow SSH:

```bash
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

This adds a rule to accept TCP packets on port 22. To save these rules permanently (on most distros), you can use:

```bash
sudo iptables-save | sudo tee /etc/iptables/rules.v4
```

Note: iptables rules are often temporary and require reapplication on reboot. For a persistent solution, consider using ufw.

### User Permissions

User permissions in Linux are crucial for maintaining security and privacy. By default, every file and directory has three types of permissions: **read**, **write**, and **execute**. These permissions are assigned to three categories: the **owner**, the **group**, and **others**.

The standard way to set permissions is with the `chmod` command. For example, to give the owner read and write permissions on a file:

```bash
chmod 600 filename
```

Here, `600` means:
- The first digit (6) is for the owner: 4 (read) + 2 (write) = 6
- The next digit (0) is for the group: 0 (no permissions)
- The last digit (0) is for others: 0 (no permissions)

Alternatively, you can use symbolic notation:

```bash
chmod u+w filename  # Give write permission to the owner
```

To set permissions for a directory (which requires execute permission for traversal), you might use:

```bash
chmod 755 directoryname
```

This grants:
- Owner: read, write, execute (7)
- Group: read, execute (5)
- Others: read, execute (5)

**User groups** are another layer of security. You can add a user to a group with:

```bash
sudo usermod -aG sudo username
```

This adds `username` to the `sudo` group (which grants administrative privileges). Remember that the `sudo` group is a special group with elevated permissions.

## Summary

You've now mastered the fundamentals of Linux security: configuring firewalls with **ufw** and managing **user permissions**. These skills are critical for any Linux user or administrator. Keep these practices in mind to build a secure system from the ground up. ✅