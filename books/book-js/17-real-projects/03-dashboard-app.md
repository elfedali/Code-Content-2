## Dashboard App

### Charts

This section covers how to create interactive charts using Chart.js. We built a simple line chart example that displays sales data for a week. The chart is responsive and can be extended with real-time data from an API.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Simple Chart Example</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <canvas id="myChart" width="400" height="400"></canvas>
  <script>
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: 'Sales',
          data: [120, 190, 200, 150, 160],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  </script>
</body>
</html>
```

**Pro Tip**: Always use responsive design for charts to ensure they look good on mobile devices. Chart.js handles this automatically with its responsive options.

### Authentication

Authentication is the backbone of any secure dashboard application. Let's implement a simple authentication flow that uses **localStorage** to store a token after a successful login. This approach is ideal for small to medium dashboards where you don't want to deal with a full backend.

Here's a step-by-step implementation:

**Step 1: Create the login form**

```html
<form id="loginForm">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required>
  <button type="submit">Login</button>
</form>
```

**Step 2: Handle login with a mock API**

```javascript
// Mock API for login
function mockLogin(username, password) {
  // In a real app, this would be an API call (e.g., fetch)
  if (username === 'admin' && password === 'password123') {
    return { token: 'abc123' };
  }
  return null;
}
```

**Step 3: Login handler**

```javascript
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const token = mockLogin(username, password);
  if (token) {
    localStorage.setItem('authToken', token.token);
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid credentials');
  }
});
```

**Step 4: Dashboard with authentication check**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>Dashboard</h1>
  <div id="chartContainer" style="width: 600px; height: 400px;"></div>
  <script>
    // Check for token
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = 'login.html';
    }

    // Initialize chart (same as above)
    const ctx = document.getElementById('chartContainer').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: 'Sales',
          data: [120, 190, 200, 150, 160],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  </script>
</body>
</html>
```

**Pro Tip**: Always validate tokens on the server side for production applications. This example is for demonstration only.

## Summary

In this section, we built a real-world dashboard application with two critical components: **charts** for data visualization and **authentication** to secure user access. By leveraging Chart.js, we created an interactive line chart that displays sales data. For authentication, we implemented a client-side solution using localStorage and a mock API, providing a secure and simple way to protect the dashboard. This foundation can be extended with real backend services and more complex authentication mechanisms as your project grows.

📊🔑