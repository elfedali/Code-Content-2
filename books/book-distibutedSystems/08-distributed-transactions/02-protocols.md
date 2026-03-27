## Distributed Transactions: Protocols

When building distributed systems, ensuring data consistency across multiple services is critical. Traditional transactional guarantees from single-machine databases (like ACID) don’t directly translate to distributed environments. This section explores two foundational protocols for managing distributed transactions: **Two-Phase Commit (2PC)** and the **Saga Pattern**. We’ll dive deep into their mechanics, trade-offs, and real-world implementations—equipping you to choose the right approach for your system.

---

### Two-Phase Commit (2PC)

Two-Phase Commit (2PC) is the classic distributed transaction protocol that guarantees atomicity across a network of distributed services. It operates in two distinct phases: **voting** and **commit**, ensuring all participants either fully commit the transaction or roll it back. This protocol is foundational but has significant limitations in modern distributed systems.

#### How 2PC Works: A Step-by-Step Breakdown
Imagine a distributed transaction that involves three services: `OrderService`, `PaymentService`, and `InventoryService`. The coordinator (a dedicated service) manages the transaction flow:

1. **Prepare Phase**:  
   The coordinator contacts all participants to check readiness. Each participant:
   - Validates local data (e.g., checks if inventory is sufficient)
   - Sends a `PREPARE` message to the coordinator
   - If ready, replies with `VOTE_COMMIT`; otherwise, `VOTE_ABORT`

2. **Commit Phase**:  
   - If *all* participants vote `VOTE_COMMIT`, the coordinator sends a `COMMIT` message to all.
   - If *any* participant votes `VOTE_ABORT`, the coordinator sends a `ABORT` message to all.

This ensures the transaction is either **fully completed** or **fully rolled back**—no partial state exists.

#### Real-World Example: Order Processing
Here’s a simplified implementation using a mock coordinator and participants. The `OrderService` initiates a transaction to place an order:

```javascript
// Coordinator (2PC implementation)
class TransactionCoordinator {
  async prepare(orderId) {
    const results = await Promise.all([
      this.orderService.prepare(orderId),
      this.paymentService.prepare(orderId),
      this.inventoryService.prepare(orderId)
    ]);
    return results.every(result => result === 'VOTE_COMMIT');
  }

  async commit(orderId, commit = true) {
    if (commit) {
      await this.orderService.commit(orderId);
      await this.paymentService.commit(orderId);
      await this.inventoryService.commit(orderId);
    } else {
      await this.orderService.rollback(orderId);
      await this.paymentService.rollback(orderId);
      await this.inventoryService.rollback(orderId);
    }
  }
}

// Participant (OrderService)
class OrderService {
  async prepare(orderId) {
    // Check order validity (e.g., no duplicate orders)
    if (await this.validateOrder(orderId)) {
      return 'VOTE_COMMIT';
    }
    return 'VOTE_ABORT';
  }

  async commit(orderId) {
    // Apply order to database
    await this.database.saveOrder(orderId);
  }

  async rollback(orderId) {
    // Remove order from database
    await this.database.deleteOrder(orderId);
  }
}
```

**Key Observations**:
- **Atomicity**: All services either commit or rollback *together*.
- **Failure Handling**: If a service fails during `prepare` (e.g., `InventoryService` unavailable), the transaction aborts immediately.
- **Latency**: The coordinator’s round-trip communication adds overhead (especially in high-latency networks).

#### When 2PC Fails in Practice
While 2PC guarantees consistency, it struggles in modern systems:
- **Network partitions**: If the coordinator fails, participants remain in a "precommit" state indefinitely.
- **Long-running transactions**: 2PC blocks participants for the duration of the transaction (e.g., 10+ seconds for complex orders).
- **State explosion**: In microservices architectures, 2PC requires a dedicated coordinator per transaction, scaling poorly.

> 💡 **Pro Tip**: Use 2PC only for *short-lived* transactions with *low-latency* services. For most cloud-native systems, alternatives like the Saga Pattern are more practical.

---

### Saga Pattern

The Saga Pattern is a modern alternative to 2PC that decouples transactional consistency from distributed coordination. Instead of a single coordinator, it uses a sequence of **local transactions** with **compensating actions** to achieve eventual consistency. This approach is ideal for asynchronous microservices where 2PC’s overhead is prohibitive.

