## Server Security 🔒

When you deploy a VPS with Docker containers, **security becomes your most critical infrastructure component**. Without proper defenses, your entire environment is vulnerable to breaches, data theft, and service disruptions. In this section, we’ll implement two foundational security practices that work synergistically: **firewall rules** and **Fail2Ban**. These tools form the first line of defense for your production environment.

### Firewall Rules

A firewall acts as your VPS’s digital bouncer—deciding which network traffic gets through and which gets blocked. For Docker environments, **overly permissive rules create dangerous exposure points**. We’ll focus on Ubuntu-based VPS (the most common Docker host), using `ufw` (Uncomplicated Firewall) for simplicity and effectiveness.

#### Why Firewall Rules Are Non-Negotiable for Docker VPS

Docker containers can expose ports to the internet, but **never expose the Docker daemon itself** (ports `2375`/`2376`). Attackers can exploit this to gain direct access to your container orchestration. Instead, use a reverse proxy (like Nginx) to handle web traffic on ports `80`/`443`, and restrict Docker container ports to *only* the necessary services. Here’s a secure configuration example:

```bash
# Allow SSH access ONLY from your trusted IP (replace 192.168.1.100 with your actual IP)
sudo ufw allow from 192.168.1.100 to any port 22

# Allow HTTP and HTTPS traffic (for your web services)
sudo ufw allow 80
sudo ufw allow 443

# Deny all other incoming traffic (critical for minimal exposure)
sudo ufw default deny incoming
```

**Why this works**:  
- 🔒 `ufw allow from 192.168.1.100 to any port 22` restricts SSH to your local machine (prevents brute-force attacks)  
- 🌐 `ufw allow 80`/`443` permits web traffic *only* for your reverse proxy (not direct container access)  
- 🛡️ `sudo ufw default deny incoming` blocks *all* other traffic (the most secure default)  

#### Advanced: Docker-Specific Firewall Rules

Docker containers should **never** expose ports directly to the internet. Instead, use the `--publish` flag with a *reverse proxy* (e.g., Nginx) that handles traffic on `80`/`443`. Here’s how to map a container safely:

```bash
# Example: Nginx container on port 80 (mapped to host port 80)
docker run -d -p 80:80 nginx
```

This configuration ensures:  
1. Docker *never* exposes ports directly to the internet  
2. Your firewall only allows traffic to port `80` (handled by Nginx)  
3. The Docker daemon remains hidden behind the firewall (ports `2375`/`2376` are *not* open)

> 💡 **Pro Tip**: For cloud VPS (like AWS EC2), use security groups instead of `ufw`. The principles are identical—only allow specific ports from trusted IP ranges.

### Fail2Ban

**Fail2Ban** is an intrusion prevention system that automatically blocks malicious IPs after failed login attempts. It’s *essential* for Docker VPS because attackers often target your host OS (not just containers) via SSH, web services, or Docker APIs.

#### Why Fail2Ban Matters for Docker VPS

Attackers frequently use brute-force SSH attacks against VPS hosts. Without Fail2Ban:  
- 🔒 **SSH brute-force attacks** can compromise your entire VPS  
- 🐳 **Docker API exploits** (e.g., `docker ps` commands) may leak container data  
- 🌐 **Web service attacks** (e.g., via exposed Nginx) can be mitigated with Fail2Ban  

Fail2Ban solves this by monitoring logs and banning IPs *before* damage occurs.

#### Setting Up Fail2Ban for SSH (Critical First Step)

Here’s how to harden SSH protection:

1. **Install Fail2Ban**:
   ```bash
   sudo apt update && sudo apt install fail2ban
   ```

2. **Create a secure SSH jail configuration** (`/etc/fail2ban/jail.d/99-ssh.conf`):
   ```ini
   [sshd]
   enabled = true
   port = 22
   filter = sshd
   logpath = /var/log/auth.log
   maxretry = 3  # Block after 3 failed attempts
   bantime = 600 # 10-minute ban
   ```

3. **Restart Fail2Ban**:
   ```bash
   sudo systemctl restart fail2ban
   ```

**What this does**:  
- After 3 failed SSH logins from the *same IP*, block that IP for 10 minutes  
- Only monitors `auth.log` (Ubuntu’s SSH log)  
- Works *without* changing your SSH configuration  

#### Advanced: Docker API Protection

For extra security, monitor Docker API traffic (e.g., `docker ps` commands) with Fail2Ban:

1. Create a `docker-api.conf` file (`/etc/fail2ban/jail.d/99-docker.conf`):
   ```ini
   [docker]
   enabled = true
   port = 2375  # Docker API port
   filter = docker
   logpath = /var/log/docker.log
   maxretry = 5
   bantime = 3600 # 1-hour ban
   ```

2. **Verify Docker logs** (create a log rotation rule to avoid failures):
   ```bash
   sudo docker logs --since 1m --format "{{.ID}}: {{.Log}}" | tee /var/log/docker.log
   ```

> ⚠️ **Critical Note**: Never expose Docker API ports (`2375`/`2376`) to the internet. Use this configuration *only* on private networks.

## Summary 🛡️

In this section, we’ve implemented two non-negotiable security practices for your Docker VPS:  

| Practice          | Purpose                                                                 | Real-World Impact                                                                 |
|--------------------|-------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **Firewall Rules** | Restrict traffic to *only* necessary ports (SSH, HTTP, HTTPS)            | Blocks 99% of internet attacks by hiding Docker daemon and limiting exposure     |
| **Fail2Ban**       | Automatically bans malicious IPs after failed login attempts              | Prevents SSH brute-force attacks and Docker API exploits within minutes of detection |

**Remember**: Security is a continuous process. Revisit these rules quarterly—especially after new container deployments or cloud migrations. Start with these two practices, and you’ll build a resilient foundation that scales with your Docker environment. 🔐