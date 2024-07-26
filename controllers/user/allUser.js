const pool = require("../../db/postgres.js");

exports.getAllUsers = async ( req,res) => {
	try {
		const client = await pool.connect();
		
		const allUsersData = await client.query(`SELECT * FROM users;`);
		const allUsers = allUsersData.rows;

		client.release();
		res.status(200).json({ users: allUsers });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal server error.",
		});
	}
};

