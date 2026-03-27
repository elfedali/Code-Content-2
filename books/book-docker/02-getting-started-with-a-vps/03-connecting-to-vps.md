## Connecting to VPS

### SSH Basics

SSH (Secure Shell) is the industry standard for secure remote server management. It encrypts all data transmitted between your local machine and the VPS, preventing eavesdropping and man-in-the-middle attacks. Before connecting, you'll need to understand SSH authentication methods.

**First-time connection workflow**:
1. Open your terminal
2. Enter this command (replace `your-vps-ip` and `your-username`):
   ```bash
   ssh your-username@your-vps-ip
   ```
3. When prompted for a password, enter the password you set up for your VPS

**Common issues**:
- **Connection refused**: SSH service isn't running (check firewall settings)
- **Permission denied (publickey)**: SSH key isn't properly configured (we'll fix this next)

> 💡 **Pro Tip**: Always use SSH keys for production environments to avoid password prompts and enhance security.

### Initial Setup

After your first connection, follow these steps to prepare your VPS for production:

1. **Update the system** (critical for security patches):
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
   *Note: Uses `apt` for Ubuntu/RHEL systems*

2. **Create a non-root user** (best practice for security):
   ```bash
   sudo adduser your-new-username
   ```
   Then grant sudo privileges:
   ```bash
   sudo usermod -aG sudo your-new-username
   ```

3. **Set up SSH keys for passwordless login** (essential for automation):
   ```bash
   ssh-keygen -t rsa -b 4096
   ```
   - Press Enter for default path (`~/.ssh/id_rsa`)
   - Leave passphrase empty *temporarily* (set later for security)
   
   Copy public key to VPS:
   ```bash
   ssh-copy-id your-new-username@your-vps-ip
   ```

4. **Install essential tools** for Docker operations:
   ```bash
   sudo apt install curl git -y
   ```

5. **Verify your SSH key**:
   ```bash
   ssh your-new-username@your-vps-ip
   ```
   You should get a prompt *without* being asked for a password.

**Why this matters**: These steps create a secure foundation where you can deploy Docker containers without password prompts, while maintaining strict security controls. Always set a strong passphrase for your SSH key in production environments.

## Summary

You've learned the fundamentals of connecting to your VPS and setting up the initial environment. This knowledge is critical for deploying Docker containers and managing your server securely.

😊