const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const html = fs.readFileSync("backend/index.html");

const app = express();
const port = process.env.PORT || 3000;

const log = function (entry) {
  fs.appendFileSync(
    "/tmp/sample-app.log",
    new Date().toISOString() + " - " + entry + "\n"
  );
};

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint for serving HTML content
app.get("/", (req, res) => {
  res.writeHead(200);
  res.write(html);
  res.end();
});

// Mount the users router
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Mount the game results router
const gameResultsRouter = require("./routes/gameResults");
app.use("/game-results", gameResultsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
