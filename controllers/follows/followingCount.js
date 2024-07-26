const  pool = require("../../db/postgres");

exports.getFollowingCount = async (req, res) => {
    const userId = req.params.id;

    try {
        const client = await pool.connect();

        const getFollowingCountQuery = `SELECT COUNT(*) FROM follows WHERE follower_user_id = $1;`;

        const getFollowingCountResult = await client.query(getFollowingCountQuery, [
            userId
        ]);

        return res.status(200).json({
            followingCount: getFollowingCountResult.rows[0].count
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}
