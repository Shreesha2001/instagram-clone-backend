const pool = require("../../db/postgres");
exports.unfollow = async (req, res) => {
	const userId = req.userId;
	const followingId = req.params.id;

	try {
		const client = await pool.connect();

		const unfollowQuery = `DELETE FROM follows WHERE follower_user_id = $1 AND following_user_id = $2;`;

		const unfollowResult = await client.query(unfollowQuery, [userId, followingId]);
       if(unfollowResult.rowCount === 0) {
           return res.status(400).json({
               error: "You are not following this user.",   
           });
       }
		return res.status(200).json({
			message: "User unfollowed successfully.",
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Internal server error.",
		});
	}
};
