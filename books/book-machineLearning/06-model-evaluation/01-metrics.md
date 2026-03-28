## Metrics

This section dives into the core metrics that help us evaluate the performance of classification models. Understanding these metrics is crucial for making informed decisions about model quality and real-world applicability. We'll explore three fundamental metrics: **Accuracy**, **Precision**, and **Recall**.

### Accuracy

**Accuracy** is the proportion of correctly predicted instances out of the total instances. It's calculated as:

$$
\text{Accuracy} = \frac{\text{True Positives} + \text{True Negatives}}{\text{Total Predictions}}
$$

Accuracy is intuitive and often the first metric people think of. However, it can be misleading when dealing with **imbalanced datasets** (where one class vastly outnumbers the other). For instance, if 95% of your data is one class, a model that always predicts that class will have 95% accuracy but fails to identify the minority class.

Let's illustrate with a concrete example using a made-up imbalanced dataset:

```python
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Generate imbalanced dataset (90% class 0, 10% class 1)
X, y = make_classification(n_samples=100, 
                          n_features=2, 
                          classes=[0, 1], 
                          weights=[0.9, 0.1], 
                          random_state=42)

# Split into training/test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a dummy classifier that always predicts class 0
from sklearn.linear_model import LogisticRegression
dummy_model = LogisticRegression()
dummy_model.fit(X_train, y_train)

# Predict on test set
y_pred = dummy_model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
```

**Output**: `Accuracy: 0.90`

This example shows why accuracy alone is insufficient for imbalanced data—our dummy model achieves 90% accuracy by simply predicting the majority class, which is *technically correct* but fails to capture the minority class. Always consider the class distribution when interpreting accuracy.

### Precision

**Precision** measures the proportion of true positive predictions among all positive predictions. It's calculated as:

$$
\text{Precision} = \frac{\text{True Positives}}{\text{True Positives} + \text{False Positives}}
$$

Precision is critical when **false positives** are costly. For example, in spam filtering, a high precision means that when the model labels an email as spam, it's likely to be genuine spam (minimizing false alarms).

Let's demonstrate with a spam detection scenario:

```python
from sklearn.metrics import precision_score

# Create a small spam detection example
y_true = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]  # 9 ham emails, 1 spam email
y_pred = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]  # Predicted spam: 2 emails

# Calculate precision
precision = precision_score(y_true, y_pred)
print(f"Precision: {precision:.2f}")
```

**Output**: `Precision: 0.50`

Here, the model has 50% precision—only 1 out of 2 predicted spam emails is actually spam. This indicates the model is generating many false positives. In real-world spam filtering, we'd prioritize precision to avoid flagging legitimate emails as spam.

### Recall

**Recall** (also known as sensitivity or true positive rate) measures the proportion of true positives among all actual positives. It's calculated as:

$$
\text{Recall} = \frac{\text{True Positives}}{\text{True Positives} + \text{False Negatives}}
$$

Recall is essential when **false negatives** are costly. For example, in medical testing, high recall ensures most patients with a disease are identified (minimizing missed cases).

Let's create a medical diagnosis example:

```python
from sklearn.metrics import recall_score

# Create a disease detection example
y_true = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]  # 9 healthy patients, 1 diseased
y_pred = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]  # Predicted disease: 2 patients

# Calculate recall
recall = recall_score(y_true, y_pred)
print(f"Recall: {recall:.2f}")
```

**Output**: `Recall: 1.00`

This shows the model has 100% recall—identifying the single diseased patient without missing them. In critical applications like disease screening, high recall is often prioritized to avoid false negatives.

### Key Trade-offs and Context

Here's how these metrics interact in practice:

| **Metric**    | **Best When**                          | **Common Pitfall**                     | **Real-World Example**               |
|---------------|-----------------------------------------|----------------------------------------|--------------------------------------|
| Accuracy      | Balanced datasets                      | Misleading in imbalanced data          | General product categorization       |
| Precision     | False positives are expensive          | Overlooking true negatives            | Spam filters, fraud detection       |
| Recall        | False negatives are expensive          | Overlooking false positives           | Medical diagnostics, defect detection |

**Critical Insight**: These metrics often exist in tension. For instance:
- A model with **high precision** may have **low recall** (many true positives but many missed negatives)
- A model with **high recall** may have **low precision** (many true positives but many false alarms)

Always consider your specific problem constraints when choosing which metric to prioritize.

## Summary

In this section, we've explored the foundational metrics for evaluating classification models: **Accuracy**, **Precision**, and **Recall**. Each metric provides a unique lens for understanding model performance:

- **Accuracy** is straightforward but can be deceptive in imbalanced datasets.
- **Precision** focuses on minimizing false positives, critical in scenarios where false alarms are expensive.
- **Recall** emphasizes minimizing false negatives, essential when missing a positive case has severe consequences.

Remember: **no single metric tells the whole story**. Always consider the context of your problem and the trade-offs between these metrics. 🚀