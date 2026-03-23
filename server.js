/**
 * server.js — Dashboard web server
 *
 * Starts an Express server on port 4040 (configurable via PORT env var).
 * Access from any machine on the network: http://<thinkcenter-ip>:4040
 *
 * Start:  node server.js
 */

require("dotenv").config();
const express = require("express");

const app  = express();
const PORT = parseInt(process.env.PORT || "4040", 10);

app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api", require("./src/routes/apiRoutes"));
app.use("/",    require("./src/routes/dashboardRoutes"));

// ── Start ────────────────────────────────────────────────────────────────────
// Bind to 0.0.0.0 so it's reachable from other machines on the LAN
app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("╔══════════════════════════════════════════╗");
  console.log("║        📚  Book Generator Dashboard       ║");
  console.log("╠══════════════════════════════════════════╣");
  console.log(`║  Local  : http://localhost:${PORT}           ║`);
  console.log(`║  Network: http://<your-ip>:${PORT}           ║`);
  console.log("╚══════════════════════════════════════════╝");
  console.log("");
});
