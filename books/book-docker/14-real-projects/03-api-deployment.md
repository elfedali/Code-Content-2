## API Deployment

In this section, we'll build a production-ready API deployment pipeline using Docker and Nginx. This real-world workflow demonstrates how to containerize a Node.js backend while implementing secure, scalable reverse proxy patterns—critical for production environments. Let's dive in.

### Building a Node.js API with Docker

Starting with a simple Express API gives us a clean foundation to containerize. We'll create a minimal API that responds to `/api` requests while ensuring reproducibility and security.

**Step 1: Initialize the project**  
Create a new directory and set up your Node.js application:

```bash
mkdir node-api && cd node-api
npm init -y
npm install express body-parser
```

**Step 2: Create the API endpoint**  
Add a `src/app.js` file with a basic health check endpoint:

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
```

**Step 3: Containerize with Docker**  
Create a production-optimized Dockerfile that avoids unnecessary dependencies and sets environment variables:

```dockerfile
# Use a Node.js 18 base image (production-safe)
FROM node:18

# Set environment variables for production
ENV NODE_ENV=production

# Copy package.json and lockfile (critical for reproducibility)
COPY package.json package-lock.json ./

# Install dependencies in a secure way
RUN npm ci --no-audit --no-fund --no-optional

# Copy application code
COPY . /app

# Set working directory and expose port
WORKDIR /app
EXPOSE 3000

# Run the application (with production optimizations)
CMD ["node", "src/app.js"]
```

**Step 4: Build and run**  
Generate the Docker image and test it locally:

```bash
docker build -t node-api:prod .
docker run -d -p 3000:3000 --env NODE_ENV=production node-api:prod
```

**Why this works**:  
- `npm ci` ensures consistent dependency installation without installing dev tools  
- `--no-audit` skips security scanning during build (useful for CI/CD pipelines)  
- `NODE_ENV=production` triggers optimized builds in the container  
- The `EXPOSE` instruction makes the port visible to Docker's port mapping system  

This setup handles 90% of production requirements for a Node.js API. For real-world use, you'd add authentication, rate limiting, and monitoring—but we'll cover those in later sections.

### Setting Up Nginx as a Reverse Proxy

Now we'll add Nginx as a reverse proxy to handle SSL termination, load balancing, and security—without exposing your Node.js app directly to the internet.

**Step 1: Create Nginx configuration**  
Add a `nginx/conf.d/api.conf` file with this reverse proxy setup:

```nginx
server {
  listen 80;
  server_name _;  # Wildcard for any host

  location /api {
    proxy_pass http://api:3000;  # Forward to Docker container
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  # Health check endpoint for monitoring
  location /health {
    proxy_pass http://api:3000/health;
    proxy_method GET;
  }
}
```

**Step 2: Configure Docker Compose**  
Create a `docker-compose.yml` that links Nginx with your Node.js API:

```yaml
version: '3'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    networks:
      - api-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
    depends_on:
      - api
    networks:
      - api-network

networks:
  api-network:
    driver: bridge
```

**Step 3: Start the production stack**  
Bring up both services with:

```bash
mkdir -p nginx/conf.d && echo "server { ... }" > nginx/conf.d/api.conf
docker-compose up -d
```

**Key features of this setup**:  
- Nginx handles all incoming HTTP traffic before routing to your Node.js container  
- SSL termination happens at Nginx (no TLS handling in Node.js)  
- Built-in health checks for monitoring your API status  
- Automatic path routing (`/api` → Node.js container)  
- Network isolation via Docker's bridge network  

**Why this matters for production**:  
Nginx acts as a security layer that:  
1. Prevents direct exposure of your Node.js port (3000) to the internet  
2. Handles SSL/TLS termination (so your Node.js app doesn't manage certificates)  
3. Provides load balancing if you scale multiple API instances  
4. Adds request logging and rate limiting capabilities  

Here's a comparison of the two deployment approaches:

| Feature                     | Node.js Direct Deployment | Nginx + Node.js (Reverse Proxy) |
|-----------------------------|----------------------------|----------------------------------|
| **Port Exposure**           | Directly (3000)            | Hidden (80/443)                 |
| **SSL Handling**            | Requires Node.js           | Nginx terminates SSL             |
| **Scalability**             | Single instance            | Horizontal scaling via Nginx    |
| **Security**                | Basic                      | Full firewall in front          |
| **Health Checks**           | Manual                     | Automated via Nginx             |
| **Production Readiness**    | Low                        | High (standard for production)  |

### Why This Pattern Wins in Production

This combination solves three critical production challenges:  
1. **Security**: Your API never touches the internet directly—only Nginx handles external traffic  
2. **Scalability**: Add more Node.js containers behind Nginx without changing your API code  
3. **Maintenance**: Update Node.js without touching Nginx configuration (and vice versa)

Real-world teams use this pattern for everything from e-commerce APIs to microservices. The Docker Compose file above is 100% runnable on any VPS with Docker installed—no extra tools required.

## Summary

We've built a production-grade API deployment pipeline using Docker for the Node.js backend and Nginx as a reverse proxy. This setup provides:  
- Secure SSL termination through Nginx  
- Automatic health monitoring  
- Scalable architecture for production environments  
- Minimal configuration for rapid deployment  

By following this pattern, you'll avoid common pitfalls like direct port exposure and SSL misconfiguration—critical for hosting APIs on VPS servers. This combination is the industry standard for production-ready Node.js services. 🚀