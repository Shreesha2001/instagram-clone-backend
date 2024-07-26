const pool = require("../../db/postgres");
const getPostsByUserId = async (req, res) => {
	const userId = req.userId;
	if (!userId) {
		return res.status(401).json({
			error: "Unauthorized: Session not found",
		});
	}
	try {
		const client = await pool.connect();
		console.log(userId);
		// Query to retrieve posts by user ID
		const result = await client.query(
			`SELECT * FROM posts WHERE user_id = $1`,
			[userId]
		);
		if (result.rows.length === 0) {
			return res.status(404).json({
				error: "Posts not found",
			});
		} else {
			return res.status(200).json({
				message: "Posts retrieved successfully.",
				posts: result.rows,
			});
		}

		// const posts = result.rows;
		// return posts;
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Failed to retrieve posts.",
		});
	}
};

module.exports = { getPostsByUserId };
