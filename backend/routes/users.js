const express = require("express");
const router = express.Router();

const {
  getUsers,

  createUser,
  updateUser,
  deleteUser,
  getTopScoresForUser,
} = require("../controllers/users.js");

router.get("/getuser", getUsers);

router.post("/createuser", createUser);

router.put("/updateuser/:userID", updateUser);

router.delete("/deleteuser/:userID", deleteUser);

router.get("/:userId/topscores", getTopScoresForUser);

module.exports = router;
