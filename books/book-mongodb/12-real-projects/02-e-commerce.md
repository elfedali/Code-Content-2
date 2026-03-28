## E-commerce

In this section, we dive into building real-world e-commerce applications using MongoDB. We focus on two critical components: **Products** and **Orders**—patterns that scale efficiently while maintaining flexibility and performance.

### Products

We design a scalable product catalog using MongoDB's flexible document model. Each product is stored as a single document in a `products` collection with fields like `name`, `price`, `description`, and `category`.

**Example product document:**
```json
{
  "name": "Wireless Headphones",
  "price": 199.99,
  "description": "High-quality wireless headphones with noise cancellation",
  "category": "Electronics",
  "created_at": "2023-10-05T14:30:00Z"
}
```

**Key operations:**
- Query products by category:  
  ```javascript
  db.products.find({ category: "Electronics" })
  ```
- Create an index for fast category lookups:  
  ```javascript
  db.products.createIndex({ category: 1 })
  ```

This pattern handles millions of products without joins or complex queries—critical for high-traffic e-commerce sites.

### Orders

Next, we implement order management with a `orders` collection. Each order document includes `user_id`, `items` (array of product quantities), `total_price`, and `status`.

**Example order document:**
```json
{
  "user_id": "user_123",
  "items": [
    {
      "product_id": "prod_456",
      "quantity": 2
    }
  ],
  "total_price": 399.98,
  "status": "pending",
  "created_at": "2023-10-05T15:20:00Z"
}
```

**Key operations:**
- Fetch pending orders for a user:  
  ```javascript
  db.orders.find({ user_id: "user_123", status: "pending" })
  ```
- Update order status atomically:  
  ```javascript
  db.orders.updateOne(
    { _id: ObjectId("order_789") },
    { $set: { status: "shipped", updated_at: new Date() } }
  )
  ```
- Create index for fast user/status lookups:  
  ```javascript
  db.orders.createIndex({ user_id: 1, status: 1 })
  ```

This approach ensures orders are updated reliably without database contention—essential for real-time e-commerce systems.

### Real-World Application

These patterns power production e-commerce platforms. For example:
- A platform with **10 million products** uses category indexing to handle 10k+ requests per second.
- Order status updates use atomic operations to prevent race conditions during high-traffic sales events.

## Summary

In this section, we've built two critical e-commerce components using MongoDB:  
- **Products**: Scalable catalogs with flexible schemas and category-based indexing  
- **Orders**: Atomic status updates and efficient user/order lookups  

These patterns are battle-tested in production systems and can handle millions of products and orders while maintaining simplicity and performance. 🛒