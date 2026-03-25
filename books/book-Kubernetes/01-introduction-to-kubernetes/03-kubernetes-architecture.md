## Kubernetes Architecture

Kubernetes is designed as a distributed system that orchestrates containerized applications at scale. At its core, this architecture follows a **decoupled control plane model** where components work together to manage infrastructure and application workloads. Think of it as a self-healing orchestration engine that ensures your containers run reliably across your cloud or on-premises environment. 🐳

This section dives into the foundational architecture that powers Kubernetes, breaking down each critical component with practical examples and clear relationships.

### Master Node

The **Master Node** (also called the *control plane*) is the central decision-making layer of Kubernetes. It does **not** run application workloads—it's the brains that manage the entire cluster. The control plane consists of multiple interdependent components running on a single machine (or distributed across multiple machines for high availability). 

The Master Node handles:
- **Cluster state management** (what pods should run where)
- **Policy enforcement** (resource quotas, network policies)
- **Event coordination** (scheduling, scaling, health checks)

Here’s how you verify the Master Node’s health in a real cluster:

```bash
kubectl get component-status
```

**Example output**:
```
NAME                STATUS    MESSAGE              AGE
etcd-0               Healthy   etcd is healthy      10m
scheduler            Healthy   Scheduler is healthy 10m
controller-manager  Healthy   Controller manager is healthy 10m
```

This command shows the core control plane components and their operational status—critical for diagnosing cluster issues.

### Worker Nodes

**Worker Nodes** are the physical or virtual machines that run your application workloads. They execute the containerized applications defined in Kubernetes and form the *execution layer* of the cluster. 

Key characteristics:
- **No central control**: Each worker node operates independently
- **Resource isolation**: Nodes manage their own compute, memory, and storage
- **Dynamic scaling**: Kubernetes can add/remove nodes based on demand

When you run `kubectl get nodes`, you see the list of worker nodes in your cluster:

```bash
kubectl get nodes
```

**Example output**:
```
NAME            STATUS   ROLES      AGE   VERSION
worker-node-01  Ready    <none>     5h   v1.28.0
worker-node-02  Ready    <none>     4h   v1.28.0
```

Worker nodes are where your containers live—**the production environment** for your applications.

### API Server

The **API Server** is Kubernetes' primary interface for all communication with the control plane. It acts as the **RESTful gateway** between clients (like `kubectl`), applications, and the control plane components. 

**Why it matters**:  
Every action in Kubernetes (e.g., creating a pod, scaling a deployment) must go through the API Server. It validates requests, enforces cluster policies, and routes them to the appropriate component.

**Real-world example**:  
When you run `kubectl create deployment nginx --image=nginx:alpine`, this command sends a request to the API Server, which then:
1. Validates the deployment spec
2. Creates a new deployment object
3. Triggers the scheduler to assign pods

You can interact with the API Server directly using `curl` (with caution for security):

```bash
curl -sSL -H "Authorization: Bearer $(kubectl token)" https://api.cluster.example.com/api/v1/namespaces/default/deployments
```

> 💡 **Pro tip**: The API Server is the *only* component that handles all client interactions—this design ensures security and consistency across the cluster.

### Scheduler

The **Scheduler** is the component that decides *where* to run your containers. It runs continuously on the Master Node and matches pods to worker nodes based on:
- Resource requests (CPU, memory)
- Node labels (e.g., `zone=us-east-1`)
- Pod affinity/anti-affinity rules
- Current node capacity

**How it works**:
1. A pod is created via the API Server
2. The Scheduler evaluates node suitability
3. It assigns the pod to the *best* node (lowest resource usage, matching labels)
4. The pod is then scheduled on the node

**Practical demonstration**:  
Create a simple pod with resource constraints and observe scheduling:

```bash
kubectl run busybox --image=busybox --command -- sleep 3600 -n test-namespace
```

This pod will be scheduled on a node that meets its resource requirements (e.g., 500m CPU).

### Controller Manager

The **Controller Manager** runs background controllers that maintain the *desired state* of your cluster. These controllers act like "watchdogs" ensuring your cluster stays aligned with your specifications.

Key controllers include:
1. **Node Controller**: Manages worker nodes (e.g., detects unhealthy nodes)
2. **Replication Controller**: Ensures the correct number of pods run per deployment
3. **Endpoint Controller**: Manages service endpoints

**Real-world impact**:  
When you delete a pod, the Node Controller detects the missing pod and triggers a new one via the Scheduler. This is how Kubernetes achieves **self-healing**.

**Check controller status**:
```bash
kubectl get controllermanager -o wide
```

**Example output**:
```
NAME                STATUS   AGE
node-controller    Running  15m
replication-controller  Running  15m
```

The Controller Manager is the *unsung hero* behind Kubernetes' resilience.

### Kubelet

The **Kubelet** is the *critical agent* running on every worker node. It’s Kubernetes' primary interface to the node itself—ensuring containers run as intended and reporting node health to the Master Node.

**Core responsibilities**:
- **Pod lifecycle management**: Starts/stops containers
- **Health monitoring**: Checks container health via probes
- **Resource reporting**: Sends node metrics to the API Server
- **Security enforcement**: Validates container images and configurations

**Practical verification**:  
Check the Kubelet status on a worker node:

```bash
kubectl describe node worker-node-01 | grep -A 10 "Kubelet"
```

**Example output**:
```
Kubelet: 
  Status: Running
  Version: v1.28.0
  PodCIDR: 192.168.1.10/24
```

This output shows the Kubelet is active and reporting node details to the cluster—**the bridge between your infrastructure and Kubernetes**.

## Summary

Kubernetes architecture is a **modular, resilient system** where the Master Node (control plane) makes decisions, and Worker Nodes execute workloads. The API Server acts as the central interface, while the Scheduler, Controller Manager, and Kubelet form the *operational backbone* that ensures your containers run reliably, scale automatically, and self-heal when needed. This layered design enables cloud-native applications to be both **resilient** and **efficient**—without requiring manual intervention. 💡