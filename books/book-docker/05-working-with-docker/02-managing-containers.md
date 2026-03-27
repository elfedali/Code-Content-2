## Managing Containers

In this section, we dive into the practical mechanics of controlling Docker containers—specifically how to start, stop, and manage their lifecycle with precision. These operations form the bedrock of container orchestration and are essential for maintaining reliable, production-grade services. Let’s break down the essentials with real-world examples.

### Start/Stop

Starting and stopping containers is the most fundamental interaction with Docker. These actions allow you to control when your applications are active and when they’re paused for maintenance, updates, or resource optimization. The `docker start` and `docker stop` commands are your primary tools for this workflow.

Here’s how to use them:

1. **Starting a container**  
   When you need to activate a container that was previously stopped or created but not running, use `docker start`. This command brings your container back online without rebuilding it. For example, if you stopped a container named `my-web-app` earlier, you’d run:
   ```bash
   docker start my-web-app
   ```

2. **Stopping a container**  
   To pause a container (e.g., for maintenance or to free resources), use `docker stop`. This gracefully terminates the container by sending a `SIGTERM` signal first, followed by a `SIGKILL` if it doesn’t respond in time. Example:
   ```bash
   docker stop my-web-app
   ```

**Key insights**:
- Containers can be **started after being stopped** (not just after creation). This is critical for workflows like rolling updates or testing.
- The `docker stop` command **always sends a graceful shutdown signal**—unlike `docker kill`, which forces an immediate termination. This prevents data corruption in stateful applications.
- You can stop containers **by container ID or name**, which is useful when you don’t remember names (e.g., `docker stop $(docker ps -q)`).

**Real-world scenario**:  
Imagine you’re deploying a web service. After a successful build, you run `docker run -d --name my-web-app nginx`. Later, you need to update the service without downtime. You stop the old container (`docker stop my-web-app`), deploy a new version, and then start it. This ensures zero data loss during the transition.

> 💡 **Pro tip**: Always use `docker stop` instead of `docker kill` for production containers. The graceful shutdown prevents abrupt service interruptions and protects your data.

### Restart Policies

Restart policies define *how* Docker handles container restarts when they exit unexpectedly (e.g., due to crashes, restarts, or failures). This is critical for ensuring your services stay running in production environments. By default, Docker containers restart only when explicitly started with `docker run`—but you can configure policies to automate recovery.

Here’s how they work:

1. **Common restart policies**  
   Docker supports four restart policies:
   - `no`: Default policy. Container stops and doesn’t restart (useful for manual maintenance).
   - `on-failure`: Restart the container if it exits with a non-zero exit code (e.g., due to application errors).
   - `unless-stopped`: Restart the container *unless* you explicitly stop it (useful for long-running services).
   - `always`: Always restart the container regardless of exit status (ideal for stateless services).

2. **Setting restart policies**  
   You configure policies when creating a container (via `docker run` or `docker-compose`). Example using `docker run`:
   ```bash
   docker run -d --name my-app \
     --restart=on-failure:5 \
     nginx
   ```
   This sets the container to restart *only* if it fails (exit code ≠ 0) up to 5 times before giving up.

3. **Using `docker update` for dynamic changes**  
   If you need to adjust a policy after creation (e.g., changing from `on-failure` to `always`), use:
   ```bash
   docker update --restart=always my-app
   ```

**Why restart policies matter in production**:  
- **Reliability**: Services like web servers or databases often need to auto-restart after crashes (e.g., `on-failure` prevents a failed app from lingering).
- **Resource efficiency**: `no` prevents unnecessary restarts for services that should run only manually (e.g., development containers).
- **Failover scenarios**: `always` ensures stateless services (like Redis) stay up even after crashes—critical for high availability.

**Comparative table of restart policies**:

| Policy          | When to use                          | Example scenario                     |
|------------------|---------------------------------------|--------------------------------------|
| `no`             | Manual maintenance                   | Development containers              |
| `on-failure`     | Application crashes (exit code ≠ 0)  | Web apps with error handling        |
| `unless-stopped` | Long-running services (e.g., DBs)    | PostgreSQL, MongoDB                |
| `always`         | Stateless services (e.g., load balancers) | Nginx, API gateways               |

**Real-world scenario**:  
Deploy a database container that must auto-restart after crashes but shouldn’t restart if you manually stop it. You’d use:
```bash
docker run -d --name db \
  --restart=unless-stopped \
  postgres:15
```
This ensures your database stays running *unless* you explicitly stop it—perfect for production databases where downtime must be intentional.

> ✅ **Best practice**: Always set restart policies for production containers. For stateful services (databases), use `unless-stopped`; for stateless services (webservers), use `on-failure` or `always`.

## Summary

In this section, we covered the two critical aspects of container management: **starting/stopping containers** and **configuring restart policies**. You now know how to activate or pause containers with `docker start` and `docker stop` (with graceful shutdowns), and how to implement robust restart policies like `on-failure` and `always` to ensure your services stay resilient. Remember: **use `stop` not `kill` for production**, and **always define restart policies** for containers that run in production environments. These fundamentals empower you to build reliable, self-healing systems—without manual intervention. 🐳