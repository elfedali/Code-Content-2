require("dotenv").config();
const fs   = require("fs");
const path = require("path");

const { generateContent }           = require("../services/ollamaService");
const { saveSection }               = require("../utils/fileUtils");
const { saveProgress, isCompleted } = require("./progressController");

const DELAY_MS   = parseInt(process.env.GENERATION_DELAY_MS || "3000", 10);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const outlinesDir = path.join(__dirname, "../../outlines");

// ─── Outline helpers ────────────────────────────────────────────────────────

/**
 * Loads all book outlines from the /outlines directory.
 * @returns {{ bookId: string, outline: object }[]}
 */
function loadAllOutlines() {
  const files = fs
    .readdirSync(outlinesDir)
    .filter((f) => f.startsWith("book") && f.endsWith(".json"))
    .sort();

  return files.map((file) => {
    const bookId  = path.basename(file, ".json");
    const outline = JSON.parse(fs.readFileSync(path.join(outlinesDir, file), "utf-8"));
    return { bookId, outline };
  });
}

/** Returns one outline by bookId, or null if not found */
function loadOutline(bookId) {
  const filePath = path.join(outlinesDir, `${bookId}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

/** Counts total sections across all chapters of an outline */
function countSections(outline) {
  return outline.chapters.reduce((sum, ch) => sum + ch.sections.length, 0);
}

// ─── Generation ─────────────────────────────────────────────────────────────

/**
 * Generates all pending sections for a single book outline.
 *
 * @param {string}   bookId   - The book identifier (outline filename without .json)
 * @param {object}   outline  - The parsed outline object
 * @param {object}   opts
 * @param {Function} [opts.onProgress] - Callback fired after each section
 * @returns {Promise<{ created: number, skipped: number, failed: number, total: number }>}
 */
async function generateBook(bookId, outline, { onProgress } = {}) {
  const total = countSections(outline);
  let sectionIndex = 0;
  let created = 0, skipped = 0, failed = 0;

  for (let ci = 0; ci < outline.chapters.length; ci++) {
    const chapter = outline.chapters[ci];

    for (let si = 0; si < chapter.sections.length; si++) {
      sectionIndex++;
      const section = chapter.sections[si];
      const key     = `${chapter.title} > ${section.title}`;

      // ── Skip already-done sections ──────────────────────────────────────
      if (isCompleted(bookId, key)) {
        skipped++;
        onProgress?.({
          bookId, sectionIndex, total,
          status: "skipped",
          chapter: chapter.title,
          section: section.title,
        });
        continue;
      }

      // ── Generate ────────────────────────────────────────────────────────
      try {
        const content = await generateContent(
          outline.title,
          chapter.title,
          section.title,
          section.subtopics || []
        );

        const filePath = saveSection(
          bookId,
          ci + 1, chapter.title,
          si + 1, section.title,
          content
        );

        saveProgress(bookId, key);
        created++;

        onProgress?.({
          bookId, sectionIndex, total,
          status: "done",
          chapter: chapter.title,
          section: section.title,
          filePath,
        });

        // Breathing room between requests
        await delay(DELAY_MS);
      } catch (err) {
        failed++;
        onProgress?.({
          bookId, sectionIndex, total,
          status: "error",
          chapter: chapter.title,
          section: section.title,
          error: err.message,
        });
      }
    }
  }

  return { created, skipped, failed, total };
}

/**
 * Iterates over all outlines and generates every pending section.
 *
 * @param {object}   opts
 * @param {Function} [opts.onProgress] - Same callback as generateBook
 */
async function generateAll({ onProgress } = {}) {
  const books = loadAllOutlines();

  for (const { bookId, outline } of books) {
    console.log(`\n📚 Book: ${outline.title} (${bookId})`);
    const result = await generateBook(bookId, outline, { onProgress });
    console.log(
      `   ✅ ${result.created} created  ⏭️  ${result.skipped} skipped  ❌ ${result.failed} failed`
    );
  }
}

module.exports = { loadAllOutlines, loadOutline, generateBook, generateAll, countSections };
