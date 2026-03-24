## Common Vulnerabilities

In the world of web applications, security is paramount. Let's dive into two of the most common vulnerabilities that can undermine your application's integrity: **Cross-Site Scripting (XSS)** and **Cross-Site Request Forgery (CSRF)**. 🐞 Understanding these threats isn't just theoretical—it's essential for building resilient systems that protect users and data. Let's break them down with concrete examples and practical mitigation strategies.

---

### Cross-Site Scripting (XSS)

**Cross-Site Scripting (XSS)** occurs when an attacker injects malicious scripts into web pages viewed by users. These scripts can steal session cookies, redirect users to malicious sites, or even manipulate content without the user's knowledge. XSS exploits three main types: **reflected**, **stored**, and **DOM-based**. Each has distinct attack patterns and mitigation requirements.

#### Why XSS Happens
XSS exploits happen when your application **fails to sanitize user input** before rendering it in HTML. Attackers craft inputs that trigger malicious behavior when executed in the victim's browser. For example:

1. **Reflected XSS**: Malicious payloads are reflected off your server in a response (e.g., search results).
2. **Stored XSS**: Malicious payloads are stored on your server (e.g., comments in a blog) and then served to multiple users.
3. **DOM-based XSS**: Malicious scripts manipulate the DOM directly in the client's browser (e.g., via `innerHTML`).

#### Real-World Example: Reflected XSS
Imagine a simple search feature that displays user queries without escaping:

```javascript
// Bad practice: user input is directly inserted into HTML
const userInput = req.body.query;
res.send(`<h1>Your search results: ${userInput}</h1>`);
```

An attacker could craft a URL like this:  
`https://yourapp.com/search?query=<script>alert('XSS')</script>`  

This would execute the script in the victim's browser, triggering a popup alert. The vulnerability exists because the server **never escapes** the input.

#### Real-World Example: DOM-based XSS
Here’s a client-side example using JavaScript:

```javascript
// Bad practice: user input is inserted directly into DOM
const userInput = document.querySelector('input').value;
document.getElementById('output').innerHTML = userInput;
```

If the input is `<script>alert('XSS')</script>`, the browser executes the script immediately. This is a classic DOM-based XSS attack.

#### How to Prevent XSS
1. **Always escape user input** when rendering in HTML. Use libraries like:
   - `DOMPurify` for client-side
   - `util.escape` in Node.js
2. **Use frameworks** that handle escaping automatically (e.g., React, Angular, Vue).
3. **Implement Content Security Policy (CSP)** to restrict script sources.

Here’s a safe alternative using React:

```javascript
// Safe practice: React automatically escapes user input
function SearchResults({ query }) {
  return <div>Your search results: {query}</div>;
}
```

#### Key Takeaway
XSS attacks thrive on **unsanitized user input**. By escaping data and leveraging modern frameworks, you can eliminate this risk. Never trust user input—treat it as potentially malicious.

---

### Cross-Site Request Forgery (CSRF)

**Cross-Site Request Forgery (CSRF)** happens when an attacker tricks a user into submitting a malicious request to a web application they're authenticated to, without their consent. Unlike XSS, CSRF doesn’t require the attacker to compromise the victim’s session—it exploits the **trust relationship** between the user and the server.

#### Why CSRF Happens
When a user is logged into a secure site (e.g., a bank), the server sets a session cookie. If an attacker creates a link or form that the user clicks, the server might process the request as the user’s own action—because the session cookie is already present. This is the core vulnerability.

#### Real-World Example
Consider a bank’s transfer feature:

```html
<!-- Malicious link sent via email (attacker's control) -->
<a href="https://bank.com/transfer?amount=1000&to=attacker">Transfer $1000</a>
```

When the victim clicks this link:
1. Their browser sends the session cookie to `bank.com`.
2. The server processes the transfer as if it came from the victim.
3. **Result**: $1000 is transferred to the attacker’s account.

#### How to Prevent CSRF
The most effective solution is **anti-CSRF tokens**—unique, random strings generated per session that must be included in requests. Here’s how it works:

1. **Server generates a token** and stores it in the session.
2. **Client includes the token** in the request (e.g., hidden form field).
3. **Server validates the token** before processing the request.

Here’s a practical implementation using Node.js and Express:

```javascript
// 1. Generate token and store in session
const token = crypto.randomBytes(16).toString('hex');
req.session.csrfToken = token;

// 2. Client sends token in form
<form action="/transfer" method="post">
  <input type="hidden" name="csrfToken" value="${token}">
  <input type="number" name="amount" value="1000">
  <input type="text" name="to" value="attacker">
</form>

// 3. Server validates token
app.post('/transfer', (req, res) => {
  const { csrfToken } = req.body;
  if (req.session.csrfToken !== csrfToken) {
    return res.status(403).send('Invalid CSRF token');
  }
  // Process transfer
});
```

#### Key Takeaway
CSRF attacks exploit **session trust**, not direct code execution. Anti-CSRF tokens are the gold standard for protection—they add a single layer of validation that’s easy to implement and effective.

---

## Summary

XSS and CSRF are foundational security threats that every JavaScript developer must master. XSS exploits **unescaped user input** to inject malicious scripts, while CSRF exploits **session trust** to trick authenticated users into executing unauthorized actions. By escaping user input, implementing content security policies, and using anti-CSRF tokens, you can harden your applications against these risks. Remember: **security starts with the smallest detail**—and a single escaped string can prevent catastrophic breaches. 🔒