const pool = require("../../db/postgres.js");

exports.getUserById = async (req, res) => {
	try {
		const client = await pool.connect();
		const userId = req.params.id;
		const userData = await client.query(`SELECT * FROM users WHERE id = $1;`, [
			userId,
		]);
		const user = userData.rows[0];
		await client.release();

		if (!user) {
			return res.status(404).json({
				error: "User not found.",
			});
		}
		res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal server error.",
		});
	}
};
