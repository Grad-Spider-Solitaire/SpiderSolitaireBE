const express = require("express");
const router = express.Router();

const {
  getUsers,

  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.js");

router.get("/getuser", getUsers);

router.post("/", createUser);

router.put("/:userID", updateUser);

router.delete("/:userID", deleteUser);

module.exports = router;
