const pool = require("../../db/postgres");


const likeCount = async (req, res) => {
    try {
        const { post_id } = req.params
        const client = await pool.connect()
        const count = await client.query(
            "SELECT COUNT(*) FROM likes WHERE post_id = $1",
            [post_id]
        )
        return res.status(200).json({ likeCount: count.rows[0].count })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = likeCount