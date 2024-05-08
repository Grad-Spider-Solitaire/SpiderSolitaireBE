const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');


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
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const gameResultsRouter = require("./routes/gameResults");
app.use("/gameresults", gameResultsRouter);

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
