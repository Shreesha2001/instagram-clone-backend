const  pool = require("../../db/postgres");

exports.follow = async (req, res) => {
    const userId = req.userId;
    const followingId = req.body.id;  
console.log("following ",followingId, )
    console.log("user ",userId, )
    try {
        const client = await pool.connect();

        const checkFollowQuery = `SELECT * FROM follows WHERE follower_user_id = $1 AND following_user_id = $2;`;

        const checkFollowResult = await client.query(checkFollowQuery, [
            userId,
            followingId
        ]);

        if (checkFollowResult.rows.length > 0) {
            return res.status(400).json({
                error: "You are already following this user."
            });
        }

        const followQuery = `INSERT INTO follows (follower_user_id, following_user_id) VALUES ($1, $2);`;

        await client.query(followQuery, [
            userId,
            followingId
        ]);

        return res.status(200).json({
            message: "User followed successfully."
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}









