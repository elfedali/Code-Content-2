## Deploying a Web App

When scaling your applications from development to production, Docker provides a consistent, portable environment that eliminates "it works on my machine" headaches. This section walks you through deploying three common web application stacks—Node.js, PHP, and React—on a VPS host. Each example includes production-ready configurations, security best practices, and real-world deployment workflows.

### Node.js App

Node.js applications thrive in Docker due to their lightweight, event-driven architecture. We'll deploy a basic Express.js app with production optimizations.

**Step 1: Create a minimal Express app**  
Start with a simple app that serves a "Hello World" response. This demonstrates core deployment patterns without unnecessary complexity.

```bash
mkdir node-app && cd node-app
npm init -y
npm install express
```

**Step 2: Build a production-ready Dockerfile**  
This Dockerfile includes Node.js 20, production build flags, and security hardening:

```dockerfile
# Use a minimal Node base image with security updates
FROM node:20.12.2-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json . 
RUN npm install --production

# Copy application code
COPY . .

# Expose port 3000 (default for Express)
EXPOSE 3000

# Run the production server
CMD ["node", "server.js"]
```

**Step 3: Deploy to your VPS**  
On your VPS (with Docker installed), follow these steps:

1. Create a `docker-compose.yml` file:
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
```

2. Run the deployment:
```bash
docker-compose up -d
```

**Key production considerations**  
- **Health checks**: Prevents Docker from restarting failed containers (critical for production stability)
- **Production flags**: `NODE_ENV=production` triggers optimized builds and security hardening
- **Alpine base**: Reduces image size by ~70% vs. Debian-based images
- **Port mapping**: Exposes port 3000 to your VPS's public IP for web traffic

> 💡 Pro tip: Always add a health check to your Dockerfile. This ensures your application is ready to handle traffic before Docker restarts it.

### PHP App

PHP applications benefit from Docker's isolation, especially when using modern PHP versions with Composer and production configuration.

**Step 1: Create a PHP application**  
We'll use a simple Laravel app for demonstration (though any PHP stack works). Initialize with:

```bash
mkdir php-app && cd php-app
composer init -y
composer require laravel/laravel
```

**Step 2: Build a secure PHP Docker image**  
This configuration uses PHP 8.2, FPM (for better performance than CLI), and security best practices:

```dockerfile
# Use official PHP 8.2 FPM image with security updates
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

# Install PHP extensions needed for production
RUN docker-php-extension-installer redis mbstring pdo_mysql

# Copy composer.json and install dependencies
COPY composer.json composer.json
RUN composer install --no-dev

# Copy application code
COPY . .

# Configure PHP for production
COPY php.ini /etc/php/8.2/fpm/php.ini

# Set environment variables
ENV DISPLAY_NAME="Production"
ENV APP_ENV=production

# Run as non-root user for security
USER 999:999

# Expose port 9000 (FPM default)
EXPOSE 9000
```

**Step 3: Deploy to your VPS**  
On your VPS:

1. Create a `docker-compose.yml`:
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "9000:9000"
    environment:
      - APP_ENV=production
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/health"]
      interval: 30s
      timeout: 10s
```

2. Run the deployment:
```bash
docker-compose up -d
```

**Critical security enhancements**  
| Feature | Why it matters | Example |
|---------|----------------|---------|
| `USER 999:999` | Prevents privilege escalation | Runs as non-root user |
| `php.ini` | Configures security settings | Disables unsafe functions |
| `restart: always` | Ensures service resilience | Auto-restarts on failure |
| `healthcheck` | Prevents traffic to unhealthy services | 30s interval, 10s timeout |

> ⚠️ **Warning**: Always disable `display_errors` in production PHP configs. This prevents sensitive errors from leaking to users.

### React Build

React applications are typically static assets after build. We'll deploy a production build using Docker for consistent delivery.

**Step 1: Create a React app**  
Start with a basic React project:

```bash
npx create-react-app react-app
cd react-app
npm install
```

**Step 2: Build for production**  
Generate a production-ready static build:

```bash
npm run build
```

**Step 3: Dockerize the static build**  
This Dockerfile serves the React build with Nginx for production performance:

```dockerfile
# Use lightweight Nginx base image
FROM nginx:alpine

# Copy production build
COPY build /usr/share/nginx/html

# Configure Nginx for production
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set security headers
RUN echo "add_header X-Content-Type-Options nosniff;" >> /etc/nginx/conf.d/default.conf
RUN echo "add_header X-Frame-Options DENY;" >> /etc/nginx/conf.d/default.conf

# Expose port 80 (HTTP)
EXPOSE 80
```

**Step 4: Deploy to your VPS**  
On your VPS:

1. Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name _;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

2. Run the deployment:
```bash
docker-compose up -d
```

**Why this works for React**  
- **Client-side rendering**: React builds to static files (no server-side rendering needed)
- **Nginx optimization**: Handles static assets efficiently with cache control
- **Security headers**: Prevents common attacks like XSS and clickjacking
- **404 handling**: `try_files` ensures clean 404 responses for client-side routes

> ✨ **Pro tip**: For larger React apps, use Docker's multi-stage build to reduce image size by ~50% (we'll skip this for brevity but it's a key production practice).

## Summary

You've now deployed three critical web application stacks using Docker on VPS hosting:
1. **Node.js apps** benefit from lightweight containers with health checks and production optimizations
2. **PHP apps** leverage Dockerized FPM with security-hardened configurations and proper environment variables
3. **React builds** work best as static assets served through Nginx with security headers

Each deployment follows identical patterns: Dockerfile configuration, `docker-compose` orchestration, and health checks for production resilience. The key takeaway is **consistency**—your development environment becomes identical to production, eliminating configuration drift. Remember to always test deployments in staging before production, and monitor your VPS with tools like `docker stats` to ensure smooth operation. 🚀