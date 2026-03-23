const fs   = require("fs");
const path = require("path");

const progressPath = path.join(__dirname, "../../progress.json");

/**
 * Loads the full progress file.
 *
 * New format:  { "<bookId>": { "completed": ["Chapter > Section", ...] } }
 *
 * Backward-compat: if the file has the old flat format { "completed": [...] }
 * it is automatically migrated under the key "book.python".
 */
function loadProgress() {
  if (!fs.existsSync(progressPath)) return {};

  const raw = JSON.parse(fs.readFileSync(progressPath, "utf-8"));

  // Migrate old flat format → new per-book format
  if (Array.isArray(raw.completed)) {
    const migrated = { "book.python": { completed: raw.completed } };
    fs.writeFileSync(progressPath, JSON.stringify(migrated, null, 2));
    return migrated;
  }

  return raw;
}

/** Persist the full progress object */
function _save(data) {
  fs.writeFileSync(progressPath, JSON.stringify(data, null, 2));
}

/** Mark one section key as completed for a given book */
function saveProgress(bookId, key) {
  const progress = loadProgress();
  if (!progress[bookId]) progress[bookId] = { completed: [] };
  if (!progress[bookId].completed.includes(key)) {
    progress[bookId].completed.push(key);
  }
  _save(progress);
}

/** Check whether a section is already done */
function isCompleted(bookId, key) {
  const progress = loadProgress();
  return progress[bookId]?.completed?.includes(key) ?? false;
}

/** How many sections have been completed for a book */
function getCompletedKeys(bookId) {
  const progress = loadProgress();
  return progress[bookId]?.completed ?? [];
}

/** Wipe progress for one book (start fresh) */
function resetProgress(bookId) {
  const progress = loadProgress();
  progress[bookId] = { completed: [] };
  _save(progress);
}

module.exports = { loadProgress, saveProgress, isCompleted, getCompletedKeys, resetProgress };
