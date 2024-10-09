const express = require("express");
const router = express.Router();

const {
  createUser,
  getUser,
  loginUser,
} = require("../controllers/userController");

router.post("/createUser", createUser);
router.get("/getUser", getUser);
router.post("/login", loginUser);

module.exports = router;
