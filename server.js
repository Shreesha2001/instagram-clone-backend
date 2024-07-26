const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");
const postRoutes = require("./routes/postsRoutes");
const followRoutes = require("./routes/followRoutes");
const likeRoutes = require("./routes/likeRoutes");
app.use(
	session({
		secret: "12345",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days in milliseconds
	}));
app.get("/", (req, res) => {
	res.send("Hello, world!");
});


app.use(express.json());
app.use("/like",likeRoutes)
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/follow", followRoutes);	
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
