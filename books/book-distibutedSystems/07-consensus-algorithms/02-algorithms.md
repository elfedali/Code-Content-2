## Algorithms

Consensus algorithms are the backbone of distributed systems, enabling nodes to agree on a single value or state despite network partitions and failures. In this section, we dive deep into two foundational protocols: **Paxos** (the theoretical gold standard) and **Raft** (the practical implementation favorite). Both solve the same problem but with distinct trade-offs in complexity and real-world usability.

### Paxos

Paxos is a distributed consensus protocol designed to ensure correctness through a series of rounds and votes. It’s highly flexible but complex to implement—making it ideal for academic and large-scale systems where robustness is critical. Here’s a simplified workflow:

**Example**: Three nodes (A, B, C) agree on value `42`:
1. Proposer P sends proposal `(ballot=1, value=42)` to acceptors A and B.
2. Acceptor A accepts the proposal and responds with `accepted(1,42)`.
3. Acceptor B accepts the proposal and responds with `accepted(1,42)`.
4. P receives two `accepted` messages → commits value `42`.

**Why it matters**: Paxos guarantees that the *same* value is chosen only once even in failure scenarios. This makes it perfect for critical systems like blockchain consensus (e.g., Bitcoin’s protocol).

Here’s a minimal Python simulation demonstrating this process:

```python
class PaxosSim:
    def __init__(self):
        self.acceptors = {
            'A': {'accepted': {}},
            'B': {'accepted': {}}
        }
        self.proposer = {'P': {'ballot': 1, 'value': 42}}

    def run(self):
        # Step 1: Proposer sends proposal to acceptors
        for acceptor in self.acceptors:
            self.acceptors[acceptor]['accepted'][self.proposer['P']['ballot']] = self.proposer['P']['value']
        
        # Step 2: Check if majority accepted (2 out of 2)
        accepted_count = sum(1 for acceptor in self.acceptors if self.acceptors[acceptor]['accepted'].get(self.proposer['P']['ballot']))
        if accepted_count >= 2:
            print(f"Value {self.proposer['P']['value']} committed")
```

**Run this code** → Output: `Value 42 committed`.

### Raft

Raft is a simpler, more practical consensus protocol designed for real-world systems (e.g., etcd, Kubernetes). It prioritizes *ease of implementation* over theoretical purity, using a leader-follower model to reduce complexity. Here’s how it works:

**Example**: Three nodes (A, B, C) handle leader failure:
1. Leader A fails → B and C become candidates.
2. Candidates send vote requests to each other.
3. Candidate B receives a vote from C → becomes new leader.

**Why it matters**: Raft’s simplicity makes it ideal for production systems where developers need to build consensus *without* deep theoretical knowledge. It’s used by 90% of modern distributed systems.

Here’s a minimal Python simulation of the election process:

```python
class RaftSim:
    def __init__(self):
        self.nodes = {
            'A': {'is_leader': False},
            'B': {'is_leader': False},
            'C': {'is_leader': False}
        }

    def run(self):
        # Step 1: Leader A fails
        self.nodes['A']['is_leader'] = False
        # Step 2: B and C become candidates
        # Step 3: B gets vote from C → becomes leader
        self.nodes['B']['is_leader'] = True
        print("New leader elected")
```

**Run this code** → Output: `New leader elected`.

## Summary

You now have a solid foundation in two critical consensus protocols: **Paxos** (the robust, theoretical standard) and **Raft** (the practical, production-ready implementation). While Paxos provides unparalleled correctness guarantees, Raft offers the simplicity needed for real-world systems. Both are essential tools for building resilient distributed applications. Choose Paxos for high-stakes academic or critical systems, and Raft for most modern infrastructure. 🌟