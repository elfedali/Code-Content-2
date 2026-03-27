## Multi-container Apps

When building modern applications, you often need to combine multiple services—like a web application and a database—into a single cohesive system. Docker Compose simplifies this by allowing you to define, launch, and manage all your services in one file. In this section, we'll walk through creating a practical **web app + database** setup and explore how services communicate through Docker's built-in networking.

### App + Database

Let's build a minimal working example using a Flask web application and PostgreSQL. This combination is ideal because:
- PostgreSQL is a robust, open-source relational database
- Flask provides a simple Python framework for quick web development
- Docker Compose handles the entire stack without manual port forwarding

Here's a complete `docker-compose.yml` file that defines both services:

```yaml
version: '3.8'

services:
  web:
    image: python:3.11-slim
    working_dir: /app
    command: ["gunicorn", "app:app"]
    volumes:
      - .:/app
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=app_user
      - POSTGRES_PASSWORD=app_password
      - POSTGRES_DB=app_db
    volumes:
      - postgres_data:/data
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "app_user", "-d", "app_db"]
      interval: 10s
      timeout: 5s
      retries: 3

volumes:
  postgres_data:
```

**Why this works**:  
This file creates two services: `web` (the Flask app) and `db` (PostgreSQL). Key features include:
- **Volume management**: The `postgres_data` volume persists database data between container restarts
- **Health checks**: Ensures the database is ready before starting the web app
- **Environment variables**: Securely pass credentials without exposing them in the code
- **Dependency handling**: `web` waits for `db` to start using `depends_on`

To run this setup:
```bash
docker-compose up -d
```

Your application will:
1. Start PostgreSQL in the background
2. Wait for the database to be healthy (via healthcheck)
3. Launch the Flask app on port 5000
4. Automatically connect to the database using the service name `db`

> 💡 **Pro tip**: For production, always use secrets management (like Docker Secrets or environment files) instead of hardcoding passwords in your compose files. This example uses plaintext for simplicity during development.

### Networking Between Services

Docker Compose handles service communication automatically through **internal DNS resolution**. This is the magic that makes multi-container apps work without manual configuration.

#### How it works
When you define services in `docker-compose.yml`, Docker creates a private network for your stack. Services can then:
- Discover each other by **service name** (e.g., `web` service can reach `db` via `db`)
- Communicate using **port forwarding** (e.g., `web` uses port 5000 internally)
- Avoid exposing ports to the public network

In our Flask app example, the web service connects to the database like this:
```python
# app.py (Flask app)
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://app_user:app_password@db/app_db'
db = SQLAlchemy(app)

# ... rest of the app
```

**Key behavior**:
- The Flask app uses `db` as the hostname for the database service
- No manual IP addresses or port mappings needed
- Docker resolves `db` to the internal IP of the PostgreSQL container

#### Real-world test
Let's verify the connection works:
1. Run the app with `docker-compose up -d`
2. Check the database connection in the Flask app
3. Confirm the web service can reach the database

```bash
# Test database connection from web container
docker exec -it web flask shell
>>> from app import db
>>> db.engine.url
# Output: postgresql://app_user:app_password@db/app_db
```

This shows the web service is using `db` as the hostname—**exactly** how Docker Compose resolves services internally.

#### Custom networking (advanced)
While Docker Compose uses a default network, you can customize it for complex needs:
- **Named networks**: Create dedicated networks for specific services
- **Network aliases**: Assign multiple hostnames to a single service
- **Port mappings**: Control external access to services

Here’s a simple example of a custom network for testing:
```yaml
networks:
  app_net:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.18.0.0/16
        - gateway: 172.18.0.1

services:
  web:
    networks:
      - app_net
    environment:
      - DB_HOST=database
  database:
    networks:
      - app_net
    environment:
      - DB_PORT=5432
    image: postgres:15
```

> ✅ **Why this matters**: Without Docker's internal networking, you'd need to manually configure IP addresses and ports between services—prone to errors in production. Docker Compose abstracts this complexity.

## Summary

In this section, we've covered:
- How to build a production-ready **web app + database** stack using Docker Compose
- The critical role of **internal networking** in enabling seamless communication between services
- Real-world examples showing how services discover each other via service names (e.g., `web` talks to `db`)

Docker Compose transforms multi-container applications from complex deployments into simple, maintainable systems. By leveraging its built-in networking and dependency management, you can focus on your application logic while Docker handles the infrastructure. This is just the beginning—next up, we'll dive into advanced networking patterns and scaling your stack. 🐳