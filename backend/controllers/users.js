// controllers/users.js

const db = require("../database/db");

// Get all users
const getUsers = async (req, res) => {
  try {
    const queryText = "SELECT * FROM users";
    const { rows } = await db.query(queryText);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { username } = req.body;
  try {
    const queryText = "INSERT INTO users (username) VALUES ($1) RETURNING *";
    const { rows } = await db.query(queryText, [username]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { userID } = req.params;
  const { username } = req.body;
  try {
    const queryText =
      "UPDATE users SET username = $1 WHERE id = $2 RETURNING *";
    const { rows } = await db.query(queryText, [username, userID]);
    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const queryText = "DELETE FROM users WHERE id = $1 RETURNING *";
    const { rows } = await db.query(queryText, [userID]);
    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTopScoresForUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    // Query to fetch the top 10 highest scores for the specified user
    const queryText = `
      SELECT *
      FROM game_results 
      WHERE user_id = $1 
      ORDER BY score DESC 
      LIMIT 10`;
    const { rows } = await db.query(queryText, [userId]);

    // Extract scores from the query result
    res.json(rows);
  } catch (error) {
    console.error("Error fetching top scores for user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getTopScoresForUser,
};
