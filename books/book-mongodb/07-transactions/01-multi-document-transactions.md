## Multi-document Transactions

In modern applications, ensuring data consistency across multiple documents is critical. MongoDB 4.0 and later introduced **multi-document transactions** that provide ACID compliance for operations involving multiple documents. This section dives deep into the ACID guarantees within MongoDB's transaction framework.

### ACID in MongoDB

MongoDB's multi-document transactions deliver **ACID** (Atomicity, Consistency, Isolation, Durability) properties for operations that span multiple documents. Let's break down each component in the context of MongoDB transactions.

#### Atomicity

In a transaction, all operations must execute as a single unit of work. If any operation fails, the entire transaction is rolled back. MongoDB ensures this through:

1. **Transaction Context**: MongoDB creates a unique transaction context when you start a transaction
2. **Atomic Execution**: All operations within a transaction are executed atomically—either all succeed or all fail

**Example**:
```javascript
const session = db.startSession();
session.startTransaction();
try {
  // Operation 1: Update a document
  await session.getCollection('accounts').updateOne({ user: 'alice' }, { $inc: { balance: 100 } });
  // Operation 2: Update another document
  await session.getCollection('transactions').insertOne({ user: 'alice', amount: 100 });
  // Commit transaction
  await session.commitTransaction();
} catch (error) {
  // Roll back transaction if any operation fails
  await session.abortTransaction();
  throw error;
}
```

#### Consistency

Transactions ensure the database transitions from one valid state to another. MongoDB maintains consistency through:

- **Preventing Dirty Reads**: Transactions read the database state as it existed at the start of the transaction
- **Constraint Enforcement**: All operations must satisfy database constraints (e.g., referential integrity via application logic)

**Real-world application**: When transferring money between accounts, the transaction ensures both account balances are updated consistently—either both operations succeed or neither occurs.

#### Isolation

MongoDB provides **isolation** through:
- **Read Your Own Writes**: Transactions can see their own writes made before the transaction started
- **Strict Isolation Level**: Transactions don't interfere with each other until committed (serializable in most cases)

This prevents concurrent transactions from affecting each other's results.

#### Durability

Once committed, transaction changes are permanently stored:
- **Write Concern**: Transactions use `w: "majority"` (for replica sets) or `w: 1` (single node) for durability
- **Commit Phase**: Changes are written to durable storage before transaction completion

**Key insight**: Even after database restarts, committed transaction results remain intact—ensuring data persistence.

### Key Considerations for ACID Transactions

While MongoDB delivers ACID guarantees, these implementation details are critical:

1. **Session Scoping**: Transactions are session-bound—must use `startSession()` to manage transactions
2. **Write Concern**: Must specify `w: "majority"` for replica sets to ensure durability
3. **Time Limits**: Transactions have a 60-second default timeout (configurable)
4. **Database Limitation**: Transactions operate within a single database—cannot span multiple databases

### Why ACID Matters for Multi-Document Transactions

Multi-document transactions are essential for complex business logic involving multiple collections. Consider a banking application where:
- Funds must be transferred between accounts
- Transaction history must be recorded
- Balance constraints must be validated

Without transactions, you risk inconsistent states like:
- Account balance decremented but transaction not recorded
- Duplicate payments due to concurrent operations

By providing ACID guarantees, MongoDB transactions ensure these critical operations remain safe, reliable, and consistent.

## Summary

MongoDB's multi-document transactions deliver ACID compliance for operations spanning multiple documents. This section has explained how MongoDB ensures **Atomicity**, **Consistency**, **Isolation**, and **Durability**. These guarantees are critical for building robust applications that require data consistency across multiple documents. 💡