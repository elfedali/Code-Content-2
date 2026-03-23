const express  = require("express");
const router   = express.Router();

const { loadAllOutlines, countSections } = require("../controllers/generationController");
const { loadProgress }                   = require("../controllers/progressController");

/**
 * GET /api/status
 * Returns all books with chapter/section-level completion status.
 */
router.get("/status", (req, res) => {
  try {
    const books    = loadAllOutlines();
    const progress = loadProgress();

    const payload = books.map(({ bookId, outline }) => {
      const total        = countSections(outline);
      const completedArr = progress[bookId]?.completed ?? [];
      const completedSet = new Set(completedArr);

      const chapters = outline.chapters.map((ch) => ({
        title:    ch.title,
        sections: ch.sections.map((sec) => ({
          title: sec.title,
          done:  completedSet.has(`${ch.title} > ${sec.title}`),
        })),
      }));

      return {
        bookId,
        title:     outline.title,
        total,
        completed: completedArr.length,
        percent:   total > 0 ? Math.round((completedArr.length / total) * 100) : 0,
        chapters,
      };
    });

    res.json({ books: payload, updatedAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
