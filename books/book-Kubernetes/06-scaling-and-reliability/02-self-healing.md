## Self-healing

Self-healing is the backbone of resilient cloud-native systems—it’s Kubernetes’ ability to automatically detect and recover from failures without human intervention. In this section, we’ll dive deep into two critical mechanisms that power self-healing: **restart policies** and **health checks**. These features work together to ensure your applications stay available, even when components crash or become unresponsive.

### Restart Policies

Restart policies define *how* Kubernetes handles container failures. They’re a simple yet powerful configuration that directly impacts your application’s uptime and recovery behavior. Kubernetes supports three restart policies:

1. `Always`: Restart the container immediately after it exits (regardless of exit code)
2. `OnFailure`: Restart the container *only* when it exits with a non-zero status code
3. `Never`: Never restart the container after it exits

These policies are crucial for balancing application stability and resource efficiency. For example, stateless web servers typically use `OnFailure` to avoid unnecessary restarts after clean shutdowns, while stateful databases might require `Always` to ensure continuous operation.

Here’s a practical example using a custom Python application that intentionally crashes after 5 seconds to demonstrate policy behavior:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: crash-demo-pod
spec:
  containers:
  - name: crash-demo
    image: alpine
    command: ["sh", "-c", "sleep 5 && exit 1"]
    restartPolicy: OnFailure
```

In this scenario:
- The container runs for 5 seconds
- Then exits with `exit 1` (non-zero)
- Kubernetes *restarts* it immediately due to `OnFailure` policy
- The container repeats the cycle indefinitely

**Why this matters**: Using `OnFailure` prevents Kubernetes from restarting containers during normal shutdowns (e.g., when a process exits cleanly with `exit 0`). This avoids unnecessary resource consumption while still recovering from true failures. For production services, we recommend `OnFailure` as the default policy—unless you have specific requirements for stateful workloads where `Always` is needed.

### Health Checks

Health checks are the intelligence behind Kubernetes’ self-healing capabilities. They enable Kubernetes to *distinguish between* healthy and unhealthy containers, triggering precise recovery actions. Kubernetes supports two critical health check types:

- **Liveness Probes**: Determine if a container is *running* (is the process alive?)
- **Readiness Probes**: Determine if a container is *ready to serve traffic* (is it prepared for requests?)

These probes work together in a feedback loop:
1. Liveness probes → decide *when to restart* a container
2. Readiness probes → decide *when to stop routing traffic* to a container

Here’s a real-world example using a Node.js application with liveness and readiness probes:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: health-check-demo
spec:
  containers:
  - name: health-check
    image: node:18
    command: ["sh", "-c", "while true; do sleep 3; done"]
    ports:
    - containerPort: 8080
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 10
```

**How it works**:
- The `livenessProbe` checks if the container is running every 10 seconds (after 5-second delay)
- If it fails, Kubernetes *restarts* the container
- The `readinessProbe` checks if the container is ready to handle traffic every 10 seconds
- If it fails, Kubernetes *stops routing traffic* to the container

This example demonstrates a common pattern: applications often have a `/health` endpoint for liveness (simple health status) and a `/ready` endpoint for readiness (application-specific readiness). The `initialDelaySeconds` ensures Kubernetes doesn’t make premature decisions during startup.

| Probe Type        | Purpose                                      | Failure Consequence                              | When to Use                          |
|--------------------|-----------------------------------------------|--------------------------------------------------|---------------------------------------|
| Liveness Probe     | Container is running?                        | Container is restarted                          | Critical processes that must always be alive |
| Readiness Probe    | Container ready to serve traffic?             | Traffic is stopped from this pod                 | All traffic-serving components       |

**Key insight**: Health checks *prevent* the "killing the problem" scenario where Kubernetes restarts a container that’s actually stuck but still functional. By using probes with appropriate timeouts, you ensure Kubernetes only takes corrective actions when absolutely necessary.

## Summary

Self-healing in Kubernetes is achieved through two interconnected mechanisms: **restart policies** (which control when containers restart after failure) and **health checks** (which provide the intelligence to distinguish between healthy and unhealthy states). Together, they form the foundation of resilient cloud-native systems—enabling automatic recovery from crashes while avoiding unnecessary restarts. Start with `OnFailure` restart policies and liveness/readiness probes for production workloads, and remember: precise health checks are the difference between a resilient system and one that keeps failing silently. 🚀