const db = require("../database/db");

const getAllDifficulties = async (req, res) => {
    try {
        // Query to fetch the top 10 highest scores for the specified user
        const queryText = `
        SELECT *
        FROM difficulty_levels
        LIMIT 10`;
        const { rows } = await db.query(queryText);
        // Extract scores from the query result
        res.json(rows);
    } catch (error) {
        console.error("Error fetching top scores by difficulty:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getDifficultyByNumberOfSuits = async (req, res) => {
    const { suits } = req.params;
    try {
        if (suits < 1 || suits > 4) {
            res.status(400).json({ error: "Invalid number of suits" });
            return;
        }
        const queryText = `SELECT * FROM difficulty_levels WHERE suits = $1`;
        const { rows } = await db.query(queryText, [suits]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Difficulty not found" });
        } else {
            res.json(rows[0]);
        }
        res.json(rows);
    } catch (error) {
        console.error("Error fetching top scores by difficulty:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getDifficultyByNumberOfSuits,
    getAllDifficulties
};