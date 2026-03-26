## Common Vulnerabilities

In the world of backend engineering, understanding common vulnerabilities is like having a security guard at your door—critical for keeping your systems safe from attackers. 🔒 Let’s dive deep into three foundational threats that plague real-world applications and how to defend against them.

### SQL Injection

**What it is**  
SQL Injection (SQLi) occurs when an attacker manipulates input fields to execute malicious SQL queries against your database. This happens because unvalidated user input is directly embedded into SQL statements without proper sanitization.

**How it happens**  
Consider a login endpoint that constructs SQL queries using string concatenation. An attacker could submit a username like `admin' --` to bypass authentication. The resulting query might become:

```sql
SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'
```

This executes the query without checking the password, granting attackers unauthorized access.

**Real-world impact**  
Attackers can steal sensitive data, manipulate database records, or even delete entire tables. In 2022, a SQLi flaw in a major e-commerce platform led to 400,000 user records being compromised.

**Prevention strategies**  
1. **Parameterized queries**: Use prepared statements to separate SQL logic from user input.  
2. **Input validation**: Enforce strict data types and lengths (e.g., reject non-alphanumeric characters in usernames).  
3. **Database-level security**: Restrict user privileges to minimal necessary permissions.

Here’s a secure implementation using Python’s `sqlite3` with parameterized queries:

```python
import sqlite3

def login(username, password):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # Safe query: parameters are explicitly bound
    cursor.execute("SELECT id FROM users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    conn.close()
    return user
```

**Key takeaway**: Never concatenate user input with SQL strings. Parameterized queries are the gold standard for preventing SQLi in all database backends.

---

### Cross-Site Scripting (XSS)

**What it is**  
Cross-Site Scripting (XSS) happens when an attacker injects malicious scripts into web pages viewed by victims. These scripts execute in the victim’s browser, potentially stealing session tokens, cookies, or sensitive data.

**How it happens**  
Imagine a user profile page that displays comments without encoding. An attacker crafts a comment like `<script>alert('XSS!')</script>`. When the victim views the page, the script runs in their browser.

**Real-world impact**  
Attackers can hijack sessions, redirect users to phishing sites, or even install malware. The 2021 Capital One breach involved XSS in a third-party tool, compromising 100,000+ users.

**Prevention strategies**  
1. **Output encoding**: Transform user-generated content into safe formats for rendering (e.g., HTML entities).  
2. **Content Security Policy (CSP)**: Restrict script sources to prevent unauthorized execution.  
3. **HTTP-only cookies**: Store session tokens in cookies that browsers cannot access via JavaScript.

Here’s a secure implementation using Express.js and HTML encoding:

```javascript
const { escape } = require('html-escaper');

app.get('/profile', (req, res) => {
  const { userId } = req.query;
  const safeComment = escape(req.user.comments[userId]); // Prevents script injection
  res.send(`
    <div>
      <h2>Your Comment</h2>
      <p>${safeComment}</p>
    </div>
  `);
});
```

**Key takeaway**: Always encode user input when rendering it in HTML. Tools like `html-escaper` (Node.js) or `htmlspecialchars` (PHP) make this trivial.

---

### Cross-Site Request Forgery (CSRF)

**What it is**  
Cross-Site Request Forgery (CSRF) occurs when an attacker tricks a victim into executing unintended actions on a web application they’re authenticated to. The attacker’s goal is to perform actions (like changing passwords) without the user’s consent.

**How it happens**  
Suppose a user is logged into a banking app. An attacker sends a malicious link:  
`https://banking.com/change_password?new_password=secret&token=abc123`  
The browser silently submits this request to the server, altering the user’s password.

**Real-world impact**  
CSRF attacks can lead to financial theft, data leaks, or unauthorized account changes. In 2020, a CSRF vulnerability in a popular SaaS platform affected 500,000+ users.

**Prevention strategies**  
1. **Anti-CSRF tokens**: Generate unique, random tokens per session and include them in forms.  
2. **SameSite cookies**: Set cookies with `SameSite=Strict` to prevent cross-site requests.  
3. **Request validation**: Verify tokens match the user’s session before processing critical actions.

Here’s a secure implementation using Django:

```python
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def change_password(request):
    if request.method == 'POST':
        # Token validation (simplified)
        if request.POST.get('csrf_token') != request.session.get('csrf_token'):
            return HttpResponseForbidden("Invalid token")
        # ... process password change
```

**Key takeaway**: Never trust user requests alone. Always validate tokens and enforce session context to block forged requests.

---

## Summary

SQL Injection, XSS, and CSRF represent three critical vulnerabilities that attackers exploit to compromise backend systems. By implementing **parameterized queries** for SQL, **HTML encoding** for user-generated content, and **anti-CSRF tokens** with `SameSite` cookies, you can build applications that are resilient against these threats. Remember: security isn’t a one-time task—it’s a continuous practice rooted in defensive design. 💡