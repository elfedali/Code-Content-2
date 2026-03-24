## Table Structure

In the world of HTML5, tables are a fundamental way to structure data in a clean and readable manner. They are not just for displaying tabular data but also for creating complex layouts. In this section, we'll dive into the core structure of HTML tables by exploring the essential elements: the `<table>`, `<tr>`, `<td>`, and `<th>`.

### The `<table>` Element

The `<table>` element is the container for all table content. It defines the table itself and its relationship to the rest of the document. Think of it as the "root" of the table structure.

Here's a basic example:

```html
<table>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Data 1</td>
    <td>Data 2</td>
  </tr>
</table>
```

The `<table>` element has several attributes that can be used to control its appearance and behavior, such as:
- `border`: Adds a border around the table (default: 0)
- `cellpadding`: Space inside the table cells (default: 1)
- `cellspacing`: Space between table cells (default: 0)

However, for the most part, we'll focus on the structure without styling, as CSS handles the presentation.

**Important**: The `<table>` element must be the direct parent of table rows (`<tr>`) and table cells (`<td>`, `<th>`). It is also important to note that the table structure is hierarchical and must be properly nested.

### The `<tr>` Element

The `<tr>` element stands for "table row". It is used to define a row of cells within a table. Each row must contain at least one cell (`<td>` or `<th>`), and multiple rows make up the entire table.

Example of a row with two cells:

```html
<tr>
  <td>Row 1, Cell 1</td>
  <td>Row 1, Cell 2</td>
</tr>
```

**Note**: The `<tr>` element is typically placed inside the `<table>` element. It is also important that table rows are in order and that there are no missing cells in a row (though HTML allows for optional cells, we'll cover that in subsequent sections).

### The `<td>` Element

The `<td>` element stands for "table data". It is used to define a standard cell in a table that contains regular data. These are the cells that hold the actual content of the table (like data points).

Example of a data cell:

```html
<td>This is a regular data cell</td>
```

**Key point**: `<td>` elements are used for data that is not a header. They are the most common type of cell in a table.

### The `<th>` Element

The `<th>` element stands for "table header". It is used to define a header cell in a table. Header cells are typically used for column titles and are styled differently (e.g., with bold text and background color) by CSS.

Example of a header cell:

```html
<th>This is a header cell</th>
```

**Important**: In a table, header cells (`<th>`) are often used to group related data. They can also be used to create headers for rows of cells. For example, in a table with multiple columns, you might have a header row that spans multiple columns.

**Pro tip**: You can also use the `scope` attribute on `<th>` to define the scope of the header (e.g., `scope="col"` for a column header or `scope="row"` for a row header). This helps assistive technologies and CSS understand the relationship between headers and data.

Let's look at a more complex example that uses both `<td>` and `<th>`:

```html
<table>
  <tr>
    <th scope="col">Name</th>
    <th scope="col">Age</th>
  </tr>
  <tr>
    <td>John Doe</td>
    <td>25</td>
  </tr>
</table>
```

This table has a header row with two columns and one data row with two cells.

### Putting It All Together

Now that we've covered the building blocks, let's see how they work together in a full table:

```html
<table>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Row 1, Cell 1</td>
    <td>Row 1, Cell 2</td>
  </tr>
  <tr>
    <td>Row 2, Cell 1</td>
    <td>Row 2, Cell 2</td>
  </tr>
</table>
```

This table has two header cells and two data rows, each with two data cells.

## Summary

In this section, we've explored the core structure of HTML tables. The `<table>` element acts as the container for the entire table. Within it, `<tr>` elements define rows, and each row is composed of either `<td>` (data cells) or `<th>` (header cells). Understanding these elements is the first step to creating well-structured and accessible tables.

Remember: A table must have at least one row and one cell. The structure is hierarchical and must be properly nested. 📊