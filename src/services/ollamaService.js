require("dotenv").config();
const axios = require("axios");

/**
 * Resolves the Ollama base URL from OLLAMA_HOST env var.
 * Defaults to http://localhost:11434
 */
function resolveOllamaHost() {
  const host = (process.env.OLLAMA_HOST || "http://localhost:11434").trim();
  const withProtocol = /^https?:\/\//i.test(host) ? host : `http://${host}`;
  return withProtocol.replace(/\/+$/, "");
}

/**
 * Generates a full, structured Markdown article for one book section using Ollama.
 *
 * @param {string}   bookTitle  - Full title of the book
 * @param {string}   chapter    - Chapter name
 * @param {string}   section    - Section name
 * @param {string[]} subtopics  - Optional list of subtopics to cover
 * @returns {Promise<string>}   - Markdown content
 */
async function generateContent(bookTitle, chapter, section, subtopics = []) {
  const subtopicsBlock =
    subtopics.length > 0
      ? `Cover these specific subtopics in order: ${subtopics.join(", ")}.`
      : "";

  const prompt = `You are a professional technical author writing a comprehensive book called "${bookTitle}".

Write a detailed, well-structured documentation article for the following:

Chapter : ${chapter}
Section : ${section}
${subtopicsBlock}

═══════════════════════════════════════════════
STRICT OUTPUT RULES — follow all without exception:
═══════════════════════════════════════════════
- Output ONLY the article content in clean Markdown format.
- Start directly with the content — no preamble, no "Here is your article" intro.
- Use Markdown headings: ## for main sections, ### for sub-sections, #### if needed.
- Wrap every code example in a properly labeled fenced code block (e.g. \`\`\`javascript).
- Use **bold** and *italic* for emphasis where appropriate.
- Use bullet lists (-) and numbered lists (1.) where appropriate.
- Tables are welcome for comparisons or reference data.
- Tone: clear, friendly, professional — make technical content approachable and enjoyable.
- Use concrete, runnable examples to demonstrate every concept.
- Emoji policy: you may use up to 2 emojis per article for warmth. Never inside code blocks.
- Cover the topic completely and thoroughly — do not truncate or summarize early.
- Depth over brevity: use multiple examples when a concept benefits from it.
- Avoid filler sentences — every paragraph must add value.
- End with a short ## Summary section.
- Output absolutely nothing after the Summary section.
`;

  const baseURL = resolveOllamaHost();

  try {
    const response = await axios.post(
      `${baseURL}/api/chat`,
      {
        model: process.env.OLLAMA_MODEL || "gemma3:4b",
        messages: [{ role: "user", content: prompt }],
        stream: false,
      },
      { timeout: 0 } // no timeout — let Ollama take as long as it needs
    );

    if (!response.data?.message?.content) {
      throw new Error("Invalid response from Ollama — missing message content");
    }

    return response.data.message.content;
  } catch (error) {
    const detail = error.response?.data?.error || error.message;
    throw new Error(`Ollama generation failed: ${detail}`);
  }
}

module.exports = { generateContent, resolveOllamaHost };
