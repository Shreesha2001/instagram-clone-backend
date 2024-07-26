const pool = require("../../db/postgres");
exports.getFollowing = async (req, res) => {
    const userId = req.params.id;

    try {
        const client = await pool.connect();

        const getFollowingQuery = `SELECT * FROM follows WHERE follower_user_id = $1;`;

        const getFollowingResult = await client.query(getFollowingQuery, [
            userId
        ]);

        return res.status(200).json({
            following: getFollowingResult.rows
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}