#### Core Principles of the Saga Pattern
1. **Saga Flow**: A series of ordered local transactions (e.g., `OrderService → PaymentService → InventoryService`).
2. **Compensating Actions**: For every transaction step, a reversible action (e.g., `CancelOrder` if payment fails).
3. **Event-Driven**: Each step emits an event to track progress and trigger compensating actions.

#### Real-World Example: Payment Saga
Consider a payment flow where an order is placed, payment is processed, and inventory is reserved. If payment fails, we *compensate* by canceling the order:

```javascript
// Step 1: Create Order (OrderService)
async function placeOrder(order) {
  await orderService.createOrder(order);
  // Emit event: ORDER_CREATED
  return { orderId: order.id };
}

// Step 2: Process Payment (PaymentService)
async function processPayment(orderId) {
  const payment = await paymentService.charge(orderId);
  if (payment.success) {
    // Emit event: PAYMENT_SUCCESS
    return payment;
  }
  // If payment fails, trigger compensation
  await compensationService.cancelOrder(orderId);
  throw new Error("Payment failed");
}

// Step 3: Reserve Inventory (InventoryService)
async function reserveInventory(orderId) {
  await inventoryService.reserve(orderId);
  // Emit event: INVENTORY_RESERVED
}

// Compensation Workflow
async function cancelOrder(orderId) {
  await orderService.cancelOrder(orderId); // Compensate for ORDER_CREATED
  await paymentService.refund(orderId);    // Compensate for PAYMENT_SUCCESS
  await inventoryService.release(orderId); // Compensate for INVENTORY_RESERVED
}
```

**How It Handles Failure**:  
If `processPayment` fails, the `cancelOrder` compensation workflow runs *automatically*:
1. `ORDER_CREATED` → `CANCEL_ORDER` (removes order)
2. `PAYMENT_SUCCESS` → `REFUND` (reverses payment)
3. `INVENTORY_RESERVED` → `RELEASE_INVENTORY` (returns stock)

#### Why Saga Beats 2PC for Most Systems
| **Factor**              | **2PC**                          | **Saga Pattern**                 |
|--------------------------|-----------------------------------|-----------------------------------|
| **Network Latency**      | High (coordinator round-trips)    | Low (local transactions)         |
| **Fault Tolerance**      | Coordinator failure blocks all   | Self-healing via compensations   |
| **Scalability**          | Poor (coordinator bottleneck)    | Excellent (no single point)      |
| **Use Case**             | Short, synchronous transactions  | Asynchronous microservices      |

**Real-World Benefit**:  
In a high-traffic e-commerce system, a Saga can reduce transaction latency by **40–60%** compared to 2PC while handling failures gracefully. For example, during Black Friday, a Saga-based payment flow processes 10k orders/sec without coordinator overload.

#### When to Use Saga vs. 2PC
| **Scenario**                     | **Choose 2PC**                  | **Choose Saga**                |
|----------------------------------|---------------------------------|--------------------------------|
| Short transactions (< 1s)       | ✅ (low latency)               | ❌ (overkill)                 |
| Single-service transactions     | ✅ (no need for compensation)  | ❌ (not applicable)           |
| High failure rates (e.g., cloud) | ❌ (coordinator fails)         | ✅ (self-healing)             |
| Eventual consistency required   | ❌ (strong consistency)        | ✅ (ideal)                    |

> 💡 **Pro Tip**: Start with Saga for *all* new microservices. Only use 2PC for legacy systems with strict ACID requirements.

---

## Summary

- **Two-Phase Commit (2PC)** guarantees atomicity through a coordinator-driven voting mechanism but suffers from high latency and poor scalability in distributed systems. It’s best reserved for short, synchronous transactions where strong consistency is non-negotiable.
- **Saga Pattern** replaces 2PC with a sequence of local transactions and compensating actions, enabling eventual consistency without a central coordinator. It’s ideal for asynchronous microservices, handling failures gracefully, and scaling well in modern cloud environments.
- **Key Takeaway**: For most distributed systems today, **Saga Pattern** is the pragmatic choice—it balances consistency, resilience, and performance without sacrificing flexibility. Reserve 2PC for edge cases where its simplicity outweighs the trade-offs.

Choose the right protocol for your system’s constraints, and you’ll build transactions that scale without breaking. 🌟