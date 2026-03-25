# Configuration Management

## ConfigMaps

ConfigMaps are Kubernetes' primary mechanism for managing application configuration in a declarative, version-controlled way. They allow you to decouple configuration from your application code and infrastructure, enabling cleaner deployments, easier debugging, and better scalability. In this section, we'll explore two critical use cases: **environment variables** and **configuration injection**.

---

### Environment Variables

Environment variables are a fundamental way to pass configuration to containers, but managing them directly in deployment manifests becomes cumbersome as your application grows. ConfigMaps provide a structured solution to define and inject these values securely and consistently.

Here's how to create a ConfigMap with environment variables:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_URL: "http://db-service:5432"
  DB_TIMEOUT: "30s"
```

This ConfigMap stores two critical configuration values. Now, inject these into a container using `env` fields in your deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  template:
    spec:
      containers:
      - name: app
        env:
        - name: DB_URL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: DB_URL
        - name: DB_TIMEOUT
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: DB_TIMEOUT
```

**Key insights**:
- The `valueFrom.configMapKeyRef` syntax directly maps ConfigMap keys to environment variables
- You can inject **multiple** ConfigMap values at once using `envFrom` (see example below)
- This approach keeps configuration **external** to your container image, avoiding hard-coded values

For complex deployments, use `envFrom` to simplify configuration injection:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: complex-app
spec:
  template:
    spec:
      containers:
      - name: complex-app
        envFrom:
        - configMapRef:
            name: app-config
```

This single line injects **all** values from `app-config` into the container's environment. Perfect for applications that need many configuration parameters without verbose `env` declarations.

💡 **Pro Tip**: When using JSON configuration, store it as a string in the ConfigMap and parse it in your application. Example:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  api.json: |
    {
      "port": 8080,
      "timeout": "30s"
    }
```

---

### Configuration Injection

Beyond environment variables, ConfigMaps excel at injecting **configuration files** directly into your application's filesystem. This is essential for applications that require file-based configuration (e.g., Spring Boot, Java, or Python apps).

Here's a practical example of injecting a `application.properties` file:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  application.properties: |
    spring.config.location=file:./application.properties
    server.port=8080
    logging.level.root=INFO
```

Now mount this ConfigMap as a volume in your container:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: java-app
spec:
  template:
    spec:
      containers:
      - name: java-app
        volumeMounts:
        - name: app-config-volume
          mountPath: /app/config
        command: ["sh", "-c"]
        args: ["cat /app/config/application.properties"]
      volumes:
      - name: app-config-volume
        configMap:
          name: app-config
```

**Why this matters**:
- Applications can **read configuration from disk** instead of environment variables
- Enables **runtime configuration changes** without restarting containers
- Works seamlessly with frameworks that use file-based configuration (e.g., Spring Boot, Django)
- Provides **auditability** through Kubernetes' version control

For real-world applications, you might combine both approaches:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: full-stack-app
spec:
  template:
    spec:
      containers:
      - name: full-stack-app
        env:
        - name: DB_URL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: DB_URL
        volumeMounts:
        - name: config-volume
          mountPath: /app/config
      volumes:
      - name: config-volume
        configMap:
          name: app-config
```

---

## Summary

In this section, we've covered how ConfigMaps solve two critical configuration challenges in Kubernetes:
1. **Environment variables**: Inject configuration values securely into container environments using `env` or `envFrom`
2. **Configuration injection**: Mount configuration files directly into your application's filesystem for runtime flexibility

By leveraging ConfigMaps, you achieve:
- Clean separation of configuration from application code
- Version-controlled configuration across deployments
- Safe, declarative configuration updates
- Enhanced observability through Kubernetes-native configuration management

This approach scales seamlessly with your application's complexity while maintaining the simplicity and reliability that make Kubernetes so powerful. 🌟