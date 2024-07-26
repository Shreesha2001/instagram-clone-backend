const { Router } = require("express");
const { createPost } = require("../controllers/posts/createPost");
const { getPostsByUserId } = require("../controllers/posts/getPostsById");
const { deletePostById } = require("../controllers/posts/deletePostById");
const { authenticateToken } = require("../middleware/auth.js");
const router = Router();

router.post("/create", authenticateToken, createPost);
router.get("/get",authenticateToken, getPostsByUserId);
router.delete("/:id", authenticateToken, deletePostById);
module.exports = router;
