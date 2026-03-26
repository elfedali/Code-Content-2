## Real Projects: SaaS Backend

In the world of modern software, **SaaS (Software as a Service)** platforms define the industry standard for delivering scalable, user-centric applications. Building a production-grade SaaS backend isn't just about writing clean code—it's about architecting systems that handle complex real-world constraints while keeping costs predictable and user experiences seamless. In this section, we'll dive into two critical pillars of SaaS engineering: **multi-tenancy** and **billing**. These aren't just technical challenges; they're strategic decisions that directly impact your product's growth, security, and financial health. Let's build with real-world examples that you can run today.

---

### Multi-tenancy

Multi-tenancy is the foundation of SaaS scalability. It allows a single instance of your application to serve multiple customers (tenants) while ensuring each tenant's data remains isolated and secure. Without proper multi-tenancy design, you'd face massive costs, security vulnerabilities, and scalability bottlenecks as you grow.

#### Why Multi-tenancy Matters
Imagine a company like **Stripe** or **Slack**—they serve millions of tenants (businesses or users) on a single infrastructure. If you didn't implement multi-tenancy, you'd need to deploy a separate database for every client, which is **prohibitively expensive** and **unreliable** at scale. Multi-tenancy solves this by:
- Reducing infrastructure costs (1 server → 100k tenants)
- Enforcing data isolation (tenant A can't see tenant B's data)
- Simplifying updates (you deploy once for all tenants)
- Enabling flexible pricing models (e.g., per-user, per-feature)

#### Implementation Patterns
There are three main approaches to multi-tenancy, each with trade-offs:

| Pattern              | Pros                                      | Cons                                      | Best For                          |
|----------------------|--------------------------------------------|--------------------------------------------|------------------------------------|
| **Shared Database**  | Low cost, simple scaling                  | Risk of cross-tenant leaks                | Small-scale SaaS (1k tenants)     |
| **Shared Schema**    | Flexible tenant isolation                 | Complex queries, harder to debug          | Medium-scale SaaS (10k+ tenants)  |
| **Dedicated Database**| Absolute isolation, no leaks              | High cost, hard to scale                 | Enterprise SaaS (100k+ tenants)   |

Let's build a **real-world example** using the shared database pattern with tenant isolation via a `tenant_id` column. This is the most common pattern for startups and mid-sized SaaS products.

```javascript
// Example: Tenant-aware database queries in Express.js
const express = require('express');
const app = express();

// Middleware to inject tenant ID from request header
app.use((req, res, next) => {
  const tenantId = req.headers['x-tenant-id']; // e.g., "client-123"
  req.tenantId = tenantId;
  next();
});

// Example route: Get tenant-specific data
app.get('/users', async (req, res) => {
  const { tenantId } = req;
  try {
    // Query with tenant isolation
    const users = await db.query(
      `SELECT * FROM users WHERE tenant_id = $1`,
      [tenantId]
    );
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

**Key Insight**: The critical part is **querying with the tenant ID**. This pattern works because:
1. All queries include `tenant_id` as a filter
2. No tenant data leaks across queries
3. You avoid expensive tenant-specific databases

#### Real-World Pitfall: Cross-Tenant Data Leaks
A common mistake is using global queries without tenant filtering. Here's a dangerous example:

```javascript
// Dangerous: No tenant isolation
const users = await db.query('SELECT * FROM users'); // All tenants' data!
```

**How to fix**: Always add `WHERE tenant_id = $1` to queries. For complex scenarios (e.g., tenant-specific admin views), use **tenant-aware middleware** like the example above.

#### Why This Matters for Your Project
For most SaaS products (especially those with <10k tenants), the shared database pattern is **cost-effective** and **easy to maintain**. It lets you focus on business logic instead of infrastructure. When scaling to 100k+ tenants, you might shift to dedicated databases—but for now, this pattern keeps your system lean and secure.

---

### Billing

Billing is where SaaS meets real money. It's not just about processing payments—it's about **accurately tracking usage**, **handling pricing tiers**, and **ensuring compliance** with regulations like GDPR or PCI DSS. A poorly designed billing system can lead to customer churn, legal issues, and financial loss.

#### Core Billing Challenges
1. **Usage-based pricing**: How do you track what a tenant actually uses? (e.g., "100 API calls per month")
2. **Pricing tiers**: How do you calculate costs for different plans? (e.g., "Basic: $5, Pro: $20")
3. **Invoicing**: How do you generate bills that customers can pay?
4. **Compliance**: How do you handle tax rules per country?

#### Building a Real Billing System
Let's create a minimal but production-ready billing system using **Stripe** (the industry standard for SaaS billing) and **PostgreSQL** (for tenant data). This example covers:
- Tenant-specific billing
- Usage tracking
- Automated invoicing

**Step 1: Define your billing schema**
```sql
-- PostgreSQL schema for tenant billing
CREATE TABLE billing_tenants (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  stripe_customer_id TEXT UNIQUE NOT NULL, -- Stripe's customer ID
  currency TEXT NOT NULL DEFAULT 'usd',
  plan TEXT NOT NULL -- e.g., 'basic', 'pro'
);

