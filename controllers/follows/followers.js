const pool  = require("../../db/postgres");

exports.getFollowers = async (req, res) => {
    const userId = req.params.id;

    try {
        const client = await pool.connect();

        const getFollowersQuery = `SELECT * FROM follows WHERE following_user_id = $1;`;

        const getFollowersResult = await client.query(getFollowersQuery, [
            userId
        ]);

        return res.status(200).json({
            followers: getFollowersResult.rows
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}