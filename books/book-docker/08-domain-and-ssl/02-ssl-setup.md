## SSL Setup

In today's digital landscape, securing your web applications with SSL/TLS is non-negotiable. This section dives into the practical setup of SSL certificates using **Let's Encrypt** (the most accessible free option) and configuring **HTTPS** for your Docker and VPS environments. We'll walk through real-world examples to ensure your services are secure from day one.

### Let's Encrypt

Let's Encrypt is a non-profit certificate authority that provides **free**, automated, and **open** SSL/TLS certificates. It's the go-to solution for developers and small businesses who want to secure their websites without the cost of expensive commercial certificates.

**Why choose Let's Encrypt?**  
- **Cost**: Zero cost for certificates (no annual fees).
- **Automation**: Certificates are issued automatically via the `certbot` tool.
- **Security**: Uses modern encryption standards (TLS 1.2+).
- **Trust**: Backed by the Internet Security Research Group (ISRG).

**Why is this important for Docker & VPS?**  
When deploying applications in Docker containers on a VPS, you need to ensure that the web server (like Nginx) serves HTTPS. Let's Encrypt simplifies this by providing certificates that can be used with your Docker setup without complex manual steps.

#### Getting Started with Let's Encrypt

Here's how to set up a Let's Encrypt certificate for your domain on a VPS:

1. **Install Certbot**:  
   On Ubuntu, run:
   ```bash
   sudo apt update
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Generate the Certificate**:  
   Run the following command to create a certificate for your domain (replace `your-domain.com` with your actual domain):
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```
   This command automatically configures Nginx to use HTTPS. *Note: The `--nginx` flag tells Certbot to handle the Nginx configuration.*

3. **Verify the Certificate**:  
   Check the certificate file location:
   ```bash
   ls /etc/letsencrypt/live/your-domain.com/
   ```
   You should see `fullchain.pem` (the combined certificate and chain) and `privkey.pem` (the private key).

4. **Auto-Renewal**:  
   Let's Encrypt certificates are valid for **90 days**. Certbot handles renewal automatically via a cron job. To ensure it runs:
   ```bash
   sudo crontab -e
   ```
   Add this line:
   ```cron
   0 0 * * * /usr/bin/certbot renew --quiet
   ```

**Docker Integration Example**  
When using Docker, you can serve HTTPS by mounting the certificate files into your web container. Here's a `docker-compose.yml` snippet for an Nginx container:

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./certs:/etc/letsencrypt
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.web.rule=Host(`your-domain.com`)"

# Note: This is a simplified example. In practice, you'd configure Nginx inside the container to use the certificates from the host.
```

**Critical Notes for Production**  
- Always use the `--nginx` flag when installing Certbot on VPS to auto-configure Nginx.
- The `./certs` volume mounts the certificate directory from your host to the container.
- Test the certificate chain with:
  ```bash
  openssl s_client -connect your-domain.com:443 -showcerts
  ```

### HTTPS Configuration

Now that you have a Let's Encrypt certificate, the next step is to configure your VPS to serve HTTPS. This involves setting up your web server (Nginx or Apache) to use the certificate and redirect HTTP to HTTPS.

#### Nginx Configuration for HTTPS

Here's a step-by-step guide for Nginx:

1. **Create a Server Block**:  
   In your Nginx configuration (typically at `/etc/nginx/sites-available/default`), add this server block for HTTPS:

   ```nginx
   server {
       listen 443 ssl;
       server_name your-domain.com;

       ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

       location / {
           proxy_pass http://app:80; # Assuming your app runs on port 80 inside Docker
       }
   }
   ```

2. **Redirect HTTP to HTTPS**:  
   Add a location block to redirect HTTP traffic to HTTPS:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$host$request_uri;
   }
   ```

3. **Test and Reload Nginx**:  
   After making changes, test the configuration and reload Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

**Docker-Compose Example with HTTPS**  
For a Docker Compose setup, here's a complete example that uses Let's Encrypt certificates with automatic HTTPS:

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./certs:/etc/letsencrypt
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.web.rule=Host(`your-domain.com`)"

  app:
    image: your-app-image
    ports:
      - "80:80"
    volumes:
      - ./data:/data
```

**Key Considerations for Production**  
- **HSTS Header**: Enable HTTP Strict Transport Security to force browsers to use HTTPS:
  ```nginx
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
  ```
- **Certificate Chain**: Always use `fullchain.pem` (not just `cert.pem`) for the SSL certificate path.
- **Security Headers**: Add these headers for extra protection:
  ```nginx
  add_header X-Content-Type-Options "nosniff";
  add_header X-Frame-Options "DENY";
  add_header Content-Security-Policy "default-src 'self'";
  ```
- **Testing**: Validate your HTTPS setup with:
  ```bash
  curl -I https://your-domain.com
  ```

## Summary

In this section, we've covered:
- How to use **Let's Encrypt** to obtain free SSL certificates for your VPS and Docker environments.
- How to configure **HTTPS** using Nginx with the Let's Encrypt certificates, including automatic renewal and HTTP-to-HTTPS redirection.

By following these steps, you can secure your Docker applications and VPS hosting with minimal overhead and maximum security. Remember: **SSL is your first line of defense against eavesdropping and man-in-the-middle attacks**. 🌐