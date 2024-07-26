const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
	const token = req.session.token;

	if (!token) {
		return res
			.status(401)
			.json({ error: "Unauthorized: Token not found in session" });
	}

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if (err) {
			return res
				.status(403)
				.json({ error: "Forbidden: Token verification failed" });
		}

		req.userId = decoded.userId;
		req.username = decoded.username;
		console.log(JSON.stringify(req.userId));
		console.log(JSON.stringify(req.username));
		next();
	});
};
