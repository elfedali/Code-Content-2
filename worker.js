/**
 * worker.js — Book generation worker
 *
 * Processes all outlines in /outlines and generates Markdown documentation
 * for every pending section using Ollama running on this machine.
 *
 * Usage:
 *   node worker.js --all             → generate everything (foreground)
 *   node worker.js --all --detach    → generate everything (background, detached)
 *   node worker.js book-js           → generate one book (foreground)
 *   node worker.js book-js --detach  → generate one book (background, detached)
 *
 * When running detached:
 *   - The terminal can be closed immediately.
 *   - All output is written to logs/worker.log
 *   - Check progress at http://localhost:4040
 *
 * Progress is saved after every section — run again any time to resume.
 */

require("dotenv").config();
const fs   = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { generateBook, generateAll, loadOutline } = require("./src/controllers/generationController");

const logsDir  = path.join(__dirname, "logs");
const logFile  = path.join(logsDir, "worker.log");

// ── Detach helper ─────────────────────────────────────────────────────────────
// Re-spawns this same script without --detach, fully detached from the terminal.
function spawnDetached() {
  fs.mkdirSync(logsDir, { recursive: true });
  const log = fs.openSync(logFile, "a");

  // Pass all original args except --detach
  const args = process.argv.slice(2).filter((a) => a !== "--detach" && a !== "-d");

  const child = spawn(process.execPath, [__filename, ...args], {
    detached: true,
    stdio:    ["ignore", log, log],
    env:      process.env,
  });

  child.unref();

  console.log(`\n🚀 Worker started in background  (PID: ${child.pid})`);
  console.log(`📄 Log file : ${logFile}`);
  console.log(`🌐 Dashboard: http://localhost:${process.env.PORT || 4040}`);
  console.log(`\n   You can safely close this terminal.\n`);
  process.exit(0);
}

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
  const args       = process.argv.slice(2);
  const detach     = args.includes("--detach") || args.includes("-d");
  const cleanArgs  = args.filter((a) => a !== "--detach" && a !== "-d");
  const arg        = cleanArgs[0];
  const targetBook = arg && arg !== "--all" ? arg : null;

  // Re-launch detached before doing any real work
  if (detach) spawnDetached();

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
