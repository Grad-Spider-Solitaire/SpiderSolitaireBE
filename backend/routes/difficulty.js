const express = require("express");
const router = express.Router();

const {
    getDifficultyByNumberOfSuits,
    getAllDifficulties
} = require("../controllers/difficulty.js");

router.get("/", getAllDifficulties);

router.get("/:suits", getDifficultyByNumberOfSuits);

module.exports = router;
