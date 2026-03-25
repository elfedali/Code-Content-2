## Monitoring

In today's cloud-native environments, effective monitoring isn't just about collecting data—it's the foundation for proactive system reliability and rapid incident resolution. This section dives into the industry-standard tools that power modern observability pipelines: **Prometheus** for metric collection and **Grafana** for visualization. Together, they form a robust, open-source monitoring stack that works seamlessly with Kubernetes.

### Prometheus: The Open-Source Monitoring and Alerting Toolkit

Prometheus is a time-series database and monitoring system designed specifically for cloud-native environments. Unlike traditional monitoring tools, it focuses on **high-performance metric collection**, **flexible query language**, and **native alerting**—making it ideal for Kubernetes clusters. Its architecture revolves around three core principles: *scraping metrics from targets*, *storing time-series data*, and *triggering alerts based on thresholds*.

#### Why Prometheus?
Prometheus excels in Kubernetes due to:
- **Target-based scraping**: Metrics are pulled from endpoints rather than pushed, reducing complexity
- **Granular metric resolution**: Collects metrics at 15-second intervals by default (configurable)
- **Reliability**: Built-in service discovery and health checks
- **Kubernetes-native**: Integrates directly with Kubernetes objects via `ServiceMonitor` and `PodMonitor` resources

#### Core Concepts in Action
Before diving into implementation, let's clarify key Prometheus concepts:

| Concept              | Purpose                                                                 | Example in Kubernetes Context                          |
|----------------------|-------------------------------------------------------------------------|--------------------------------------------------------|
| **Target**           | Endpoint scraped for metrics (e.g., a pod, service, or node)             | `kubernetes-pods` in `ServiceMonitor`                  |
| **Metric**           | Single data point (e.g., `http_requests_total`)                         | `kube_pod_container_status_running`                    |
| **Scrape Interval**  | Frequency at which metrics are collected                                | `15s` (default)                                       |
| **Alert Rule**       | Condition to trigger alerts (e.g., `avg(rate(http_requests_total[5m])) > 1000`) | Configured in `Prometheus Rule` files                 |

#### Deploying Prometheus in Kubernetes
Here's a minimal, runnable example to deploy Prometheus with a single pod that emits metrics. This uses the official [Prometheus Helm chart](https://artifacthub.io/packages/helm/prometheus-community/prometheus) for simplicity.

First, create a `ServiceMonitor` to scrape metrics from a simple HTTP server pod:

```yaml
# metrics-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: metrics-pod
spec:
  containers:
  - name: metrics
    image: prom/prometheus:v2.35.0  # Simplified example
    command: ["/bin/sh"]
    args: ["-c", "echo 'HTTP 200' && sleep 100"]
```

Next, define a `ServiceMonitor` to collect metrics from this pod:

```yaml
# service-monitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: metrics-pod
spec:
  selector:
    matchLabels:
      app: metrics-pod
  endpoints:
  - port: http
    interval: 15s
```

Finally, deploy Prometheus using the Helm chart:

```bash
# Install Prometheus via Helm
helm repo add prometheus-community https://charts.prometheus-community.github.io
helm install prometheus prometheus-community/prometheus -n monitoring --set serviceMonitorSelector[0].matchLabels[app]=metrics-pod
```

**Why this works**: The `ServiceMonitor` tells Prometheus to scrape the `metrics-pod` every 15 seconds. Prometheus automatically discovers the pod via Kubernetes labels and stores metrics in its time-series database. You can verify metrics at `http://<prometheus-service>:9090/metrics`.

#### Real-World Kubernetes Monitoring
In production, you'd extend this with:
1. **Kube-state-metrics**: A Prometheus adapter for Kubernetes objects
2. **Node Exporter**: For host-level metrics
3. **Alerting Rules**: To notify teams of critical events

Here's a minimal alert rule for pod restarts (triggers when `kube_pod_container_status_restarts_total` exceeds 5):

