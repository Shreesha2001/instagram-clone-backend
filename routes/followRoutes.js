const express = require("express");
const router = express.Router();

const { follow } = require("../controllers/follows/follow");
const { unfollow } = require("../controllers/follows/unfollow");
const { getFollowers } = require("../controllers/follows/followers");
const { getFollowing } = require("../controllers/follows/following");
const { getFollowersCount } = require("../controllers/follows/followersCount");
const { getFollowingCount } = require("../controllers/follows/followingCount");
const { authenticateToken } = require("../middleware/auth.js");

router.post("/follow/", authenticateToken, follow);
router.delete("/unfollow/:id", authenticateToken, unfollow);
router.get("/followers/:id", authenticateToken, getFollowers);
router.get("/following/:id", authenticateToken, getFollowing);
router.get("/followers-count/:id", authenticateToken, getFollowersCount);
router.get("/following-count/:id", authenticateToken, getFollowingCount);

module.exports = router;
