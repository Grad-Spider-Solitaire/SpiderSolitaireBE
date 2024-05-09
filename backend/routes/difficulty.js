const express = require("express");
const router = express.Router();

const {
    getDifficultyByNumberOfSuits,
    getAllDifficulties
} = require("../controllers/difficulty.js");

router.get("/difficulty", getAllDifficulties);

router.get("/difficulty/:suits", getDifficultyByNumberOfSuits);

module.exports = router;
