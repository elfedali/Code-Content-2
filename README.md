# 📚 Book Generator

Automatically generates structured Markdown documentation for every section in your book outlines using **Ollama** running locally on your machine.

---

## How it works

1. You have **outlines** in `/outlines/*.json` — each file is one book with chapters and sections.
2. The **worker** reads every outline, calls Ollama for each section, and saves the result as a clean Markdown file under `/books/<bookId>/`.
3. The **dashboard server** runs on port `4040` — open it in any browser on your network to see live progress for every book, chapter, and section.
4. **Progress is saved after every section.** If you stop mid-way, just run the worker again — it will skip everything already done and resume from where it left off.

---

## Project structure

```
├── outlines/              Book outlines (one .json per book)
├── books/                 Generated Markdown output
│   └── book-js/
│       └── 01-intro/
│           └── 01-what-is-js.md
├── progress.json          Tracks what has been completed per book
├── server.js              Web dashboard  (http://<ip>:4040)
├── worker.js              Generation runner
└── src/
    ├── controllers/
    │   ├── generationController.js   Loads outlines, drives generation loop
    │   └── progressController.js    Reads / writes progress.json
    ├── services/
    │   └── ollamaService.js          Builds the prompt and calls Ollama
    ├── routes/
    │   ├── apiRoutes.js              GET /api/status  (JSON)
    │   └── dashboardRoutes.js        Serves the HTML dashboard
    └── views/
        └── dashboard.html            Dark-themed live dashboard UI
```

---

## Setup

Copy `.env.example` to `.env` and adjust to your machine:

```bash
cp .env.example .env
```

Key settings in `.env`:

| Variable | Description | Default |
|---|---|---|
| `OLLAMA_HOST` | URL where Ollama is running | `http://localhost:11434` |
| `OLLAMA_MODEL` | Model to use for generation | `qwen3:4b` |
| `GENERATION_DELAY_MS` | Pause between requests (ms) | `3000` |
| `PORT` | Dashboard web server port | `4040` |

---

## Running on ThinkCenter

Open **two terminals**:

### Terminal 1 — Dashboard
```bash
npm start
# or
node server.js
```
Then open `http://<thinkcenter-ip>:4040` in any browser on your network.

### Terminal 2 — Generator
```bash
# Generate all books (all outlines)
node worker.js --all

# Generate one specific book only
node worker.js book-js
node worker.js book.python
```

You can stop the worker at any time with `Ctrl+C` — progress is saved and it will resume exactly where it left off next time.

---

## Adding a new book

1. Drop a new `.json` file into `/outlines/` following the same format:

```json
{
  "title": "My Book Title",
  "chapters": [
    {
      "title": "Chapter Name",
      "sections": [
        { "title": "Section Name" },
        {
          "title": "Section with subtopics",
          "subtopics": ["Topic A", "Topic B"]
        }
      ]
    }
  ]
}
```

2. Run `node worker.js` — it will pick up the new outline automatically.

---

## Output format

Each section is saved as:

```
books/<bookId>/<chapterIndex-chapter-slug>/<sectionIndex-section-slug>.md
```

Example:
```
books/book-js/01-introduction-to-javascript/01-what-is-javascript.md
```

Each file contains a full Markdown article with headings, code examples, bullet lists, and a summary — ready to publish or compile into a book.
