## Creating a Server

Welcome to the first step of your Docker & VPS journey! In this section, we'll build a secure, production-ready server foundation using Ubuntu and SSH key authentication. This setup ensures you can deploy Docker containers safely without password prompts—critical for smooth operations.

### Selecting OS (Ubuntu)

When choosing your VPS operating system, **Ubuntu** is the optimal starting point for Docker environments. Here’s why:

- **Docker-native support**: Ubuntu has the most mature Docker ecosystem with extensive community resources and official Docker documentation.
- **Security updates**: Ubuntu’s LTS (Long-Term Support) releases get security patches for 5+ years—ideal for production stability.
- **Community**: 90% of Docker tutorials use Ubuntu, so troubleshooting is easier when issues arise.

Most VPS providers (like DigitalOcean, Linode, AWS EC2) let you select Ubuntu during server creation. For this guide, we’ll use **Ubuntu 22.04 LTS** (the current LTS release as of 2024). This version includes:
- Built-in Docker support
- Regular security updates
- A stable kernel for containerized workloads

> 💡 **Pro tip**: Avoid newer Ubuntu versions (like 24.04) for initial setups—LTS releases offer better long-term stability for production workloads.

Here’s how to create your Ubuntu VPS:
1. Go to your VPS provider’s dashboard (e.g., DigitalOcean)
2. Select "Create Droplet" → "Ubuntu 22.04 LTS" → "Standard" (for most use cases)
3. Configure your server name, region, and SSH key (we’ll cover this next)

### Setting SSH Keys

SSH keys are your server’s security backbone. Instead of passwords, they enable **passwordless access** while preventing unauthorized logins. Here’s how to set them up securely:

#### Why SSH Keys Matter
- **No password prompts**: Eliminates typing passwords during deployments
- **Stronger security**: Keys are harder to brute-force than passwords
- **Docker compatibility**: Docker requires SSH access without passwords for automated workflows

#### Step-by-Step Setup

1. **Generate SSH keys locally** (on your development machine):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
   - This creates a `id_ed25519` private key and `id_ed25519.pub` public key
   - Press `Enter` for default path (no password prompt)
   - *Why ed25519?* Faster than RSA keys and modern standard for security.

2. **Copy your public key to the VPS**:
   ```bash
   ssh-copy-id -i ~/.ssh/id_ed25519.pub ubuntu@your_vps_ip
   ```
   - Replace `your_vps_ip` with your actual VPS IP (e.g., `192.168.1.100`)
   - This adds your key to `~/.ssh/authorized_keys` on the server

3. **Verify key access**:
   ```bash
   ssh -T ubuntu@your_vps_ip
   ```
   - You should see: `Welcome to Ubuntu 22.04 LTS...` with no password prompt

#### Troubleshooting Tips
| Issue | Solution |
|-------|----------|
| `Permission denied` | Run `chmod 600 ~/.ssh/authorized_keys` on VPS |
| `Key not found` | Ensure `~/.ssh/authorized_keys` exists and has correct permissions |
| `Connection timed out` | Check firewall rules on VPS (allow SSH port 22) |

> ⚠️ **Critical security note**: Never share your private key (`id_ed25519`) with others. Keep it in a secure location (e.g., your laptop’s `~/.ssh` directory).

#### Why This Works for Docker
With SSH keys set up, Docker can connect to your VPS without password prompts. This is essential for:
- CI/CD pipelines
- Automated container deployments
- Secure remote management

### Summary

You’ve now created a secure Ubuntu 22.04 VPS with SSH key authentication—**the foundation for all Docker deployments**. This setup eliminates password prompts, ensures strong security, and aligns with industry best practices for production environments. The next step? [Deploy your first Docker container](../chapter_2/). 🐳