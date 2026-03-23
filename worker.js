/**
 * worker.js — Book generation worker
 *
 * Processes all outlines in /outlines and generates Markdown documentation
 * for every pending section using Ollama running on this machine.
 *
 * Usage:
 *   node worker.js --all          → generate everything (all outlines)
 *   node worker.js book-js        → generate only the book-js outline
 *
 * Progress is saved after every section, so you can Ctrl+C at any time
 * and resume by running the same command again.
 */

require("dotenv").config();
const { generateBook, generateAll, loadOutline } = require("./src/controllers/generationController");

// ── Progress callback ────────────────────────────────────────────────────────
function onProgress({ bookId, sectionIndex, total, status, chapter, section, error }) {
  const icons = { done: "✅", skipped: "⏭️ ", error: "❌" };
  const icon  = icons[status] || "?";
  const pct   = Math.round((sectionIndex / total) * 100);
  const bar   = `[${String(pct).padStart(3)}%] ${sectionIndex}/${total}`;
  const info  = error ? ` — ${error}` : "";
  console.log(`${icon}  ${bar}  [${bookId}]  ${section}${info}`);
}

// ── Graceful shutdown ─────────────────────────────────────────────────────────
process.on("SIGINT", () => {
  console.log("\n\n⚠️  Interrupted! Progress is saved — run again to resume.\n");
  process.exit(0);
});

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const arg        = process.argv[2];
  const targetBook = arg && arg !== "--all" ? arg : null;

  if (targetBook) {
    // Single book mode
    const outline = loadOutline(targetBook);
    if (!outline) {
      console.error(`❌ No outline found for "${targetBook}" in /outlines`);
      console.error(`   Available outlines: check the /outlines directory.`);
      process.exit(1);
    }
    console.log(`\n📚 Generating: ${outline.title} (${targetBook})\n`);
    const result = await generateBook(targetBook, outline, { onProgress });
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`🎉 Done!`);
    console.log(`   ✅ Created : ${result.created}`);
    console.log(`   ⏭️  Skipped : ${result.skipped}`);
    console.log(`   ❌ Failed  : ${result.failed}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  } else {
    // All books mode — auto-discover every outlines/book*.json
    const { loadAllOutlines } = require("./src/controllers/generationController");
    const queue = loadAllOutlines();

    if (queue.length === 0) {
      console.error("❌ No book*.json files found in /outlines");
      process.exit(1);
    }

    console.log("\n📋 Queue — books to generate:");
    queue.forEach(({ bookId, outline }, i) => {
      console.log(`   ${i + 1}. ${bookId}  (${outline.title})`);
    });
    console.log("");

    await generateAll({ onProgress });
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎉 All books generation complete!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  }
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err.message);
  process.exit(1);
});
