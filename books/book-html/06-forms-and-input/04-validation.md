## Validation

When building forms in HTML5, **validation** is critical for ensuring user input meets expected criteria. This section covers four essential attributes that help enforce robust input rules: `required`, `pattern`, `min`, and `max`. These attributes work together to create user-friendly, error-resistant forms.

### The `required` Attribute

The `required` attribute mandates that a form field must be filled out before submission. It ensures the input field is not empty and is widely supported across browsers.

**Example**:  
```html
<input type="email" required>
```

This field prevents submission if the user leaves it blank. Note: `required` works with all input types (text, email, password, etc.) and is a foundational validation tool.

⚠️ **Important**: `required` only checks for emptiness—it does *not* validate format (e.g., email structure). For format validation, use `pattern` or `type` constraints.

### The `pattern` Attribute

The `pattern` attribute uses a regular expression (regex) to enforce specific input formats. This is ideal for fields requiring strict structural rules (e.g., phone numbers, usernames).

**Example**:  
```html
<input type="text" pattern="[a-zA-Z0-9]+" required>
```

This field accepts *only* letters and numbers (no spaces or special characters). The regex `^[a-zA-Z0-9]+$` ensures the input starts and ends with alphanumeric characters (with no spaces).

✅ **Pro Tip**: Regex patterns are case-sensitive by default. For case-insensitive matching, add the `i` flag (e.g., `^[a-z0-9]+$`).

### The `min` and `max` Attributes

The `min` and `max` attributes restrict numeric inputs to a defined range. They are especially useful for fields like age, prices, or quantities.

**Example for numeric input**:  
```html
<input type="number" min="18" max="100" required>
```
This field prevents submission if the user enters a number less than 18 or greater than 100.

**Example for date input**:  
```html
<input type="date" min="2020-01-01" max="2023-12-31">
```
This ensures the user selects a date between January 1, 2020, and December 31, 2023.

⚠️ **Important**: These attributes work *only* with numeric inputs (`type="number"`) or date inputs (`type="date"`). They do *not* apply to text fields.

## Summary

- **`required`**: Ensures a field is not empty.
- **`pattern`**: Enforces a specific regex format.
- **`min`/`max`**: Restrict numeric inputs to a defined range (and dates).

These attributes create forms that are both user-friendly and robust—helping catch errors early while guiding users toward correct input. Always pair them with clear labels and error messages for optimal user experience.

✅ **Remember**: Combine validation with intuitive error messaging to build forms that users trust.