const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();

// Correctly resolve the path to db.json relative to this file
const dbPath = path.resolve(__dirname, "../data/db.json");

// Log the path to help with debugging if needed (check Vercel logs)
console.log("Loading db from:", dbPath);

if (!fs.existsSync(dbPath)) {
  console.error("Database file not found at:", dbPath);
}

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Ensure the /api prefix is handled correctly
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  }),
);

server.use(router);

module.exports = server;
