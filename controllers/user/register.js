const bcrypt = require("bcrypt");
const pool = require("../../db/postgres.js");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
	const { username, password, email, phno, bio, profile_pic } = req.body;
	try {
		const client = await pool.connect();

		const usernameCheck = await client.query(
			`SELECT * FROM users WHERE username = $1;`,
			[username]
		);

		if (usernameCheck.rows.length > 0) {
			return res.status(400).json({
				error: "Username already exists.",
			});
		}

		const emailCheck = await client.query(
			`SELECT * FROM users WHERE email = $1;`,
			[email]
		);

		if (emailCheck.rows.length > 0) {
			return res.status(400).json({
				error: "Email already exists.",
			});
		}


		const phonenoCheck = await client.query(
			`SELECT * FROM users WHERE phno = $1;`,
			[phno]
		);

		if (phonenoCheck.rows.length > 0) {
			return res.status(400).json({
				error: "Phone number already exists.",
			});
		}


		const hashedPassword = await bcrypt.hash(password, 10);

		await client.query(
			`INSERT INTO users (username, password, email, phno, bio, profile_pic, followers_count, following_count, post_count, created_at) 
             VALUES ($1, $2, $3, $4, $5, $6, 0, 0, 0, NOW());`,
			[username, hashedPassword, email, phno, bio, profile_pic]
		);


		const userData = await client.query(
			`SELECT * FROM users WHERE username = $1;`,
			[username]
		);
		const user = userData.rows[0];


		const token = jwt.sign(
			{
				userId: user.id,
				username: user.username,
			},
			process.env.SECRET_KEY || "12345",
			{ expiresIn: "1d" }
		);
		req.session.token = token;

		res.status(201).json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal server error.",
		});
	}
};

