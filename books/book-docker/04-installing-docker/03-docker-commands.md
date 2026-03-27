## Docker Commands

Welcome to the core of Docker operations! In this section, we'll dive into four essential commands that form the foundation of your VPS hosting workflow. These commands let you launch containers, monitor activity, build images, and debug issues—all critical for moving from setup to production. Let's get hands-on with practical examples that work immediately on your VPS.

### `docker run` - Launching Containers

The `docker run` command creates and starts a new container from an existing image. It’s your go-to for quickly deploying services without building images first—perfect for testing, development, or production environments.

Here’s how to launch a lightweight Nginx web server container that’s accessible via HTTP:

```bash
docker run -d -p 8080:80 nginx
```

- `-d` runs the container in *detached mode* (background)
- `-p 8080:80` maps host port `8080` → container port `80`
- `nginx` specifies the official Nginx image

**Why this matters**: This command lets you get services running in seconds. On your VPS, you’ll access the Nginx server at `http://<your-vps-ip>:8080` immediately after execution.

*Pro tip*: Always use `-d` for production containers to avoid blocking your terminal session.

---

### `docker ps` - Listing Running Containers

The `docker ps` command shows all *active* containers on your system. It’s your quick-reference for monitoring what’s currently running on your VPS.

**Example output** (simulated):
| CONTAINER ID | IMAGE | COMMAND | PORTS | STATUS | NAMES |
|---------------|-------|---------|-------|--------|-------|
| 1234567890ab | nginx | nginx -g daemon off | 0.0.0.0:8080->80/tcp | Up 5 seconds | nginx-container |

**How to use it**:
```bash
docker ps
```
- **`docker ps -a`** lists *all* containers (including stopped ones)
- **`docker ps -f "name=nginx-container"`** filters by container name

**Why this matters**: On a VPS, this command helps you verify service health, spot resource conflicts, and avoid accidental service shutdowns. For example, if your Nginx container is *not* showing as "Up", you’ll know it’s failing before it impacts users.

*Pro tip*: Combine with `docker ps -f "status=exited"` to quickly identify dead containers.

---

### `docker build` - Building Docker Images

The `docker build` command transforms your code into a Docker image using a `Dockerfile`. This step is critical for reproducibility—ensuring your VPS runs the *exact* environment your code expects.

**Step-by-step example**:
1. Create a `Dockerfile` in your project root:
```dockerfile
# Use a minimal Python base image
FROM python:3.10-slim

# Install dependencies
RUN pip install flask

# Copy application code
COPY . /app

# Set working directory and command
WORKDIR /app
CMD ["python", "app.py"]
```

2. Build the image:
```bash
docker build -t my-flask-app .
```
- `-t my-flask-app` tags the image for easy reference
- `.` specifies the current directory as the build context

**Why this matters**: Building images ensures your VPS environment matches development. Without this step, you’d face "it works on my machine" failures in production.

*Pro tip*: Always add a `.dockerignore` file to exclude unnecessary files (e.g., `node_modules`, `.env`) during builds.

---

### `docker logs` - Viewing Container Logs

The `docker logs` command displays logs from a running container. This is your primary debugging tool for diagnosing issues in production.

**Example workflow**:
1. Launch a container (using `docker run` from earlier)
2. View logs:
```bash
docker logs 1234567890ab
```
**Sample output**:
```
* Serving HTTP on 0.0.0.0:80
* Running on http://0.0.0.0:80
```

**Advanced usage**:
- `docker logs -f 1234567890ab` → *follow* logs in real-time (like `tail -f`)
- `docker logs --since="2023-10-01T12:00:00Z" 1234567890ab` → filter logs by timestamp

**Why this matters**: On your VPS, logs reveal why services fail (e.g., "502 Bad Gateway" errors). They’re essential for troubleshooting without SSHing into the container.

*Pro tip*: For production, set up log rotation with `docker logs --tail=50` to avoid overwhelming your terminal.

## Summary

You now have four production-ready Docker commands for your VPS environment:

1. **`docker run`**: Launch containers instantly (e.g., `docker run -d -p 8080:80 nginx`)
2. **`docker ps`**: Monitor active containers (e.g., `docker ps` for quick health checks)
3. **`docker build`**: Create reproducible images (e.g., `docker build -t my-app .`)
4. **`docker logs`**: Debug issues (e.g., `docker logs -f <container-id>`)

These commands form the foundation for reliable VPS hosting—start using them today to build resilient, scalable services. 💡