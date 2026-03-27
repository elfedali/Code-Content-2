## Basic Security

In the world of VPS hosting, **security is your first line of defense**. A single misconfiguration can expose your server to attacks, compromise your data, and lead to costly breaches. This section covers three critical security practices that every VPS administrator should implement: **firewall configuration**, **disabling root login**, and **SSH hardening**. By the end of this section, you'll have a robust security foundation for your server.

### Firewall (ufw)

The `ufw` (Uncomplicated Firewall) is a user-friendly firewall that simplifies the process of managing firewall rules on Linux systems. It's the go-to tool for most VPS hosts because it's easy to set up and maintain without complex configurations.

**Why use ufw?**  
Unlike traditional firewalls that require intricate rule chains, `ufw` provides a simple interface to allow and deny traffic based on ports and services. This is especially important for VPS hosting, where you want to control inbound traffic to prevent unauthorized access.

Here’s how to set up `ufw` on a Ubuntu VPS:

1. **Install ufw** (if not already installed):
   ```bash
   sudo apt update
   sudo apt install ufw
   ```

2. **Enable ufw** and set default policies:
   ```bash
   sudo ufw enable
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   ```

   This configuration ensures that by default, all incoming traffic is blocked and only outgoing traffic is allowed. This is a critical security baseline.

3. **Allow specific services** (for example, SSH on port 22, HTTP on port 80, and HTTPS on port 443):
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

4. **Verify your rules**:
   ```bash
   sudo ufw status numbered
   ```

   This command lists all active rules with numbers, so you can easily check if your rules are as expected.

**Example: A secure VPS with ufw**  
After applying the above steps, your VPS will only accept traffic on ports 22 (SSH), 80 (HTTP), and 443 (HTTPS). All other incoming connections will be blocked. This is a standard configuration for most web servers and VPS hosting scenarios.

> 💡 **Pro Tip**: Always test your firewall rules with `sudo ufw status` to ensure they are working as intended. It's a small step that can save you from many security incidents.

### Disabling Root Login

Allowing root login via SSH is a common security oversight. If an attacker gains access to your server, they can immediately take over the root account and compromise your entire system. **Disabling root login** is a fundamental step in securing your VPS.

**Why disable root login?**  
By default, SSH allows root login. This is a major security risk because if an attacker gets your SSH password, they can directly become root and control your server. Disabling root login forces you to use a regular user account with elevated privileges (via `sudo`), which is much more secure.

Here’s how to disable root login:

1. **Edit the SSH server configuration**:
   ```bash
   sudo nano /etc/ssh/sshd_config
   ```

2. **Find the line** that says `PermitRootLogin` and change it to `no`:
   ```ini
   PermitRootLogin no
   ```

3. **Save the file** and exit the editor.

4. **Restart the SSH service** to apply the changes:
   ```bash
   sudo systemctl restart sshd
   ```

**Example: A secure SSH configuration**  
After this step, your server will no longer accept SSH connections from the root user. This means that if an attacker tries to log in as root, they will be rejected. You can then use a regular user account (with `sudo` privileges) for all administrative tasks.

> ⚠️ **Critical Note**: After disabling root login, you must ensure that your regular user account has `sudo` privileges. Otherwise, you won't be able to perform administrative tasks. We cover this in the next section on SSH hardening.

### SSH Hardening

SSH hardening goes beyond basic security to ensure that your SSH service is as secure as possible. This includes using key-based authentication, changing the default SSH port, and restricting user access.

**Why harden SSH?**  
The default SSH configuration on most VPS hosts is vulnerable to brute-force attacks and unauthorized access. By hardening SSH, you significantly reduce the risk of these attacks.

Here’s a step-by-step guide to hardening SSH:

1. **Generate SSH keys** (if you don't have them already):
   ```bash
   ssh-keygen -t rsa -b 4096
   ```
   This command creates a new RSA key pair with a 4096-bit key size (a strong key). You'll be prompted for a passphrase (optional but recommended).

2. **Add your public key** to the server's `authorized_keys` file:
   ```bash
   echo "ssh-rsa AAAAB3NzaC1yc2E... [your public key]" | sudo tee -a /home/yourusername/.ssh/authorized_keys
   ```
   *Note: Replace `[your public key]` with your actual public key. You can generate the key pair and then copy the public key to the server.*

3. **Change the SSH port** (to avoid common port scanning):
   ```bash
   sudo nano /etc/ssh/sshd_config
   ```
   Add or change the line:
   ```ini
   Port 2222
   ```
   Then restart SSH:
   ```bash
   sudo systemctl restart sshd
   ```

4. **Restrict user access** (allow only specific users):
   ```ini
   AllowUsers yourusername
   ```

5. **Disable password authentication** (use key-based only):
   ```ini
   PasswordAuthentication no
   ```

6. **Set up `UsePAM`** (for additional security):
   ```ini
   UsePAM yes
   ```

**Example: A hardened SSH configuration**  
After applying these changes, your SSH server will:
- Only accept key-based authentication (no passwords)
- Only allow your user account to connect
- Listen on port 2222 (instead of the default 22)
- Use PAM for additional security checks

This configuration is much more secure than the default and significantly reduces the attack surface.

> 🛡️ **Pro Tip**: Always use a strong passphrase for your SSH keys. If you forget it, you can regenerate your keys without affecting your server.

## Summary

In this section, we've covered three essential security practices for your VPS:
1. **Firewall (ufw)**: We set up a basic firewall to allow only necessary ports (SSH, HTTP, HTTPS) and block everything else.
2. **Disabling Root Login**: We disabled root SSH access to prevent direct compromise of the server.
3. **SSH Hardening**: We implemented key-based authentication, changed the SSH port, restricted user access, and disabled password authentication.

These steps form a solid foundation for securing your VPS. Remember: **security is an ongoing process**, not a one-time task. Regularly review your security settings and stay updated with best practices.

🔒