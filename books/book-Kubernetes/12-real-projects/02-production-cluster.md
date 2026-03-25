## Production Cluster

In the real world, Kubernetes clusters must be designed to handle production demands. This section dives into two critical aspects: **High Availability** and **Load Balancing**. We'll walk through practical implementations using real-world scenarios and configurations that you can deploy immediately.

### High Availability

High availability (HA) is non-negotiable in production environments. It ensures your services remain accessible even when individual components fail. In Kubernetes, HA is achieved through three key layers:

1. **Control Plane HA**: The control plane must be resilient. A common pattern is to run the control plane on multiple nodes (e.g., 3 master nodes) with a shared etcd cluster.
2. **Worker Node HA**: Worker nodes should be configured with redundancy and failover capabilities.
3. **Stateful Services**: Critical services (like databases) require stateful sets with persistent storage and replication.

Here's a practical example of a stateful set for a PostgreSQL database (a common production use case):

```yaml
# postgres-statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  replicas: 3
  serviceName: "postgres-service"
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:14
        env:
        - name: POSTGRES_PASSWORD
          value: "securepassword"
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: postgres-data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "standard"
      resources:
        requests:
          storage: "10Gi"
```

This StatefulSet ensures:
- Each PostgreSQL pod has its own persistent volume (preventing data loss on failure)
- Pods are ordered (pod 0, 1, 2) with automatic replication
- The service name `postgres-service` provides stable DNS resolution

*Pro tip*: Always test your HA setup with controlled failures. Delete one PostgreSQL pod and verify the database continues operating with minimal downtime.

### Load Balancing

In production, **load balancing** is essential for distributing traffic across multiple instances and handling scaling. Kubernetes provides two primary approaches:

1. **In-Cluster Load Balancing**: Using Kubernetes Services (type `LoadBalancer`) for internal traffic distribution
2. **External Load Balancing**: Using Ingress controllers for public HTTP(S) traffic routing

Let's walk through a real-world implementation:

**Step 1: Deploy a web application** (Node.js example)
```yaml
# web-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: my-web-app:1.0
        ports:
        - containerPort: 8080
```

**Step 2: Create an internal load balancer**
```yaml
# web-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: web
```

**Step 3: Implement external HTTP routing** (Nginx Ingress)
```yaml
# nginx-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
spec:
  rules:
  - http:
      paths:
      - path: "/"
        pathType: Prefix
        backend:
          service:
            name: web
            port:
              number: 80
```

When applied, Kubernetes creates a cloud provider load balancer (e.g., AWS ALB) that distributes traffic to your 3 pods. For complex routing, the Ingress controller handles path-based routing, hostnames, and SSL termination.

*Pro tip*: Always configure health checks using `livenessProbe` and `readinessProbe` in your pod specifications to ensure only healthy instances receive traffic.

Here's a quick comparison of load balancing approaches:

| Approach                | When to Use                                      | Example Use Case                     |
|-------------------------|--------------------------------------------------|--------------------------------------|
| In-Cluster (Service)    | Internal traffic distribution within cluster      | Microservice backend communication  |
| External (Ingress)      | Public HTTP(S) traffic from clients              | Customer-facing web applications    |

## Summary

In this section, we've covered two critical production aspects of Kubernetes clusters:

- **High Availability**: Ensuring your cluster remains operational despite node failures through multi-node control planes and stateful services.
- **Load Balancing**: Distributing traffic efficiently using Kubernetes Services and Ingress controllers for both internal and external traffic.

These practices form the foundation of a resilient and scalable production cluster. 🔄🌐