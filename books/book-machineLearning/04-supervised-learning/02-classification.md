## Supervised Learning: Classification

Classification is the task of predicting discrete labels (classes) from input features. It forms the backbone of countless real-world applications—from spam filters to medical diagnostics—by enabling machines to make meaningful decisions about categories of data. In this section, we’ll explore two foundational classification algorithms that balance simplicity, interpretability, and real-world utility: **Logistic Regression** and **Decision Trees**. These models provide an excellent starting point for building production-ready classification systems while demystifying the core mechanics of supervised learning. 🌟

### Logistic Regression

Logistic Regression is a probabilistic model that predicts the *probability* of a binary outcome using a **sigmoid function**. Despite its name, it’s not a linear classifier but a *statistical model* that transforms linear combinations of features into probabilities between 0 and 1. This makes it ideal for scenarios where interpretability matters—like credit scoring or medical risk prediction—where understanding feature impacts is critical.

The model learns coefficients ($\beta$) that define the decision boundary:
$$P(y=1|x) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots)}}$$

Here’s how it works in practice using the **iris dataset** (a classic benchmark for classification tasks). We’ll predict whether a flower is *setosa* (class 1) or *non-setosa* (class 0) using sepal length and width:

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load dataset and create binary target (setosa = 1, others = 0)
iris = load_iris()
X = iris.data[:, :2]  # First two features: sepal length/width
y = (iris.target == 0).astype(int)  # Binary: 1 for setosa, 0 otherwise

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train logistic regression model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Evaluate performance
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
```

This code achieves **~95% accuracy** on the iris dataset. The key takeaway? Logistic Regression outputs *probabilistic confidence* (via `model.predict_proba()`), allowing us to understand how certain the model is about predictions. For example, a flower with `sepal length = 5.0` and `sepal width = 3.5` might have a **72% probability** of being setosa.

**Why Logistic Regression Shines**:
- **Interpretability**: Coefficients directly show feature impact (e.g., `sepal length` increases setosa probability).
- **Simplicity**: Fast training and minimal hyperparameters.
- **Probabilistic output**: Enables risk assessment beyond binary decisions.

However, it struggles with *non-linear relationships* in the data—this is where **Decision Trees** excel.

### Decision Trees

A **Decision Tree** is a flowchart-like model that recursively splits data using feature thresholds to form pure subsets. Each internal node represents a feature-based decision, branches represent outcomes, and leaf nodes contain class predictions. Unlike linear models, trees capture *non-linear patterns* and handle both numerical and categorical features naturally.

Here’s a practical example using the *full* iris dataset to predict species (multi-class classification) with a depth-limited tree to avoid overfitting:

```python
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load full iris dataset
iris = load_iris()
X = iris.data
y = iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train decision tree (max depth = 2 to prevent overfitting)
model = DecisionTreeClassifier(max_depth=2)
model.fit(X_train, y_train)

# Evaluate performance
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
```

This code achieves **~94% accuracy** on the iris dataset. The tree can be visualized using `sklearn.tree.plot_tree()` to see how features like `petal length` or `sepal width` drive decisions at each split.

**Key Advantages of Decision Trees**:
1. **Non-linear decision boundaries**: Naturally models complex relationships (e.g., curved boundaries).
2. **Feature importance**: Quantifies which features most influence predictions (via `model.feature_importances_`).
3. **Robust to outliers**: Handles noisy data better than linear models.

**Trade-off to Remember**: Decision Trees overfit easily without pruning—this is why we set `max_depth=2` (limiting tree depth to two splits). In production, techniques like *cost complexity pruning* or *random forests* (which ensemble multiple trees) mitigate this risk.

### Real-World Impact: Why These Models Matter

Both algorithms are deployed in production systems where *explainability* and *scalability* are non-negotiable:
- **Logistic Regression** powers credit risk models (e.g., predicting loan defaults) where regulators require transparent decision logic.
- **Decision Trees** underpin fraud detection systems (e.g., identifying suspicious transactions) due to their intuitive rules and speed.

Critically, they serve as the *building blocks* for more advanced models (like Random Forests and Gradient Boosting)—proving that simplicity often leads to robust, real-world solutions.

## Summary

We explored **Logistic Regression** (a probabilistic, interpretable model for linear relationships) and **Decision Trees** (a flexible, rule-based model for non-linear patterns). Both deliver high accuracy on real-world datasets while providing actionable insights—making them indispensable for beginners and practitioners alike. Logistic Regression excels in transparency for linear problems, while Decision Trees shine in capturing complex interactions. Together, they form the foundation for building trustworthy classification systems that work *for* humans, not just machines. 💡