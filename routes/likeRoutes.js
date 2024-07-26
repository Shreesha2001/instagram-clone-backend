const { Router } = require("express");
const { like } = require("../controllers/likes/likes.js");
const likeCount = require("../controllers/likes/likeCount.js");
const {postLikes} = require("../controllers/likes/postLikes.js");
const router = Router();
const { authenticateToken } = require("../middleware/auth.js");
router.get("/likes", authenticateToken, like);
router.get("/likeCount", authenticateToken, likeCount);
router.get("/postlike", authenticateToken, postLikes);

module.exports = router;
