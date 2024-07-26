const pool = require("../../db/postgres");

exports.postLikes = async (req, res) => {
	const client = await pool.connect();
	try {
		const result = await client.query(
			"SELECT u.username FROM likes l INNER JOIN users u ON l.user_id = u.id WHERE l.post_id = $1",
			[req.body.id]
		);
		const likedUsernames = result.rows.map((row) => row.username);
		return res.status(200).json({
			likedUsernames: likedUsernames,
		});
	} catch (error) {
		console.log(error.detail);
		return res.status(500).json({
			error: "Internal Server Error  "+error.detail,
		});
	} finally {
		client.release();
	}
};
