Real Projects

In this section, we'll build a real-world blog backend using Node.js, Express, and MongoDB. We'll focus on two critical components: **Posts** and **Comments**. This implementation demonstrates practical application of modern web development patterns while maintaining scalability and maintainability.

---

### Modeling the Post Document

We'll create a `Post` model with the following fields:
- `title`: string (required)
- `content`: string (required)
- `author`: string (required)
- `publishedAt`: date (default: current time)
- `tags`: array of strings (optional)

**File: `models/Post.js`**
```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
  tags: [{ type: String }]
});

module.exports = mongoose.model('Post', postSchema);
```

---

### Creating and Reading Posts

**To create a post:**
```javascript
const post = new Post({
  title: 'Hello World',
  content: 'This is a sample post',
  author: 'John Doe'
});
await post.save();
```

**To read all posts:**
```javascript
const posts = await Post.find();
```

---

### Modeling the Comment Document

We'll create a `Comment` model with these fields:
- `postId`: string (required) - reference to post ID
- `text`: string (required)
- `author`: string (required)
- `createdAt`: date (default: current time)
- `moderationStatus`: string (default: 'pending') - values: 'pending', 'approved', 'rejected'

**File: `models/Comment.js`**
```javascript
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  moderationStatus: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Comment', commentSchema);
```

---

### Creating Comments

**To add a comment to a post:**
```javascript
const comment = new Comment({
  postId: '60d3d...', // this comes from the frontend
  text: 'Great post!',
  author: 'Jane Smith'
});
await comment.save();
```

---

### Comment Moderation Workflow

**To update comment status:**
```javascript
const updatedComment = await Comment.findByIdAndUpdate(
  'commentId',
  { moderationStatus: 'approved' },
  { new: true }
);
```

---

### Comparison of Implementation Strategies

| Approach             | Pros                                      | Cons                                      | When to Use                     |
|----------------------|--------------------------------------------|--------------------------------------------|----------------------------------|
| **Embedded Comments** | Simple data structure, fewer queries       | Performance drops with many comments      | Small blogs with few comments   |
| **Referenced Comments**| Scalable, better performance, flexible    | Requires additional joins                 | Production blogs, high traffic  |

**Why we chose referenced comments:**
- Handles thousands of comments efficiently
- Allows independent scaling of posts vs comments
- Supports complex moderation workflows
- Maintains data integrity through proper relationships

---

### Conclusion

This implementation demonstrates how to build a scalable blog system with:
1. Proper MongoDB modeling for both posts and comments
2. Efficient data relationships
3. Clear moderation workflows
4. Production-ready patterns for real-world applications

The referenced comments approach provides the best balance for most production systems, especially when dealing with growing user bases and comment volumes. We've maintained clean code structure while ensuring the system can handle real-world traffic and scaling requirements.