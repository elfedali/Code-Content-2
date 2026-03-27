## Deploying Applications: Reverse Proxy

When your applications need to handle high traffic, secure connections, or manage multiple services, a reverse proxy becomes your essential gateway. In this section, we’ll explore how to deploy a robust reverse proxy using Nginx on your VPS—perfect for Docker environments. This setup shields your containers from direct exposure, optimizes performance, and simplifies traffic routing. Let’s dive in.

### Nginx Setup

Nginx is the industry-standard reverse proxy for modern web infrastructure. Its lightweight architecture, high concurrency handling, and extensive features make it ideal for Dockerized applications. Here’s how to set it up on your VPS:

1. **Install Nginx**  
   First, ensure Nginx is installed on your VPS (most distributions have preconfigured Docker support):
   ```bash
   # Ubuntu/Debian
   sudo apt update && sudo apt install nginx

   # CentOS/RHEL
   sudo dnf install nginx
   ```

2. **Create a Reverse Proxy Configuration**  
   We’ll set up a simple proxy for a Dockerized Flask app running on port `5000`. This configuration handles SSL termination, path-based routing, and health checks:
   ```nginx
   # /etc/nginx/conf.d/proxy.conf
   server {
       listen 80;
       server_name _;  # Wildcard for testing

       location / {
           proxy_pass http://flask-app:5000;  # Docker container name:port
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # Health check for your container
       location /health {
           proxy_pass http://flask-app:5000/health;
       }
   }
   ```

3. **Test and Reload Nginx**  
   Verify the configuration and apply changes:
   ```bash
   sudo nginx -t  # Check for syntax errors
   sudo systemctl reload nginx
   ```

**Why this works**: The `proxy_pass` directive routes traffic to your Docker container (using the container’s name from the Docker network), while headers like `X-Real-IP` help your app track the client’s true IP. The health check endpoint ensures automatic failover if your container crashes.

> 💡 **Pro Tip**: Always use Docker’s network naming convention (`flask-app`) to avoid conflicts. Nginx will resolve this name automatically via Docker’s internal DNS.

### Routing Domains

Once your reverse proxy is live, routing multiple domains becomes trivial. This is critical for hosting multiple applications under one VPS—like `app1.example.com` and `app2.example.com`—each pointing to different Docker services.

1. **Create Domain-Specific Server Blocks**  
   In your Nginx configuration, add separate `server` blocks for each domain:
   ```nginx
   # /etc/nginx/conf.d/domains.conf
   server {
       listen 80;
       server_name app1.example.com;  # Domain 1

       location / {
           proxy_pass http://app1-container:8080;  # Docker container name:port
           proxy_set_header Host $host;
       }
   }

   server {
       listen 80;
       server_name app2.example.com;  # Domain 2

       location / {
           proxy_pass http://app2-container:3000;  # Docker container name:port
           proxy_set_header Host $host;
       }
   }
   ```

2. **Configure DNS Records**  
   Point your domain names to your VPS’s public IP via DNS providers (e.g., Cloudflare, Route53). This ensures traffic reaches Nginx.

3. **Handle SSL (Optional but Recommended)**  
   For production, enable SSL using Let’s Encrypt:
   ```bash
   sudo apt install certbot
   sudo certbot --nginx -d app1.example.com -d app2.example.com
   ```
   This auto-issues SSL certificates and configures HTTPS for both domains.

**Key Benefits of Domain Routing**:
- **Isolation**: Each domain operates independently without affecting others.
- **Scalability**: Add new domains without changing Nginx core configuration.
- **Security**: SSL terminates at Nginx, keeping sensitive data out of your Docker containers.

| Domain          | Docker Container | Port | Use Case                     |
|-----------------|-------------------|------|-------------------------------|
| app1.example.com | app1-container    | 8080 | API-heavy microservice       |
| app2.example.com | app2-container    | 3000 | Real-time frontend           |

> 🔍 **Troubleshooting Tip**: If a domain doesn’t route, check DNS records first—Nginx only processes traffic *after* DNS resolves to your VPS. Also, verify container names match exactly (case-sensitive in Docker).

## Summary

This section covered the core of reverse proxy deployment for Docker environments: starting with a basic Nginx setup for traffic routing and progressing to domain-specific routing. By leveraging Nginx’s flexibility, you can securely expose multiple Docker services under a single VPS while maintaining performance and scalability. Remember to always test configurations before production deployment—your apps will thank you! 🐳