const pool = require("../../db/postgres");

exports.like = async (req, res) => {
	const client = await pool.connect();
	try {
		const result = await client.query(
			"SELECT * FROM likes WHERE user_id = $1 AND post_id = $2",
			[req.userId, req.body.id]
		);
		if (result.rows.length > 0) {
			await client.query(
				"DELETE FROM likes WHERE user_id = $1 AND post_id = $2",
				[req.userId, req.body.id]
			);
			return res.status(200).json({
				liked: false,
			});
		} else {
			await client.query(
				"INSERT INTO likes (user_id, post_id) VALUES ($1, $2)",
				[req.userId, req.body.id]
			);
			return res.status(200).json({
				liked: true,
			});
		}
	} catch (error) {
		console.log(error.detail);
		return res.status(500).json({
			error: "Internal Server Error  " + error.detail,
		});
	} finally {
		client.release(); // Release the client back to the pool
	}
};
