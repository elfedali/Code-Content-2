const fs   = require("fs");
const path = require("path");
const { slugify } = require("./slugify");

// All generated books land in <project-root>/books/<bookId>/
const booksDir = path.join(__dirname, "../../books");

/**
 * Writes a single section's Markdown content to disk.
 *
 * Resulting path:
 *   books/<bookId>/<01-chapter-slug>/<01-section-slug>.md
 *
 * @returns {string} absolute path of the written file
 */
function saveSection(bookId, chapterIndex, chapterTitle, sectionIndex, sectionTitle, content) {
  const chapterFolder = `${String(chapterIndex).padStart(2, "0")}-${slugify(chapterTitle)}`;
  const fileName      = `${String(sectionIndex).padStart(2, "0")}-${slugify(sectionTitle)}.md`;

  const bookDir    = path.join(booksDir, bookId);
  const chapterDir = path.join(bookDir, chapterFolder);

  fs.mkdirSync(chapterDir, { recursive: true });

  const filePath = path.join(chapterDir, fileName);
  fs.writeFileSync(filePath, content, "utf-8");

  return filePath;
}

module.exports = { saveSection, booksDir };
