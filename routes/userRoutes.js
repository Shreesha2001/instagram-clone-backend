const express = require("express");
const router = express.Router();

const { register } = require("../controllers/user/register");
const { getAllUsers } = require("../controllers/user/allUser");
const { login } = require("../controllers/user/login");
const { getUserById } = require("../controllers/user/getUserById");
const { logout } = require("../controllers/user/logout");
const { authenticateToken } = require("../middleware/auth.js");
const { loginUsingOTP } = require("../controllers/user/loginUsingOtp.js");

router.post("/register", register);
router.post("/login", login);
router.get("/all", authenticateToken, getAllUsers);
router.post("/logout",authenticateToken, logout);
router.post("/loginusingotp", loginUsingOTP);
router.get("/:id", authenticateToken, getUserById);

module.exports = router;
