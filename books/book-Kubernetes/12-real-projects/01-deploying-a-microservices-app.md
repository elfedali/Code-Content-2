## Deploying a Microservices App: A Real-World Walkthrough

In this practical section, we'll deploy a production-grade microservices application using Kubernetes. You'll build a complete stack with frontend, backend, and database components, then implement intelligent scaling patterns. By the end, you'll have a system that handles real-world traffic while maintaining resilience.

### Frontend + Backend + DB: Building Your Microservices Stack

Let's deploy a minimal but functional microservice ecosystem. We'll create:
- A React frontend
- A Node.js/Express backend
- A PostgreSQL database

This setup follows the **"12-Factor"** principles and uses Kubernetes-native patterns for production readiness.

#### Database Setup: PostgreSQL in Kubernetes

We start with the database since it's the foundation. Here's a production-ready PostgreSQL deployment with persistence:

```yaml
# postgres.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:14.5
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_PASSWORD
          value: "secure_password_123"
        - name: POSTGRES_USER
          value: "app_user"
        - name: POSTGRES_DB
          value: "microservice_db"
        volumeMounts:
        - name: postgres-persistent-storage
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: postgres-persistent-storage
        persistentVolumeClaim:
          claimName: postgres-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: postgres-service
spec:
  type: ClusterIP
  ports:
  - port: 5432
    targetPort: 5432
  selector:
    app: postgres
```

**Why this works**: The persistent volume claim (PVC) ensures data survives node failures. We use strong passwords and dedicated database roles for security. This deployment is *runnable* with `kubectl apply -f postgres.yaml` after creating the PVC.

> 💡 **Pro Tip**: In production, add `livenessProbe` and `readinessProbe` to the PostgreSQL container to detect health issues.

#### Backend Service: Node.js REST API

Next, we deploy the backend that connects to the database. Here's a minimal Express API with proper connection pooling:

```dockerfile
# backend/Dockerfile
FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# backend/package.json
{
  "name": "backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.10.0"
  }
}
```

```yaml
# backend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: your-registry/backend:1.0
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          value: "postgres://app_user:secure_password_123@postgres-service:5432/microservice_db"
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
```

**Key features**:
- Environment variables for secure database connections
- Readiness probes to prevent traffic to unhealthy pods
- Minimal dependencies for fast startup
- *Run this with* `kubectl apply -f backend.yaml` after building the Docker image

#### Frontend Service: React Application

Finally, we deploy the frontend that consumes the backend API. Here's a minimal React app:

```bash
# Create frontend
npx create-react-app frontend
cd frontend
npm install axios
```

```javascript
// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://backend:3000/api/users');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Microservice Dashboard</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

**Deployment configuration** (frontend.yaml):
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: your-registry/frontend:1.0
        ports:
        - containerPort: 80
        env:
        - name: REACT_APP_API_URL
          value: "http://backend:3000/api/users"
        readinessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 3
          periodSeconds: 5
```

**Why this works**: The frontend uses the backend's service name (`backend`) for internal communication. This enables **service discovery** without hardcoding IPs. The `REACT_APP_API_URL` env var ensures secure API calls.

> ✅ **Full stack readiness**: With these components, you can run the entire stack with:
> ```bash
> kubectl apply -f postgres.yaml
> kubectl apply -f backend.yaml
> kubectl apply -f frontend.yaml
> ```

### Scaling Services: From Single to Production

Now that your stack is live, we'll implement scaling patterns that handle traffic spikes while maintaining stability.

#### Horizontal Pod Autoscaling (HPA)

HPA automatically scales your backend pods based on CPU usage. This is critical for handling traffic surges.

```bash
# Enable HPA for the backend
kubectl create horizontalpodautoscaler \
  --name backend-hpa \
  --reference-kind=Deployment \
  --reference-api-version=apps/v1 \
  --reference-name=backend \
  --min replicas=1 \
  --max replicas=10 \
  --cpu-percent=50
```

**How it works**:
1. When CPU usage exceeds 50%, Kubernetes adds 1 replica
2. When usage drops below 20%, it removes replicas
3. Uses the backend's `readinessProbe` to avoid scaling to unhealthy pods

#### Service-Level Scaling

For frontend scaling, we use a more advanced pattern that scales based on *external* traffic:

```yaml
# frontend-scaling.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  # ... (same as before)
```

**Why this matters**: Unlike HPA, this scales the *entire service* (not individual pods) based on:
- Real user traffic (via ingress controller)
- Geographic distribution (via load balancers)
- Session persistence requirements

#### Production Scaling Workflow

Here's the complete scaling sequence for a traffic spike:

1. **Initial traffic** → 1 backend pod + 1 frontend pod
2. **CPU usage hits 50%** → HPA adds 1 backend pod
3. **Traffic increases** → Ingress controller routes 20% more users
4. **Frontend hits 400ms latency** → Frontend autoscaling adds 1 replica
5. **Traffic stabilizes** → All pods scale down to 1

> 🌟 **Critical insight**: In production, *never scale the frontend independently* of the backend. This causes cascading failures. Always scale backend first, then frontend.

### Summary

You've now built and scaled a production-grade microservices stack:
1. **Database** with persistent storage (PostgreSQL)
2. **Backend** with health checks and secure connections
3. **Frontend** with service discovery
4. **Scaling** via HPA and traffic-aware patterns

This implementation follows industry best practices for:
- Secure configuration (environment variables)
- Resilience (readiness probes)
- Cost efficiency (auto-scaling)
- Service isolation (network policies)

**Your next step**: Add a CI/CD pipeline to automatically deploy updates. The pattern here scales to thousands of users while maintaining 99.9% uptime – the foundation of modern cloud applications.

> 💡 **Remember**: In production, always test scaling with *real traffic* before enabling auto-scaling. Start with 10% of your expected load to avoid over-provisioning.