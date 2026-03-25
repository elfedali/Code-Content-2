## Hardening Systems

In the realm of cybersecurity, **system hardening** is the process of systematically reducing vulnerabilities and risks by eliminating unnecessary features, services, and configurations. This section focuses on two critical, high-impact areas of system hardening that directly impact your system's resilience against common attack vectors. Let’s dive in with practical, actionable steps.

### SSH Security

SSH (Secure Shell) is a foundational protocol for remote system administration, but misconfigured SSH servers are among the most exploited attack surfaces in cybersecurity. Let’s build a secure SSH environment from the ground up.

**Why SSH Security Matters**  
Attackers frequently target SSH servers to gain unauthorized access via brute-force password attacks, weak key configurations, or excessive port exposure. A single misconfigured SSH server can compromise your entire infrastructure. Hardening SSH minimizes this risk while maintaining legitimate administrative functionality.

**Critical Hardening Practices**  
Here’s what you *must* implement:

1. **Enforce Key-Based Authentication**  
   Eliminate password-based logins entirely. This prevents credential theft and brute-force attacks.
2. **Disable Password Authentication**  
   Critical for security – passwords are the weakest link in SSH.
3. **Restrict Access by IP**  
   Limit SSH connections to specific, trusted IP addresses.
4. **Implement Rate Limiting**  
   Throttle login attempts to prevent brute-force attacks.
5. **Use Strong Key Sizes**  
   Ensure cryptographic keys meet modern security standards (e.g., 4096-bit RSA).

**Concrete Example: Hardening SSH on Ubuntu**  
Follow this step-by-step to implement a production-grade SSH configuration:

```bash
# Generate a strong SSH key pair (4096-bit RSA)
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa

# Edit SSH server configuration (critical security settings)
sudo nano /etc/ssh/sshd_config

# Apply these changes (save with Ctrl+O, Enter)
# Disable password auth
PasswordAuthentication no

# Enforce key-based auth
PubkeyAuthentication yes

# Restrict to specific IP (example: only your admin IP)
AllowUsers user@192.168.1.100

# Limit brute-force attempts (10 tries per minute)
RateLimit 10 60

# Set minimum key size (enforced via key generation)
# (Note: This is handled in key generation, not config)
```

```bash
# Restart SSH service to apply changes
sudo systemctl restart sshd

# Verify configuration
sshd -T | grep -i "PasswordAuthentication"
```

**Why This Works**  
This configuration blocks password-based attacks entirely, limits SSH access to your trusted IP, and throttles login attempts. Attackers now need *both* your private key *and* your IP address to gain access – a much higher barrier than password brute-forcing. Always test your SSH configuration with tools like `ssh -T user@your-server` to confirm it works.

### Disabling Unused Services

Unused services create hidden attack surfaces. Attackers exploit them to gain access, move laterally, or deploy malware. Disabling these services is one of the most effective ways to reduce your system’s vulnerability profile.

**Why Disable Unused Services?**  
Each running service represents a potential entry point. For example:
- A web server on a non-web server machine
- Legacy protocols like SMB (Server Message Block) on modern systems
- Unnecessary database services

**Step-by-Step Process**  
Follow this workflow to safely disable services:

1. **Identify all running services**  
   (Use system-specific commands to list active services)
2. **Determine service necessity**  
   (Ask: "Do we *actually* need this service for production?")
3. **Disable services**  
   (Stop and disable services that aren’t required)
4. **Validate functionality**  
   (Ensure no critical operations break after disabling)

**Concrete Examples Across OSes**

| Operating System | Command to List Services | Command to Disable Service | Critical Service Example |
|------------------|---------------------------|----------------------------|--------------------------|
| **Linux (Ubuntu)** | `sudo systemctl list-units --type=service` | `sudo systemctl disable <service>` | `apache2` (if no web app exists) |
| **Windows** | `Get-Service | Where-Object {$_.Status -ne 'Stopped'}` | `Set-Service -Name <service> -StartupType Disabled` | `WinRM` (if no remote management needed) |

**Real-World Scenario: Disabling SSH on a Non-Admin Server**  
*Scenario*: You manage a Linux server that doesn’t require remote administration. Here’s how to disable SSH safely:

```bash
# Check running services
sudo systemctl list-units --type=service | grep ssh

# Disable SSH service (if not needed)
sudo systemctl disable ssh

# Verify it’s disabled
sudo systemctl is-enabled ssh
# Output: disabled
```

**Critical Caveats**  
- **Test first**: Disable services in staging environments before production.
- **Documentation**: Record *why* each service was disabled (e.g., "SSH disabled because no admin access needed").
- **Automation**: Use tools like Ansible to enforce consistent service states across your infrastructure.

**Pro Tip**  
Create a "services inventory" checklist for your environment. For example:
```markdown
- [ ] SSH (disabled if no admin needs)
- [ ] SMB (disabled if no file sharing)
- [ ] WinRM (disabled if no PowerShell remoting)
- [ ] FTP (disabled if no file transfers)
```

This approach ensures you don’t accidentally leave critical services active while reducing attack surfaces.

## Summary

In this section, we’ve covered two essential pillars of system hardening: **SSH Security** and **Disabling Unused Services**. By enforcing key-based authentication, disabling password logins, restricting SSH access, and systematically eliminating unused services, you dramatically reduce your system’s attack surface. Remember: hardening is an ongoing process – review and update your security configurations quarterly. 🔒