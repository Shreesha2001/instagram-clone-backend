const bcrypt = require("bcrypt");
const pool = require("../../db/postgres");
const jwt = require("jsonwebtoken");

// Login Function
exports.login = async (req, res) => {
	const { identifier, password } = req.body;

	if (!identifier || !password) {
		return res.status(400).json({
			error: "All fields are required!",
		});
	}

	try {
		const client = await pool.connect();

		const data = await client.query(
			`SELECT * FROM users WHERE username = $1 OR email = $1 OR phno = $1;`,
			[identifier]
		);

		const user = data.rows[0];
		if (!user) {
			return res.status(400).json({
				error: "User is not registered. Sign Up first.",
			});
		}

		// Compare the hashed password
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (passwordMatch) {
			const token = jwt.sign(
				{
					userId: user.id,
					username: user.username,
				},
				process.env.SECRET_KEY || "12345",
				{ expiresIn: "1d" }
			);
			console.log("token:" + token);

			// Store the token in the session
			req.session.token = token;
			console.log("login token " + req.session.token);


			return res.status(200).json({
				message: "User signed in!",
				token: token,
			});
		} else {
			return res.status(400).json({
				error: "Incorrect password!",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Database error occurred while signing in!",
		});
	}
};
