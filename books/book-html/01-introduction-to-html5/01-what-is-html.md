## What is HTML?

HTML stands for **Hypertext Markup Language**—a foundational technology that structures and delivers content across the web. At its core, HTML is the **universal language** browsers use to interpret and render web pages. Think of it as the "blueprint" that tells your browser: *how to display text, images, links, and interactive elements* on a screen. Without HTML, the web as we know it wouldn’t exist.

### Why HTML Matters Today

HTML isn’t just a historical artifact—it’s the **active backbone** of every website you visit, app you use, or service you interact with online. When you open a news site, shop for products, or watch a video, HTML is silently working behind the scenes to transform raw code into the visual experience you see. Its simplicity and flexibility make it the perfect bridge between human-readable content and machine-executable instructions.

### The Evolution: From HTML 1 to HTML5

HTML has evolved through five major versions since its creation in 1990. Here’s how it progressed:

1. **HTML 1.0 (1991)**: Basic text formatting and links.
2. **HTML 2.0 (1995)**: Added tables and images.
3. **HTML 3.2 (1997)**: Improved accessibility and form controls.
4. **HTML 4.01 (1999)**: Focused on strict standards and cross-browser compatibility.
5. **HTML5 (2014)**: The modern standard that reimagined HTML for today’s web.

The shift to HTML5 wasn’t incremental—it was a **paradigm shift**. While HTML4 prioritized *how* to structure content, HTML5 emphasizes *what* the content means through semantic tags, native multimedia support, and enhanced interactivity.

### HTML5: The Modern Standard

HTML5 is the **current version** of the HTML language (as of 2023). It’s not just an update—it’s a complete rethinking of the web’s foundation. Here’s what makes HTML5 revolutionary:

- **Semantic Structure**: Tags like `<header>`, `<nav>`, `<section>`, and `<footer>` clearly define page sections (e.g., navigation, content blocks), improving accessibility and SEO.
- **Native Multimedia**: `<video>` and `<audio>` tags eliminate plugins like Flash, letting browsers handle video/audio directly.
- **Enhanced Forms**: New input types (`email`, `date`, `range`) simplify user validation and data collection.
- **Canvas and WebGL**: Enable dynamic graphics and animations without third-party libraries.
- **Geolocation API**: Lets web apps access user location for location-based services.

These features solve real-world problems: *faster loading*, *better accessibility*, and *richer user experiences*—all without complex frameworks.

### A Real-World Example: Building a Simple Page

Let’s create a minimal HTML5 page to see how it works in action:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First HTML5 Page</title>
  </head>
  <body>
    <header>
      <h1>Welcome to HTML5!</h1>
    </header>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </nav>
    <section>
      <p>This is a semantic HTML5 page with native video support.</p>
      <video controls src="https://example.com/video.mp4" width="320"></video>
    </section>
  </body>
</html>
```

**Why this works**:
- `<!DOCTYPE html>` declares this is an HTML5 document.
- `<meta charset="UTF-8">` ensures proper character encoding.
- `<header>` and `<nav>` use semantic tags for clear structure.
- `<video>` plays natively without plugins.

### Key Differences: HTML4 vs. HTML5

| Feature                | HTML4.01                     | HTML5                          |
|------------------------|------------------------------|---------------------------------|
| **Doctype**            | `<!DOCTYPE HTML 4.01>`       | `<!DOCTYPE html>`              |
| **Semantic Tags**      | None                         | `<header>`, `<section>`, etc.  |
| **Video/Audio**        | Requires Flash/Silverlight   | Native `<video>` and `<audio>` |
| **Form Inputs**        | Basic types (text, password) | Advanced types (date, email)   |
| **Canvas**             | Not supported                | Built-in `<canvas>` element    |
| **Geolocation**        | Not supported                | Native API                     |

This comparison shows HTML5’s focus on **simplicity**, **accessibility**, and **native browser capabilities**—removing the need for external plugins and complex libraries.

### Why "HTML5" and Not "HTML 5.0"?

A common question: *Why is it called HTML5 instead of HTML 5.0?* The answer lies in HTML’s naming history. Since the early 1990s, HTML versions have been named with a single number (e.g., HTML 1, HTML 2). The "5" in HTML5 indicates it’s the **fifth major revision** of the language—not a decimal version. This convention avoids confusion and aligns with how the W3C (World Wide Web Consortium) has standardized HTML.

### Summary

HTML is the **universal language of the web**, and HTML5 is its most powerful modern iteration. It’s not just about *displaying* content—it’s about *structuring* it meaningfully, *enabling* rich media natively, and *simplifying* development through semantic tags and robust APIs. By understanding what HTML is, you gain the foundation to build anything from simple static pages to dynamic web applications. The web is what HTML makes possible—and HTML5 is the standard that keeps it alive and evolving. 🌐