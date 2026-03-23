/**
 * Converts any string into a URL/filesystem-safe slug.
 * e.g. "Hello World!" → "hello-world"
 */
function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

module.exports = { slugify };
