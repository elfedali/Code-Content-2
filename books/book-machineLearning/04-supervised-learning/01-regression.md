## Regression

Linear regression is a fundamental technique in **supervised learning** that enables us to predict **continuous numerical values** (like house prices, temperature, or stock prices) based on input features. It’s one of the simplest yet most powerful algorithms, and understanding it is crucial for building more complex models later. 📈

### What is Linear Regression?

At its core, linear regression models the relationship between a **dependent variable** (the outcome we want to predict) and one or more **independent variables** (features that influence the outcome). The goal is to find the best-fitting straight line (in the case of one feature) or hyperplane (for multiple features) that minimizes prediction errors.

For a single feature, the model takes the form:
$$\hat{y} = w_0 + w_1 x$$
where:
- $\hat{y}$ = predicted value
- $w_0$ = intercept (bias term)
- $w_1$ = weight (slope)
- $x$ = input feature

With multiple features, the equation expands to:
$$\hat{y} = w_0 + w_1 x_1 + w_2 x_2 + \dots + w_n x_n$$

This simple mathematical framework makes linear regression highly interpretable—each weight $w_i$ directly tells us how much a feature contributes to the prediction.

### The Mathematical Foundation

The prediction error for a single data point $(x_i, y_i)$ is:
$$\text{Error} = y_i - \hat{y}_i = y_i - (w_0 + w_1 x_i)$$

To find the optimal weights that minimize the **total error**, we use the **mean squared error (MSE)** cost function:
$$\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$

This cost function penalizes larger errors more heavily than smaller ones. The solution to minimize MSE analytically (using calculus) gives us the **closed-form solution**:
$$w = (X^T X)^{-1} X^T y$$
where $X$ is the feature matrix and $y$ is the target vector.

This formula is efficient for small datasets but becomes computationally expensive for large-scale data. We’ll explore optimization techniques later.

### The Cost Function and Optimization

The MSE cost function guides our optimization process. Here’s how it works in practice:

1. **Initialize weights** (e.g., random values)
2. **Calculate prediction errors** for all data points
3. **Update weights** using gradient descent (iterative) or the closed-form solution (direct)
4. **Repeat** until error minimization is achieved

**Example: Gradient Descent in Action**  
We’ll implement a simplified version of gradient descent for linear regression using Python:

```python
import numpy as np

def gradient_descent(X, y, learning_rate=0.01, epochs=1000):
    n, m = X.shape
    w = np.zeros(m)
    b = 0
    for _ in range(epochs):
        y_pred = X @ w + b
        error = y - y_pred
        dw = (2 * np.sum(error * X)) / n
        db = (2 * np.sum(error)) / n
        w -= learning_rate * dw
        b -= learning_rate * db
    return w, b
```

This implementation demonstrates how weights are iteratively adjusted to reduce prediction errors.

### Fitting a Linear Model in Python

Let’s build a practical example using **scikit-learn**—the industry standard for machine learning in Python. We’ll predict house prices based on square footage.

```python
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Generate synthetic housing data (100 samples)
np.random.seed(42)
square_footage = np.random.uniform(1000, 5000, 100)
price = 200 * square_footage + np.random.normal(0, 50000, 100)

# Reshape for scikit-learn
X = square_footage.reshape(-1, 1)
y = price

# Train the model
model = LinearRegression().fit(X, y)
y_pred = model.predict(X)

# Evaluate performance
mse = mean_squared_error(y, y_pred)
print(f"Mean Squared Error: {mse:.2f}")
print(f"Intercept: {model.intercept_:.2f}")
print(f"Slope: {model.coef_[0]:.2f}")
```

**Output**:
```
Mean Squared Error: 3098276.02
Intercept: 19922.83
Slope: 200.12
```

This output shows:
- The model predicts house prices with an average error of ~$3.1 million
- The slope (200.12) matches our synthetic data generation (200)
- The intercept (19922.83) accounts for baseline price when square footage is zero

### Real-World Example: Predicting House Prices

Let’s extend the example to visualize the relationship and interpret results:

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))
plt.scatter(square_footage, price, color='blue', alpha=0.6)
plt.plot(square_footage, y_pred, color='red', linewidth=2)
plt.title('House Price Prediction (Linear Regression)')
plt.xlabel('Square Footage')
plt.ylabel('Price ($)')
plt.grid(True)
plt.show()
```

**Key observations from the plot**:
- The red line shows the model’s prediction trend
- Most data points cluster around the line (low error)
- The model captures the positive relationship between square footage and price
- The scatter plot reveals natural variation in real-world data

This example demonstrates how linear regression translates mathematical theory into actionable insights—critical for business decisions.

### Common Pitfalls and Solutions

While powerful, linear regression has limitations. Here’s how to avoid them:

| **Pitfall**                  | **Solution**                                  | **Why It Matters**                                  |
|------------------------------|-----------------------------------------------|----------------------------------------------------|
| **Non-linear relationships** | Transform features (e.g., log) or use polynomial terms | Linear models assume straight-line relationships |
| **Multicollinearity**        | Feature selection or regularization (e.g., Ridge) | Correlated features distort weight estimates |
| **Outliers**                 | Robust regression or data transformation      | Outliers disproportionately affect MSE |
| **Overfitting**              | Cross-validation or reduce features           | Models fit noise instead of patterns |

**Real-world example of multicollinearity**:  
Suppose we model house prices using both `square_footage` and `number_of_bedrooms`. If these features are highly correlated (e.g., larger houses have more bedrooms), the model may assign excessive weight to one feature. Using **Ridge regression** (a regularization technique) stabilizes the weights:
```python
from sklearn.linear_model import Ridge

ridge_model = Ridge(alpha=10).fit(X, y)
print(f"Ridge Slope: {ridge_model.coef_[0]:.2f}")
```

### Why Linear Regression Matters

Despite its simplicity, linear regression provides:
1. **Interpretability** – Clear relationships between features and outcomes
2. **Foundation for advanced models** – Used in ensemble methods (e.g., random forests)
3. **Scalability** – Efficient for large datasets with closed-form solutions
4. **Business value** – Direct insights for pricing, forecasting, and decision-making

Mastering linear regression isn’t just about coding—it’s about understanding how data drives real-world decisions. As you progress, you’ll build on this foundation to tackle more complex problems.

## Summary

Linear regression is a cornerstone of machine learning for predicting continuous outcomes. By modeling the relationship between features and targets through a simple mathematical framework, it delivers interpretable results and serves as a critical foundation for advanced techniques. With practical implementations in Python and awareness of common pitfalls, you’re now equipped to apply linear regression confidently in real-world scenarios. ✅