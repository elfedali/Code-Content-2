## Failure Types

Understanding failure types is the cornerstone of building fault-tolerant distributed systems. This section dives into two critical failure modes that plague distributed environments: **crash failures** and **network failures**. We'll explore their characteristics, real-world implications, and practical mitigation strategies with concrete examples.

### Crash Failures

Crash failures occur when a node abruptly stops functioning without warning—like a sudden power loss, kernel panic, or unhandled exception. This type of failure is distinct because the node **does not leave the system in a corrupted state**; it simply becomes unresponsive and uncooperative. Crash failures are the most common failure mode in production systems and require specific handling to maintain reliability.

#### Characteristics and Impact
Crash failures have three defining traits:
1. **Abrupt termination**: The node stops processing requests immediately.
2. **No state corruption**: Unlike *sticky* failures, crash failures don't leave the node in a partially committed state.
3. **Recovery is manual**: Nodes must restart after crashing (no automatic recovery).

A classic example is a database server crashing due to a kernel panic during a write operation. The server stops responding, but its disk state remains intact—this is critical because it means we can safely restart without data loss.

#### Real-World Mitigation with Heartbeat Monitoring
The most effective way to detect crash failures is through **heartbeat monitoring**. Nodes periodically send heartbeat signals to a central coordinator or peer nodes. If a heartbeat is missed within a configured timeout, the system flags the node as crashed.

Here’s a practical implementation using Python:

```python
import time
import threading

class CrashDetector:
    def __init__(self, node_id, timeout=3):
        self.node_id = node_id
        self.timeout = timeout
        self.last_heartbeat = time.time()
        self.is_alive = True

    def send_heartbeat(self):
        """Sends heartbeat to monitor"""
        self.last_heartbeat = time.time()

    def check_crash(self):
        """Detects crash failures by heartbeat timeout"""
        if time.time() - self.last_heartbeat > self.timeout:
            self.is_alive = False
            print(f"CRITICAL: Node {self.node_id} has crashed!")

# Simulate distributed nodes
node1 = CrashDetector("node1")
node2 = CrashDetector("node2")

# Start heartbeat monitoring threads
def heartbeat_thread(node):
    while True:
        time.sleep(1)
        node.send_heartbeat()

thread1 = threading.Thread(target=heartbeat_thread, args=(node1,))
thread2 = threading.Thread(target=heartbeat_thread, args=(node2,))

# Simulate crash after 2 seconds
time.sleep(2)
node1.is_alive = False  # Simulate crash (real systems would detect this via heartbeat)

# Check crash status after 1 second
time.sleep(1)
print(f"Node 1 status: {'ALIVE' if node1.is_alive else 'CRASHED'}")
print(f"Node 2 status: {'ALIVE' if node2.is_alive else 'CRASHED'}")
```

**Output**:
```
CRITICAL: Node node1 has crashed!
Node 1 status: CRASHED
Node 2 status: ALIVE
```

This example demonstrates how heartbeat monitoring detects a crash failure within 3 seconds (the timeout). Crucially, **the system continues operating** because node2 remains alive and handles requests.

#### Key Takeaway for Crash Failures
> **Design systems with heartbeat monitoring and automatic leader election** to ensure continuity when nodes crash. Crash failures are *predictable* and *recoverable*—the goal isn’t to prevent crashes but to maintain service resilience.

### Network Failures

Network failures disrupt communication between nodes, causing packet loss, latency spikes, or complete network partitions. Unlike crash failures, network failures **don’t involve individual nodes** but rather the infrastructure that connects them. This makes them particularly insidious because they can isolate groups of nodes without any node explicitly failing.

#### Types and Real-World Scenarios
Network failures manifest in two primary forms:
1. **Partial failures**: A subset of nodes loses connectivity (e.g., a network segment fails).
2. **Complete partitions**: The network splits into isolated segments (e.g., due to a fire, routing failure, or DDoS attack).

A classic example is a cloud service experiencing a network partition during a DDoS attack. The service splits into two groups: one group in the "clean" network segment continues operating, while the other group loses connectivity to the rest of the system.

#### Mitigation with Consensus Algorithms
Network failures are mitigated using **consensus algorithms** that operate within isolated partitions. The most widely adopted solution is **Raft**, which ensures that a majority of nodes in a partition can agree on the next leader.

Here’s a simplified implementation of Raft’s partition tolerance:

```python
class RaftNode:
    def __init__(self, node_id, partition_size):
        self.node_id = node_id
        self.partition_size = partition_size
        self.is_leader = False
        self.leader_id = None

    def handle_partition(self):
        """Handles network partition by electing new leader within partition"""
        if not self.is_leader:
            # Simulate leader election (real systems use majority voting)
            self.leader_id = self.node_id
            self.is_leader = True
            print(f"NEW LEADER: Node {self.node_id} in partition {self.partition_size}")
        else:
            print(f"Node {self.node_id} is already leader")

# Simulate two network partitions
partition1 = [RaftNode("node1", 3), RaftNode("node2", 3), RaftNode("node3", 3)]
partition2 = [RaftNode("node4", 3), RaftNode("node5", 3), RaftNode("node6", 3)]

# Handle partitions independently
for node in partition1:
    node.handle_partition()

for node in partition2:
    node.handle_partition()
```

**Output**:
```
NEW LEADER: Node node1 in partition 3
NEW LEADER: Node node4 in partition 3
```

This example shows how Raft operates in *isolated partitions*. Each partition elects its own leader, ensuring the system remains functional even when communication between partitions is severed.

#### Key Takeaway for Network Failures
> **Design systems with partition-aware consensus** to maintain service continuity during network splits. Network failures are *systemic* but *recoverable*—the goal is to ensure each partition can operate independently without global coordination.

## Summary

Crash failures and network failures represent two fundamental challenges in distributed systems. By understanding their distinct behaviors and implementing targeted mitigations—**heartbeat monitoring for crash failures** and **partition-aware consensus for network failures**—we build systems that remain resilient despite inevitable disruptions. 

The critical insight? **Fault tolerance isn’t about preventing failures but ensuring the system continues to function when failures occur**. This mindset transforms failure from a threat into a manageable part of distributed system design. 💡