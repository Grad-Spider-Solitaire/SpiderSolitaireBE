const express = require("express");
const router = express.Router();

// Example controller functions for handling game results
const {
  getGameResults,
  getGameResultById,
  createGameResult,
  updateGameResult,
  deleteGameResult,
} = require("../controllers/gameResults");

// GET all game results
router.get("/", getGameResults);

// GET a game result by ID
router.get("/:id", getGameResultById);

// POST a new game result
router.post("/", createGameResult);

// PUT (update) a game result by ID
router.put("/:id", updateGameResult);

// DELETE a game result by ID
router.delete("/:id", deleteGameResult);

module.exports = router;
