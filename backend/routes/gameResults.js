const express = require("express");
const router = express.Router();

// Example controller functions for handling game results
const {
  getGameResults,
  createGameResult,
  deleteGameResult,
} = require("../controllers/gameResults");

// GET all game results
router.get("/", getGameResults);

// POST a new game result
router.post("/creategameresult", createGameResult);

// DELETE a game result by ID
router.delete("/:id", deleteGameResult);

module.exports = router;