```yaml
# alert-rules.yaml
groups:
- name: kubernetes
  rules:
  - alert: PodRestartsExceeded
    expr: kube_pod_container_status_restarts_total{job="kube-state-metrics"} > 5
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Pod restarts exceeded threshold"
```

This rule runs in the background and sends Slack/Email alerts when pods restart excessively—critical for detecting misconfigurations or failing services.

### Grafana: Visualization and Dashboarding for Observability

Grafana is a powerful open-source platform for **visualizing metrics**, **dashboards**, and **alerts**. It excels at transforming raw Prometheus metrics into intuitive, interactive dashboards—making it the go-to tool for observability teams. Unlike static reporting tools, Grafana enables real-time exploration and drill-downs into your infrastructure.

#### Why Grafana?
Grafana solves three critical problems in monitoring:
- **Data consolidation**: Aggregates metrics from multiple sources (Prometheus, Loki, Datadog)
- **Interactive exploration**: Lets users query metrics in real-time without writing SQL
- **Customizable dashboards**: Tailored to specific teams (devs, SREs, operations)

#### Connecting Grafana to Prometheus
The simplest way to start is via the Prometheus data source. Here’s how to set it up:

1. **Deploy Grafana** using the official Helm chart:
```bash
helm install grafana grafana/grafana -n monitoring --set adminPassword=your_secure_password
```

2. **Add Prometheus as a data source**:
   - Access Grafana at `http://<grafana-service>:3000`
   - Go to *Configuration > Data Sources*
   - Click *Add data source*
   - Select **Prometheus** and enter:
     - **URL**: `http://prometheus-service:9090`
     - **Org**: `Default`
     - **Timeout**: `5s`

3. **Create a dashboard**:
   - Click *New Dashboard*
   - Add a *Grafana Panel* with:
     - **Type**: *Time Series*
     - **Query**: `kube_pod_container_status_running{job="kube-state-metrics"}`

#### Building a Production Kubernetes Dashboard
Here’s a real-world dashboard for Kubernetes monitoring—used by many teams:

1. **Pod Health Dashboard**:
   - Shows pod status over time with a green/red indicator
   - Uses `kube_pod_status_phase` metric

2. **Resource Utilization**:
   - CPU and memory usage per node
   - Based on `kube_node_cpu_usage_seconds_total`

3. **Alerts Integration**:
   - Displays active alerts from Prometheus
   - Configured via *Alerting > Alert Rules*

**Example Dashboard Snippet**:
```yaml
# dashboard.json (simplified)
{
  "title": "Kubernetes Health Overview",
  "panels": [
    {
      "type": "graph",
      "title": "Pod Status",
      "targets": [
        {
          "expr": "kube_pod_status_phase{phase=\"Running\"}",
          "interval": "5m"
        }
      ]
    },
    {
      "type": "graph",
      "title": "Node CPU Usage",
      "targets": [
        {
          "expr": "rate(kube_node_cpu_usage_seconds_total{job=\"node-exporter\"}[5m])"
        }
      ]
    }
  ]
}
```

This dashboard shows:
- **Pod health**: Running vs. terminating pods
- **Node resource usage**: Real-time CPU utilization
- **Alerts**: Critical alerts appear as red cards on the dashboard

#### Pro Tips for Effective Grafana Usage
- **Use annotations**: Add context to metrics (e.g., `environment`, `region`)
- **Leverage alerts**: Configure Grafana to trigger Slack/email notifications
- **Save dashboards**: Share with teams via *Share > Save as Dashboard*
- **Customize queries**: Use Prometheus Query Language (PQL) for advanced analysis

### Summary

Prometheus provides the essential backbone for collecting, storing, and alerting on metrics in Kubernetes environments—while Grafana transforms those metrics into actionable insights through interactive dashboards. Together, they form a powerful, production-ready observability stack that helps teams maintain resilient cloud-native systems. By deploying Prometheus with Kubernetes-native scraping and connecting it to Grafana, you gain real-time visibility into your infrastructure without vendor lock-in. Start small with a single pod and scale to enterprise-grade monitoring as your cluster grows—this combination is the industry standard for observability in Kubernetes. 🌟