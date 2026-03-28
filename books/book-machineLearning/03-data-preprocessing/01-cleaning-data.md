## Cleaning Data

Data cleaning is the critical first step in transforming raw, messy real-world data into a structured format suitable for machine learning pipelines. Think of it as the "data hygiene" phase where we eliminate noise, fix inconsistencies, and prepare your dataset for meaningful analysis. Skipping this step risks model failure, biased predictions, or misleading insights—so let’s dive into two foundational aspects of data cleaning with practical, actionable techniques.

### Missing Values

Missing values are the silent killers of data quality—gaps in your dataset that can distort statistical analysis and break model assumptions. They might appear as `NaN` (not a number) in numerical columns, `None` in Python, or empty strings in text fields. The key question is: **what do we do when data points vanish?** Let’s explore detection and resolution strategies with real-world examples.

#### Why Missing Values Matter
Missing values introduce bias, reduce sample size, and violate assumptions like independence in statistical models. For instance, a 20% missing rate in a critical feature could inflate error margins by 30% in regression models. The solution isn’t just *detecting* gaps—it’s understanding *why* they exist (e.g., sensor failure, human error) to choose the right fix.

#### Detecting Missing Values
The first step is always detection. Pandas provides built-in methods to identify missing data efficiently:

```python
import pandas as pd
import numpy as np

# Create sample data with missing values
data = {
    'Age': [25, np.nan, 32, 40, 35],
    'Income': [75000, 82000, np.nan, 95000, 68000],
    'Education': ['Bachelor', 'Master', 'PhD', 'Bachelor', np.nan]
}
df = pd.DataFrame(data)

# Check missing values
print("Missing values per column:")
print(df.isnull().sum())
```

**Output**:
```
Missing values per column:
Age        1
Income     1
Education  1
dtype: int64
```

This output tells us *where* and *how many* gaps exist. Note: `isnull()` and `isna()` are equivalent but `isnull()` is more common in pandas.

#### Handling Missing Values
The choice of strategy depends on the *nature* of the missingness (random vs. patterned) and the *data type*. Here’s how to tackle common scenarios:

1. **Drop Missing Rows** (for small gaps or when missingness is random):
   ```python
   # Drop rows with any missing values
   clean_df = df.dropna()
   print("After dropping missing rows:", clean_df.shape)
   ```
   *Use case*: When missingness is random and the dataset is large enough to tolerate reduced samples.

2. **Fill with Mean/Median/Mode** (for numerical/categorical features):
   ```python
   # Fill numerical missing values with median (robust to outliers)
   df['Income'].fillna(df['Income'].median(), inplace=True)
   
   # Fill categorical missing values with mode
   df['Education'].fillna(df['Education'].mode()[0], inplace=True)
   ```
   *Why median?* In skewed distributions (e.g., income), mean can be pulled toward outliers. Median resists this.

3. **Interpolation** (for time-series data):
   ```python
   # Fill missing values in time-series with linear interpolation
   df['Age'] = df['Age'].interpolate(method='linear')
   ```

4. **Predictive Imputation** (advanced): Use models to predict missing values from other features (e.g., via regression). *This is reserved for when gaps are small and structured*.

#### Real-World Example: Handling Missing Income
Imagine a real estate dataset where income is missing for 10% of homes. We’d:
1. Check if missingness correlates with neighborhood (`df['Income'].isnull().corr(df['Neighborhood'])`)
2. Fill with median income per neighborhood (grouped imputation)
3. Validate with a small test dataset to ensure no bias.

> 💡 **Pro Tip**: Always *validate* your solution. After imputation, check if the distribution of the feature remains consistent with the original (e.g., using histograms or Q-Q plots).

### Outliers

Outliers are data points that deviate significantly from the rest—like a single star in a constellation of planets. They can arise from measurement errors, rare events, or genuine anomalies. While they don’t always need removal, ignoring them risks models overfitting to noise or underfitting to true patterns.

#### Why Outliers Matter
Outliers distort statistical measures (e.g., mean, standard deviation) and can cause models to learn spurious relationships. For example, a single high-income household in a neighborhood dataset might pull the average income upward, making the model misclassify low-income areas as high-income.

#### Detecting Outliers
Three robust methods for outlier detection:

1. **IQR (Interquartile Range)**:
   - *How it works*: 25th–75th percentile range. Points outside `Q1 - 1.5*IQR` or `Q3 + 1.5*IQR` are outliers.
   - *Example*:
     ```python
     Q1 = df['Age'].quantile(0.25)
     Q3 = df['Age'].quantile(0.75)
     IQR = Q3 - Q1
     lower_bound = Q1 - 1.5 * IQR
     upper_bound = Q3 + 1.5 * IQR
     print(f"Age outliers: {df['Age'][(df['Age'] < lower_bound) | (df['Age'] > upper_bound)]}")
     ```

2. **Z-Score**:
   - *How it works*: Measures how many standard deviations a point is from the mean. Values > 3 or < -3 are outliers.
   - *Example*:
     ```python
     from scipy import stats
     z_scores = stats.zscore(df['Income'])
     outliers = df['Income'][np.abs(z_scores) > 3]
     ```

3. **Boxplots** (visual inspection):
   ```python
   import matplotlib.pyplot as plt
   plt.boxplot(df['Income'])
   plt.title('Income Distribution with Outliers')
   plt.show()
   ```

#### Handling Outliers
The approach depends on *why* outliers exist and *what* you want to preserve:

| **Strategy**          | **When to Use**                                  | **Example**                                  |
|------------------------|--------------------------------------------------|-----------------------------------------------|
| **Remove**              | Errors or extreme noise (e.g., sensor glitches)    | `df = df[df['Income'] < 200000]`              |
| **Cap** (capping)       | Genuine extremes (e.g., high-income outliers)      | `df['Income'] = df['Income'].clip(upper=200000)` |
| **Transform**           | Skewed distributions (e.g., log transformation)    | `df['Income'] = np.log1p(df['Income'])`       |
| **Investigate**         | Rare but meaningful cases (e.g., new market segment) | Check if outlier represents a valid segment   |

#### Real-World Example: Cleaning Housing Prices
Suppose a housing dataset has one house priced at $1,000,000 while others range from $100,000–$500,000:
1. Detect via IQR: `Q1=200k, Q3=400k, IQR=200k → upper bound=400k + 300k = 700k` → $1M is an outlier.
2. Cap it: `df['Price'] = df['Price'].clip(upper=700000)` (to avoid model overfitting to one extreme).
3. *Always* check if the outlier represents a legitimate high-value property (e.g., luxury apartment) before capping.

> 💡 **Pro Tip**: Never remove outliers without context. In healthcare data, a single high blood pressure reading might indicate a critical patient—removing it could harm outcomes.

## Summary

Data cleaning is where you transform raw, imperfect data into a trustworthy foundation for machine learning. **Missing values** require careful detection and strategic handling—whether dropping rows, imputing with medians, or predictive modeling—while **outliers** demand nuanced approaches: investigate first, then decide between removal, capping, or transformation. Remember: the goal isn’t just *cleaning* data but *understanding* it. By mastering these techniques, you turn messy real-world data into the precise input your AI systems need to succeed. 🌟