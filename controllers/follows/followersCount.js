const pool  = require("../../db/postgres");

exports.getFollowersCount = async (req, res) => {
    const userId = req.params.id;

    try {
        const client = await pool.connect();

        const getFollowersCountQuery = `SELECT COUNT(*) FROM follows WHERE following_user_id = $1;`;

        const getFollowersCountResult = await client.query(getFollowersCountQuery, [
            userId
        ]);

        return  res.status(200).json({
            followersCount: getFollowersCountResult.rows[0].count
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}
