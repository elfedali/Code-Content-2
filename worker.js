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
const { spawn, spawnSync } = require("child_process");
const { generateBook, generateAll, loadOutline, loadAllOutlines } = require("./src/controllers/generationController");

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

// ── Git auto-push ────────────────────────────────────────────────────────────
function gitCommitPush(bookId, title, result) {
  // Only commit if something was actually written
  if (result.created === 0) {
    console.log(`\n⏭️  Git: nothing new to commit for ${bookId}\n`);
    return;
  }

  const run = (cmd, args, opts = {}) =>
    spawnSync(cmd, args, { encoding: "utf8", cwd: __dirname, ...opts });

  console.log(`\n📦 Git: committing ${bookId}…`);

  // Stage the book folder
  const add = run("git", ["add", `books/${bookId}/`]);
  if (add.status !== 0) {
    console.error(`   ❌ git add failed:\n${add.stderr}`);
    return;
  }

  const msg =
    `📚 ${title}: generation complete` +
    ` — ${result.created} created, ${result.skipped} skipped, ${result.failed} failed`;

  const commit = run("git", ["commit", "-m", msg]);
  if (commit.status !== 0) {
    // "nothing to commit" is exit 1 but not a real error
    if (commit.stdout.includes("nothing to commit")) {
      console.log(`   ⏭️  Nothing new to commit.`);
    } else {
      console.error(`   ❌ git commit failed:\n${commit.stderr || commit.stdout}`);
    }
    return;
  }
  console.log(`   ✅ Committed: ${msg}`);

  const push = run("git", ["push"]);
  if (push.status !== 0) {
    console.error(`   ❌ git push failed:\n${push.stderr}`);
  } else {
    console.log(`   🚀 Pushed to remote.\n`);
  }
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
    gitCommitPush(targetBook, outline.title, result);
  } else {
    // All books mode — iterate manually so we can git-push after each book
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

    for (const { bookId, outline } of queue) {
      console.log(`\n📚 Book: ${outline.title} (${bookId})`);
      const result = await generateBook(bookId, outline, { onProgress });
      console.log(
        `   ✅ ${result.created} created  ⏭️  ${result.skipped} skipped  ❌ ${result.failed} failed`
      );
      gitCommitPush(bookId, outline.title, result);
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎉 All books generation complete!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  }
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err.message);
  process.exit(1);
});
