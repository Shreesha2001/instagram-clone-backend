const pool = require("../../db/postgres");

// Create post function
const createPost = async (req, res) => {
	const { title, body, status } = req.body;
	const userId = req.userId;
	console.log("userid" + userId);
	if (!title || !body || !status) {
		return res.status(400).json({
			error: "Title, body, and status are required fields.",
		});
	}

	try {
		const client = await pool.connect();

		const result = await client.query(
			`INSERT INTO posts (title, body, user_id, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *;`,
			[title, body, userId, status]
		);

		const createdPost = result.rows[0];

		return res.status(201).json({
			message: "Post created successfully.",
			post: createdPost,
		});

		// 	await client.query('insert into media(post_id,thumbnail,play_url)values($1,$2,$3)",	[req.id, req.params.id],
		// 	(err, results) => {
		// 		if (err) {
		// 			console.log(err);
		// 		}
		// 		return res.status(200).json({
		// 			liked: true,
		// 		});
		// 	}
		// );
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Database error occurred while creating post.",
		});
	}
};

module.exports = { createPost };


