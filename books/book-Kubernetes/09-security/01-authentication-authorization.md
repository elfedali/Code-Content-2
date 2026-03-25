## Security: Authentication & Authorization

Kubernetes provides robust security mechanisms to protect your cluster and applications. In this section, we'll dive into two critical components that form the backbone of secure Kubernetes deployments: **Role-Based Access Control (RBAC)** and **Service Accounts**. These mechanisms enable fine-grained authorization while maintaining secure identity management for your pods and users. Let's build this foundation step by step.

### Role-Based Access Control (RBAC)

RBAC is Kubernetes' primary authorization model. It allows you to define *who* can *do what* within your cluster by creating roles (permissions sets) and binding them to users or service accounts. This approach enforces least privilege and provides granular control without exposing sensitive credentials.

#### Core Components
RBAC operates through four key components that work together to control access:

1. **Role** - Permissions for a specific namespace
2. **RoleBinding** - Binds a role to a user/service account within a namespace
3. **ClusterRole** - Permissions for the entire cluster
4. **ClusterRoleBinding** - Binds a cluster role to a user/service account across the cluster

Here's a practical example of creating a role that allows limited pod operations in the `dev` namespace:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: dev-pod-creator
  namespace: dev
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch", "create", "delete"]
```

This role grants the ability to manage pods in the `dev` namespace while restricting other operations. Now, bind this role to a user (`my-user`) using a `RoleBinding`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: dev-pod-creator-binding
  namespace: dev
subjects:
- kind: User
  name: my-user
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: dev-pod-creator
  apiGroup: rbac.authorization.k8s.io
```

#### Why RBAC Matters
RBAC solves critical security challenges:
- **Least Privilege Enforcement**: Prevents over-permissioning by limiting actions to specific resources
- **Namespace Isolation**: Permissions can be scoped to individual namespaces (not the whole cluster)
- **Auditability**: Every permission change is tracked through Kubernetes events
- **Declarative Security**: Permissions are defined in YAML (no hardcoded credentials)

Here's a comparison of RBAC components to help you choose the right implementation:

| Component          | Scope          | When to Use                                      | Example Use Case                     |
|---------------------|-----------------|--------------------------------------------------|---------------------------------------|
| Role                | Namespace       | For team-specific permissions (e.g., dev team)    | Developers in `dev` namespace        |
| RoleBinding         | Namespace       | To attach roles to users/service accounts        | Granting a service account permissions |
| ClusterRole         | Entire cluster  | For cluster-wide operations (e.g., admin)         | Cluster administrators               |
| ClusterRoleBinding  | Entire cluster  | To attach cluster roles to users/service accounts | Granting a user cluster admin access |

#### Real-World Application
Imagine a CI/CD pipeline that deploys to the `staging` namespace. You'd create a `Role` for the pipeline service account with only `pods` permissions, then bind it via a `RoleBinding` to the pipeline service account. This ensures:
- Pipeline can create pods without modifying other resources
- No accidental cluster-wide permissions
- Clean separation from other teams' access

### Service Accounts

Service accounts are **identities** that pods use to securely authenticate with the Kubernetes API server. They provide a way for pods to interact with the cluster without exposing credentials directly in your application code.

#### What Service Accounts Do
Service accounts solve two critical problems:
1. **Secure Token Management**: Automatically generate tokens for pods to access the API server
2. **Isolated Identity**: Each pod has its own identity (via service account) instead of sharing credentials

Here's how to create a service account in the `dev` namespace:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ci-cd-service-account
  namespace: dev
```

This creates a service account named `ci-cd-service-account` in the `dev` namespace. Kubernetes automatically generates a token for it and stores it in the `secrets` resource.

#### Binding Service Accounts to Permissions
Service accounts are bound to RBAC roles using `RoleBindings` (for namespaces) or `ClusterRoleBindings` (for clusters). Here's how to grant the `ci-cd-service-account` pod permissions:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ci-cd-permissions
  namespace: dev
subjects:
- kind: ServiceAccount
  name: ci-cd-service-account
  namespace: dev
roleRef:
  kind: Role
  name: dev-pod-creator
  apiGroup: rbac.authorization.k8s.io
```

#### How Pods Use Service Accounts
When you define a pod using a service account, Kubernetes automatically mounts the token as a secret:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ci-cd-pod
  namespace: dev
spec:
  serviceAccountName: ci-cd-service-account
  containers:
  - name: ci-cd
    image: my-ci-cd-image
```

This configuration ensures:
- The pod uses the service account's token for API authentication
- No hardcoded credentials exist in the pod's configuration
- Permissions are enforced at the service account level

#### Security Benefits of Service Accounts
Service accounts provide critical security advantages:
- **No Credential Exposure**: Tokens are never hard-coded in application code
- **Pod-Level Isolation**: Each pod has independent identity (unlike shared service accounts)
- **Automatic Token Rotation**: Tokens expire after 24 hours by default
- **Fine-Grained Access**: Permissions can be scoped to specific pods or namespaces

### Key Takeaways
1. **RBAC** defines *who* can *do what* through roles and bindings
2. **Service Accounts** provide secure identities for pods to access the API server
3. Together, they enable **least privilege security** without exposing credentials
4. Always bind service accounts to specific roles using `RoleBindings` for namespace isolation

By implementing these patterns, you create a secure foundation where pods can operate with minimal permissions while maintaining clear separation of responsibilities across your cluster. 🛡️