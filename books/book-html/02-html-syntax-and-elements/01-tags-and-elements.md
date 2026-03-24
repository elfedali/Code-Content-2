## Tags and Elements

### Opening and Closing Tags

In HTML5, every element is defined by a pair of **tags**: an opening tag that starts the element and a closing tag that ends it. The opening tag begins with a less-than sign (`<`), followed by the element name, and ends with a greater-than sign (`>`). The closing tag starts with a forward slash (`/`), the element name, and ends with a greater-than sign (`>`).

This structure creates clear boundaries for content and enables browsers to parse documents accurately. For example, a paragraph element uses `<p>` as its opening tag and `</p>` as its closing tag:

```html
<p>This is a paragraph of text.</p>
```

The key insight is that **opening tags initiate elements** while **closing tags terminate them**. This pairing is mandatory for most elements (like `<div>`, `<span>`, `<section>`) to ensure proper document structure. When you place content between these tags, it becomes part of that element's scope.

> 💡 **Pro Tip**: Always use consistent capitalization for element names (e.g., `<p>` not `<P>`) to follow HTML5 conventions and avoid parsing errors.

### Self-closing Tags

Some elements in HTML5 are **void elements**—they don’t contain child elements and don’t require a closing tag. These elements are *self-closing* because they define their own end point. In HTML5, void elements are written without a closing tag (unlike XML, where self-closing tags use `/>`).

The most common void elements include:
- `<br>` (line break)
- `<img>` (image)
- `<hr>` (horizontal rule)

Here’s how they work in practice:

```html
<p>Line 1<br>Line 2<br>Line 3</p>
```

This creates three lines of text with line breaks. Notice how `<br>` doesn’t have a closing tag (`</br>`), and the browser automatically handles the end of the element.

> ⚠️ **Critical distinction**: Void elements **do not** use `/>` in HTML5. While some older HTML parsers accepted `</br>`, modern browsers strictly follow the HTML5 specification and require the *simplified* form (`<br>`). Always use the standard syntax to avoid rendering issues.

### Nesting Elements

HTML elements can be nested within each other to create hierarchical content structures. This nesting defines relationships between elements—where one element becomes a child of another. Proper nesting ensures content is rendered in the intended order and scope.

For example, a paragraph can contain a bold text element:

```html
<p>This is a <strong>bold phrase</strong> inside a paragraph.</p>
```

Here, `<strong>` is nested within `<p>`. The browser renders "bold phrase" in bold while keeping the entire sentence as a paragraph.

Nesting enables complex document structures like:
1. A `div` containing multiple paragraphs
2. A `section` with headings and lists
3. A `table` with rows and cells

**Why nesting matters**:  
- It groups related content (e.g., a heading and its paragraph)  
- It defines semantic relationships (e.g., a button inside a form)  
- It prevents rendering errors (e.g., closing tags in the correct order)

> 🌳 **Real-world example**:  
> Consider a blog post structure:  
> ```html
> <article>
>   <h1>Introduction</h1>
>   <p>First paragraph...</p>
>   <ul>
>     <li>Point 1</li>
>     <li>Point 2</li>
>   </ul>
> </article>
> ```  
> Here, `<h1>`, `<p>`, and `<ul>` are all nested within `<article>`, creating a clear content hierarchy.

## Summary

You now understand the core mechanics of HTML5 tags and elements: opening/closing tags define element boundaries, self-closing tags handle void elements efficiently, and nesting creates hierarchical content structures. These concepts form the foundation for building well-structured, semantic web pages. With practice, you’ll master these patterns to create clean, maintainable HTML that works seamlessly across modern browsers. 🌟