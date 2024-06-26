const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');
var cors = require('cors')
const { verifyToken } = require('./controllers/auth');
const gameResults = require('./routes/gameResults');
const users = require('./routes/users');
const difficulty = require('./routes/difficulty');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://spidersolitaire-fe-env.eba-xs2y2pex.eu-west-1.elasticbeanstalk.com',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions)) ;

// Apply middleware as needed for protected routes
app.use('/gameresults', verifyToken, gameResults);
app.use('/users', verifyToken, users);
app.use('/difficulty', verifyToken, difficulty);

// Public route
app.get('/', (req, res) => {
  res.send('Welcome to the Spider Solitaire Backend!');
});


module.exports = app;


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

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
