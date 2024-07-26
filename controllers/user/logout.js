// Logout Function
exports.logout = (req, res) => {
	try {
		const token = req.body.token;
		console.log("sent " + token);
		console.log("stored " + req.session.token);
		// Check if token exists in the session
		if (req.session.token) {
			// Compare the token from the request with the token in the session
			if (token === req.session.token) {
				// Clear the token from the session
				delete req.session.token;
				res.status(200).json({ message: "Logged out successfully" });
			} else {
				// Tokens don't match
				res.status(400).json({ error: "Token mismatch. Cannot log out" });
			}
		} else {
			// Token doesn't exist in the session
			res.status(400).json({ error: "No token found in the session" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};
