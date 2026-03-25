#!/usr/bin/env node
/**
 * export-pdf.js
 * Converts a generated book folder → PDF (or HTML fallback) using pandoc.
 *
 * Usage:
 *   node scripts/export-pdf.js [book-folder]
 *   npm run export:pdf book-css
 *   npm run export:pdf          ← interactive picker
 */

const { execSync, spawnSync } = require("child_process");
const fs   = require("fs");
const path = require("path");

// ── Config ─────────────────────────────────────────────────────────────────
const BOOKS_DIR       = path.join(__dirname, "..", "books");
const OUTPUT_DIR      = path.join(__dirname, "..", "pdfs");
const HTML_TEMPLATE   = path.join(__dirname, "template.html");
const LATEX_PREAMBLE  = path.join(__dirname, "latex-preamble.tex");

// Preferred PDF engines — tectonic first (lightweight, no full TeX install needed)
const PDF_ENGINES = ["tectonic", "xelatex", "lualatex", "pdflatex", "wkhtmltopdf", "weasyprint", "pagedjs-cli"];

// ── Helpers ────────────────────────────────────────────────────────────────
function which(cmd) {
  const r = spawnSync("which", [cmd], { encoding: "utf8" });
  return r.status === 0 ? r.stdout.trim() : null;
}

function detectPdfEngine() {
  for (const eng of PDF_ENGINES) {
    if (which(eng)) return eng;
  }
  return null;
}

function listBooks() {
  return fs.readdirSync(BOOKS_DIR).filter(f => {
    return fs.statSync(path.join(BOOKS_DIR, f)).isDirectory();
  });
}

function collectMarkdownFiles(bookDir) {
  const files = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir).sort();
    for (const entry of entries) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (entry.endsWith(".md")) {
        files.push(full);
      }
    }
  }
  walk(bookDir);
  return files;
}

function slugify(str) {
  return str.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}

// Friendly display names for known short IDs
const DISPLAY_NAMES = {
  js:     "JavaScript",
  css:    "CSS",
  html:   "HTML5",
  php:    "PHP",
  sql:    "SQL",
  nodejs: "Node.js",
  linux:  "Linux",
  python: "Python",
};

function bookTitle(bookId) {
  // Convert folder name to a readable title
  return bookId
    .replace(/^book-/, "")
    .split(/[-_]/)
    .map(w => DISPLAY_NAMES[w.toLowerCase()] ?? (w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

// ── Interactive book picker (no fzf needed) ────────────────────────────────
function pickBook(books, arg) {
  if (arg) {
    const match = books.find(b => b === arg || b === `book-${arg}`);
    if (!match) {
      console.error(`\n❌  Book not found: "${arg}"`);
      console.error(`\nAvailable books:\n${books.map(b => "  • " + b).join("\n")}`);
      process.exit(1);
    }
    return match;
  }

  // No arg → list and let user pick
  console.log("\n📚  Available books:\n");
  books.forEach((b, i) => console.log(`  [${i + 1}]  ${b}`));
  console.log();

  // If not interactive (piped), error out
  if (!process.stdin.isTTY) {
    console.error("Provide a book name as argument, e.g.: npm run export:pdf book-css");
    process.exit(1);
  }

  const readline = require("readline");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  return new Promise(resolve => {
    rl.question("  Enter number or folder name: ", answer => {
      rl.close();
      const idx = parseInt(answer, 10);
      if (!isNaN(idx) && books[idx - 1]) return resolve(books[idx - 1]);
      const match = books.find(b => b === answer || b === `book-${answer}`);
      if (!match) {
        console.error("Invalid selection.");
        process.exit(1);
      }
      resolve(match);
    });
  });
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const arg      = process.argv[2];
  const books    = listBooks();

  if (!books.length) {
    console.error("No book folders found in books/");
    process.exit(1);
  }

  const bookId   = await pickBook(books, arg);
  const bookDir  = path.join(BOOKS_DIR, bookId);
  const mdFiles  = collectMarkdownFiles(bookDir);

  if (!mdFiles.length) {
    console.error(`❌  No .md files found in books/${bookId}`);
    process.exit(1);
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const engine   = detectPdfEngine();
  const title    = bookTitle(bookId);
  const outSlug  = slugify(bookId);
  const mode     = engine ? "pdf" : "html";
  const outFile  = path.join(OUTPUT_DIR, `${outSlug}.${mode}`);

  console.log(`\n📖  Book    : ${title} (${bookId})`);
  console.log(`📄  Sections: ${mdFiles.length} markdown files`);
  console.log(`🔧  Engine  : ${engine || "none — falling back to HTML"}`);
  console.log(`💾  Output  : pdfs/${path.basename(outFile)}`);
  console.log();

  // ── Build pandoc command ─────────────────────────────────────────────────
  const args = [
    // Input files (sorted)
    ...mdFiles,

    // Metadata
    "--metadata", `title=${title}`,
    "--metadata", "author=Code-Content Generator",
    "--metadata", `date=${new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })}`,

    // General options
    "--standalone",
    "--toc",
    "--toc-depth=2",
    "--syntax-highlighting=tango",
    "--number-sections",

    // Output
    "-o", outFile,
  ];

  if (mode === "pdf") {
    args.push("--pdf-engine", engine);
    // LaTeX/tectonic options
    if (["tectonic", "pdflatex", "xelatex", "lualatex"].includes(engine)) {
      args.push("-V", "papersize=a4");
      args.push("-V", "fontsize=11pt");
      args.push("-V", "documentclass=article");
      args.push("-V", "links-as-notes=false");
      // Custom preamble for professional styling
      if (fs.existsSync(LATEX_PREAMBLE)) {
        args.push("-H", LATEX_PREAMBLE);
      }
    }
  } else {
    // HTML fallback: self-contained so it's a single portable file
    args.push("--to", "html5");
    args.push("--embed-resources");
    // Use the Bootstrap template
    if (fs.existsSync(HTML_TEMPLATE)) {
      args.push("--template", HTML_TEMPLATE);
    }
  }

  // ── Run pandoc ────────────────────────────────────────────────────────────
  console.log("⏳  Running pandoc…");
  try {
    execSync(`pandoc ${args.map(a => JSON.stringify(a)).join(" ")}`, {
      stdio: "inherit",
    });
  } catch (e) {
    console.error("\n❌  pandoc failed:", e.message);
    process.exit(1);
  }

  const bytes = fs.statSync(outFile).size;
  const kb    = (bytes / 1024).toFixed(1);

  console.log(`\n✅  Done! → pdfs/${path.basename(outFile)}  (${kb} KB)`);

  if (mode === "html") {
    console.log("\n💡  No PDF engine detected. The output is a self-contained HTML file.");
    console.log("    Open it in your browser — it uses Bootstrap 5 for a professional look.");
    console.log("    Use  File → Print → Save as PDF  to export a PDF from there.");
    console.log("\n    To enable direct PDF export, install one of:");
    console.log("      brew install tectonic               # lightweight TeX (recommended)");
    console.log("      brew install --cask mactex-no-gui   # full LaTeX suite");
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
