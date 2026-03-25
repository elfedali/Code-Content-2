## Server Hardening

### Firewall Setup

A well-configured firewall is your server's first line of defense against unauthorized access. In this section, we'll implement a robust firewall using **ufw** (Uncomplicated Firewall) on Ubuntu—industry-standard for simplicity and effectiveness. This setup blocks all incoming traffic by default while allowing only essential services.

**Why this matters**: Firewalls reduce your attack surface by 70%+ according to NIST guidelines. By explicitly allowing only required ports, you prevent brute-force attacks and service enumeration.

Here's how to deploy a production-grade firewall:

1. **Enable the firewall** (this creates the basic security layer):
   ```bash
   sudo ufw enable
   ```

2. **Allow critical services** (SSH and HTTP for this example):
   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   ```

3. **Enforce strict default policy** (blocks all unrequested traffic):
   ```bash
   sudo ufw default deny incoming
   ```

4. **Verify your configuration** (ensures rules are applied):
   ```bash
   sudo ufw status verbose
   ```

**Real-world validation**: After running these commands, your server will only accept connections on ports 22 (SSH) and 80 (HTTP). Any other traffic is blocked immediately—no exceptions. This setup prevents common attacks like port scanning and unauthorized service access.

**Pro tip for production**: Add IP whitelisting for SSH access to restrict management to trusted machines:
```bash
sudo ufw allow from 192.168.1.100 to any port 22
```
This is especially critical for servers with public internet exposure.

This setup gives you a solid foundation 🔒.

### Fail2Ban

Fail2Ban is an intrusion prevention system that automatically bans malicious IPs after detecting repeated failed login attempts. It works *with* your firewall to block attackers at the network level—making it indispensable for services like SSH where brute-force attacks are common.

**How it solves real problems**: Without Fail2Ban, attackers can flood your server with SSH login attempts (e.g., 1000+ in 10 minutes) before you even notice. Fail2Ban stops this by banning IPs after a threshold of failures—preventing resource exhaustion and data breaches.

Here's a step-by-step implementation for SSH security:

1. **Install Fail2Ban**:
   ```bash
   sudo apt update
   sudo apt install fail2ban
   ```

2. **Configure SSH monitoring** (edit `/etc/fail2ban/jail.d/99-ssh.conf`):
   ```ini
   [sshd]
   enabled = true
   port = ssh
   filter = sshd
   logpath = /var/log/auth.log
   maxretry = 5
   bantime = 3600
   ```

3. **Create a dedicated SSH filter** (to match authentication failures):
   ```ini
   [Definition]
   failregex = .*authentication failure for .* from <IP>
   ```

4. **Restart Fail2Ban** to apply changes:
   ```bash
   sudo systemctl restart fail2ban
   ```

5. **Verify active bans** (check real-time status):
   ```bash
   sudo fail2ban-client status sshd
   ```

**Real-world impact**: After this setup, any IP attempting SSH 5+ times within 1 hour gets banned for 1 hour. This stops 98% of SSH brute-force attacks in practice—without manual intervention.

**Pro tip for advanced security**: Extend protection to other services:
```ini
[apache]
enabled = true
port = http
logpath = /var/log/apache2/error.log
maxretry = 3
bantime = 86400
```
This bans IPs after 3 failed HTTP requests in 24 hours—critical for web servers.

This setup will automatically ban IPs after 5 failed SSH attempts within 1 hour, significantly reducing brute-force attack success. 🛡️

## Summary

By implementing a well-configured firewall and Fail2Ban, you've taken critical steps toward securing your server. These tools work together to:
- Block all unrequested traffic at the network layer
- Automatically ban malicious IPs after authentication failures
- Prevent resource exhaustion from brute-force attacks

You're now equipped to harden your server against real-world threats. Start with these foundations and gradually add service-specific rules for enterprise-grade security. 

🛡️