## CI/CD Pipelines

In the world of cloud-native development, **CI/CD pipelines** are the lifeblood of efficient and reliable software delivery. They automate the entire journey from code commit to production deployment, ensuring every change is tested, built, and deployed with minimal human intervention. This section dives deep into two critical aspects: **Build and Deploy** and **Automation**. By the end, you'll have a robust foundation for creating pipelines that are resilient, scalable, and production-ready.

### Build and Deploy

The **build and deploy** phase transforms your source code into a production-ready application. In Kubernetes environments, this typically involves three key steps:

1. **Compile code** into a container image
2. **Push** the image to a registry (e.g., Docker Hub)
3. **Deploy** the image to your Kubernetes cluster

Let's walk through a concrete example using a **Go application**:

#### Example: Building and Deploying a Go Application

1. **Create a Dockerfile** (for building the Go application):
   ```dockerfile
   # Dockerfile
   FROM golang:1.21-alpine
   WORKDIR /app
   COPY . .
   RUN go build -o app
   EXPOSE 8080
   CMD ["./app"]
   ```

2. **Create a GitHub Actions workflow** (triggers on `main` branch pushes):
   ```yaml
   name: Build and Deploy

   on:
     push:
       branches: [ main ]

   jobs:
     build-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout code
           uses: actions/checkout@v4

         - name: Set up Go
           uses: actions/setup-go@v4
           with:
             go-version: '1.21'

         - name: Build
           run: go build -o app

         - name: Push to Docker Hub
           uses: docker/build-push-action@v4
           with:
             context: .
             dockerfile: Dockerfile
             tags: gcr.io/my-project/app:$(git rev-parse HEAD)

         - name: Deploy to Kubernetes
           uses: kubernetes/action-kubectl@v1
           with:
             command: apply -f k8s/deployment.yaml
   ```

3. **Create a Kubernetes deployment manifest** (`k8s/deployment.yaml`):
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: go-app
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: go-app
     template:
       metadata:
         labels:
           app: go-app
       spec:
         containers:
         - name: go-app
           image: gcr.io/my-project/app:$(git rev-parse HEAD)
           ports:
             - containerPort: 8080
   ```

**Why this matters**: This pipeline ensures *reproducibility* by embedding the commit hash in the image tag. If a deployment fails, you can instantly roll back to a previous stable version using the exact commit context. This is critical for production reliability.

### Automation

**Automation** goes beyond simple scripting—it's about building systems that are *self-healing* and *resilient*. The most advanced approach is **GitOps**, which treats infrastructure as code and uses Git as the single source of truth for deployments.

#### Why GitOps is powerful

GitOps transforms automation by:
- **Eliminating manual deployments** (changes are applied automatically when committed to Git)
- **Enabling instant rollbacks** (revert to previous Git commits with one click)
- **Providing full auditability** (every change is tracked in Git history)

**Example GitOps Workflow**:
```bash
# Install Flux (GitOps controller)
flux install --git-repo=https://github.com/your-username/your-repo.git \
  --git-branch=main \
  --kubernetes \
  --namespace=flux

# Commit your Kubernetes manifest to Git (e.g., k8s/deployment.yaml)
echo "apiVersion: apps/v1
kind: Deployment
metadata:
  name: go-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: go-app
  template:
    metadata:
      labels:
        app: go-app
    spec:
      containers:
      - name: go-app
        image: gcr.io/my-project/app:$(git rev-parse HEAD)
        ports:
          - containerPort: 8080
" > k8s/deployment.yaml
```

**Key difference**: Traditional CI/CD pipelines deploy *after* code changes, while GitOps deploys *from* Git changes. This makes GitOps ideal for environments requiring strict compliance and traceability.

### Summary

In this section, we've explored the critical aspects of CI/CD pipelines: **Build and Deploy** and **Automation**. We demonstrated a practical workflow for building and deploying a Go application to Kubernetes, and we extended it to include automated testing. We also introduced **GitOps** as a modern approach to automation that leverages Git as the single source of truth for infrastructure.

By automating your build, test, and deployment processes, you ensure that your applications are delivered consistently, securely, and at scale. Remember: **automation is not just about running commands—it's about building systems that are resilient and self-healing**. 🚀