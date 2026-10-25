/**
 * Custom Node server for shared hosting (cPanel "Setup Node.js App" /
 * Phusion Passenger). Passenger provides the PORT env var and launches this
 * file as the app's startup entrypoint (`next start` is not directly usable
 * on most shared hosts).
 *
 * Local development still uses `npm run dev` — this file is only referenced
 * by the hosting panel's "Startup file" setting.
 */
const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = Number(process.env.PORT) || 3000;

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(
      `> CyberSavvyPro ready on http://localhost:${port} (${dev ? "dev" : "production"})`
    );
  });
});