CREATE TABLE billing_usage (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES billing_tenants(id),
  resource_type TEXT NOT NULL, -- e.g., 'api_calls', 'storage'
  usage_count INTEGER NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

**Step 2: Track usage per tenant**
```javascript
// Example: Track API calls for a tenant
const trackUsage = async (tenantId, resourceType, count) => {
  const { rows } = await db.query(
    `INSERT INTO billing_usage (tenant_id, resource_type, usage_count)
     VALUES ($1, $2, $3) RETURNING id`,
    [tenantId, resourceType, count]
  );
  return rows[0].id;
};

// Usage in a real API
app.post('/api/calls', async (req, res) => {
  const { tenantId } = req;
  const usageId = await trackUsage(tenantId, 'api_calls', 1);
  res.status(201).json({ usageId });
});
```

**Step 3: Generate invoices with Stripe**
```javascript
// Example: Create invoice for a tenant
const createInvoice = async (tenantId) => {
  const tenant = await db.query(
    `SELECT * FROM billing_tenants WHERE id = $1`,
    [tenantId]
  );
  
  // Get Stripe customer ID from tenant data
  const stripeCustomer = tenant[0].stripe_customer_id;
  
  // Create invoice using Stripe API
  const invoice = await stripe.invoices.create({
    customer: stripeCustomer,
    items: [
      {
        price: 'price_123', // Stripe price ID
        quantity: 1,
      },
    ],
    currency: 'usd',
  });
  
  return invoice;
};

// Usage in a background job
const processBilling = async () => {
  const tenants = await db.query('SELECT id FROM billing_tenants WHERE status = $1', ['active']);
  for (const tenant of tenants) {
    await createInvoice(tenant.id);
  }
};
```

**Key Insight**: This system works because:
- Usage is tracked per tenant in `billing_usage`
- Stripe handles payment processing and invoicing
- You only create invoices for **active** tenants
- Usage data is stored for audit and compliance

#### Real-World Scenario: Handling Usage-Based Pricing
Suppose your SaaS charges **$0.01 per API call**. Here's how the system calculates the bill:

1. Tenant A makes 10,000 API calls → `10,000 * $0.01 = $100`
2. Tenant B makes 500 calls → `500 * $0.01 = $5`
3. Invoice generated monthly (via background job)

**Critical Implementation Tip**: Always store usage data in a **time-series format** (like `billing_usage`) to avoid overloading your database. This allows you to:
- Generate accurate bills
- Handle refunds
- Analyze usage trends

#### Why This Matters for Your Project
For most SaaS products, **Stripe integration** is the fastest path to reliable billing. You don't need to build payment processing from scratch—just focus on:
1. Tracking usage per tenant
2. Linking to Stripe
3. Scheduling monthly invoicing

This approach avoids common pitfalls like:
- Manual billing (which causes delays)
- Overpaying for unused features
- Tax compliance issues

---

## Summary

Multi-tenancy and billing are the twin engines of a successful SaaS backend. **Multi-tenancy** lets you serve thousands of customers on a single infrastructure without compromising security or cost—starting with a simple `tenant_id` filter in your queries. **Billing** transforms usage data into revenue through tools like Stripe, ensuring accurate invoicing while staying compliant. By implementing these patterns with concrete examples (like tenant-aware queries and usage tracking), you build systems that scale, stay secure, and generate real revenue. Remember: the best SaaS backends don't just solve technical problems—they solve business problems with clean, reliable code. 🚀