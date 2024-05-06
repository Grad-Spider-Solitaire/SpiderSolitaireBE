const db = require("../../database/db");

const getGameResults = async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM game_results");
    res.json(results.rows);
  } catch (error) {
    console.error("Error fetching game results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Example function to create a new game result
const createGameResult = async (req, res) => {
  const { user_id, score, difficulty_level_id, game_duration } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO game_results (user_id, score, difficulty_level_id, game_date, game_duration) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4) RETURNING *",
      [user_id, score, difficulty_level_id, game_duration]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating game result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Example function to delete a game result by ID
const deleteGameResult = async (req, res) => {
  const gameId = req.params.id;
  try {
    const result = await db.query(
      "DELETE FROM game_results WHERE id = $1 RETURNING *",
      [gameId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Game result not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error("Error deleting game result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getGameResults,
  createGameResult,
  deleteGameResult,
};
