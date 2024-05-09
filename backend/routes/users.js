const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.js");

router.get("/getuser", getUsers);
router.get("/getuser/:email", getUser);

router.post("/createuser", createUser);

router.put("/updateuser/:userID", updateUser);

router.delete("/deleteuser/:userID", deleteUser);

module.exports = router;
