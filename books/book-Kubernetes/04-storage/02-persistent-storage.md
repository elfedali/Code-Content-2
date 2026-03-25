## Persistent Storage

In the cloud-native world, **data persistence** is the unsung hero that keeps applications resilient and reliable. While Kubernetes containers are ephemeral by design, many production workloads need persistent storage to retain critical data across node failures, pod restarts, or scaling events. This section demystifies Kubernetes' core persistent storage pattern: **Persistent Volumes (PV)** and **Persistent Volume Claims (PVC)**—the foundation for building robust, production-grade applications that don’t lose data when the cluster changes.

### Persistent Volumes (PV)

Persistent Volumes (PVs) are **abstract storage resources** that exist *outside* the application’s lifecycle. Think of them as "virtual" storage devices provisioned by the cluster administrator or a storage class, decoupled from individual pods. PVs define *how* storage is implemented (e.g., cloud storage, local disks, network-attached storage) and *what* capacity and access modes are available. This abstraction lets you manage storage without worrying about the underlying infrastructure.

PVs solve a critical problem: **storage is ephemeral by default in Kubernetes**. When a pod restarts or a node fails, its storage is lost. PVs ensure your data survives these events by providing a dedicated storage resource that persists *beyond* the pod’s lifetime.

Here’s a concrete example of a PV using `hostPath` (for development environments only—**never use this in production**):

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  storageClassName: standard
  hostPath:
    path: /data
```

This PV:
- Claims **10Gi** of storage
- Supports **ReadWriteOnce** access (ideal for single-node applications)
- Uses the `standard` storage class (a placeholder for your environment)
- Binds to the local path `/data` on the node

**Why PVs matter**: They let you abstract storage complexity. Whether you’re using AWS EBS, Azure Disk, or a local filesystem, PVs create a consistent interface for your applications. This separation ensures your application code doesn’t need to know about the storage backend.

### Persistent Volume Claims (PVC)

Persistent Volume Claims (PVCs) are **requests** from applications for persistent storage. They act as a "contract" between your application and the PV: your app *asks* for a specific amount of storage with defined access modes, and Kubernetes *provisions* it. PVCs are the **user-facing interface** for persistent storage—your application interacts with them, not directly with PVs.

PVCs solve a second critical problem: **applications need to claim storage without managing infrastructure**. Without PVCs, you’d have to manually bind storage to pods, which is error-prone and scales poorly. PVCs automate this by:
1. Letting applications request storage
2. Automatically binding to a matching PV
3. Ensuring storage persists *even when pods restart*

Here’s how a PVC works in practice:

1. Your application (e.g., a database pod) creates a PVC object.
2. Kubernetes finds a matching PV (based on storage class, capacity, and access modes).
3. The PVC is bound to the PV, making it available to the application.

This is a minimal PVC example:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: example-pvc
spec:
  storageClassName: standard
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

This PVC:
- Requests **10Gi** of storage
- Uses the `standard` storage class (matching the PV above)
- Supports **ReadWriteOnce** access
- Is configured for a filesystem (not raw block storage)

**Key insight**: PVCs *don’t create storage*—they *claim* it from existing PVs. This means you can have multiple PVCs using the same PV (with careful access control), enabling flexible storage patterns.

#### PV vs PVC: Key Differences

| **Feature**               | **Persistent Volume (PV)**                     | **Persistent Volume Claim (PVC)**              |
|---------------------------|-----------------------------------------------|-----------------------------------------------|
| **Purpose**               | Infrastructure-provisioned storage resource   | Application request for storage              |
| **Who creates it**        | Cluster administrator/storage class          | Application developer                       |
| **Storage implementation** | Defined (e.g., AWS EBS, local disk)           | Abstracted via PV                           |
| **Access control**        | Fixed (e.g., `ReadWriteOnce`)                 | Matched to PV’s access modes                 |
| **Example use case**      | Provisioning 10Gi storage for a database      | Database pod claiming 10Gi storage           |
| **Lifespan**              | Persists until cluster deletion              | Persists with the application pod           |

### Summary

In this section, we explored **Persistent Volumes (PV)** and **Persistent Volume Claims (PVC)**—the two pillars of Kubernetes persistent storage:

- **PVs** are abstract storage resources provisioned *by the cluster* that define *how* storage is implemented.
- **PVCs** are application-driven requests that *claim* PVs to provide persistent storage *without* managing infrastructure.

Together, they solve the critical problem of **data persistence in ephemeral clusters**. Your applications can now use storage that survives node failures, pod restarts, and scaling events—without getting tangled in low-level storage details. This pattern is the foundation for building resilient, production-ready cloud-native applications. 🚀