## Setting Up a Web Server: Real-World Implementation

In this chapter, we’ll transform your Linux skills into tangible web infrastructure. You’ll build production-grade web servers using industry standards—starting with **Nginx** (the modern powerhouse) and **Apache** (the legacy workhorse)—then deploy real websites. By the end, you’ll understand *why* these choices matter in practice.

---

### Nginx: The Modern Web Server

Nginx dominates high-traffic environments due to its non-blocking architecture and low memory footprint. It’s ideal for static content, reverse proxying, and handling thousands of concurrent connections with minimal overhead.

#### Installation on Ubuntu
First, add the Nginx repository and install the server:

```bash
sudo apt update
sudo apt install nginx
```

#### Basic Configuration
Nginx uses a modular configuration system. The main config file is `/etc/nginx/nginx.conf`. Here’s a minimal setup for serving a static site from `/var/www/html`:

```nginx
server {
    listen 80;
    server_name example.com;  # Replace with your domain

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

#### Key Features in Action
1. **Static File Serving**: Nginx efficiently handles HTML, CSS, and JS files without heavy processing.
2. **Reverse Proxying**: Route requests to backend services (e.g., Node.js apps) while hiding their complexity:
   ```nginx
   location /api {
       proxy_pass http://backend-service;
       proxy_set_header Host $host;
   }
   ```
3. **Caching**: Reduce server load by caching static assets:
   ```nginx
   location ~* \.(js|css|png)$ {
       expires 365d;
   }
   ```

#### Real-World Example: Deploying a Static Site
Create a simple HTML file at `/var/www/html/index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Nginx Site</title>
</head>
<body>
    <h1>Welcome to Nginx! 🌐</h1>
    <p>This site runs on your Ubuntu server with Nginx.</p>
</body>
</html>
```

Then restart Nginx:
```bash
sudo systemctl restart nginx
```

Visit `http://your-server-ip` to see your site live.

---

### Apache: The Legacy Web Server

Apache remains the most widely used web server, especially for complex dynamic applications and legacy systems. Its flexibility makes it perfect for PHP, Python, and custom modules.

#### Installation on Ubuntu
```bash
sudo apt update
sudo apt install apache2
```

#### Basic Configuration
The main config file is `/etc/apache2/apache2.conf`. Start with a minimal setup:

```apache
# Enable the default site
<VirtualHost *:80>
    ServerName example.com
    DocumentRoot /var/www/html
    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

#### Key Features in Action
1. **Dynamic Content**: Apache excels with PHP/Python via modules:
   ```apache
   # Enable PHP processing
   AddHandler php8.1 .php
   ```
2. **URL Rewriting**: Create clean URLs for SEO:
   ```apache
   RewriteEngine On
   RewriteRule ^about$ /index.php?section=about [L]
   ```
3. **Security**: Use `.htaccess` for basic access control:
   ```apache
   # /var/www/html/.htaccess
   AuthType Basic
   AuthName "Restricted Area"
   AuthUserFile /etc/apache2/.htpasswd
   ```

#### Real-World Example: Deploying a PHP Site
1. Create a PHP file at `/var/www/html/info.php`:
   ```php
   <?php
   phpinfo();
   ```
2. Restart Apache:
   ```bash
   sudo systemctl restart apache2
   ```
3. Visit `http://your-server-ip/info.php` to see PHP details.

> 💡 **Pro Tip**: For production, always use `sudo` to avoid permissions issues. Never run web servers as `root`.

---

### Hosting Websites: From Local to Production

Now that you’ve set up both servers, let’s deploy a real website with proper security and scalability.

#### Step 1: Configure DNS
1. Register a domain (e.g., `yourdomain.com`)
2. Point your DNS to your server’s IP (via your DNS provider)

#### Step 2: Set Up HTTPS (Critical for Production)
Use Let’s Encrypt for free SSL certificates:

```bash
# For Nginx
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com

# For Apache
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d yourdomain.com
```

#### Step 3: Security Hardening
| Tool               | Purpose                          | Command Example                     |
|---------------------|-----------------------------------|-------------------------------------|
| `ufw`               | Firewall                         | `sudo ufw allow 'Apache'`          |
| `fail2ban`          | Block brute-force attacks        | `sudo apt install fail2ban`        |
| `rsyslog`           | Log monitoring                   | `sudo apt install rsyslog`         |

#### Step 4: Scalability Patterns
1. **Content Delivery Networks (CDNs)**: Use Cloudflare or AWS CloudFront to cache content globally.
2. **Load Balancing**: Distribute traffic across multiple servers (e.g., with Nginx’s `upstream` directive).
3. **Auto-Scaling**: For cloud deployments (AWS EC2, DigitalOcean), set up auto-scaling groups.

#### Real-World Deployment Checklist
1. Install and test your web server (Nginx or Apache)
2. Configure SSL via Let’s Encrypt
3. Set up a domain and DNS records
4. Implement basic security (firewall, fail2ban)
5. Add monitoring (e.g., `nginx` stats in `/var/log/nginx/`)

> 🌐 **Remember**: Production deployments require *testing* in staging first. Always use version control for configs!

---

## Summary

You’ve now mastered the practical implementation of two industry-standard web servers: **Nginx** for high-performance static sites and **Apache** for dynamic applications. By deploying real websites with HTTPS, security hardening, and scalability patterns, you’ve built a foundation for production-ready web infrastructure. The key takeaway? **Choose your server based on your workload**: Nginx for speed and scalability, Apache for complex dynamic content. Always prioritize security and testing before production deployment. Your next step? Build a real website and share it with the world! 🌐