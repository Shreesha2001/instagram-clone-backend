const pool = require("../../db/postgres");

const deletePostById = async (req, res) => {
	const postId = req.params.id; //or can have req.body.id
	const userId = req.userId;
    console.log(userId)
	try {
		const client = await pool.connect();
		const checkPostQuery = `SELECT * FROM posts WHERE id = $1 AND user_id = $2;`;
		const checkPostResult = await client.query(checkPostQuery, [
			postId,
			userId,
		]);

		if (checkPostResult.rows.length === 0) {
			return res.status(404).json({
				error: "Post not found for the authenticated user in that post id.",
			});
		}
		// Delete the post from the database
		const deletePostQuery = `DELETE FROM posts WHERE id = $1;`;
		await client.query(deletePostQuery, [postId]);

		return res.status(200).json({
			message: "Post deleted successfully.",
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Database error occurred while deleting post.",
		});
	}
};

module.exports = { deletePostById };
